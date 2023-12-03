import React, {useState, useEffect} from 'react'
import {WrapperContainerLeft, WrapperContainerRight, WrapperTextLight} from './style'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import {Image} from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {EyeFilled, EyeInvisibleFilled} from '@ant-design/icons'
import imageLogo from '../../assets/images/logo.png'
import * as UserService from '../../services/UserService'
import {useMutationHooks} from '../../hooks/useMutationHook'
import Loading from '../../components/LoadingComponent/Loading'
import * as message from '../../components/Message/Message'

const SignUpPage = () => {

  const navigate = useNavigate()

  const [isShowPassword, setIsShowPassword] = useState(false)
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false)
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');

  const mutation = useMutationHooks(
    data => UserService.signupUser(data)
  )
  const { data, isPending, isSuccess, isError } = mutation

  useEffect(() => {
    if (isSuccess) {
      message.success()
      handleNavigateSignIn()
    } else if (isError) {
      message.error()
    }
  }, [isSuccess, isError])

  const handleOnchangeEmail = (value) => {
    setEmail(value)
  }

  const handleOnchangePassword = (value) => {
    setPassword(value)
  }

  const handleOnchangeConfirmPassword = (value) => {
    setConfirmPassword(value)
  }

  const handleNavigateSignIn = () => {
    navigate('/sign-in')
  }

  const handleSignUp = () => {
    mutation.mutate({
      email, 
      password, 
      confirmPassword
    })
    // ('sign-up', email, password, confirmPassword);
  }

  return (
    <div style={{ display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  background: 'rgb(0, 0, 0, 0.53)',
                  height: '100vh',
                  // paddingBottom: "20px",
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
          <InputForm style={{ marginBottom: "10px", }} placeholder="abc@gmail.com" value={email} onChange={handleOnchangeEmail} />
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
              style={{ marginBottom: '10px' }}
            />
          </div>
          <div style={{ position: 'relative' }}>
            <span
              onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
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
              placeholder="Xác nhận lại mật khẩu"
              type={isShowConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={handleOnchangeConfirmPassword}
            />
          </div>
          {data?.status === 'ERR' && <span style={{ color: "red" }}>{data?.message}</span>}
          <Loading isLoading={isPending}>
            <ButtonComponent
              disabled={!email.length || !password.length || !confirmPassword.length }
              onClick={handleSignUp}
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
              textButton={"Đăng ký"}
              styleTextButton={{ color: "#fff", fontSize: '15px', fontWeight: '700' }}
            />
          </Loading>
          <p><WrapperTextLight>Quên mật khẩu?</WrapperTextLight></p>
          <p style={{ fontSize: '16px'}}>Đã có tài khoản? 
            <WrapperTextLight 
            onClick={handleNavigateSignIn}
            > Đăng nhập
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

export default SignUpPage