import React, { useContext } from "react";
import { BookContext } from "../../App";
// css
import style from './Book.module.scss';

const Book: React.FC = () => {
  const { book, setBook } = useContext(BookContext);

  return (
    <div className={style.book}>
      <div className={style.bookThumbnail}>
        <img src={`${book?.volumeInfo.imageLinks.thumbnail}`} alt='book thumbnail' />
      </div>
      <div className="bookInfo">
        <h2>リーダブルコード</h2>
        <h3>よりコードを書くためのシンプルで実践的なテクニック</h3>
        <h4>著者</h4>
        スター
        <p>出版社</p>
        <p>内容</p>
        <p>発売年月</p>
        <p>ページ</p>
      </div>
    </div>
  )
}

export default Book