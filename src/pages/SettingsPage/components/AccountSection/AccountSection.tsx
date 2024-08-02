import { SettingsSection, SettingsSectionContent, SettingsSectionTitle } from '@/widgets/SettingsSection'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { deleteAccount, signOut } from '@/app/auth'
import { Popconfirm, Button } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'

export function AccountSection() {
  return (
    <SettingsSection>
      <SettingsSectionTitle>Account</SettingsSectionTitle>

      <SettingsSectionContent>
        <Popconfirm
          title='Are you sure to sign out?'
          onConfirm={signOut}
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
          onConfirm={deleteAccount}
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