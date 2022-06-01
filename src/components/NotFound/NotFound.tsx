import React from 'react'
// css
import style from './NotFound.module.scss';

const NotFound: React.FC = () => {
  return (
    <div className={style.notFound}>
      <h2>ISBNコードが「XXXXXXXXXXXX」に一致する書籍は<br />見つかりませんでした。</h2>
    </div>
  )
}

export default NotFound