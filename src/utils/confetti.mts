import { styleText } from "util";

export type Particle = {
  col: number;
  y0: number;
  speed: number;
  swayAmp: number;
  swayFreq: number;
  phase: number;
  char: string;
  color: number;
};

export type CelebrateOptions = {
  stream?: NodeJS.WriteStream;
  durationMs?: number;
  intervalMs?: number;
  height?: number;
  width?: number;
  random?: () => number;
};

const colorCodes = [91, 92, 93, 94, 95, 96, 97];
const confettiChars = ["*", "o", "+", "@", "x", "v"];

function spawnParticles(
  width: number,
  height: number,
  random: () => number,
): Particle[] {
  const count = Math.max(10, Math.round((width * height) / 6));

  return Array.from({ length: count }, () => ({
    col: Math.floor(random() * width),
    y0: random() * height,
    speed: 2 + random() * 4,
    swayAmp: Math.floor(random() * 3),
    swayFreq: 1 + random() * 3,
    phase: random() * Math.PI * 2,
    char: confettiChars[Math.floor(random() * confettiChars.length)],
    color: colorCodes[Math.floor(random() * colorCodes.length)],
  }));
}

export function buildConfettiFrame(
  particles: Particle[],
  width: number,
  height: number,
  elapsedMs: number,
): string[] {
  const grid: string[][] = Array.from({ length: height }, () =>
    Array<string>(width).fill(" "),
  );
  const tSec = elapsedMs / 1000;

  particles.forEach((particle) => {
    const row = Math.floor((particle.y0 + tSec * particle.speed) % height);
    const sway = Math.round(
      Math.sin(tSec * particle.swayFreq + particle.phase) * particle.swayAmp,
    );
    const col = (((particle.col + sway) % width) + width) % width;

    grid[row][col] = `\x1b[${particle.color}m${particle.char}\x1b[0m`;
  });

  return grid.map((row) => row.join(""));
}

export function celebrate(
  message: string,
  options: CelebrateOptions = {},
): Promise<void> {
  const stream = options.stream ?? process.stdout;
  const random = options.random ?? Math.random;
  const height = Math.max(4, options.height ?? 12);
  const width = Math.min(
    60,
    options.width ?? Math.min(stream.columns ?? 60, 60),
  );
  const durationMs = options.durationMs ?? 1800;
  const intervalMs = options.intervalMs ?? 75;

  stream.write(`\n${styleText(["green", "bold"], `🎉 ${message}`)}\n`);

  if (!stream.isTTY) return Promise.resolve();

  const particles = spawnParticles(width, height, random);
  const startMs = Date.now();
  let isFirstFrame = true;

  stream.write("\x1b[?25l");

  return new Promise((resolve) => {
    const writeFrame = () => {
      const elapsedMs = Date.now() - startMs;

      if (!isFirstFrame) stream.write(`\x1b[${height}A\r`);
      isFirstFrame = false;

      stream.write(
        buildConfettiFrame(particles, width, height, elapsedMs).join("\n") +
          "\n",
      );

      if (elapsedMs >= durationMs) {
        clearConfettiRegion(stream, height);
        stream.write("\x1b[?25h");
        resolve();
      } else {
        setTimeout(writeFrame, intervalMs);
      }
    };

    writeFrame();
  });
}

function clearConfettiRegion(stream: NodeJS.WriteStream, height: number) {
  stream.write(`\x1b[${height}A\r`);
  for (let i = 0; i < height; i++) {
    stream.write("\x1b[2K");
    if (i < height - 1) stream.write("\x1b[1B");
  }
  stream.write(`\x1b[${height - 1}A\r`);
}
