import { Button, Grid, TextField, Typography } from "@mui/material"
import emailjs from "emailjs-com"
import { red } from "@mui/material/colors"
import { useContext, useRef, useState } from "react"
import Page from "../Page"
import Box from "@mui/material/Box"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import MessageContext from "../../MessageContext"
import { useNavigate } from "react-router"
import CircularProgress from "@mui/material/CircularProgress"

const ForgotPassword = () => {
  const navigate = useNavigate()
  const form = useRef()
  const [sending, setSending] = useState(false)
  const message = useContext(MessageContext)
  const [resetWay, setResetWay] = useState("email")
  const [email, setEmail] = useState()
  const [number, setNumber] = useState()
  const handleChange = (event) => {
    setResetWay(event.target.value)
  }

  const resetEmail = async (e) => {
    e.preventDefault()
    setSending(true)
    await emailjs
      .sendForm(
        "ya7yakassab",
        "Town-burger-reset",
        form.current,
        "Ip-kP4EHS3IeQ4S6_"
      )
      .then(
        (result) => {
          message.success("Reset Email sent to " + form.current.email.value)
          console.log(form.current)
        },
        (error) => {
          console.log(error.text)
          message.error("Error sending reset email")
        }
      )
    navigate("/login")
    setSending(false)
  }

  const resetNumber = async (e) => {
    e.preventDefault()
    message.warning("Phone reset coming soon")
  }

  const handleSubmit = async (e) => {
    if (resetWay == "email") resetEmail(e)
    if (resetWay == "number") resetNumber(e)
  }
  return (
    <>
      <Page container={true} title="Reset Password" nav={false}>
        <div className="justify-center text-center">
          <Grid container spacing={4} className="justify-center">
            <Grid item xs={12} className="mt-12">
              <Box sx={{ minWidth: 120 }}>
                <Typography
                  variant="h5"
                  className="my-6 text-black justify-center text-center"
                >
                  {" "}
                  Choose Your Reset Way
                </Typography>
                <div className=" w-80 mx-auto">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Way</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={resetWay}
                      label="Age"
                      onChange={handleChange}
                    >
                      <MenuItem value="email">Email</MenuItem>
                      <MenuItem value="number">Phone Number</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </Box>
            </Grid>
            <form ref={form} onSubmit={handleSubmit} className="ml-8">
              <Grid item xs={12} className="mt-8 justify-center text-center">
                {resetWay == "email" ? (
                  <TextField
                    required
                    fullWidth
                    className="w-80 mx-auto"
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                ) : (
                  <TextField
                    required
                    fullWidth
                    className="w-80 mx-auto"
                    id="phone-number"
                    label="Phone Number"
                    name="phone-number"
                  />
                )}
              </Grid>
              <Grid item xs={12} className="mt-8 justify-center text-center">
                <Button type="submit" variant="contained" className="bg-black">
                  {sending ? (
                    <CircularProgress size={25} className="text-white" />
                  ) : (
                    "Submit"
                  )}
                </Button>
              </Grid>
              <Grid item xs={12} className="mt-12 justify-center text-center">
                <Button
                  onClick={() => navigate("/login")}
                  variant="contained"
                  className="bg-black"
                >
                  Go Back
                </Button>
              </Grid>
            </form>
          </Grid>
        </div>
      </Page>
    </>
  )
}
export default ForgotPassword
