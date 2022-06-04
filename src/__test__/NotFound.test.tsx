import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import NotFound from "../components/NotFound/NotFound";

describe("レンダリング", () => {
  it("レンダリングは正常か", () => {
    render(
      <MemoryRouter>
          <NotFound />
      </MemoryRouter>
    );
    expect(screen.getByRole("heading")).toBeTruthy();
    expect(screen.getByText(/^(?=.*ISBNコードが「)(?=.*」に一致する書籍は).*$/)).toBeInTheDocument();
  });
});