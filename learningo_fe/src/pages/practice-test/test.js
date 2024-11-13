import React from 'react';
import Test from '../../components/testComp/Test';
import AuthWrapper from '../../components/authWrapper/AuthWrapper';
import MainLayout from '../../Layout/MainLayout';

function PracticeTest() {
  return (
    <>
      <AuthWrapper>
        <MainLayout>
          <Test />
        </MainLayout>
      </AuthWrapper>
    </>
  );
}

export default PracticeTest;
