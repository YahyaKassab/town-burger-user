import { Container, Typography } from "@mui/material"
import { useState } from "react"
import { Link } from "react-router-dom"

const Nav = () => {
  return (
    <>
      <Container
        maxWidth="xl"
        className="relative flex justify-between align-baseline"
      >
        <div className="flex">
          <Link to={"/"}>
            <img src={"town-burger-logo.png"} alt="logo" className="w-16" />
          </Link>
          <Link to={"/"} className="no-underline">
            <Typography
              variant="h5"
              gutterBottom
              className="mt-4 font-semibold font-sans text-black"
            >
              Town Burger
            </Typography>
          </Link>
        </div>
        <div className="hidden flex-col md:flex md:flex-row no-underline space-x-3">
          <Link to={"/"} className="no-underline">
            <div className=" py-4 px-5">
              <Typography
                variant="h5"
                gutterBottom
                className=" font-thin text-black hover:text-gray-500"
              >
                nigga
              </Typography>
            </div>
          </Link>
          <Link to={"/"} className="no-underline">
            <div className=" py-4 px-5">
              <Typography
                variant="h5"
                gutterBottom
                className=" font-thin text-black hover:text-gray-500"
              >
                nigga
              </Typography>
            </div>
          </Link>
          <Link to={"/"} className="no-underline">
            <div className=" py-4 px-5">
              <Typography
                variant="h5"
                gutterBottom
                className=" font-thin text-black hover:text-gray-500"
              >
                nigga
              </Typography>
            </div>
          </Link>
          <Link to={"/"} className="no-underline">
            <div className=" py-4 px-5">
              <Typography
                variant="h5"
                gutterBottom
                className=" font-thin text-black hover:text-gray-500"
              >
                nigga
              </Typography>
            </div>
          </Link>
        </div>
        <div className="hidden md:flex"></div>
      </Container>
    </>
  )
}
export default Nav
