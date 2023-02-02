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
import { Button, Grid, IconButton } from "@mui/material"
import DispatchContext from "../../DispatchContext"
import StateContext from "../../StateContext"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import DeleteIcon from "@mui/icons-material/Delete"
import { useNavigate } from "react-router"

export default function Cart() {
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)
  const navigate = useNavigate()
  const deleteFromCart = (index) => {
    appDispatch({ type: "removeFromCart", value: index })
  }
  const [edit, setEdit] = useState(true)

  return (
    <div className="justify-center ml-12">
      <Typography variant="h3" className="my-3 text-red-800 ">
        Cart
      </Typography>
      <List sx={{ width: "100%" }}>
        <Grid container direction={"column"}>
          {appState.cart.length > 0 ? (
            appState.cart.map((item, index) => {
              return (
                <div key={index}>
                  <ListItem alignItems="flex-start">
                    <Grid container spacing={1}>
                      <Grid item>
                        <ListItemAvatar>
                          <Avatar
                            alt="Remy Sharp"
                            src={appState.cart[index].meal.image}
                            sx={{ width: 120, height: 120 }}
                          />
                        </ListItemAvatar>
                      </Grid>
                      <Grid item>
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
                    </Grid>
                  </ListItem>

                  <Divider variant="inset" component="li" />
                </div>
              )
            })
          ) : (
            <></>
          )}
          <Grid xs={12} item>
            <div
              className={`text-end ${
                appState.cart.length == 0 ? "hidden" : "block"
              }`}
            >
              <Button
                onClick={() => navigate(`/${"01123334417"}/place-order`)}
                variant="text"
                className="text-red-800 px-10 py-5 my-20"
              >
                <Typography variant="h4" className="">
                  Continue
                </Typography>
                <ArrowForwardIcon
                  fontSize="large"
                  className="text-red-800 mx-5"
                />
              </Button>
            </div>
          </Grid>
        </Grid>
      </List>
    </div>
  )
}
