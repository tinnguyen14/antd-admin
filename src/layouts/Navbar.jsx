import { useState } from 'react'
import { Layout, Menu, Button } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined, AntDesignOutlined, MenuOutlined } from '@ant-design/icons'

const { Header } = Layout

const Navbar = ({ onToggleSidebar, isMobile }) => {
  const [collapsed, setCollapsed] = useState(false)

  const toggleSidebar = () => {
    setCollapsed(!collapsed)
    onToggleSidebar(!collapsed)
  }

  return (
    <Header
      style={{
        position: 'fixed',
        width: '100%',
        zIndex: 1,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 20px'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {/* <Button type='link' onClick={toggleSidebar} style={{ marginRight: '10px' }}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button> */}
        <Button
         icon={
          isMobile ? (
            <MenuOutlined style={{ color: 'black' }} /> // Icon MenuOutlined khi ở chế độ mobile
          ) : (
            collapsed ? <MenuUnfoldOutlined style={{ color: 'black' }} /> : <MenuFoldOutlined style={{ color: 'black' }} />
          )
        }
          onClick={toggleSidebar}
          style={{ 
            fontSize: '20px', 
            color: '#fff', 
            marginRight: '10px',
          }}
        />
        <AntDesignOutlined style={{ fontSize: '20px', color: '#fff' }} />
      </div>
      <Menu theme='dark' mode='horizontal' defaultSelectedKeys={['1']} style={{ lineHeight: '64px', border: 'none' }}>
        <Menu.Item key='1' icon={<UserOutlined />}>
          Profile
        </Menu.Item>
      </Menu>
    </Header>
  )
}

export default Navbar
