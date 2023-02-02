import { Container } from "@mui/material"
import { useState } from "react"
import Nav from "./Nav/Nav"

const Page = (props) => {
  document.title = `Welcome to Town Burger|${props.title}`
  return (
    <>
      {props.nav ? <Nav /> : ""}
      {props.container ? (
        <Container maxWidth="lg" className="relative justify-between">
          {props.children}
        </Container>
      ) : (
        <>{props.children}</>
      )}
    </>
  )
}
export default Page
