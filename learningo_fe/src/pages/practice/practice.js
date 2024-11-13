import React from 'react';
import LevelCards from '../../components/level/LevelCards';
import AuthWrapper from '../../components/authWrapper/AuthWrapper';
import MainLayout from '../../Layout/MainLayout';

function Practice() {
  return (
    <>
      <AuthWrapper>
        <MainLayout>
          <LevelCards />
        </MainLayout>
      </AuthWrapper>
    </>
  );
}

export default Practice;
