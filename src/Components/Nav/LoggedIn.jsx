import { Button, Tooltip } from "@mui/material"
import React, { useState } from "react"
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined"
import PersonSharpIcon from "@mui/icons-material/PersonSharp"
import { Link } from "react-router-dom"
import "./Nav.css"
export default function LoggedIn() {
  const [notifications, setNotifications] = useState([1])
  return (
    <>
      <div className="flex justify-between relative space-x-4">
        <Link to={"/"}>
          <Tooltip title="Profile">
            <PersonSharpIcon className="mt-2" fontSize="large" />
          </Tooltip>
        </Link>
        <Link to={"/menu"} onClick={() => setNotifications([])}>
          <Tooltip title="Cart">
            <ShoppingCartOutlinedIcon
              className="mt-2 pl-0 ml-0"
              fontSize="large"
            />
          </Tooltip>
        </Link>
        <span
          className={`${
            notifications.length == 0 ? "hidden" : "block"
          } rounded-full bg-red-600 absolute notify text-white`}
        >
          <span
            className="absolute text-sm font-bold"
            style={{
              right: `${notifications.length < 10 ? 5 : 1}px`,
              bottom: 0,
            }}
          >
            {notifications.length < 10 ? notifications.length : "9+"}
          </span>
        </span>
        <Button
          variant="outlined"
          className="font-bold text-gray-700"
          style={{ borderWidth: 2, borderColor: "black" }}
        >
          Logout
        </Button>
      </div>
    </>
  )
}
