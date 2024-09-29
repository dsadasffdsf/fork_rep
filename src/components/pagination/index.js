import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { useNavigate, useParams } from 'react-router-dom';

function Pagination({ fetchProduct, totalItems }) {
  let { page } = useParams();
  console.log(page - 1, 'page--------------');
  if (!page) {
    page = 1;
  }

  const cn = bem('Pagination');
  const [currentPage, setCurrentPage] = useState(page - 1);
  totalItems = Math.ceil(totalItems / 10);
  const navigate = useNavigate();
  // console.log(navigate, 'navigate------------------');
  console.log(currentPage, 'current page ---------------------');
  const handleClick = index => {
    // fetchProduct(page-1);
    setCurrentPage(index);
    navigate(`/page/${index + 1}`);
  };

  const renderPages = () => {
    const pages = [];

    // Первая страница всегда видна
    pages.push(
      <li
        className={`${cn('element')} ${currentPage === 0 ? 'Pagination-element--current' : ''}`}
        key={0}
        onClick={() => handleClick(0)}
      >
        1
      </li>,
    );

    // Для первой страницы показываем 1, 2, 3, затем "..." и последнюю страницу
    if (currentPage === 0) {
      pages.push(
        <li
          className={`${cn('element')} ${currentPage === 1 ? 'Pagination-element--current' : ''}`}
          key={1}
          onClick={() => handleClick(1)}
        >
          2
        </li>,
      );
      pages.push(
        <li
          className={`${cn('element')} ${currentPage === 2 ? 'Pagination-element--current' : ''}`}
          key={2}
          onClick={() => handleClick(2)}
        >
          3
        </li>,
      );
      if (totalItems > 3) {
        pages.push(
          <li className={cn('out')} key="start-ellipsis">
            ...
          </li>,
        );
        pages.push(
          <li
            className={`${cn('element')} ${currentPage === totalItems - 1 ? 'Pagination-element--current' : ''}`}
            key={totalItems - 1}
            onClick={() => handleClick(totalItems - 1)}
          >
            {totalItems}
          </li>,
        );
      }
    } else if (currentPage === totalItems - 1) {
      // Для последней страницы показываем 3 последних страницы и "..." перед ними
      if (totalItems > 3) {
        pages.push(
          <li className={cn('out')} key="end-ellipsis">
            ...
          </li>,
        );
      }
      pages.push(
        <li
          className={`${cn('element')} ${currentPage === totalItems - 3 ? 'Pagination-element--current' : ''}`}
          key={totalItems - 3}
          onClick={() => handleClick(totalItems - 3)}
        >
          {totalItems - 2}
        </li>,
      );
      pages.push(
        <li
          className={`${cn('element')} ${currentPage === totalItems - 2 ? 'Pagination-element--current' : ''}`}
          key={totalItems - 2}
          onClick={() => handleClick(totalItems - 2)}
        >
          {totalItems - 1}
        </li>,
      );
      pages.push(
        <li
          className={`${cn('element')} ${currentPage === totalItems - 1 ? 'Pagination-element--current' : ''}`}
          key={totalItems - 1}
          onClick={() => handleClick(totalItems - 1)}
        >
          {totalItems}
        </li>,
      );
    } else {
      // Добавляем "..." если текущая страница больше 2
      if (currentPage > 2) {
        pages.push(
          <li className={cn('out')} key="start-ellipsis">
            ...
          </li>,
        );
      }

      // Рендерим три страницы вокруг текущей
      for (
        let i = Math.max(1, currentPage - 1);
        i <= Math.min(currentPage + 1, totalItems - 2);
        i++
      ) {
        pages.push(
          <li
            className={`${cn('element')} ${currentPage === i ? 'Pagination-element--current' : ''}`}
            key={i}
            onClick={() => handleClick(i)}
          >
            {i + 1}
          </li>,
        );
      }

      // Добавляем "..." если текущая страница далеко от последней
      if (currentPage < totalItems - 3) {
        pages.push(
          <li className={cn('out')} key="end-ellipsis">
            ...
          </li>,
        );
      }

      // Последняя страница всегда видна
      pages.push(
        <li
          className={`${cn('element')} ${currentPage === totalItems - 1 ? 'Pagination-element--current' : ''}`}
          key={totalItems - 1}
          onClick={() => handleClick(totalItems - 1)}
        >
          {totalItems}
        </li>,
      );
    }

    return pages;
  };

  return (
    <div className={cn()}>
      <ul className={cn('list')}>{renderPages()}</ul>
    </div>
  );
}

export default Pagination;
