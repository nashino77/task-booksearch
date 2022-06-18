import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom';
import { BookContext } from '../../App';
// api
import { searchBook } from '../../api/book';
// function
import { toHalfWidth, validateCheck } from '../../function/validate';
// css
import style from './Header.module.scss';
// image
import mainTitle from '../../assets/image/maintitle.png';
import searchMark from '../../assets/image/searchmark.png';

const Header: React.FC = () => {
  const { setBook } = useContext(BookContext);
  const history = useHistory();
  const [isbn, setIsbn] = useState<string>("");
  const errorMessage: string = validateCheck(isbn) ? "10または13文字の数字を入力してください" : "" ;
  // ISBNコードによる書籍情報取得
  const handleSearchBook = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validateCheck(isbn)) return;
    if ([0].includes(isbn.length)) history.push('/');
    const params: string = (/[０-９]+/).test(isbn) ? toHalfWidth(isbn) : isbn ;
    try {
      const res = await searchBook(Number(params));
      setBook(res.data.items[0]);
      history.push(`/${params}/book`);
    } catch (err: unknown) {
      console.log(err);
      history.push(`/${params}/notfound`)
    }
    setIsbn("");
  };

  return (
    <div className={style.header}>
      <img src={mainTitle} alt='メインタイトル' className={style.mainTitle} />
      <form className={style.searchForm}>
        <input
          type="text"
          required
          placeholder='ISBN10またはISBN13コードを入力してください'
          name='isbn'
          minLength={10}
          maxLength={13}
          value={isbn}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIsbn(e.target.value)}
          className={style.searchInput}
        />
        <button onClick={handleSearchBook} disabled={validateCheck(isbn)} className={style.searchButton} >
          <img src={searchMark} alt='検索フォームボタン' />
        </button>
        <span className={style.errorMessage}>{errorMessage}</span>
      </form>
    </div>
  )
}

export default Header