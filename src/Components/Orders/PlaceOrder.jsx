import React, { useContext, useEffect, useState } from "react"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import Divider from "@mui/material/Divider"
import ListItemText from "@mui/material/ListItemText"
import ListItemAvatar from "@mui/material/ListItemAvatar"
import Avatar from "@mui/material/Avatar"
import Typography from "@mui/material/Typography"
import AddIcon from "@mui/icons-material/Add"
import RemoveIcon from "@mui/icons-material/Remove"
import EditIcon from "@mui/icons-material/Edit"
import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material"
import DispatchContext from "../../DispatchContext"
import StateContext from "../../StateContext"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import DeleteIcon from "@mui/icons-material/Delete"
import { useNavigate } from "react-router"
import Page from "../Page"
import "./Orders.css"
import MessageContext from "../../MessageContext"

const PlaceOrder = () => {
  const message = useContext(MessageContext)
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)
  const navigate = useNavigate()
  const deleteFromCart = (index) => {
    appDispatch({ type: "removeFromCart", value: index })
  }
  const [edit, setEdit] = useState(true)
  var today = new Date()
  const handlePlaceOrder = () => {
    appDispatch({
      type: "addOrder",
      value: {
        cart: appState.cart,
        datePlaced: {
          date: {
            day: today.getDate(),
            month: today.getMonth() + 1,
            year: today.getDate(),
          },
          time: {
            hour:
              today.getHours() < 13
                ? today.getHours() == 0
                  ? 12
                  : today.getHours()
                : today.getHours() - 12,
            minute:
              today.getMinutes().toString().length == 1
                ? "0" + today.getMinutes()
                : today.getMinutes(),
            day: today.getHours() < 13,
          },
        },
        dateDelivered: null,
      },
    })
    navigate("/01123334417/orders")
    message.success("Order Placed Successfully")
  }
  return (
    <Page container={true} nav={true} title="Place Your Order">
      <div className="justify-center ml-12">
        <Typography variant="h3" className="my-3 text-red-800 ">
          Cart
        </Typography>
        <List sx={{ width: "100%" }}>
          <Grid container direction={"column"}>
            {appState.cart.map((item, index) => {
              return (
                <div key={index}>
                  <ListItem alignItems="flex-start">
                    <Grid container spacing={10}>
                      <Grid item xs={6} lg={4}>
                        <ListItemText
                          primary={
                            <Typography variant="h4" className="ml-3">
                              {appState.cart[index].meal.title}
                            </Typography>
                          }
                          secondary={
                            <div className="flex flex-col">
                              <Typography
                                sx={{ display: "inline" }}
                                className="ml-9"
                                component="span"
                                variant="h3"
                                color="text.primary"
                              >
                                {appState.cart[index].qty}
                              </Typography>
                              <div className="flex flex-row justify-center space-x-5 mt-2">
                                <Button
                                  variant="contained"
                                  onClick={() => deleteFromCart(index)}
                                  className={`bg-red-900  h-12 self-center`}
                                  style={{ borderRadius: 10 }}
                                >
                                  <DeleteIcon
                                    fontSize="medium"
                                    className="text-white mr-2"
                                  />{" "}
                                  Delete
                                </Button>

                                {edit ? (
                                  <Button
                                    variant="contained"
                                    className=" bg-blue-800"
                                    onClick={() => setEdit(false)}
                                    style={{ borderRadius: 10 }}
                                  >
                                    <EditIcon
                                      fontSize="medium"
                                      className="text-white mr-2"
                                    />{" "}
                                    Edit
                                  </Button>
                                ) : (
                                  <div className="flex">
                                    <div className="flex flex-col justify-center space-y-1 mx-5">
                                      <IconButton
                                        onClick={() =>
                                          appDispatch({
                                            type: "increaseQty",
                                            value: index,
                                          })
                                        }
                                      >
                                        <AddIcon fontSize="large" />
                                      </IconButton>
                                      <IconButton
                                        onClick={() =>
                                          appDispatch({
                                            type: "decreaseQty",
                                            value: index,
                                          })
                                        }
                                      >
                                        <RemoveIcon fontSize="large" />
                                      </IconButton>
                                    </div>
                                    <Button
                                      variant={
                                        appState.cart[index].qty == 0
                                          ? "outlined"
                                          : "contained"
                                      }
                                      className={` bg-blue-800 h-12 self-center ${
                                        appState.cart[index].qty == 0
                                          ? "bg-white text-black border-black"
                                          : ""
                                      }`}
                                      onClick={() => setEdit(true)}
                                      style={{ borderRadius: 10 }}
                                      disabled={appState.cart[index].qty == 0}
                                    >
                                      Confirm
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </div>
                          }
                        />
                      </Grid>
                      <Grid item xs={5}>
                        <Typography variant="h4">Description</Typography>
                        <TextField
                          onChange={(e) =>
                            appDispatch({
                              type: "descriptionChange",
                              value: { index, description: e.target.value },
                            })
                          }
                          id="standard-textarea"
                          label="Description"
                          placeholder="No lettuce"
                          multiline
                          variant="standard"
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                  </ListItem>

                  <Divider variant="inset" component="li" />
                </div>
              )
            })}
            <Grid item>
              <Grid container>
                <Grid item xs={6}>
                  <div className={`text-start`}>
                    <Button
                      onClick={() => navigate(`/menu`)}
                      variant="text"
                      className="text-red-800 px-10 py-5 my-20"
                    >
                      <ArrowBackIcon
                        fontSize="large"
                        className="text-red-800 mx-5"
                      />
                      <Typography variant="h4" className="">
                        Go Back
                      </Typography>
                    </Button>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div className={`text-end`}>
                    <Button
                      onClick={handlePlaceOrder}
                      variant="text"
                      className="text-red-800 px-10 py-5 my-20"
                    >
                      <Typography variant="h4" className="">
                        Place Order
                      </Typography>
                      <ArrowForwardIcon
                        fontSize="large"
                        className="text-red-800 mx-5"
                      />
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </List>
      </div>
    </Page>
  )
}
export default PlaceOrder
