import React from 'react';
import './style.css';
import { cn as bem } from '@bem-react/classname';

function DetalPageLayout({ children }) {
  const cn = bem('detal-pageLayout');
  return (
    <>
      <div className={cn()}>{children}</div>
    </>
  );
}

export default DetalPageLayout;
