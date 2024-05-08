import { Space, Typography } from 'antd'
import React from 'react'
import ProductsTable from '../../../components/ProductTable'



const ProductsCollections:React.FC = () => {
  return (
    <Space size={'large'} align={'start'} direction={'vertical'}>
        <Typography.Title>productos</Typography.Title>
        
            <ProductsTable/>
        
    </Space>
  )
}

export default ProductsCollections