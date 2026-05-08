import type { CalculatorState, Operator } from "./lib/calculatorEngine";
import {
  initialState,
  pressDigit,
  pressEquals,
  pressOperator,
} from "./lib/calculatorEngine";
import { createSignal } from "solid-js";

export default function App() {
  const [state, setState] = createSignal<CalculatorState>(initialState());

  const digit = (n: number) => () => setState((s) => pressDigit(s, n));
  const op = (operator: Operator) => () =>
    setState((s) => pressOperator(s, operator));
  const equals = () => setState((s) => pressEquals(s));

  return (
    <div class="calculator">
      <output class="display">{state().display}</output>
      <div class="keys">
        <div class="row">
          {[7, 8, 9].map((n) => (
            <button type="button" class="key digit" onClick={digit(n)}>
              {n}
            </button>
          ))}
          <button type="button" class="key op" onClick={op("/")}>
            ÷
          </button>
        </div>
        <div class="row">
          {[4, 5, 6].map((n) => (
            <button type="button" class="key digit" onClick={digit(n)}>
              {n}
            </button>
          ))}
          <button type="button" class="key op" onClick={op("*")}>
            ×
          </button>
        </div>
        <div class="row">
          {[1, 2, 3].map((n) => (
            <button type="button" class="key digit" onClick={digit(n)}>
              {n}
            </button>
          ))}
          <button type="button" class="key op" onClick={op("-")}>
            −
          </button>
        </div>
        <div class="row row-last">
          <button type="button" class="key digit zero" onClick={digit(0)}>
            0
          </button>
          <button type="button" class="key equals" onClick={equals}>
            =
          </button>
          <button type="button" class="key op" onClick={op("+")}>
            +
          </button>
        </div>
      </div>
    </div>
  );
}
