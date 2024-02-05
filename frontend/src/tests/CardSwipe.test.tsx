import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import CardSwipe from "../components/card-swipe/CardSwipe";

vi.mock("react-gauge-component", () => ({
  default: () => {
    return <div>GaugeComponent</div>;
  },
}));

describe("Card Swipe component", () => {
  it("renders", () => {
    render(<CardSwipe />);
  });

  it("Swipe Up and down", () => {
    render(<CardSwipe />);

    const swipeContainer = screen.getByTestId("drawer-test");

    fireEvent.touchStart(swipeContainer, {
      touches: [{ clientX: 0, clientY: 0 }],
    });
    fireEvent.touchMove(swipeContainer, {
      touches: [{ clientX: 0, clientY: -50 }],
    });
    fireEvent.touchEnd(swipeContainer);
    const styles = getComputedStyle(swipeContainer);
    expect(styles.height).toBe("80vh");

    fireEvent.touchStart(swipeContainer, {
      touches: [{ clientX: 0, clientY: 0 }],
    });
    fireEvent.touchMove(swipeContainer, {
      touches: [{ clientX: 0, clientY: 50 }],
    });
    fireEvent.touchEnd(swipeContainer);
    const styles2 = getComputedStyle(swipeContainer);

    expect(styles2.height).toBe("3vh");
  });
});
