import {
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  Typography,
} from "@mui/material"
import { forwardRef, Fragment, useContext, useState } from "react"
import { useNavigate, useParams } from "react-router"
import DispatchContext from "../../DispatchContext"
import StateContext from "../../StateContext"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import Page from "../Page"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import Slide from "@mui/material/Slide"
import MessageContext from "../../MessageContext"

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const Addresses = () => {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const { number } = useParams()
  const [edit, setEdit] = useState(false)
  const navigate = useNavigate()
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)
  const message = useContext(MessageContext)
  const handleDelete = (index) => {
    appDispatch({ type: "deleteAddress", value: index })
    handleClose()
    message.success("Address Deleted Successfully")
  }
  return (
    <Page container={true} nav={true} title="Addresses">
      <Grid container direction={"column-reverse"} spacing={4}>
        <Grid item xs={12}>
          <List sx={{ width: "100%", marginTop: 10, marginLeft: 3 }}>
            {appState.addresses.length == 0 ? (
              <h1 className="text-center text-red-800">
                No Addresses Yet
                <Button
                  variant="contained"
                  className="bg-red-800 ml-5"
                  onClick={() => navigate("/01123334417/add-address")}
                >
                  Add Address
                </Button>
              </h1>
            ) : (
              <>
                <Grid item xs={12} className="my-5">
                  <Button
                    variant="contained"
                    className="bg-red-800 ml-5"
                    onClick={() => navigate("/01123334417/add-address")}
                  >
                    Add Address
                  </Button>
                </Grid>
                {appState.addresses.map((address, index) => {
                  return (
                    <Fragment key={index}>
                      <Divider variant="inset" component="li" />
                      <ListItem alignItems="flex-start" className="ml-12 my-10">
                        <Grid container spacing={4}>
                          <Grid item xs={12} md={8}>
                            <Typography variant="h3" className="mb-3">
                              {address.street}
                              <br />
                              <span className="text-lg">{address.details}</span>
                            </Typography>
                          </Grid>

                          <Grid item xs={12} md={4}>
                            <Grid container>
                              <Grid item xs={6}>
                                <Button
                                  variant="contained"
                                  className="py-3 px-7 bg-blue-800"
                                  onClick={() =>
                                    navigate(`/${number}/${index}/edit`)
                                  }
                                >
                                  <EditIcon
                                    fontSize="large"
                                    className="text-white mr-2"
                                  />{" "}
                                  Edit
                                </Button>
                              </Grid>
                              <Grid item xs={6}>
                                <div>
                                  <Button
                                    variant="contained"
                                    onClick={handleClickOpen}
                                    className="bg-red-800 text-white py-3 px-7"
                                  >
                                    <DeleteIcon
                                      fontSize="medium"
                                      className="text-white mr-2"
                                    />
                                    Delete
                                  </Button>
                                  <Dialog
                                    open={open}
                                    TransitionComponent={Transition}
                                    keepMounted
                                    onClose={handleClose}
                                    aria-describedby="alert-dialog-slide-description"
                                  >
                                    <DialogTitle>
                                      Are you sure you want to delete this
                                      address?
                                    </DialogTitle>
                                    <DialogContent></DialogContent>
                                    <DialogActions>
                                      <Button onClick={handleClose}>No</Button>
                                      <Button
                                        variant="contained"
                                        onClick={() => handleDelete(index)}
                                        className="bg-red-800 text-white py-3 px-7"
                                      >
                                        {" "}
                                        <DeleteIcon
                                          fontSize="medium"
                                          className="text-white mr-2"
                                        />
                                        Delete
                                      </Button>
                                    </DialogActions>
                                  </Dialog>
                                </div>
                                {/* <DeleteIcon
                                fontSize="medium"
                                className="text-white mr-2"
                              />
                              Delete */}
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </Fragment>
                  )
                })}
              </>
            )}
          </List>
        </Grid>
      </Grid>
    </Page>
  )
}
export default Addresses
