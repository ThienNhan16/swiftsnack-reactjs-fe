import React,{useState, useEffect} from 'react'
import {Col,Badge,Popover} from 'antd'
import {WrapperHeader, 
    WrapperTextHeader, 
    WrapperHeaderAccount,
    WrapperTextHeaderSmall,
    WrapperContentPopup,
  } from './style';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch'
import {
    UserOutlined,
    CaretDownOutlined,
    ShoppingCartOutlined,
  } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as UserService from '../../services/UserService'
import { resetUser } from '../../redux/slides/userSlide'
import { searchProduct } from '../../redux/slides/productSlide';
import Loading from '../LoadingComponent/Loading';

const HeaderComponent = ({ isHiddenSearch = false, isHiddenCart = false }) => {

  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [userName, setUserName] = useState('')
  const [userAvatar, setUserAvatar] = useState('')
  const [search, setSearch] = useState('')
  const [isOpenPopup, setIsOpenPopup] = useState(false)
  const order = useSelector((state) => state.order)
  const [loading, setLoading] = useState(false)

  // (user)
  const handleNavigateLogin = () => {
    navigate('/sign-in')
  }

  const handleLogout = async () => {
    setLoading(true)
    await UserService.logoutUser()
    dispatch(resetUser())
    setLoading(false)
  }

  useEffect(() => {
    setLoading(true)
    setUserName(user?.name)
    setUserAvatar(user?.avatar)
    setLoading(false)
  }, [user?.name, user?.avatar])

  const content = (
    <div>
      <WrapperContentPopup onClick={() => handleClickNavigate('profile')}>Thông tin người dùng</WrapperContentPopup>
      {user?.isAdmin && (

        <WrapperContentPopup onClick={() => handleClickNavigate('admin')}>Quản lí hệ thống</WrapperContentPopup>
      )}
      <WrapperContentPopup onClick={() => handleClickNavigate(`my-order`)}>Đơn hàng của tôi</WrapperContentPopup>
      <WrapperContentPopup onClick={() => handleClickNavigate()}>Đăng xuất</WrapperContentPopup>
    </div>
  );

  const handleClickNavigate = (type) => {
    if(type === 'profile') {
      navigate('/profile-user')
    }else if(type === 'admin') {
      navigate('/system/admin')
    }else if(type === 'my-order') {
      navigate('/my-order',{ state : {
          id: user?.id,
          token : user?.access_token
        }
      })
    }else {
      handleLogout()
    }
    setIsOpenPopup(false)
  }

  const onSearch = (e) => {
    setSearch(e.target.value)
    dispatch(searchProduct(e.target.value))
  }

  return (
    <div style={{ 
                  width: '100%', 
                  background: 'rgb(26, 148, 255)', 
                  display: "flex", 
                  justifyContent: "center",
                  // background: '#9255FD',
                //   gap: "125px",
                }}>
        <WrapperHeader style={{ justifyContent: isHiddenSearch && isHiddenSearch ? 'space-between' : 'unset' }} >
            <Col span={5}>
                <WrapperTextHeader to='/' >SWIFTSNACK</WrapperTextHeader>
            </Col>
            {!isHiddenSearch && (
              <Col span={13}>
              <ButtonInputSearch 
                  size="large" 
                  placeholder="Bạn tìm gì hôm nay" 
                  textButton="Tìm kiếm" 
                  bordered={false}
                  onChange={onSearch}
                  backgroundColorButton="#5a20c1"
              />
              </Col>
            )}
            <Col span={6} style={{ display: "flex", gap: "54px", alignItems: 'center' }}>
                <Loading isLoading={loading}>
                  <WrapperHeaderAccount>
                    {userAvatar ? (
                      <img src={userAvatar} alt="avatar" style={{
                        height: '30px',
                        width: '30px',
                        borderRadius: '50%',
                        objectFit: 'cover'
                      }} />
                      ) : (
                        <UserOutlined style={{ fontSize: '30px' }} />
                    )}
                    {user?.access_token ? (
                      <>
                      <Popover content={content} trigger="click" open={isOpenPopup}>
                        <div style={{ cursor: 'pointer',maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis' }} onClick={() => setIsOpenPopup((prev) => !prev)}>{userName?.length ? userName : user?.email}</div>
                      </Popover>
                    </>
                    ) : (
                      <div onClick={handleNavigateLogin} style={{ cursor: "pointer" }}>
                          <WrapperTextHeaderSmall style={{ fontSize: "12px" }}>Đăng nhập/Đăng ký</WrapperTextHeaderSmall>
                          <div>
                              <WrapperTextHeaderSmall>Tài khoản</WrapperTextHeaderSmall>
                              <CaretDownOutlined />
                          </div>
                      </div>
                    )}
                  </WrapperHeaderAccount>
                </Loading>
                {!isHiddenCart && (
                  <div onClick={() => {navigate('/order')}} style={{ cursor: "pointer" }}>
                      <Badge count={order?.orderItems?.length} size="small">
                          <ShoppingCartOutlined style={{ fontSize: "30px", color: "#fff" }} />
                      </Badge>
                      <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
                  </div>
                )}
            </Col>
        </WrapperHeader>
    </div>
  )
}

export default HeaderComponent