import React from 'react';
// image
import starMark from '../../../assets/image/star.png'
import noStarMark from '../../../assets/image/star-nocolor.png'
import halfStarMark from '../../../assets/image/star-half.png'
// css
import style from './Star.module.scss';

const Star: React.FC<{ averageRating: number | undefined }> = (props) => {
  const { averageRating } = props;
  // 星の表示判別用変数
  const Rating = averageRating === undefined ? 0 : averageRating;
  const starCount = averageRating === undefined ? 0 : Math.floor(Rating);
  const halfCount = Number.isInteger(averageRating);
  const noStarCount = Math.floor(5 - Rating);


  return (
    <>
      <ul className={style.starRate}>
        {[...Array(starCount)].map((n, i) => (
          <li key={i} className={style.star}>
            <img src={starMark} alt='評価表示'  className={style.star}/>
          </li>
        ))}
        {!halfCount && 
          <li className={style.star}>
            <img src={halfStarMark} alt='評価表示'  className={style.star}/>
          </li>
        }
        {[...Array(noStarCount)].map((n, i) => (
          <li key={i} className={style.star}>
            <img src={noStarMark} alt='評価表示'  className={style.star}/>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Star
