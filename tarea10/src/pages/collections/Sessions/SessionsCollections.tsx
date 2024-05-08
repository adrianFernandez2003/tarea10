import { Space, Typography } from 'antd'
import React from 'react'
import SessionsTable from '../../../components/SessionsTable'



const SessionsCollections:React.FC = () => {
  return (
    <Space size={'large'} align={'start'} direction={'vertical'}>
        <Typography.Title>sesiones</Typography.Title>
        
            <SessionsTable/>
        
    </Space>
  )
}

export default SessionsCollections