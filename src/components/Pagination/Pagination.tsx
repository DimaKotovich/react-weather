import React, { FC } from 'react';
import './pagination.scss'
import classNames from 'classnames';

interface Props {
  cityPerPage: number
  totalCity: number
  paginate: (pageNumber: number) => void
}

export const Pagination: FC<Props> = ({cityPerPage, totalCity, paginate}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCity / cityPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <ul className='list'>
        {
          pageNumbers.map(number => (
            <li key={number}
             className= 'list__item'>
              <div className='list__item--link'
               onClick={() => paginate(number)}>
                {number}
              </div>
            </li>
          ))
        }
      </ul>
    </div>
  );

}