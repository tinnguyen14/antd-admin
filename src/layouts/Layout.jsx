import { Layout, Drawer } from 'antd'
import Navbar from './Navbar'
import Sidebar from './Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'

const { Content } = Layout

const AppLayout = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [drawerVisible, setDrawerVisible] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleToggleSidebar = () => {
    if (isMobile) {
      setDrawerVisible(true) 
    } else {
      setCollapsed(!collapsed)
    }
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Navbar onToggleSidebar={handleToggleSidebar} isMobile={isMobile} />
        <Layout>
         {isMobile ? (
           <Drawer
           placement='left'
           closable={true}
           onClose={() => setDrawerVisible(false)}
           open={drawerVisible}
           style={{ padding: 0, height: '100vh' }}
           bodyStyle={{height: '100vh'}}
           width={200}
           title={null}
         >
           <Sidebar collapsed={false} isMobile={true} onToggle={handleToggleSidebar}/>
         </Drawer>
         ) : (
          <Sidebar collapsed={collapsed}  onToggle={handleToggleSidebar}/>
         )}
          <Layout style={{ marginLeft: isMobile ? 0 : collapsed ? 80 : 200, transition: 'all 0.2s', padding: '0 24px 24px' }}>
            <Content
              style={{
                padding: 24,
                marginTop: 80,
                overflow: 'initial',
                backgroundColor: '#fff'
              }}
            >
              <Outlet />
            </Content>
          </Layout>
        </Layout>
    </Layout>
  )
}

export default AppLayout
