/**
 * Immediate-execution calculator: each operator applies to the running accumulator
 * and the value currently on the display (no PEMDAS).
 */

export type Operator = "+" | "-" | "*" | "/";

export type LastInput = "digit" | "operator" | "equals" | "init";

export type CalculatorState = {
  display: string;
  accumulator: number | null;
  pendingOp: Operator | null;
  lastInput: LastInput;
  /** When true, the next digit replaces the display (after an operator or initial). */
  freshEntry: boolean;
};

export function initialState(): CalculatorState {
  return {
    display: "0",
    accumulator: null,
    pendingOp: null,
    lastInput: "init",
    freshEntry: true,
  };
}

function isError(state: CalculatorState): boolean {
  return state.display === "Error";
}

function apply(a: number, b: number, op: Operator): number | null {
  switch (op) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      if (b === 0) return null;
      return a / b;
  }
}

export function digit(state: CalculatorState, d: number): CalculatorState {
  if (d < 0 || d > 9 || !Number.isInteger(d)) {
    throw new RangeError("digit must be an integer 0–9");
  }
  if (isError(state)) {
    return {
      display: d === 0 ? "0" : String(d),
      accumulator: null,
      pendingOp: null,
      lastInput: "digit",
      freshEntry: false,
    };
  }

  if (state.lastInput === "equals") {
    return {
      display: d === 0 ? "0" : String(d),
      accumulator: null,
      pendingOp: null,
      lastInput: "digit",
      freshEntry: false,
    };
  }

  if (state.freshEntry) {
    return {
      ...state,
      display: d === 0 ? "0" : String(d),
      freshEntry: false,
      lastInput: "digit",
    };
  }

  if (state.display === "0" && d === 0) {
    return { ...state, lastInput: "digit" };
  }
  if (state.display === "0" && d !== 0) {
    return { ...state, display: String(d), lastInput: "digit" };
  }

  return {
    ...state,
    display: state.display + String(d),
    lastInput: "digit",
  };
}

export function operator(state: CalculatorState, op: Operator): CalculatorState {
  if (isError(state)) return state;
  const current = Number(state.display);
  if (Number.isNaN(current)) return state;

  if (state.pendingOp !== null && state.accumulator !== null) {
    const res = apply(state.accumulator, current, state.pendingOp);
    if (res === null) {
      return {
        display: "Error",
        accumulator: null,
        pendingOp: null,
        lastInput: "operator",
        freshEntry: true,
      };
    }
    return {
      display: String(res),
      accumulator: res,
      pendingOp: op,
      lastInput: "operator",
      freshEntry: true,
    };
  }

  return {
    ...state,
    accumulator: current,
    pendingOp: op,
    lastInput: "operator",
    freshEntry: true,
  };
}

export function equals(state: CalculatorState): CalculatorState {
  if (isError(state)) return state;
  if (state.pendingOp === null || state.accumulator === null) {
    return state;
  }
  const current = Number(state.display);
  const res = apply(state.accumulator, current, state.pendingOp);
  if (res === null) {
    return {
      display: "Error",
      accumulator: null,
      pendingOp: null,
      lastInput: "equals",
      freshEntry: true,
    };
  }
  return {
    display: String(res),
    accumulator: res,
    pendingOp: null,
    lastInput: "equals",
    freshEntry: true,
  };
}
