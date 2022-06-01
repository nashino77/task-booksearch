import React, { useState, useContext } from 'react'
import { BookContext } from '../../App';
// api
import { searchBook } from '../../api/book';
// css
import style from './Header.module.scss';

const Header: React.FC = () => {
  const { book, setBook } = useContext(BookContext);
  const [isbn, setIsbn] = useState<string>("");

  const handleSearchBook = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const res = await searchBook(Number(isbn));
      console.log(res);
      setBook(res.data.items[0]);
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <div className={style.header}>
      <h1 className={style.mainTitle}>BOOK SERACH</h1>
      <form>
        <input 
          type="text"
          placeholder='ISBN10またはISBN13コードを入力してください'
          name='isbn'
          value={isbn}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIsbn(e.target.value)}
        />
        <button onClick={handleSearchBook}>test</button>
      </form>
    </div>
  )
}

export default Header