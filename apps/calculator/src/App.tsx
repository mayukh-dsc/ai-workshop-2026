import { createSignal } from "solid-js";
import type { Operator } from "./lib/calculator";
import { digit, equals, initialState, operator } from "./lib/calculator";
import "./index.css";

export default function App() {
  const [state, setState] = createSignal(initialState());

  const onDigit = (d: number) => setState((s) => digit(s, d));
  const onOperator = (op: Operator) => setState((s) => operator(s, op));
  const onEquals = () => setState((s) => equals(s));

  return (
    <main class="calc">
      <div class="calc__display">{state().display}</div>
      <div class="calc__keys">
        <div class="calc__row">
          <button type="button" class="calc__btn" onClick={() => onDigit(7)}>
            7
          </button>
          <button type="button" class="calc__btn" onClick={() => onDigit(8)}>
            8
          </button>
          <button type="button" class="calc__btn" onClick={() => onDigit(9)}>
            9
          </button>
          <button type="button" class="calc__btn calc__btn--op" onClick={() => onOperator("/")}>
            ÷
          </button>
        </div>
        <div class="calc__row">
          <button type="button" class="calc__btn" onClick={() => onDigit(4)}>
            4
          </button>
          <button type="button" class="calc__btn" onClick={() => onDigit(5)}>
            5
          </button>
          <button type="button" class="calc__btn" onClick={() => onDigit(6)}>
            6
          </button>
          <button type="button" class="calc__btn calc__btn--op" onClick={() => onOperator("*")}>
            ×
          </button>
        </div>
        <div class="calc__row">
          <button type="button" class="calc__btn" onClick={() => onDigit(1)}>
            1
          </button>
          <button type="button" class="calc__btn" onClick={() => onDigit(2)}>
            2
          </button>
          <button type="button" class="calc__btn" onClick={() => onDigit(3)}>
            3
          </button>
          <button type="button" class="calc__btn calc__btn--op" onClick={() => onOperator("-")}>
            −
          </button>
        </div>
        <div class="calc__row">
          <button type="button" class="calc__btn" onClick={() => onDigit(0)}>
            0
          </button>
          <button type="button" class="calc__btn calc__btn--op" onClick={() => onOperator("+")}>
            +
          </button>
          <button type="button" class="calc__btn calc__btn--eq" onClick={onEquals}>
            =
          </button>
        </div>
      </div>
    </main>
  );
}
