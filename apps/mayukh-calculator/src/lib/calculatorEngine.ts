/**
 * Immediate-execution four-function calculator (left-to-right, not PEMDAS).
 * Example: 2 + 3 × 4 → (2+3)=5, then 5×4=20.
 */

export type Operator = "+" | "-" | "*" | "/";

export interface CalculatorState {
  /** Text shown in the display */
  display: string;
  /** Left operand when an operator is pending */
  accumulator: number | null;
  /** Operator waiting for the next operand */
  pendingOp: Operator | null;
  /** After an operator, the next digit starts a new entry */
  entryIsFresh: boolean;
}

export function initialState(): CalculatorState {
  return {
    display: "0",
    accumulator: null,
    pendingOp: null,
    entryIsFresh: true,
  };
}

export function pressDigit(state: CalculatorState, digit: number): CalculatorState {
  if (digit < 0 || digit > 9 || !Number.isInteger(digit)) {
    return state;
  }
  if (state.display === "Error") {
    return state;
  }

  const d = String(digit);

  if (state.entryIsFresh) {
    return {
      ...state,
      display: d,
      entryIsFresh: false,
    };
  }

  if (state.display === "0") {
    return {
      ...state,
      display: d,
    };
  }

  return {
    ...state,
    display: state.display + d,
  };
}

export function pressOperator(state: CalculatorState, op: Operator): CalculatorState {
  if (state.display === "Error") {
    return state;
  }

  const input = parseDisplay(state.display);
  if (Number.isNaN(input)) {
    return state;
  }

  let accumulator = state.accumulator;
  let display = state.display;

  if (state.pendingOp !== null && accumulator !== null) {
    const result = evaluate(accumulator, state.pendingOp, input);
    const formatted = formatNumber(result);
    if (formatted === "Error") {
      return errorState();
    }
    accumulator = result;
    display = formatted;
  } else {
    accumulator = input;
  }

  return {
    display,
    accumulator,
    pendingOp: op,
    entryIsFresh: true,
  };
}

export function pressEquals(state: CalculatorState): CalculatorState {
  if (state.display === "Error") {
    return state;
  }
  if (state.pendingOp === null || state.accumulator === null) {
    return state;
  }

  const input = parseDisplay(state.display);
  if (Number.isNaN(input)) {
    return state;
  }

  const result = evaluate(state.accumulator, state.pendingOp, input);
  const formatted = formatNumber(result);
  if (formatted === "Error") {
    return errorState();
  }

  return {
    display: formatted,
    accumulator: null,
    pendingOp: null,
    entryIsFresh: true,
  };
}

function errorState(): CalculatorState {
  return {
    display: "Error",
    accumulator: null,
    pendingOp: null,
    entryIsFresh: true,
  };
}

function parseDisplay(display: string): number {
  if (display === "Error") {
    return Number.NaN;
  }
  return Number(display);
}

export function evaluate(a: number, op: Operator, b: number): number {
  switch (op) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return b === 0 ? Number.NaN : a / b;
    default: {
      const _exhaustive: never = op;
      return _exhaustive;
    }
  }
}

export function formatNumber(n: number): string {
  if (!Number.isFinite(n)) {
    return "Error";
  }
  return String(n);
}
