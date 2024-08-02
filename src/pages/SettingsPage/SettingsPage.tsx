import { SettingsSection, SettingsSectionContent, SettingsSectionTitle } from '@/widgets/SettingsSection'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { ProtectedRoute, signOut } from '@/app/auth'
import { Button, Popconfirm } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container } from '@/shared/components/Container'
import { Header } from '@/widgets/Header'
import { Page } from '@/shared/components/Page'
import styles from './SettingsPage.module.css'

export function SettingsPage() {
  return (
    <ProtectedRoute>
      <Page className={styles.SettingsPage}>
        <Header />

        <Container className={styles.SettingsContent}>
          <SettingsSection>
            <SettingsSectionTitle>Account</SettingsSectionTitle>

            <SettingsSectionContent>
              <Popconfirm
                title='Are you sure to sign out?'
                onConfirm={signOut}
                okText='Yes'
                cancelText='No'
              >
                <Button>
                  <FontAwesomeIcon icon={faArrowRightFromBracket} />
                  Sign out
                </Button>
              </Popconfirm>
            </SettingsSectionContent>
          </SettingsSection>
        </Container>
      </Page>
    </ProtectedRoute>
  )
}