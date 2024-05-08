import { Space, Typography } from 'antd'
import React from 'react'
import ProductSessionsTable from '../../../components/ProductSessionsTable'



const ProductSessionsCollections:React.FC = () => {
  return (
    <Space size={'large'} align={'start'} direction={'vertical'}>
        <Typography.Title>sesion de productos</Typography.Title>
        
            <ProductSessionsTable/>
        
    </Space>
  )
}

export default ProductSessionsCollections