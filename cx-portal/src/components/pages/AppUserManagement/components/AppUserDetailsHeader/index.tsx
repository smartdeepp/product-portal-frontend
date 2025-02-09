import { useTranslation } from 'react-i18next'
import { Typography, PageNotifications } from 'cx-portal-shared-components'
import SubHeaderTitle from 'components/shared/frame/SubHeaderTitle'
import { AppRole } from 'features/admin/appuserApiSlice'
import './AppUserDetailsHeader.scss'

export interface AppUserDetailsHeaderProps {
  roles: AppRole[]
  error: string
}

export default function AppUserDetailsHeader({
  roles,
  error,
}: AppUserDetailsHeaderProps) {
  const { t } = useTranslation()

  return (
    <section className="app-user-details-header">
      <div className="app-user-details-header-title">
        <SubHeaderTitle
          title={'content.usermanagement.appUserDetails.header.title'}
          variant="h3"
        />
      </div>

      <div className="app-user-details-header-sub-title">
        <SubHeaderTitle
          title={'content.usermanagement.appUserDetails.header.subtitle'}
          variant="body2"
        />
      </div>

      <div className="app-user-details-header-roles-section">
        {roles &&
          roles.map((role) => {
            return (
              <div key={role.role} className="app-user-details-header-role">
                <Typography variant="h5">{role.role}</Typography>
                <Typography
                  variant="h6"
                  className="app-user-details-header-description"
                >
                  {role.description}
                </Typography>
              </div>
            )
          })}
      </div>
      <div className="errorMsg">
        {error && (
          <PageNotifications
            description={t(
              'content.usermanagement.appUserDetails.roles.error.message'
            )}
            open
            severity="error"
            title={t('content.usermanagement.appUserDetails.roles.error.title')}
          />
        )}
      </div>
    </section>
  )
}
