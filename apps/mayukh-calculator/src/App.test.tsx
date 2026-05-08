/** @vitest-environment jsdom */

import { fireEvent, render } from "@solidjs/testing-library";
import { describe, expect, it } from "vitest";
import App from "./App";

function buttonWithLabel(container: HTMLElement, label: string): HTMLElement {
  const btn = [...container.querySelectorAll("button")].find(
    (b) => b.textContent === label,
  );
  expect(btn).toBeTruthy();
  return btn as HTMLElement;
}

describe("App", () => {
  it("computes 1 + 2 = as 3", () => {
    const { container } = render(() => <App />);
    const display = () => container.querySelector(".display");

    fireEvent.click(buttonWithLabel(container, "1"));
    fireEvent.click(buttonWithLabel(container, "+"));
    fireEvent.click(buttonWithLabel(container, "2"));
    fireEvent.click(buttonWithLabel(container, "="));

    expect(display()?.textContent).toBe("3");
  });

  it("chains 2 + 3 × 4 to 20", () => {
    const { container } = render(() => <App />);
    const display = () => container.querySelector(".display");

    fireEvent.click(buttonWithLabel(container, "2"));
    fireEvent.click(buttonWithLabel(container, "+"));
    fireEvent.click(buttonWithLabel(container, "3"));
    fireEvent.click(buttonWithLabel(container, "×"));
    fireEvent.click(buttonWithLabel(container, "4"));
    fireEvent.click(buttonWithLabel(container, "="));

    expect(display()?.textContent).toBe("20");
  });
});
