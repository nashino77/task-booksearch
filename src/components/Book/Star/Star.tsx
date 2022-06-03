import React from 'react'
// css
import style from './Star.module.scss';

const Star: React.FC<{ averageRating: number | undefined }> = (props) => {
  const { averageRating } = props;

  return (
    <>
      <span className={style.starRate} data-rate={averageRating}></span>
    </>
  )
}

export default Star
