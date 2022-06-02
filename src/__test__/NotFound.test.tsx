import { render, screen } from "@testing-library/react";
import NotFound from "../components/NotFound/NotFound";

describe("Test NotFound component", () => {
  test("メッセージが表示されているか", () => {
    render(<NotFound />);
    const linkElement = screen.getByText(/ISBNコードが「」に一致する書籍は見つかりませんでした。/i);
    expect(linkElement).toBeInTheDocument();
  });
});