import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const MainLayout: React.FC = () => {
  return (
    <div>
      <Header />
      <main style={{ marginTop: '70px', padding: '20px' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;