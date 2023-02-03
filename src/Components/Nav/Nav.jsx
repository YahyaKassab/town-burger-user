import { Button, Container, IconButton, Typography } from "@mui/material"
import { useContext, useState } from "react"
import "./Nav.css"
import { Link, useNavigate } from "react-router-dom"
import LoggedOut from "./LoggedOut"
import LoggedIn from "./LoggedIn"
import StateContext from "../../StateContext"

const Nav = () => {
  const appState = useContext(StateContext)
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const toggleOpen = () => {
    setOpen(!open)
  }
  const handleScroll = async () => {
    await navigate("/")
    const element = document.getElementById("footer")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  //icon makes error
  return (
    <>
      <Container maxWidth="xl" className="mb-3">
        <div className="flex justify-between align-baseline">
          <div className="flex">
            <Link to={"/"}>
              {/* <img src={"town-burger-logo.png"} alt="logo" className="w-16" /> */}
              <div className="w-16 logo"></div>
            </Link>
            <Link to={"/"} className="no-underline">
              <Typography
                variant="h5"
                gutterBottom
                className="mt-4 font-semibold font-sans text-red-700"
              >
                Town Burger
              </Typography>
            </Link>
          </div>
          <div
            className={`flex-col md:space-y-0 ${
              open ? "flex my-3" : "hidden mt-0"
            } md:flex md:flex-row no-underline justify-between`}
          >
            <Link to={"/menu"} className="no-underline">
              <div className=" py-4 px-5">
                <Typography
                  variant="h5"
                  gutterBottom
                  className=" font-thin text-black hover:text-gray-500"
                >
                  Menu
                </Typography>
              </div>
            </Link>
            <a onClick={handleScroll} className="no-underline">
              <div className=" py-4 px-5">
                <Typography
                  variant="h5"
                  gutterBottom
                  className=" font-thin text-black hover:text-gray-500"
                >
                  Contact Us
                </Typography>
              </div>
            </a>
            <div className=" py-4 mx-2">
              <Button
                onClick={() => navigate("/menu")}
                variant="contained"
                className="text-bold bg-red-800"
              >
                Order now
              </Button>
            </div>
            <div className=" py-4 mx-2">
              <Button
                onClick={() => navigate("/register")}
                variant="contained"
                className="text-bold bg-neutral-800"
              >
                Register
              </Button>
            </div>
          </div>
          <a
            href="#"
            onClick={() => toggleOpen()}
            className={`block  md:hidden`}
          >
            <div className="relative m-10">
              <span className={`bottom ${open ? "open" : ""}`}></span>
              <span className={`middle ${open ? "open" : ""}`}></span>
              <span className={`upper ${open ? "open" : ""}`}></span>
            </div>
          </a>
          <div className={`${open ? "hidden" : "block"} m-3 md:block`}>
            <LoggedOut />
          </div>
          <div className={`${open ? "hidden" : "block"} m-3 md:block`}>
            <LoggedIn />
          </div>
        </div>
      </Container>
    </>
  )
}
export default Nav
