import {
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  Typography,
} from "@mui/material"
import { useState } from "react"
import { useParams } from "react-router"
import Page from "../Page"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import CheckIcon from "@mui/icons-material/Check"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import { Link } from "react-router-dom"
const Profile = () => {
  const { number } = useParams()
  const [edit, setEdit] = useState(false)
  const handleSubmit = () => {
    setEdit(false)
  }
  //phone number
  //addresses
  //email
  //cart
  //orders
  return (
    <Page container={true} nav={true} title="Profile">
      <Grid container spacing={4}>
        {/* left side  */}
        <Grid item xs={12} xl={6}>
          <Grid container spacing={3} className="justify-center mt-16">
            <Grid item xs={12}>
              <Typography variant="h3" className="text-red-800 my-5">
                <AccountCircleIcon fontSize="large" /> Your Profile Data
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                disabled={!edit}
                label="First Name"
                fullWidth
                focused={edit}
                defaultValue="Yahya"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                disabled={!edit}
                label="Last Name"
                fullWidth
                defaultValue="Kassab"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                disabled={!edit}
                label="Email"
                fullWidth
                defaultValue="ya7yakassab@gmail.com"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                disabled={!edit}
                label="Phone Number"
                fullWidth
                defaultValue="01123334417"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                disabled={!edit}
                type={edit ? "text" : "password"}
                label="Password"
                fullWidth
                defaultValue="Nakmys12"
              />
            </Grid>
            <Grid item xs={6} className="text-center">
              {edit ? (
                <Button
                  variant="contained"
                  color="primary"
                  className="px-8 py-3 bg-blue-800"
                  onClick={handleSubmit}
                >
                  <CheckIcon fontSize="large" className="text-white mr-2" />
                  <Typography variant="h6">Confirm</Typography>
                </Button>
              ) : (
                <Button
                  variant="contained"
                  className="px-8 py-3 bg-blue-800"
                  onClick={() => setEdit(true)}
                >
                  <EditIcon fontSize="large" className="text-white mr-2" /> Edit
                </Button>
              )}
            </Grid>
            <Grid item xs={6} className="text-center">
              <Button variant="contained" className="px-8 py-3 bg-red-800">
                <DeleteIcon fontSize="medium" className="text-white mr-2" />
                Delete Account
              </Button>
            </Grid>
          </Grid>
        </Grid>
        {/* right side  */}
        <Grid item xs={12} xl={6}>
          <List sx={{ width: "100%", marginTop: 10, marginLeft: 3 }}>
            <Divider variant="inset" component="li" />
            <Link
              to={`/${"01123334417"}/orders`}
              className="text-black no-underline"
            >
              <ListItem alignItems="flex-start" className="ml-12 my-10">
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <Typography variant="h3">Orders</Typography>
                  </Grid>
                </Grid>
              </ListItem>
            </Link>
            <Divider variant="inset" component="li" />
            <Link to="#" className="text-black no-underline">
              <ListItem alignItems="flex-start" className="ml-12 my-10">
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <Typography variant="h3">Adresses</Typography>
                  </Grid>
                </Grid>
              </ListItem>
            </Link>
            <Divider variant="inset" component="li" />
          </List>
        </Grid>
      </Grid>
    </Page>
  )
}
export default Profile
