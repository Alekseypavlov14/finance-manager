import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'

interface LoaderProps {
  size?: number
  color?: string
}

export function Loader({ size, color }: LoaderProps) {
  return (
    <Spin indicator={<LoadingOutlined size={size} color={color} spin />} />
  )
}
