import { Button } from "@mui/material"
import React from "react"
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined"
import PersonSharpIcon from "@mui/icons-material/PersonSharp"
import { Link } from "react-router-dom"
import "./Nav.css"
export default function LoggedIn() {
  return (
    <>
      <div className="flex justify-between relative space-x-4">
        <Link to={"/"}>
          <PersonSharpIcon className="mt-2" fontSize="large" />
        </Link>
        <Link to={"/"}>
          <ShoppingCartOutlinedIcon
            className="mt-2 pl-0 ml-0"
            fontSize="large"
          />
        </Link>
        <span className="rounded-full bg-red-600 absolute notify text-white">
          1
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
