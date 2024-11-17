import { useState } from 'react'
import { Layout, Menu, Button, Dropdown, Space } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined, MenuOutlined, DownOutlined } from '@ant-design/icons'
import logo from '../assets/images/logo.png'

const { Header } = Layout

const Navbar = ({ onToggleSidebar, isMobile }) => {
  const [collapsed, setCollapsed] = useState(false)

  const toggleSidebar = () => {
    setCollapsed(!collapsed)
    onToggleSidebar(!collapsed)
  }

  const menuItems = (
    <Menu
      items={[
        {
          key: '1',
          label: 'Profile',
          icon: <UserOutlined />
        }
      ]}
    />
  )

  return (
    <Header className='fixed w-full z-10 flex justify-between items-center px-5 bg-white shadow-md'>
      <div className='flex items-center'>
        <Button
          icon={
            isMobile ? (
              <MenuOutlined style={{ fontSize: '20px', color: '#1677ff' }} />
            ) : collapsed ? (
              <MenuUnfoldOutlined style={{ fontSize: '20px', color: '#1677ff' }} />
            ) : (
              <MenuFoldOutlined style={{ fontSize: '20px', color: '#1677ff' }} />
            )
          }
          onClick={toggleSidebar}
          className='text-lg text-black mr-4'
          type='text'
        />
        <img src={logo} alt='Logo' className='w-10 h-10' />
        <span className='bg-gradient-to-r from-primaryGradientStart to-primaryGradientEnd bg-clip-text text-transparent ml-2 text-lg font-semibold hidden md:block'>
          Hệ thống giám sát
        </span>
      </div>
      <div>
        <Dropdown overlay={menuItems} trigger={['hover']}>
          <Space className='cursor-pointer'>
            <UserOutlined className='text-primary text-xl' />
            <span className='text-black'>user@example.com</span>
            <DownOutlined style={{ fontSize: '10px' }} />
          </Space>
        </Dropdown>
      </div>
    </Header>
  )
}

export default Navbar
