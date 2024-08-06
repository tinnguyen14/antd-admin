import { DashboardOutlined, UserOutlined, TeamOutlined, ProfileOutlined } from '@ant-design/icons';

export const sidebarItems = [
  {
    text: 'Dashboard',
    icon: <DashboardOutlined />,
    path: '/dashboard'
  },
  {
    text: 'Users',
    icon: <UserOutlined />,
    subItems: [
      { text: 'User List', icon: <TeamOutlined />, path: '/users/list' },
      { text: 'User Profile', icon: <ProfileOutlined />, path: '/users/profile' }
    ]
  }
];
