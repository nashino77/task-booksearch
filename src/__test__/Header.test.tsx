import { render, screen } from "@testing-library/react";
import Header from "../components/Header/Header";

describe("Test Header Component", () => {
  test("レンダリングされるボタンは１つ", async () => {
    render(<Header />);
    const buttonList = await screen.findAllByRole("button");
    console.log(buttonList);
    expect(buttonList).toHaveLength(1);
  });
})