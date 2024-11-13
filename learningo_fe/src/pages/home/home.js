import React from 'react';
import SelectLanguage from '../../components/selectLanguage/SelectLanguage';
import AuthWrapper from '../../components/authWrapper/AuthWrapper';
import MainLayout from '../../Layout/MainLayout';

function Home() {
  return (
    <>
      <AuthWrapper>
        <MainLayout>
          <SelectLanguage />
        </MainLayout>
      </AuthWrapper>
    </>
  );
}

export default Home;
