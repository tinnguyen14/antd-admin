import { Button } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      navigate('/dashboard')
    }, 2000)
  }

  return (
    <div className='h-screen flex flex-col lg:flex-row'>
      {/* Left Section */}
      <div className='flex flex-1 bg-gradient-to-r from-primaryGradientStart to-primaryGradientEnd justify-center items-center p-5 lg:p-10'>
        <div className='flex flex-col items-center lg:items-start text-center lg:text-left'>
          <h1 className='text-white font-bold text-4xl font-sans'>Nhận diện khuôn mặt</h1>
          <p className='text-white mt-4'>
            Giải pháp công nghệ nhận diện khuôn mặt tiên tiến, an toàn và bảo mật
          </p>
          <button
            type='submit'
            className='block bg-white text-primary mt-6 py-2 px-4 rounded-2xl font-bold'
          >
            Cùng trải nghiệm
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div className='flex flex-1 justify-center items-center bg-white p-5 lg:p-10'>
        <form className='w-full max-w-md'>
          <h1 className='text-gray-800 font-bold text-2xl mb-1'>Xin chào!</h1>
          <p className='text-sm font-normal text-gray-600 mb-7'>Đăng nhập để tiếp tục</p>

          {/* Email Input */}
          <div className='flex items-center border-2 py-2 px-3 rounded-2xl mb-4'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5 text-gray-400'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207'
              />
            </svg>
            <input
              className='pl-2 outline-none border-none w-full'
              type='text'
              placeholder='Email'
            />
          </div>

          {/* Password Input */}
          <div className='flex items-center border-2 py-2 px-3 rounded-2xl mb-6'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5 text-gray-400'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2-2 0 012-2zm8-2v2H7V7a3 3 0 016 0z'
                clipRule='evenodd'
              />
            </svg>
            <input
              className='pl-2 outline-none border-none w-full'
              type='password'
              placeholder='Mật khẩu'
            />
          </div>

          {/* Login Button */}
          <Button
            type='primary'
            loading={loading}
            onClick={handleLogin}
            className='w-full text-white font-semibold rounded-2xl bg-gradient-to-r from-[#4482d9] to-[#1ca9c9] border-none'
          >
            Đăng nhập
          </Button>

          <span className='block text-sm mt-4 text-center text-blue-500 hover:underline cursor-pointer'>
            Quên mật khẩu?
          </span>
        </form>
      </div>
    </div>
  )
}
