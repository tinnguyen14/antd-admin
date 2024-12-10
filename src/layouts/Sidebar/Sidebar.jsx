import { Layout } from 'antd'
import { Link, useLocation } from 'react-router-dom'
import { sidebarItems } from './sidebarItems'
import { truncateText } from '../../utils/truncateText'
import { FaCircleChevronLeft, FaCircleChevronRight } from 'react-icons/fa6'

const { Sider } = Layout

const Sidebar = ({ collapsed, isMobile, onToggle }) => {
  const location = useLocation()
  // const [openKeys, setOpenKeys] = useState([])

  // const getParentKey = (path) => `parent-${path}`

  // const getParentKeys = (pathname) => {
  //   let keys = []
  //   sidebarItems.forEach((item) => {
  //     if (item.subItems && item.subItems.some((subItem) => subItem.path === pathname)) {
  //       keys.push(getParentKey(item.path))
  //     }
  //   })
  //   return keys
  // }

  // useEffect(() => {
  //   if (!collapsed) {
  //     const parentKeys = getParentKeys(location.pathname)
  //     setOpenKeys(parentKeys)
  //   }
  // }, [location.pathname, collapsed])

  // useEffect(() => {
  //   if (collapsed) {
  //     setOpenKeys([])
  //   }
  // }, [collapsed])

  // const toggleOpen = (key) => {
  //   if (openKeys.includes(key)) {
  //     setOpenKeys(openKeys.filter((k) => k !== key))
  //   } else {
  //     setOpenKeys([...openKeys, key])
  //   }
  // }

  const isItemSelected = (path) => location.pathname === path

  return (
    <Sider
      width={200}
      collapsedWidth={80}
      collapsed={collapsed}
      style={{
        position: 'fixed',
        height: '100vh',
        left: 0,
        top: isMobile ? 0 : 70,
        overflowY: 'auto',
        transition: 'all 0.2s',
        overflow: 'visible'
      }}
    >
      <div className='h-[92vh] md:h-[92vh] h-[100vh] w-full bg-[#1E4E94] flex flex-col py-4 justify-between'>
        <div>
          {!isMobile && (
            <button
            onClick={onToggle}
            className='absolute top-14 -right-3 bg-[#005FAB] text-[#EFF6FF] rounded-full shadow-md z-[100]'
          >
            {collapsed ? <FaCircleChevronRight size={28} /> : <FaCircleChevronLeft size={28} />}
          </button>
          )}
          <div className='flex justify-center py-4'>
            <img
              src='https://png.pngtree.com/png-vector/20230120/ourmid/pngtree-beauty-logo-design-png-image_6568470.png' // Đường dẫn logo
              alt='Logo'
              className={`h-12 ${collapsed ? 'w-10 h-10' : 'w-auto'}`}
            />
          </div>
          <ul className='flex flex-col space-y-1'>
            {sidebarItems.map((item) => {
              // const parentKey = getParentKey(item.path)
              // const isParentOpen = openKeys.includes(parentKey)

              // if (item.subItems) {
              //   // Menu item có submenu
              //   return (
              //     <li key={parentKey} className="flex flex-col">
              //       {/* Parent Item */}
              //       <div
              //         className={`flex items-center px-4 py-2 text-white cursor-pointer hover:bg-[#163A73] transition-colors ${
              //           collapsed ? 'justify-center' : 'justify-start'
              //         }`}
              //         onClick={() => toggleOpen(parentKey)}
              //       >
              //         <span className="flex items-center">
              //           {item.icon && <span className="mr-2 text-xl">{item.icon}</span>}
              //           {!collapsed && <span>{item.text}</span>}
              //         </span>
              //         {!collapsed && (
              //           <span className="ml-auto transform transition-transform">
              //             {isParentOpen ? '▲' : '▼'}
              //           </span>
              //         )}
              //       </div>

              //       {/* Sub Items */}
              //       {isParentOpen && (
              //         <ul className={`flex flex-col ${collapsed ? 'pl-0' : 'pl-8'} transition-all`}>
              //           {item.subItems.map((subItem) => {
              //             const selected = isItemSelected(subItem.path)
              //             return (
              //               <li key={subItem.path}>
              //                 <Link
              //                   to={subItem.path}
              //                   className={`flex items-center px-4 py-2 rounded-md text-white hover:bg-[#163A73] transition-colors ${
              //                     collapsed ? 'justify-center' : 'justify-start'
              //                   } ${
              //                     selected
              //                       ? 'bg-white text-[#1E4E94]'
              //                       : ''
              //                   }`}
              //                 >
              //                   {subItem.icon && <span className={`mr-2 text-xl ${selected ? 'text-[#1E4E94]' : ''}`}>{subItem.icon}</span>}
              //                   {!collapsed && <span>{subItem.text}</span>}
              //                 </Link>
              //               </li>
              //             )
              //           })}
              //         </ul>
              //       )}
              //     </li>
              //   )
              // }

              // Menu item không có submenu
              const selected = isItemSelected(item.path)
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                      selected
                        ? 'bg-white text-[#1E4E94] hover:text-[#1E4E94]'
                        : 'text-white hover:bg-[#163A73] hover:text-white'
                    } ${collapsed ? 'justify-center' : 'justify-start'}`}
                  >
                    {item.icon && (
                      <span className={`mr-2 text-xl ${selected ? 'text-[#1E4E94]' : ''}`}>{item.icon}</span>
                    )}
                    {!collapsed && <span>{item.text}</span>}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
        <div className='px-4 py-4'>
          <div
            className={`flex items-center space-x-2 rounded-md p-2 border border-white  ${
              collapsed ? 'justify-center' : 'justify-start'
            }`}
          >
            <img
              src='https://png.pngtree.com/png-vector/20230120/ourmid/pngtree-beauty-logo-design-png-image_6568470.png' // Đường dẫn avatar người dùng
              alt='User Avatar'
              className='h-8 w-8 rounded-full'
            />
            {!collapsed && (
              <div className='flex flex-col'>
                <span className='text-[10px] font-medium text-[#FFFF] truncate max-w-[120px]'>
                  {truncateText('Nguyễn Đức Hoàng Tùng', 16)}
                </span>
              </div>
            )}
          </div>
          <div className='mt-4 text-center text-white text-xs'>
            <span>1POS - V1.0.0</span>
          </div>
        </div>
      </div>
    </Sider>
  )
}

export default Sidebar
