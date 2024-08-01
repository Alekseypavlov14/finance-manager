import { faChartSimple, faListUl } from '@fortawesome/free-solid-svg-icons'
import { PlusCircleOutlined } from '@ant-design/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ReactNode } from 'react'

export interface NavigationLink {
  to: string
  icon: ReactNode
  key: string
}

export const navigationLinks: NavigationLink[] = [
  {
    to: '/statistics',
    icon: <FontAwesomeIcon icon={faChartSimple} />,
    key: 'statistics',
  },
  {
    to: '/transactions/create',
    icon: <PlusCircleOutlined />,
    key: 'create-transaction',
  },
  { 
    to: '/transactions/list',
    icon: <FontAwesomeIcon icon={faListUl} />,
    key: 'transactions',
  },
]
