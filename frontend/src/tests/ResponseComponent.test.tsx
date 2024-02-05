import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import ResponseComponent from "../components/ResponseComponent";

describe("ResponseComponent", () => {
  let props: any;
  beforeEach(() => {
    props = {
      http_version: "HTTP/1.1 200 OK",
      location: "https://localhost.com",
      date: "Sun, 02 Feb 2022",
      server: "Server",
    };
  });
  it("renders with location", () => {
    render(<ResponseComponent {...props} />);

    const httpVersionElement = screen.getByText(`${props.http_version}`);
    const locationElement = screen.getByText(`Location: ${props.location}`);
    const serverElement = screen.getByText(`Server: ${props.server}`);
    const dateElement = screen.queryByText(`Date: ${props.date}`);

    expect(httpVersionElement).toBeInTheDocument();
    expect(locationElement).toBeInTheDocument();
    expect(serverElement).toBeInTheDocument();
    expect(dateElement).not.toBeInTheDocument();
  });

  it("renders without location", () => {
    props.location = "";
    render(<ResponseComponent {...props} />);

    const locationElement = screen.queryByText(`Location: ${props.location}`);

    const dateElement = screen.getByText(`Date: ${props.date}`);

    expect(locationElement).not.toBeInTheDocument();

    expect(dateElement).toBeInTheDocument();
  });
});
