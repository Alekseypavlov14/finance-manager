import { faChartSimple, faListUl } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons'
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
    icon: <FontAwesomeIcon icon={faSquarePlus} />,
    key: 'create-transaction',
  },
  { 
    to: '/transactions/list',
    icon: <FontAwesomeIcon icon={faListUl} />,
    key: 'transactions',
  },
]
