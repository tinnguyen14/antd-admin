import { useState, useEffect } from 'react'
import { Layout, Menu } from 'antd'
import { Link, useLocation } from 'react-router-dom'
import { sidebarItems } from './sidebarItems'

const { Sider } = Layout
const getDefaultSelectedKeys = () => {
  if (location.pathname === '/') {
    return ['/dashboard']
  }
  return [location.pathname]
}

const Sidebar = ({ collapsed }) => {
  const location = useLocation()
  const [openKeys, setOpenKeys] = useState([])
  const [selectedKeys, setSelectedKeys] = useState()

  const getInitialOpenKeys = () => {
    return sidebarItems.reduce((keys, item) => {
      if (item.subItems && item.subItems.some((subItem) => location.pathname.includes(subItem.path))) {
        keys.push(item.path)
      }
      return keys
    }, [])
  }

  useEffect(() => {
    if (collapsed) {
      setOpenKeys([])
    } else {
      if (openKeys.length === 0) {
        setOpenKeys(getInitialOpenKeys())
      }
    }
    setSelectedKeys(getDefaultSelectedKeys())
  }, [collapsed, location])

  const onOpenChange = (keys) => {
    setOpenKeys(keys)
  }

  const menuItems = sidebarItems.map((item) => {
    if (item.subItems) {
      return {
        key: item.path,
        icon: item.icon,
        label: item.text,
        children: item.subItems.map((subItem) => ({
          key: subItem.path,
          icon: subItem.icon,
          label: <Link to={subItem.path}>{subItem.text}</Link>
        }))
      }
    }
    return {
      key: item.path,
      icon: item.icon,
      label: <Link to={item.path}>{item.text}</Link>
    }
  })

  return (
    <Sider
      width={200}
      collapsedWidth={80}
      collapsed={collapsed}
      style={{ position: 'fixed', height: '100vh', left: 0, top: 64, overflowY: 'auto', transition: 'all 0.2s' }}
    >
      <Menu
        mode='inline'
        defaultSelectedKeys={[location.pathname]}
        openKeys={!collapsed ? openKeys : []}
        selectedKeys={selectedKeys}
        onOpenChange={onOpenChange}
        style={{ height: '100%', borderRight: 0 }}
        items={menuItems}
      />
    </Sider>
  )
}

export default Sidebar
