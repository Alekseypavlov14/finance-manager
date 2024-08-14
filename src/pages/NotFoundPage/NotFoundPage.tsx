import { useNavigation } from '@/app/routing'
import { HomeFilled } from '@ant-design/icons'
import { Headline } from '@/shared/components/Headline'
import { Center } from '@/shared/components/Center'
import { Button } from 'antd'
import { Page } from '@/shared/components/Page'
import styles from './NotFoundPage.module.css'

export function NotFoundPage() {
  const { navigateHomePage } = useNavigation()

  return (
    <Page>
      <Center className={styles.Center}>
        <Headline
          className={styles.Title} 
          level={5}
        >
          <span className={styles.ExceptionCode}>404</span>&nbsp;
          <span className={styles.Separator}>|</span>&nbsp;
          <span className={styles.TitleText}>This page is not found</span>
        </Headline>

        <Button
          className={styles.RedirectLink}
          onClick={navigateHomePage}
          type='link'
        >
          <HomeFilled /> Home page
        </Button>
      </Center>
    </Page>
  )
}
