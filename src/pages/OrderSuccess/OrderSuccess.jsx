import React from 'react'
import { Label, WrapperInfo, WrapperContainer, WrapperValue, WrapperCountOrder, WrapperItemOrder, WrapperItemOrderInfo } from './style';
import Loading from '../../components/LoadingComponent/Loading';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { orderContant } from '../../contant';
import { convertPrice } from '../../utils';

const OrderSuccess = () => {
  const location = useLocation()
  const {state} = location
  return (
    <div style={{background: '#f5f5fa', width: '100%', height: '100vh'}}>
      <Loading isLoading={false}>
        <div style={{height: '100%', width: '84%', margin: '0 auto'}}>
          <h2 style={{fontSize: '16px', padding: '15px 0 4px', margin: '0'}}>Đơn hàng đặt thành công</h2>
          <div style={{ display: 'flex', justifyContent: 'center'}}>
            <WrapperContainer>
              <WrapperInfo>
                <div>
                  <Label style={{ fontSize: '16px' }}>Phương thức giao hàng</Label>
                    <WrapperValue style={{ fontSize: '16px' }}>
                      <span style={{color: '#ea8500', fontWeight: 'bold'}}>{orderContant.delivery[state?.delivery]}</span>
                      <span>{orderContant.delivery[state?.delivery] == "DIRECT" ? " Nhận tại của hàng" : " Giao hàng tiết kiệm"}</span>
                    </WrapperValue>
                </div>
              </WrapperInfo>
              <WrapperInfo>
                <div>
                  <Label style={{ fontSize: '16px' }}>Phương thức thanh toán</Label>
                
                  <WrapperValue style={{ fontSize: '16px' }}>
                    {orderContant.payment[state?.payment]}
                  </WrapperValue>
                </div>
              </WrapperInfo>
              <WrapperItemOrderInfo>
                {state.orders?.map((order) => {
                  return (
                    <WrapperItemOrder key={order?.name}>
                      <div style={{width: '500px', display: 'flex', alignItems: 'center', gap: 4}}> 
                        <img alt= "" src={order.image} style={{width: '80px', objectFit: 'cover'}}/>
                        <div style={{
                          width: 260,
                          overflow: 'hidden',
                          textOverflow:'ellipsis',
                          whiteSpace:'nowrap',
                          fontSize: '16px'
                        }}>{order?.name}</div>
                      </div>
                      <div style={{flex: 1, display: 'flex', alignItems: 'center',gap: '10px'}}>
                        <span>
                          <span style={{ fontSize: '16px', color: '#242424' }}>Giá tiền: {convertPrice(order?.price)}</span>
                        </span>
                        <span>
                          <span style={{ fontSize: '16px', color: '#242424' }}>Số lượng: {order?.amount}</span>
                        </span>
                      </div>
                    </WrapperItemOrder>
                  )
                })}
              </WrapperItemOrderInfo>
              <div>
                <span style={{ fontSize: '16px', color: 'red', fontWeight: 'bold', marginLeft: '2%'}}>Tổng tiền: {convertPrice(state?.totalPriceMemo)}</span>
              </div>
            </WrapperContainer>
          </div>
        </div>
      </Loading>
    </div>
  )
}

export default OrderSuccess