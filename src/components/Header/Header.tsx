import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom';
import { BookContext } from '../../App';
// api
import { searchBook } from '../../api/book';
// css
import style from './Header.module.scss';
// image
import mainTitle from '../../assets/image/maintitle.png';
import searchMark from '../../assets/image/searchmark.png';

const Header: React.FC = () => {
  const { setBook } = useContext(BookContext);
  const history = useHistory();
  const [isbn, setIsbn] = useState<string>("");
  // ISBNコードによる書籍情報取得
  const handleSearchBook = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const res = await searchBook(Number(isbn));
      console.log(res);
      setBook(res.data.items[0]);
      history.push(`/${isbn}/book`);
    } catch (err: any) {
      console.log(err);
      history.push(`/${isbn}/notfound`)
    }
    setIsbn("");
  };

  return (
    <div className={style.header}>
      <img 
        src={mainTitle} 
        alt='メインタイトル' 
        className={style.mainTitle} 
      />
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
        <button 
          onClick={handleSearchBook} 
          disabled={ ![10, 13].includes(isbn.length) }
          className={style.searchButton}
        >
          <img src={searchMark} alt='検索フォームボタン' />
        </button>
        { ![0, 10, 13].includes(isbn.length) &&
          <span className={style.errorMessage}>10または13文字の数字を入力してください</span>
        }
      </form>
    </div>
  )
}

export default Header