import { Space, Typography } from 'antd'
import React from 'react'
import GendersTable from '../../../components/GendersTable'



const GendersCollections:React.FC = () => {
  return (
    <Space size={'large'} align={'start'} direction={'vertical'}>
        <Typography.Title>generos</Typography.Title>
        
            <GendersTable/>
        
    </Space>
  )
}

export default GendersCollections