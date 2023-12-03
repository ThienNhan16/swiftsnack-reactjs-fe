import React from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import ProductDetailsComponent from '../../components/ProductDetailsComponent/ProductDetailsComponent';

const ProductDetailsPage = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  return (
    <div style={{width: '100%',background: '#efefef'}}>
      <div style={{ width: '75%', height: '100%', margin: '0 auto'}} >
        <h2 style={{ paddingTop: '15px', marginTop: '0' }}><span style={{cursor: 'pointer', fontWeight: 'bold'}} onClick={() => {navigate('/')}}>Trang chủ</span> - Chi tiết sản phẩm</h2>
        <ProductDetailsComponent idProduct={id} />
      </div>
    </div>
  )
}

export default ProductDetailsPage