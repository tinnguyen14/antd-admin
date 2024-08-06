import { Layout } from 'antd';
import Navbar from './Navbar';
import Sidebar from './Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';

const { Content } = Layout;

const AppLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Navbar onToggleSidebar={setCollapsed}/>
      <Layout>
        <Sidebar collapsed={collapsed} />
        <Layout style={{ marginLeft: collapsed ? 80 : 200, transition: 'all 0.2s', padding: '0 24px 24px' }}>
          <Content
            style={{
              padding: 24,
              marginTop: 80,
              overflow: 'initial',
              backgroundColor: '#fff',
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
