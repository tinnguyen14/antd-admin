import { useState, useEffect } from 'react'
import { Layout, Menu } from 'antd'
import { Link, useLocation } from 'react-router-dom'
import { sidebarItems } from './sidebarItems'

const { Sider } = Layout

const Sidebar = ({ collapsed }) => {
  const location = useLocation()
  const [openKeys, setOpenKeys] = useState([])

  const getParentKey = (path) => {
    return `parent-${path}`
  }

  const getParentKeys = (pathname) => {
    let keys = []
    sidebarItems.forEach((item) => {
      if (item.subItems && item.subItems.some((subItem) => subItem.path === pathname)) {
        keys.push(getParentKey(item.path)) 
      }
    })
    return keys
  }

  useEffect(() => {
    if (!collapsed) {
      const parentKeys = getParentKeys(location.pathname)
      setOpenKeys(parentKeys)
    }
  }, [location.pathname, collapsed])

  useEffect(() => {
    if (collapsed) {
      setOpenKeys([])
    }
  }, [collapsed])

  const onOpenChange = (keys) => {
    setOpenKeys(keys)
  }

  const menuItems = sidebarItems.map((item) => {
    if (item.subItems) {
      return {
        key: getParentKey(item.path), 
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
        openKeys={openKeys}
        selectedKeys={[location.pathname]}
        onOpenChange={onOpenChange}
        style={{ height: '100%', borderRight: 0 }}
        items={menuItems}
      />
    </Sider>
  )
}

export default Sidebar
