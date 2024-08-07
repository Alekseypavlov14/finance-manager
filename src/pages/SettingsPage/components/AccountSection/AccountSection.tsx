import { SettingsSection, SettingsSectionContent, SettingsSectionTitle } from '@/widgets/SettingsSection'
import { deleteAccountAndUserData } from '@/features/accounts'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { handleHTTPException } from '@/shared/utils/exception'
import { Popconfirm, Button } from 'antd'
import { useNotifications } from '@/features/notifications'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { defaultHandler } from '@oleksii-pavlov/error-handling'
import { useNavigation } from '@/app/routing'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { signOut } from '@/app/auth'

export function AccountSection() {
  const { navigateLoginPage, navigateSignUpPage } = useNavigation()
  const { errorMessage } = useNotifications()

  function signOutHandler() {
    signOut()
    navigateLoginPage()
  }

  function deleteAccountHandler() {
    deleteAccountAndUserData()
      .catch(handleHTTPException({
        401: () => errorMessage('You are not authorized'),
        404: () => errorMessage('Your account is not found'),
        500: () => errorMessage('Something went wrong'),
        [defaultHandler]: () => errorMessage('Something went wrong'),
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