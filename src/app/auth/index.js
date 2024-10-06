import React, { useCallback, useEffect, useState } from 'react';
import PageLayout from '../../components/page-layout';
import Navigation from '../../containers/navigation';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import useTranslate from '../../hooks/use-translate';
import AuthForm from '../../components/auth-form';
import useStore from '../../hooks/use-store';

import { useNavigate } from 'react-router-dom';
import useSelector from '../../hooks/use-selector';

function Auth() {
  const store = useStore();
  const navigate = useNavigate();

  const callbacks = {
    fetchAuth: useCallback(
      (login, password) => store.actions.auth.fetchAuth({ login, password }),
      [store],
    ),
    // onProfile: useCallback(() => {
    //   navigate('/profile');
    // }, []),
  };
  const select = useSelector(state => ({
    isAuth: state.auth.isAuth,
    errorAuth: state.auth.errorAuth,
  }));

  useEffect(() => {
    if (select.isAuth) {
      navigate('/profile');
    }
  }, [select.isAuth]);

  const { t } = useTranslate();

  return (
    <PageLayout>
      <Navigation>
        <Head title={t('title')}>
          <LocaleSelect />
        </Head>
      </Navigation>
      <AuthForm fetch={callbacks.fetchAuth} errorAuth={select.errorAuth} />
    </PageLayout>
  );
}

export default Auth;
