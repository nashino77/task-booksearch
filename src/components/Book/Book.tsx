import React, { useEffect, useContext } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { BookContext } from "../../App";
// api
import { searchBook } from "../../api/book";
// css
import style from './Book.module.scss';
// components
import Star from "./Star/Star";

const Book: React.FC = () => {
  const { book, setBook } = useContext(BookContext);
  const urlParams = useParams<{ isbn: string }>();
  const bookInfo = {
    title: book?.volumeInfo.title,
    subTitle: book?.volumeInfo.subtitle,
    image: book?.volumeInfo.imageLinks === undefined ? "" : book?.volumeInfo.imageLinks.thumbnail ,
    authors: book?.volumeInfo.authors,
    averageRating: book?.volumeInfo.averageRating === undefined ? 0 : book?.volumeInfo.averageRating,
    publisher: book?.volumeInfo.publisher,
    description: book?.volumeInfo.description,
    publishedDate: book?.volumeInfo.publishedDate.split('-'),
    pageCount: book?.volumeInfo.pageCount,
  };
  const validate = ![0, 10, 13].includes(urlParams.isbn.length) || (/[^0-9０-９]+/).test(urlParams.isbn);
  // ブラウザ更新時の書籍情報維持
  const maintainSearchBook = async () => {
    if (validate || [0].includes(urlParams.isbn.length)) return;
    try {
      const res = await searchBook(Number(urlParams.isbn));
      console.log(res);
      setBook(res.data.items[0]);
    } catch (err: unknown) {
      console.log(err);
    }
  };
  useEffect(() => {
    maintainSearchBook();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setBook])

  if (!book) return (<></>);
  return (
    <div className={style.book}>
      { book?.volumeInfo.imageLinks === undefined ? (
        <div className={`${style.bookThumbnail} ${style.noThumbnail}`}>画像がありません</div>
      ): (
        <img 
          src={bookInfo.image} 
          alt='book thumbnail' 
          className={style.bookThumbnail}
        />
      )}
      <div className={style.bookInfo}>
        <h2 className={style.title}>{bookInfo.title}</h2>
        <h3 className={style.subTitle}>{bookInfo.subTitle}</h3>
        <div className={style.authors}>
          {bookInfo.authors?.map((author) => {
            return (
              <Link key={author} to={`/`}>
                {author}
              </Link>
            )
          })}
        </div>
        <div className={style.rate}>
          <Star averageRating={bookInfo.averageRating} />
        </div>
        <p className={style.publisher}>{bookInfo.publisher}</p>
        <hr />
        <p className={style.description}>
          {bookInfo.description}
        </p>
        <ul className={style.publishedDate}>
          {bookInfo.publishedDate?.map((date) => {
            return (
                <li key={date}>{Number(date)}</li>
            )
          })}
        </ul>
        <p className={style.pageCount}>{bookInfo.pageCount}ページ</p>
      </div>
    </div>
  )
}

export default Book