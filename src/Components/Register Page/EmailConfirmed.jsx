import { Typography } from '@mui/material'
import { useState } from 'react'
import Page from '../Page'

const EmailConfirmed = () => {
  return (
    <Page title="Email Confirmed" nav={true} container={true}>
      <div className="text-center">
        <Typography variant="h4" className="text-red-800 mt-12">
          Your Email is Confirmed Successfully
        </Typography>
      </div>
    </Page>
  )
}
export default EmailConfirmed
