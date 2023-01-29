import { Container } from "@mui/material"
import { useState } from "react"

const Page = (props) => {
  document.title = `Welcome to Town Burger|${props.title}`
  return (
    <Container maxWidth="xl" className="relative justify-between">
      {props.children}
    </Container>
  )
}
export default Page
