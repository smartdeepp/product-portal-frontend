import './UserDetails.scss'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined'
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined'
import { Box } from '@mui/material'
import {
  Button,
  UserAvatar,
  Typography,
  Table,
  Chip,
  PageHeader,
  PageNotifications,
} from 'cx-portal-shared-components'
import { RootState } from 'features/store'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { GridRowModel } from '@mui/x-data-grid/models/gridRows'
import uniqueId from 'lodash/uniqueId'
import { useParams } from 'react-router-dom'
import { UserdetailSelector, resetSelector } from 'features/admin/userOwn/slice'
import { useEffect } from 'react'
import { fetchOwn, putResetPassword } from 'features/admin/userOwn/actions'
import { userDetailsToCards } from 'features/admin/userOwn/mapper'
import { UserDetails as UserDetailsComponent } from 'components/shared/basic/UserDetails'
import { PageBreadcrumb } from 'components/shared/frame/PageBreadcrumb/PageBreadcrumb'

export default function UserDetails() {
  const { t } = useTranslation()
  const { appId } = useParams()
  console.log(`TODO: get user details for ${appId}`)

  const userDetail = useSelector(UserdetailSelector)

  const { resetStatus, error } = useSelector(resetSelector)

  let errorMsg = ''
  if (resetStatus) {
    errorMsg = t('content.account.resetPswrdSuccessMsg')
  } else if (parseInt(error) === 400) {
    errorMsg = t('content.account.resetPswrdMaxLimitError')
  } else if (parseInt(error) === 500) {
    errorMsg = t('content.account.resetPswrdUnsuccessfulError')
  } else if (parseInt(error) === 404) {
    errorMsg = t('content.account.resetPswrdPermissionsError')
  }

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchOwn(/*appId*/))
  }, [dispatch])

  // TODO: Wrong user mock data
  const parsedUser = useSelector((state: RootState) => state.user)

  const userAppRoles = [
    {
      id: '1',
      appName: 'AppName',
      appProvider: 'AppProvider',
      role: ['Editor'],
    },
    {
      id: '2',
      appName: 'AppName 2',
      appProvider: 'AppProvider 2',
      role: ['Admin', 'Editor'],
    },
  ]

  const handleSuspendUser = () => {
    console.log('Suspend user method')
  }

  const handleDeleteUser = () => {
    console.log('Delete user method')
  }

  const handleResetPasswordForUser = () => {
    dispatch(putResetPassword(userDetail.companyUserId))
  }

  const renderChips = (row: GridRowModel) => {
    return row.role.map((i: string) => {
      return (
        <Chip
          key={uniqueId(i)}
          color="secondary"
          label={i}
          type="plain"
          variant="filled"
          withIcon={false}
          sx={{ marginRight: '10px' }}
        />
      )
    })
  }

  return (
    <main className="user-details">
      <PageHeader
        title={t('content.account.userAccount')}
        topPage={false}
        headerHeight={200}
      >
        <PageBreadcrumb />
      </PageHeader>
      <section>
        <Box
          sx={{ marginBottom: '75px', display: 'flex', alignItems: 'flex-end' }}
        >
          <Box>
            {/* TODO: Cannot use 'lable3' here due to error tracked in CPLP-1016 */}
            <Typography
              variant="h6"
              display="block"
              sx={{ paddingBottom: '10px' }}
            >
              {parsedUser.name}, {parsedUser.email}
            </Typography>
            <Button
              color="secondary"
              onClick={handleSuspendUser}
              size="small"
              variant="outlined"
              startIcon={<PowerSettingsNewOutlinedIcon />}
              sx={{ marginRight: '8px' }}
            >
              {t('content.account.suspendAccount')}
            </Button>
            <Button
              color="secondary"
              onClick={handleDeleteUser}
              size="small"
              variant="outlined"
              startIcon={<CancelOutlinedIcon />}
              sx={{ marginRight: '8px' }}
            >
              {t('content.account.deleteAccount')}
            </Button>
            <Button
              color="secondary"
              onClick={handleResetPasswordForUser}
              size="small"
              variant="outlined"
              startIcon={<RestartAltOutlinedIcon />}
            >
              {t('content.account.resetPswrdAccount')}
            </Button>
          </Box>

          <Box sx={{ marginLeft: 'auto' }}>
            <UserAvatar size="large" />
          </Box>
        </Box>
        <div className="errorMsg">
          {error && (
            <PageNotifications
              title={t(
                'content.usermanagement.appUserDetails.roles.error.title'
              )}
              description={errorMsg}
              open
              severity="error"
            />
          )}
        </div>
        {userDetail && (
          <UserDetailsComponent
            userDetailsCards={userDetailsToCards(userDetail)}
            columns={3}
          />
        )}

        <Table
          title={t('content.account.appPermissionTable.title')}
          columns={[
            {
              field: 'id',
              hide: true,
            },
            { field: 'appName', headerName: t('global.field.last'), flex: 1 },
            {
              field: 'appProvider',
              headerName: t('global.field.first'),
              flex: 1,
            },
            {
              field: 'role',
              headerName: t('global.field.role'),
              flex: 1,
              renderCell: ({ row }) => renderChips(row),
            },
            // The details section is required in the future but already added
            // {
            //   field: 'details',
            //   headerName: t('global.field.details'),
            //   flex: 1,
            //   renderCell: () => (
            //     <IconButton
            //       color="secondary"
            //       onClick={() => console.log('Link to app')}
            //     >
            //       <ArrowForwardIcon />
            //     </IconButton>
            //   ),
            // },
          ]}
          rows={userAppRoles}
          rowsCount={userAppRoles.length}
          getRowId={(row: { [key: string]: string }) => uniqueId(row.id)}
          sx={{ marginTop: '80px' }}
          disableColumnMenu
          hideFooter
        />
      </section>
    </main>
  )
}
