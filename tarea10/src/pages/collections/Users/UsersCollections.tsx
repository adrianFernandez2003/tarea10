import { Space, Typography } from 'antd'
import React from 'react'
import UsersTable from '../../../components/UsersTable'



const UsersCollections:React.FC = () => {
  return (
    <Space size={'large'} align={'start'} direction={'vertical'}>
        <Typography.Title>usuarios</Typography.Title>
        
            <UsersTable/>
        
    </Space>
  )
}

export default UsersCollections