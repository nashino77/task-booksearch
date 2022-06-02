import React from 'react'
import { useParams } from 'react-router-dom';
// css
import style from './NotFound.module.scss';

const NotFound: React.FC = () => {
  const urlPrams = useParams<{isbn: string}>();

  return (
    <div className={style.notFound}>
      <h2 className={style.message}>ISBNコードが「{Number(urlPrams.isbn)}」に一致する書籍は<br />
      <span className={style.bottomMessage}>見つかりませんでした。</span></h2>
    </div>
  )
}

export default NotFound