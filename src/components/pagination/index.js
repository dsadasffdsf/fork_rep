import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Pagination({ totalPage, fetchProduct, totalItems }) {
  console.log(totalItems);

  const cn = bem('Pagination');
  const [currentPage, setCurrentPage] = useState(0);
  const pagesToShow = Array.from({ length: 3 }, (_, index) => currentPage - 1 + index).filter(
    (page) => page > 0 && page <= totalPage,
  );
  return (
    <div className={cn()}>
      <ul className={cn('list')}>
        {pagesToShow.map((page) => (
          <li
            className={`${cn('element')} ${page === currentPage ? 'Pagination-element--current' : ''}`}
            key={page}
            onClick={() => {
              fetchProduct(page);
              setCurrentPage(page);
              console.log(page);
            }}>
            {page}
          </li>
        ))}
        <li className={cn('out')}>...</li>
        <li className={cn('element')}>{totalItems}</li>
      </ul>
    </div>
  );
}

Pagination.propTypes = {
  totalPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default Pagination;
