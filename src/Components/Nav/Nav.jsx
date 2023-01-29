import { Container, Typography } from "@mui/material"
import { useState } from "react"
import { Link } from "react-router-dom"

const Nav = () => {
  return (
    <>
      <Container
        maxWidth="xl"
        className="relative justify-between align-baseline"
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
      </Container>
    </>
  )
}
export default Nav
