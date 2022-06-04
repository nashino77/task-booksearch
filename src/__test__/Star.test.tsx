import { render, screen } from "@testing-library/react";
import Star from "../components/Book/Star/Star";

describe("レンダリング", () => {
  it("星は５個表示されているか", () => {
    const starCount = 5;
    render (<Star averageRating={starCount} />);
    expect(screen.getAllByRole("img")[0]).toBeTruthy();
    expect(screen.getAllByRole("img")[1]).toBeTruthy();
    expect(screen.getAllByRole("img")[2]).toBeTruthy();
    expect(screen.getAllByRole("img")[3]).toBeTruthy();
    expect(screen.getAllByRole("img")[4]).toBeTruthy();
  });
  it("星の判別は正常か 色付き3 半分1 色なし1", () => {
    const starCount = 3.5;
    render(<Star averageRating={starCount} />);
    expect(screen.getAllByAltText("評価用色つき星")[0]).toBeTruthy();
    expect(screen.getAllByAltText("評価用色つき星")[1]).toBeTruthy();
    expect(screen.getAllByAltText("評価用色つき星")[2]).toBeTruthy();
    expect(screen.getAllByAltText("評価用色半分星")[0]).toBeTruthy();
    expect(screen.getAllByAltText("評価用色なし星")[0]).toBeTruthy();
  });
});