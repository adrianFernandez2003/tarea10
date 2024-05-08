import { Space, Typography } from 'antd'
import React from 'react'
import AdressesTable from '../../../components/AdressesTable'



const AdressesCollections:React.FC = () => {
  return (
    <Space size={'large'} align={'start'} direction={'vertical'}>
        <Typography.Title>direcciones</Typography.Title>
        
            <AdressesTable />
        
    </Space>
  )
}

export default AdressesCollections