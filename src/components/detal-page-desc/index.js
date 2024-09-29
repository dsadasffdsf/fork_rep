import React from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { numberFormat } from '../../utils';
import { useLocalization } from '../../store/localization/localizetion-context';

function DetalPageDesc({ product, addToBasket }) {
  const cn = bem('detal-pageDesc');
  const { translation, language } = useLocalization();
  return (
    <div className={cn()}>
      <p>{product.description}</p>
      <p>
        {translation[language].detalPage.productCountry} :{' '}
        <span className={cn('text-bold')}>{product.country}</span>
      </p>
      <p>
        {translation[language].detalPage.productCategory} :{' '}
        <span className={cn('text-bold')}>{product.category}</span>
      </p>
      <p>
        {translation[language].detalPage.productEdition} :{' '}
        <span className={cn('text-bold')}>{product.edition}</span>
      </p>
      <p className={`${cn('text-bold')} ${cn('price')}`}>
        {translation[language].detalPage.productPrice} :{' '}
        <span>{`${numberFormat(product.price)} ₽`}</span>
      </p>
      <button onClick={() => addToBasket(product._id)}>
        {translation[language].detalPage.productBtnAdd}
      </button>
    </div>
  );
}

export default DetalPageDesc;
