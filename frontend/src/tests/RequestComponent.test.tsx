import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import RequestComponent from "../components/RequestComponent";

describe("RequestComponent", () => {
  it("renders", () => {
    const props = {
      domain: "https://localhost.com",
      scheme: "https",
      path: "/",
    };

    render(<RequestComponent {...props} />);

    expect(screen.getByText(props.domain)).toBeInTheDocument();
    expect(screen.getByText(props.scheme)).toBeInTheDocument();
    expect(screen.getByText(props.path)).toBeInTheDocument();
  });
});
