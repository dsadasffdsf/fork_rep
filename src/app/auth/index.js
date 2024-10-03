import React, { useCallback, useEffect, useState } from 'react';
import PageLayout from '../../components/page-layout';
import Navigation from '../../containers/navigation';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import useTranslate from '../../hooks/use-translate';
import AuthForm from '../../components/auth-form';
import useStore from '../../hooks/use-store';

import { useNavigate } from 'react-router-dom';

function Auth() {
  const store = useStore();
  const navigate = useNavigate();

  const callbacks = {
    fetchAuth: useCallback(
      (login, password) => store.actions.auth.fetchAuth({ login, password }),
      [store],
    ),
    onProfile: useCallback(() => {
      navigate('/profile');
    }, []),
  };

  useEffect(() => {
    const token = localStorage.getItem('X-Token');
    if (token) {
      navigate('/profile');
    }
  }, [navigate, store, callbacks]);

  const { t } = useTranslate();

  return (
    <PageLayout>
      <Navigation>
        <Head title={t('title')}>
          <LocaleSelect />
        </Head>
      </Navigation>
      <AuthForm fetch={callbacks.fetchAuth} />
    </PageLayout>
  );
}

export default Auth;
