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
import { Button, Grid, IconButton } from "@mui/material"
import DispatchContext from "../../DispatchContext"
import StateContext from "../../StateContext"

export default function Cart() {
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)
  const deleteFromCart = (index) => {
    appDispatch({ type: "removeFromCart", value: index })
  }
  const edit = (array, index, value) => {
    const st = array.slice(0, index)
    const nd = array.slice(index + 1)
    console.log("nd:" + nd)
    st.push(value)
    const last = st.concat(nd)
    return last
  }
  const handleEdit = () => {
    const newShowEdit = edit(showEdit, index, false)
    setShowEdit(newShowEdit)
  }
  const showEditDemo = []
  const [showEdit, setShowEdit] = useState(showEditDemo)

  //handle show and hide edit

  return (
    <div className="justify-center ml-12">
      <Typography variant="h3" className="my-3 ">
        Cart
      </Typography>
      <List sx={{ width: "100%" }}>
        {appState.cart.map((item, index) => {
          showEditDemo.push(true)
          setShowEdit(showEditDemo)
          console.log(showEdit)
          return (
            <>
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
                              className="bg-red-900  h-12 self-center"
                              style={{ borderRadius: 10 }}
                            >
                              Delete
                            </Button>

                            {showEdit[index] ? (
                              <Button
                                variant="contained"
                                className=" bg-blue-800"
                                onClick={() => handleEdit()}
                                style={{ borderRadius: 10 }}
                              >
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
                                  variant="contained"
                                  className=" bg-blue-800 h-12 self-center"
                                  onClick={() => edit(showEdit, index, true)}
                                  style={{ borderRadius: 10 }}
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
                  <Grid item className=" mt-0 "></Grid>
                </Grid>
              </ListItem>

              <Divider variant="inset" component="li" />
            </>
          )
        })}
      </List>
    </div>
  )
}
