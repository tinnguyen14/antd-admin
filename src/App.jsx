import { BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import AppRoutes from './routes/AppRoutes'
import 'antd/dist/reset.css'
import { ConfigProvider, Empty } from 'antd'

function App() {
  return (
    <Router>
      <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1677ff',

        },
       
      }}
      renderEmpty={() => <Empty description='Không có dữ liệu' />}>
        <AppRoutes />
      </ConfigProvider>
    </Router>
  )
}

export default App
