import React, {useState,
               useEffect,
              } from 'react'
import { 
  useLocation, 
  useNavigate, 
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {WrapperContainerLeft, WrapperContainerRight, WrapperTextLight} from './style'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import {Image} from 'antd'
import imageLogo from '../../assets/images/logo.png'
import {EyeFilled, EyeInvisibleFilled} from '@ant-design/icons'
import * as UserService from '../../services/UserService'
import {useMutationHooks} from '../../hooks/useMutationHook'
import Loading from '../../components/LoadingComponent/Loading'
import * as message from '../../components/Message/Message'
import {jwtDecode} from "jwt-decode";
import { updateUser } from '../../redux/slides/userSlide'

const SignInPage = () => {

  const [isShowPassword, setIsShowPassword] = useState(false)
  const location = useLocation()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const user  = useSelector((state) => state.user)

  const navigate = useNavigate()

  const mutation = useMutationHooks(
    data => UserService.loginUser(data)
  )

  const { data, isPending, isSuccess } = mutation

  useEffect(() => {
    if (isSuccess) {
      if(location?.state) {
        navigate(location?.state)
      }else {
        navigate('/')
      }
      localStorage.setItem('access_token', JSON.stringify(data?.access_token))
      localStorage.setItem('refresh_token', JSON.stringify(data?.refresh_token))
      if (data?.access_token) {
        const decoded = jwtDecode(data?.access_token)
        if (decoded?.id) {
          handleGetDetailsUser(decoded?.id, data?.access_token)
        }
      }
    }
  }, [isSuccess])

  const handleGetDetailsUser = async (id, token) => {
    const storage = localStorage.getItem('refresh_token')
    const refreshToken = JSON.parse(storage)
    const res = await UserService.getDetailsUser(id, token)
    dispatch(updateUser({ ...res?.data, access_token: token,refreshToken }))
  }

  const handleNavigateSignUp = () => {
    navigate('/sign-up')
  }

  const handleOnchangeEmail = (value) => {
    setEmail(value)
  }

  const handleOnchangePassword = (value) => {
    setPassword(value)
  }

  const handleSignIn = (value) => {
    mutation.mutate ({
      email: email,
      password: password
    })
  }

  return (
    <div style={{ display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  background: 'rgb(0, 0, 0, 0.53)',
                  height: '100vh',
                }}
    >
      <div style={{ width: '800px', 
                    height: '445px', 
                    borderRadius: '6px', 
                    background: '#fff', 
                    display: "flex",
                    overflow: "hidden", 
                  }}
      >
        <WrapperContainerLeft>
          <h1 style={{ fontSize: '40px'}}>Xin chào</h1>
          <p style={{ fontSize: '16px'}}>Đăng nhập hoặc tạo tài khoản</p>
          <InputForm style={{ marginBottom: "10px", }} 
            placeholder="abc@gmail.com" value={email} 
            onChange={handleOnchangeEmail} 
          />
          
          <div style={{ position: 'relative' }}>
            <span
              onClick={() => setIsShowPassword(!isShowPassword)}
              style={{
                zIndex: 10,
                position: 'absolute',
                top: '8px',
                right: '16px',
                fontSize: "16px"
              }}
            >{
                isShowPassword ? (
                  <EyeFilled style={{cursor: "pointer"}} />
                ) : (
                  <EyeInvisibleFilled style={{cursor: "pointer"}} />
                )
              }
            </span>
            <InputForm
              placeholder="Mật khẩu"
              type={isShowPassword ? "text" : "password"}
              value={password}
              onChange={handleOnchangePassword}
            />
          </div>
          {data?.status === 'ERR' && <span style={{ color: "red" }}>{data?.message}</span>}
          <Loading isLoading={isPending}>
            <ButtonComponent
              disabled={!email.length || !password.length }
              onClick={handleSignIn}
              size={40}
              styleButton={{ 
                background: 'rgb(255, 57, 69)',
                height: '48px',
                width: '100%',
                border: 'none',
                borderRadius: '4px',
                margin: '26px 0 10px',
                padding: '10px 0'
              }}
              textButton={"Đăng nhập"}
              styleTextButton={{ color: "#fff", fontSize: '15px', fontWeight: '700' }}
            />
          </Loading>
          <p><WrapperTextLight>Quên mật khẩu?</WrapperTextLight></p>
          <p style={{ fontSize: '16px'}} >Chưa có tài khoản? 
            <WrapperTextLight 
            onClick={handleNavigateSignUp}
            > Tạo tài khoản
            </WrapperTextLight>
          </p>
        </WrapperContainerLeft>
        <WrapperContainerRight>
          <Image src={imageLogo} 
                preview={false} 
                alt="iamge-logo" 
                height="203px" 
                width="203px" 
          />
          <h2>Mua sắm tại SwiftSnack</h2>
        </WrapperContainerRight>
      </div>
    </div>
  )
}

export default SignInPage