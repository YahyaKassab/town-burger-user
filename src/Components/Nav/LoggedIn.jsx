import { Button, Tooltip } from '@mui/material'
import React, { useContext, useState } from 'react'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import PersonSharpIcon from '@mui/icons-material/PersonSharp'
import { Link, useNavigate } from 'react-router-dom'
import './Nav.css'
import StateContext from '../../StateContext'
import DispatchContext from '../../DispatchContext'
export default function LoggedIn() {
  const navigate = useNavigate()
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)
  return (
    <>
      <div className="flex justify-between relative space-x-4">
        <Link to={'/profile'}>
          <Tooltip title="Profile">
            <PersonSharpIcon className="mt-2" fontSize="large" />
          </Tooltip>
        </Link>
        <Link to={'/menu'}>
          <Tooltip title="Cart">
            <ShoppingCartOutlinedIcon
              className="mt-2 pl-0 ml-0"
              fontSize="large"
            />
          </Tooltip>
        </Link>

        <span
          className={`${
            appState.cart.length == 0 ? 'hidden' : 'block'
          } rounded-full bg-red-600 absolute notify text-white`}
        >
          <span
            className="absolute text-sm font-bold"
            style={{
              right: `${appState.cart.length < 10 ? 5 : 1}px`,
              bottom: 0,
            }}
          >
            {appState.cart.length < 10 ? appState.cart.length : '9+'}
          </span>
        </span>
        <Button
          variant="outlined"
          className="font-bold text-gray-700"
          style={{ borderWidth: 2, borderColor: 'black' }}
          onClick={() => appDispatch({ type: 'logout' })}
        >
          Logout
        </Button>
      </div>
    </>
  )
}
