import { describe, expect, it } from "vitest";
import {
  evaluate,
  formatNumber,
  initialState,
  pressClear,
  pressDigit,
  pressEquals,
  pressOperator,
} from "./calculatorEngine";

describe("initialState", () => {
  it("starts at zero with no pending operation", () => {
    expect(initialState()).toEqual({
      display: "0",
      accumulator: null,
      pendingOp: null,
      entryIsFresh: true,
    });
  });
});

describe("pressClear", () => {
  it("resets to initial state", () => {
    let s = initialState();
    s = pressDigit(s, 9);
    s = pressOperator(s, "+");
    s = pressDigit(s, 3);
    expect(pressClear(s)).toEqual(initialState());
  });

  it("clears Error so input works again", () => {
    let s = initialState();
    s = pressDigit(s, 1);
    s = pressOperator(s, "/");
    s = pressDigit(s, 0);
    s = pressEquals(s);
    expect(s.display).toBe("Error");
    s = pressClear(s);
    expect(s).toEqual(initialState());
    s = pressDigit(s, 5);
    expect(s.display).toBe("5");
  });
});

describe("pressDigit", () => {
  it("replaces entry after operator", () => {
    let s = initialState();
    s = pressDigit(s, 7);
    expect(s.display).toBe("7");
    s = pressOperator(s, "+");
    s = pressDigit(s, 3);
    expect(s.display).toBe("3");
  });

  it("replaces lone zero with a non-zero digit", () => {
    let s = initialState();
    s = pressDigit(s, 5);
    expect(s.display).toBe("5");
  });

  it("appends digits for multi-digit numbers", () => {
    let s = initialState();
    s = pressDigit(s, 1);
    s = pressDigit(s, 0);
    s = pressDigit(s, 5);
    expect(s.display).toBe("105");
  });

  it("keeps a single zero when pressing zero on zero", () => {
    let s = initialState();
    s = pressDigit(s, 0);
    expect(s.display).toBe("0");
    s = pressDigit(s, 0);
    expect(s.display).toBe("0");
  });

  it("ignores invalid digits", () => {
    const s = initialState();
    expect(pressDigit(s, -1)).toBe(s);
    expect(pressDigit(s, 10)).toBe(s);
    expect(pressDigit(s, 1.5)).toBe(s);
  });

  it("does not accept input after Error", () => {
    let s = initialState();
    s = pressDigit(s, 6);
    s = pressOperator(s, "/");
    s = pressDigit(s, 0);
    s = pressEquals(s);
    expect(s.display).toBe("Error");
    expect(pressDigit(s, 1)).toEqual(s);
  });
});

describe("pressOperator", () => {
  it("stores accumulator on first operator", () => {
    let s = initialState();
    s = pressDigit(s, 9);
    s = pressOperator(s, "+");
    expect(s.accumulator).toBe(9);
    expect(s.pendingOp).toBe("+");
    expect(s.entryIsFresh).toBe(true);
  });

  it("chains operations left-to-right", () => {
    let s = initialState();
    s = pressDigit(s, 2);
    s = pressOperator(s, "+");
    s = pressDigit(s, 3);
    s = pressOperator(s, "*");
    expect(s.display).toBe("5");
    expect(s.accumulator).toBe(5);
    expect(s.pendingOp).toBe("*");
    s = pressDigit(s, 4);
    s = pressEquals(s);
    expect(s.display).toBe("20");
  });

  it("does nothing useful when display is Error", () => {
    let s = initialState();
    s = pressDigit(s, 1);
    s = pressOperator(s, "/");
    s = pressDigit(s, 0);
    s = pressEquals(s);
    expect(s.display).toBe("Error");
    expect(pressOperator(s, "+")).toEqual(s);
  });
});

describe("pressEquals", () => {
  it("evaluates accumulator with pending operator", () => {
    let s = initialState();
    s = pressDigit(s, 1);
    s = pressOperator(s, "+");
    s = pressDigit(s, 2);
    s = pressEquals(s);
    expect(s.display).toBe("3");
    expect(s.pendingOp).toBeNull();
    expect(s.accumulator).toBeNull();
  });

  it("no-ops without pending operator", () => {
    let s = initialState();
    s = pressDigit(s, 4);
    expect(pressEquals(s)).toEqual(s);
  });

  it("allows starting a new calculation after equals", () => {
    let s = initialState();
    s = pressDigit(s, 5);
    s = pressOperator(s, "+");
    s = pressDigit(s, 5);
    s = pressEquals(s);
    expect(s.display).toBe("10");
    s = pressOperator(s, "+");
    expect(s.accumulator).toBe(10);
    expect(s.pendingOp).toBe("+");
  });
});

describe("evaluate", () => {
  it("adds, subtracts, multiplies, divides", () => {
    expect(evaluate(2, "+", 3)).toBe(5);
    expect(evaluate(10, "-", 4)).toBe(6);
    expect(evaluate(3, "*", 7)).toBe(21);
    expect(evaluate(8, "/", 2)).toBe(4);
  });

  it("treats division by zero as an error for any dividend", () => {
    for (const a of [0, 1, -3, 42, 999]) {
      expect(evaluate(a, "/", 0)).toBeNaN();
      expect(formatNumber(evaluate(a, "/", 0))).toBe("Error");
    }
  });
});

describe("formatNumber", () => {
  it("formats finite numbers and maps non-finite to Error", () => {
    expect(formatNumber(42)).toBe("42");
    expect(formatNumber(NaN)).toBe("Error");
    expect(formatNumber(Infinity)).toBe("Error");
  });
});
