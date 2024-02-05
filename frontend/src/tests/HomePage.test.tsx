import { render } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import HomePage from "../pages/Home";


vi.mock("../components/card-swipe/CardSwipe", () => ({
  default: () => {
    return <div>CardSwipe</div>;
  },
}));

vi.mock("react-router-dom", async () => {
  const mod = await vi.importActual("react-router-dom");
  return {
    ...mod,
    useNavigate: () => null,
    useParams: () => ({
      id: "MYCODE",
    }),
  };
});


describe("HomePage component", () => {
  it("renders", () => {
    render(<HomePage />);
  });
});
