import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BookContext } from "../../App";
// css
import style from './Book.module.scss';

const Book: React.FC = () => {
  const { book, setBook } = useContext(BookContext);
  const title = book?.volumeInfo.title;
  const subTitle = book?.volumeInfo.subtitle;
  const authors = book?.volumeInfo.authors;
  const ratingsCount = book?.volumeInfo.ratingsCount;
  const averageRating = book?.volumeInfo.averageRating;
  const publisher = book?.volumeInfo.publisher;
  const description = book?.volumeInfo.description;
  const publishedDate = book?.volumeInfo.publishedDate.split('-');
  const pageCount = book?.volumeInfo.pageCount;

  return (
    <div className={style.book}>
      <img 
        src={`${book?.volumeInfo.imageLinks.thumbnail}`} 
        alt='book thumbnail' 
        className={style.bookThumbnail}
      />
      <div className={style.bookInfo}>
        <h2 className={style.title}>{title}</h2>
        <h3 className={style.subTitle}>{subTitle}</h3>
        <ul className={style.authors}>
          {authors?.map((author) => {
            return (
              <Link to={`/`}>
                {author}
              </Link>
            )
          })}
        </ul>
        <div className={style.rate}>
          {ratingsCount} {averageRating}
        </div>
        <p className={style.publisher}>{publisher}</p>
        <p className={style.description}>{description}</p>
        <ul className={style.publishedDate}>
          {publishedDate?.map((date) => {
            return (
                <li key={date}>{Number(date)}</li>
            )
          })}
        </ul>
        <p className={style.pageCount}>{pageCount}</p>
      </div>
    </div>
  )
}

export default Book