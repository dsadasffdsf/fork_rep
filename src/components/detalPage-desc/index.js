import React from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { numberFormat } from '../../utils';
import { engDictItem } from './dict';
import { ruDictItem } from '../item/dict';

function DetalPageDesc({ product, addToBasket, language }) {
  const cn = bem('DetalPageDesc');
  return (
    <div className={cn()}>
      <p>{product.description}</p>
      <p>
        Страна производитель : <span className={cn('text-bold')}>{product.country}</span>
      </p>
      <p>
        Категория : <span className={cn('text-bold')}>{product.category}</span>
      </p>
      <p>
        Год выпуска : <span className={cn('text-bold')}>{product.edition}</span>
      </p>
      <p className={`${cn('text-bold')} ${cn('price')}`}>
        Цена : <span>{`${numberFormat(product.price)} ₽`}</span>
      </p>
      <button onClick={() => addToBasket(product._id)}>
        {language === 'ru' ? ruDictItem.itemBtnAdd : engDictItem.itemBtnAdd}
      </button>
    </div>
  );
}

export default DetalPageDesc;
