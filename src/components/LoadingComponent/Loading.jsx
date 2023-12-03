import { Spin } from 'antd'
import React from 'react'

const Loading = ({ children, isLoading, delay = 200 }) => {
    return ( isLoading ? 
        <Spin spinning={isLoading} delay={delay}>
            {children}
        </Spin>
        : <>{children}</>
    )
}

export default Loading