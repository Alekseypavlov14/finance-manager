import { SettingsSection, SettingsSectionTitle, SettingsSectionContent } from '@/widgets/SettingsSection'
import { useNotifications } from '@/features/notifications'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { clearCache } from '@/features/clear-cache'
import { Button } from 'antd'

export function CacheSection() {
  const { infoMessage } = useNotifications()

  function clearCacheHandler() {
    clearCache()
    infoMessage('Cache is cleared')
  }

  return (
    <SettingsSection>
      <SettingsSectionTitle>Cache</SettingsSectionTitle>

      <SettingsSectionContent>
        <Button 
          onClick={clearCacheHandler}
          block
        >
          <FontAwesomeIcon icon={faTrashCan} />
          Clear cache
        </Button>
      </SettingsSectionContent>
    </SettingsSection>
  )
}