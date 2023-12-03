// eslint-disable-next-line
import { Checkbox, Col, Rate, Row } from 'antd'
import React, {useState, useEffect} from 'react'
import { WrapperContent, WrapperLabelText, WrapperTextPrice, WrapperTextValue } from './style'
import * as ProductService from '../../services/ProductService'

const NavBarComponent = () => {
    const [limit, setLimit] = useState(6)
    const [typeProducts, setTypeProducts] = useState([])
  
    const fetchProductAll = async (context) => {
        const limit = context?.queryKey && context?.queryKey[1]
        const search = context?.queryKey && context?.queryKey[2]
        const res = await ProductService.getAllProduct(search, limit)
        return res
    }

  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct()
    if(res?.status === 'OK') {
      setTypeProducts(res?.data)
    }
  }
  useEffect(() => {
    fetchAllTypeProduct()
  })

    const onChange = () => { }
    const renderContent = (type, options) => {
        switch (type) {
            case 'text':
                return options.map((option) => {
                    return (
                        <WrapperTextValue>{option}</WrapperTextValue>
                    )
                })
            case 'checkbox':
                return (
                    <Checkbox.Group 
                        style={{ 
                                width: '100%', 
                                display: 'flex', 
                                flexDirection: 'column', 
                                gap: '12px' 
                            }} 
                            onChange={onChange}
                        >
                        {options.map((option) => {
                            return (
                                <Checkbox style={{ marginLeft: 0 }} value={option.value}>{option.label}</Checkbox>
                            )
                        })}
                    </Checkbox.Group>
                )
            case 'star':
                return options.map((option) => {
                    return (
                        <div style={{ display: 'flex' }}>
                            <Rate style={{ fontSize: '12px' }} disabled defaultValue={option} />
                            <span> {`tu ${option}  sao`}</span>
                        </div>
                    )
                })
            case 'price':
                return options.map((option) => {
                    return (
                        <WrapperTextPrice>{option}</WrapperTextPrice>
                    )
                })
            default:
                return {}
        }
    }

    return (
        <div>
            <WrapperLabelText>Lọc theo danh sách</WrapperLabelText>
            <WrapperContent>
                {renderContent('text', typeProducts)}
                {renderContent('star', typeProducts)}
                {renderContent('price', typeProducts)}
                {renderContent('checkbox', typeProducts)}
            </WrapperContent>
        </div>
    )
}

export default NavBarComponent