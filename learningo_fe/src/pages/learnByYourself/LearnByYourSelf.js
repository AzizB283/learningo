import React from 'react';
import AuthWrapper from '../../components/authWrapper/AuthWrapper';
import MainLayout from '../../Layout/MainLayout';
import Translate from '../../components/translate/Translate';

function LearnByYourSelf() {
  return (
    <>
      <AuthWrapper>
        <MainLayout>
          <Translate />
        </MainLayout>
      </AuthWrapper>
    </>
  );
}

export default LearnByYourSelf;
