import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Loader from "../components/loader/Loader";

describe("Loader component", () => {
  it("render loader when loading is true", () => {
    const { container } = render(<Loader loading />);
    const loaderElement = container.querySelector(".back-drop");
    expect(loaderElement).not.toBeNull();
  });

  it("not render loader when loading is false", () => {
    const { container } = render(<Loader loading={false} />);
    const loaderElement = container.querySelector(".back-drop");
    expect(loaderElement).toBeNull();
  });
});
