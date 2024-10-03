import React, { useCallback, useEffect, useState } from 'react';
import PageLayout from '../../components/page-layout';
import Navigation from '../../containers/navigation';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import useTranslate from '../../hooks/use-translate';

import ProfileData from '../../components/profile-data';
import { useNavigate } from 'react-router-dom';
import useSelector from '../../hooks/use-selector';

function Profile() {
  const navigate = useNavigate();

  const select = useSelector(state => ({
    dto: state.auth.dto,
  }));

  useEffect(() => {
    const token = localStorage.getItem('X-Token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const { t } = useTranslate();

  return (
    <PageLayout>
      <Navigation>
        <Head title={t('title')}>
          <LocaleSelect />
        </Head>
      </Navigation>
      <ProfileData dto={select.dto} />
    </PageLayout>
  );
}

export default Profile;
