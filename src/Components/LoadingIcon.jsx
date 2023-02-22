import * as React from 'react'
import CircularProgress from '@mui/material/CircularProgress'

export default function LoadingIcon() {
  return (
    <div className="justify-center mx-auto text-center mt-32">
      <CircularProgress />
    </div>
  )
}
