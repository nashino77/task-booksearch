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
  // isbn数値のバリデーション用変数
  const validate = ![0, 10, 13].includes(isbn.length) || (/[^0-9０-９]+/).test(isbn);
  const errorMessage = validate ? "10または13文字の数字を入力してください" : "" ;
  // 全角半角変換
  const toHalfWidth = (str: string) => {
    const halfStr = str.replace(/[０-９]/g, (s) => {
      return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
    });
    return halfStr;
  };
  // ISBNコードによる書籍情報取得
  const handleSearchBook = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validate || [0].includes(isbn.length)) return;
    const params = (/[０-９]+/).test(isbn) ? toHalfWidth(isbn) : isbn ;
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
          disabled={validate}
          className={style.searchButton}
        >
          <img src={searchMark} alt='検索フォームボタン' />
        </button>
        <span className={style.errorMessage}>{errorMessage}</span>
      </form>
    </div>
  )
}

export default Header