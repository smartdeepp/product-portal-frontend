import { useTranslation } from 'react-i18next'
import { Button, PageNotifications } from 'cx-portal-shared-components'
import SubHeaderTitle from 'components/shared/frame/SubHeaderTitle'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { TechnicalUserTable } from '../TechnicalUserTable'
import { useDispatch, useSelector } from 'react-redux'
import { resetNotification } from 'features/notification/actions'
import { notificationSelector } from 'features/notification/slice'
import { show } from 'features/control/overlay/actions'
import { OVERLAYS } from 'types/Constants'
import UserService from 'services/UserService'

export const ContentTechnicalUser = () => {
  const { t } = useTranslation()
  const notification = useSelector(notificationSelector)
  const dispatch = useDispatch()

  const handleCloseNotification = () => {
    dispatch(resetNotification())
  }

  return (
    <section>
      <div className="content-technical-user">
        <div className="content-technical-user-description">
          <div className="content-technical-user-title">
            <SubHeaderTitle
              title={'content.usermanagement.technicalUser.descriptionHeader'}
              params={{ company: UserService.getCompany() }}
              variant="h3"
            />

            <SubHeaderTitle
              title={'content.usermanagement.technicalUser.descriptionText'}
              variant="body1"
            />
          </div>
          <Button
            size="small"
            startIcon={<AddCircleOutlineIcon />}
            onClick={() => dispatch(show(OVERLAYS.ADD_TECHUSER))}
          >
            {t('content.usermanagement.technicalUser.create')}
          </Button>
        </div>
        <div className="content-technical-user-image">
          <img src="/edc-connector-text-image.png" alt={'alt tag info'} />
        </div>
      </div>

      <div style={{ paddingTop: '70px' }}>
        {notification.title && notification.description && (
          <PageNotifications
            open={notification.open}
            severity={notification.severity}
            title={t(notification.title)}
            description={t(notification.description)}
            onCloseNotification={handleCloseNotification}
            showIcon={false}
          />
        )}
        <TechnicalUserTable />
      </div>
    </section>
  )
}
