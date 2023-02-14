import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router'
export default function LoggedOut() {
  const navigate = useNavigate()
  return (
    <>
      <Button
        onClick={() => navigate('/login')}
        variant="contained"
        className=" bg-orange-800 my-2"
      >
        Login
      </Button>
    </>
  )
}
