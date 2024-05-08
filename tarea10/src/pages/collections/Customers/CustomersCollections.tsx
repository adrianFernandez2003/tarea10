import { Space, Typography } from 'antd'
import React from 'react'
import CustomersTable from '../../../components/CustomersTable'



const CustomersCollections:React.FC = () => {
  return (
    <Space size={'large'} align={'start'} direction={'vertical'}>
        <Typography.Title>clientes</Typography.Title>
        
            <CustomersTable/>
        
    </Space>
  )
}

export default CustomersCollections