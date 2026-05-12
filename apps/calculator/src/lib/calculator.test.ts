import { describe, expect, it } from "vitest";
import { digit, equals, initialState, operator } from "./calculator";

describe("initialState", () => {
  it("starts at zero with no pending operation", () => {
    const s = initialState();
    expect(s.display).toBe("0");
    expect(s.accumulator).toBeNull();
    expect(s.pendingOp).toBeNull();
    expect(s.freshEntry).toBe(true);
  });
});

describe("digit", () => {
  it("replaces leading zero with a non-zero digit", () => {
    let s = initialState();
    s = digit(s, 0);
    expect(s.display).toBe("0");
    s = digit(s, 7);
    expect(s.display).toBe("7");
  });

  it("does not grow the display with repeated leading zeros", () => {
    let s = initialState();
    s = digit(s, 0);
    s = digit(s, 0);
    expect(s.display).toBe("0");
  });

  it("appends digits after a non-zero start", () => {
    let s = initialState();
    s = digit(s, 1);
    s = digit(s, 2);
    s = digit(s, 3);
    expect(s.display).toBe("123");
  });

  it("after equals, starts a new number", () => {
    let s = initialState();
    s = digit(s, 4);
    s = operator(s, "+");
    s = digit(s, 2);
    s = equals(s);
    expect(s.display).toBe("6");
    s = digit(s, 5);
    expect(s.display).toBe("5");
    expect(s.pendingOp).toBeNull();
  });

  it("throws for out-of-range digit", () => {
    expect(() => digit(initialState(), 10)).toThrow(RangeError);
    expect(() => digit(initialState(), -1)).toThrow(RangeError);
  });
});

describe("operator / equals — immediate execution", () => {
  it("chains operations left-to-right", () => {
    let s = initialState();
    s = digit(s, 5);
    s = operator(s, "+");
    s = digit(s, 3);
    s = operator(s, "*");
    expect(s.display).toBe("8");
    s = digit(s, 2);
    s = equals(s);
    expect(s.display).toBe("16");
  });

  it("applies equals with the pending operator", () => {
    let s = initialState();
    s = digit(s, 9);
    s = operator(s, "-");
    s = digit(s, 4);
    s = equals(s);
    expect(s.display).toBe("5");
    expect(s.pendingOp).toBeNull();
  });

  it("equals with nothing pending leaves state unchanged", () => {
    const s = initialState();
    expect(equals(s)).toEqual(s);
  });
});

describe("division", () => {
  it("divides non-zero divisor", () => {
    let s = initialState();
    s = digit(s, 6);
    s = operator(s, "/");
    s = digit(s, 2);
    s = equals(s);
    expect(s.display).toBe("3");
  });
});

describe("division by zero", () => {
  it("shows Error on equals when dividing by zero", () => {
    let s = initialState();
    s = digit(s, 5);
    s = operator(s, "/");
    s = digit(s, 0);
    s = equals(s);
    expect(s.display).toBe("Error");
  });

  it("shows Error when a chained operation divides by zero", () => {
    let s = initialState();
    s = digit(s, 1);
    s = operator(s, "/");
    s = digit(s, 0);
    s = operator(s, "+");
    expect(s.display).toBe("Error");
  });
});

describe("error recovery", () => {
  it("allows typing a new digit after Error (no clear button)", () => {
    let s = initialState();
    s = digit(s, 1);
    s = operator(s, "/");
    s = digit(s, 0);
    s = equals(s);
    expect(s.display).toBe("Error");
    s = digit(s, 0);
    expect(s.display).toBe("0");
    expect(s.accumulator).toBeNull();
    s = digit(s, 8);
    expect(s.display).toBe("8");
  });
});
