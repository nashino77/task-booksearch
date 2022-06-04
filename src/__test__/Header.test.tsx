import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Header from "../components/Header/Header";
import { BookContext } from "../App";
import { rest } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(
  rest.get("https://www.googleapis.com/books/v1/volumes?q=isbn:9784873115658", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ totalItems: 1 }));
  })
);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close());

describe("レンダリング", () => {
  it("レンダリングは正常か", async () => {
    render(<Header />);
    expect(screen.getAllByRole("img")[0]).toBeTruthy();
    expect(screen.getAllByRole("img")[1]).toBeTruthy();
    expect(screen.getByPlaceholderText("ISBN10またはISBN13コードを入力してください")).toBeTruthy();
    expect(screen.getByRole("button")).toBeTruthy();
  });
});

describe("入力フォーム", () => {
  it("フォーム入力は正常か", async () => {
    render(<Header />);
    const inputValue: HTMLInputElement = screen.getByPlaceholderText("ISBN10またはISBN13コードを入力してください");
    await userEvent.type(inputValue, "1234567891");
    expect(inputValue.value).toBe("1234567891");
  });
});

describe("検索ボタン", () => {
  describe("10文字 13文字以外の数字以外はonClickは反応しない", () => {
    it("10文字以下", async () => {
      render(<Header />);
      const inputValue: HTMLInputElement = screen.getByPlaceholderText("ISBN10またはISBN13コードを入力してください");
      await userEvent.type(inputValue, "12345");
      expect(screen.getByRole("button")).toHaveAttribute("disabled");
    });
    it("11文字から12文字", async () => {
      render(<Header />);
      const inputValue: HTMLInputElement = screen.getByPlaceholderText("ISBN10またはISBN13コードを入力してください");
      await userEvent.type(inputValue, "12345678911");
      expect(screen.getByRole("button")).toHaveAttribute("disabled");
    });
    it("ひらがな", async () => {
      render(<Header />);
      const inputValue: HTMLInputElement = screen.getByPlaceholderText("ISBN10またはISBN13コードを入力してください");
      await userEvent.type(inputValue, "ああああああああああ");
      expect(screen.getByRole("button")).toHaveAttribute("disabled");
    });
    it("カタカナ", async () => {
      render(<Header />);
      const inputValue: HTMLInputElement = screen.getByPlaceholderText("ISBN10またはISBN13コードを入力してください");
      await userEvent.type(inputValue, "アアアアアアアアアア");
      expect(screen.getByRole("button")).toHaveAttribute("disabled");
    });
    it("漢字", async () => {
      render(<Header />);
      const inputValue: HTMLInputElement = screen.getByPlaceholderText("ISBN10またはISBN13コードを入力してください");
      await userEvent.type(inputValue, "亜亜亜亜亜亜亜亜亜亜");
      expect(screen.getByRole("button")).toHaveAttribute("disabled");
    });
    it("記号", async () => {
      render(<Header />);
      const inputValue: HTMLInputElement = screen.getByPlaceholderText("ISBN10またはISBN13コードを入力してください");
      await userEvent.type(inputValue, ",,,,,,,,,,");
      expect(screen.getByRole("button")).toHaveAttribute("disabled");
    });
  });
});