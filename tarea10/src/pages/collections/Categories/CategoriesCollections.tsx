import { Space, Typography } from 'antd'
import React from 'react'
import CategoriesTable from '../../../components/CategoriesTable'



const CategoriesCollections:React.FC = () => {
  return (
    <Space size={'large'} align={'start'} direction={'vertical'}>
        <Typography.Title>categorias</Typography.Title>
        
            <CategoriesTable/>
        
    </Space>
  )
}

export default CategoriesCollections