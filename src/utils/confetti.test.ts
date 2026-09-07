import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  buildConfettiFrame,
  celebrate,
  type CelebrateOptions,
  type Particle,
} from "./confetti.mts";

function createFakeStream(isTTY: boolean) {
  const chunks: string[] = [];
  const stream = {
    isTTY,
    columns: 40,
    write: (chunk: string) => {
      chunks.push(chunk);
      return true;
    },
  };
  return { stream, chunks };
}

const particles: Particle[] = [
  {
    col: 5,
    y0: 0,
    speed: 2,
    swayAmp: 0,
    swayFreq: 0,
    phase: 0,
    char: "*",
    color: 91,
  },
];

describe("buildConfettiFrame", () => {
  it("renders a particle in the row matching its drift", () => {
    const frame = buildConfettiFrame(particles, 10, 5, 0);

    expect(frame).toHaveLength(5);
    expect(frame[0]).toBe(`     \x1b[91m*\x1b[0m    `);
    expect(frame[1]).toBe("          ");
  });

  it("moves particles to lower rows as time elapses", () => {
    const frame = buildConfettiFrame(particles, 10, 5, 1000);

    expect(frame[2]).toBe(`     \x1b[91m*\x1b[0m    `);
    expect(frame[0]).toBe("          ");
  });
});

describe("celebrate", () => {
  let output: { stream: NodeJS.WriteStream; chunks: string[] };

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("prints the banner and animates confetti on a TTY", async () => {
    output = createFakeStream(true);

    const promise = celebrate("fully sleeved", {
      stream: output.stream,
      random: () => 0.5,
      height: 10,
      width: 40,
      durationMs: 300,
      intervalMs: 100,
    } as CelebrateOptions);

    await vi.advanceTimersByTimeAsync(400);
    await promise;

    const all = output.chunks.join("");
    const clearLine = new RegExp(`${String.fromCharCode(27)}\\[2K`, "g");
    expect(all).toContain("🎉 fully sleeved");
    expect(all).toContain("\x1b[?25l"); // hide cursor
    expect(all).toContain("\x1b[?25h"); // show cursor
    expect(all).toContain("\x1b[10A"); // rewind between frames
    expect(all.match(clearLine)).toHaveLength(10); // clear each frame line
    expect(output.chunks.length).toBeGreaterThan(3); // banner + frames + cleanup
  });

  it("prints only the banner without animation when not a TTY", async () => {
    output = createFakeStream(false);

    await celebrate("fully sleeved", {
      stream: output.stream,
    } as CelebrateOptions);

    const all = output.chunks.join("");
    expect(all).toContain("🎉 fully sleeved");
    expect(all).not.toContain("\x1b[?25l");
    expect(all).not.toContain("\x1b[2K");
  });
});
