import React, { useState as useStateMock } from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Book from "../components/Book/Book";
import { BookContext } from "../App";
import Data from '../interface/data.json';
import { BOOK } from '../interface/interface';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ isbn: ':isbn' }),
  useRouteMatch: () => ({ url: '/:isbn/book' }),
}));
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));
describe("レンダリング", () => {
  const setState = jest.fn();
  beforeEach(() => { (useStateMock as jest.Mock).mockImplementation(init => [init, setState]); });
  it("正常に表示", () => {
    const [book, setBook] = useStateMock<BOOK | undefined>(Data);
    render( <BookContext.Provider value={{ book, setBook }} ><Book /></BookContext.Provider>, {wrapper: MemoryRouter});
    expect(screen.getByAltText("book thumbnail")).toBeTruthy();
    expect(screen.getAllByRole("heading")[0]).toHaveTextContent("リーダブルコード");
    expect(screen.getAllByRole("heading")[1]).toHaveTextContent("より良いコードを書くためのシンプルで実践的なテクニック");
    expect(screen.getAllByRole("link")[0]).toHaveTextContent("Dustin Boswell");
    expect(screen.getAllByRole("link")[1]).toHaveTextContent("Trevor Foucher");
    expect(screen.getAllByAltText("評価用色つき星")[0]).toBeTruthy();
    expect(screen.getByText("O'Reilly Media, Inc.")).toBeTruthy();
    expect(screen.getByText("読んでわかるコードの重要性と方法について解説")).toBeTruthy();
    expect(screen.getByText("2012")).toBeTruthy();
    expect(screen.getByText("6")).toBeTruthy();
    expect(screen.getByText("237ページ")).toBeTruthy();
  });
});