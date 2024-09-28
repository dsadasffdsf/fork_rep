import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Pagination({ fetchProduct, totalItems }) {
  const cn = bem('Pagination');
  const [currentPage, setCurrentPage] = useState(0);
  totalItems = Math.ceil(totalItems / 10);
  return (
    <div className={cn()}>
      <ul className={cn('list')}>
        {Array.from({ length: totalItems }).map((_, index) => {
          const isCurrentPage = index === currentPage;
          const isNearCurrentPage = Math.abs(index - currentPage) <= 1;
          const isFirstPage = index === 0;
          const isLastPage = index === totalItems - 1;

          // Для первого и последнего элемента
          if (isFirstPage || isLastPage) {
            return (
              <li
                className={`${cn('element')} ${isCurrentPage ? 'Pagination-element--current' : ''}`}
                key={index}
                onClick={() => {
                  fetchProduct(index);
                  setCurrentPage(index);
                }}>
                {index + 1}
              </li>
            );
          }

          // Для страниц рядом с текущей
          if (isCurrentPage || isNearCurrentPage) {
            return (
              <li
                className={`${cn('element')} ${isCurrentPage ? 'Pagination-element--current' : ''}`}
                key={index}
                onClick={() => {
                  fetchProduct(index);
                  setCurrentPage(index);
                }}>
                {index + 1}
              </li>
            );
          }

          if (index === currentPage - 2 || index === currentPage + 2) {
            return (
              <li className={cn('out')} key={index}>
                ...
              </li>
            );
          }

          return null;
        })}
        {/* <li className={cn('out')}>...</li>
        <li className={cn('element')}>{totalItems}</li> */}
      </ul>
    </div>
  );
}

Pagination.propTypes = {
  totalPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default Pagination;
