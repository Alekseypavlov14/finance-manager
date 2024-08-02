import { SettingsSection, SettingsSectionContent, SettingsSectionTitle } from '@/widgets/SettingsSection'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { deleteAccount, signOut } from '@/app/auth'
import { handleHTTPException } from '@/shared/utils/exception'
import { Popconfirm, Button } from 'antd'
import { useNotifications } from '@/features/notifications'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigation } from '@/app/routing'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'

export function AccountSection() {
  const { navigateLoginPage, navigateSignUpPage } = useNavigation()
  const { errorMessage } = useNotifications()

  function signOutHandler() {
    signOut()
    navigateLoginPage()
  }

  function deleteAccountHandler() {
    deleteAccount()
      .catch(handleHTTPException({
        401: () => errorMessage('You are not authorized'),
        404: () => errorMessage('Your account is not found'),
        500: () => errorMessage('Something went wrong'),
      }))
      .then(signOut)
      .then(navigateSignUpPage)
  }

  return (
    <SettingsSection>
      <SettingsSectionTitle>Account</SettingsSectionTitle>

      <SettingsSectionContent>
        <Popconfirm
          title='Are you sure to sign out?'
          onConfirm={signOutHandler}
          okText='Yes'
          cancelText='No'
        >
          <Button block>
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
            Sign out
          </Button>

        </Popconfirm>

        <Popconfirm
          title='Are you sure to delete account?'
          onConfirm={deleteAccountHandler}
          okText='Yes'
          cancelText='No'
        >
          <Button danger block>
            <FontAwesomeIcon icon={faTrashCan} />
            Delete account
          </Button>
        </Popconfirm>
      </SettingsSectionContent>
    </SettingsSection>
  )
}