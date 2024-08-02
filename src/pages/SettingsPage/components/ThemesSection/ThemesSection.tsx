import { SettingsSection, SettingsSectionContent, SettingsSectionTitle } from '@/widgets/SettingsSection'
import { ThemeToggler } from '@/app/themes'

export function ThemesSection() {
  return (
    <SettingsSection>
      <SettingsSectionTitle>Themes</SettingsSectionTitle>

      <SettingsSectionContent>
        <ThemeToggler />
      </SettingsSectionContent>
    </SettingsSection>
  )
}