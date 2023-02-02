import {
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  Typography,
} from "@mui/material"
import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import StateContext from "../../StateContext"
import Page from "../Page"

const Orders = () => {
  const navigate = useNavigate()
  const appState = useContext(StateContext)
  return (
    <Page container={true} nav={true} title="My Orders">
      <Grid container direction={"column-reverse"} spacing={4}>
        <Grid item xs={12}>
          <List sx={{ width: "100%", marginTop: 10, marginLeft: 3 }}>
            {appState.orders.length == 0 ? (
              <h1 className="text-center text-red-800">
                No Orders Yet
                <Button
                  variant="contained"
                  className="bg-red-800 ml-5"
                  onClick={() => navigate("/menu")}
                >
                  Order Now
                </Button>
              </h1>
            ) : (
              appState.orders.map((order, index) => {
                return (
                  <div key={index}>
                    <Divider variant="inset" component="li" />
                    <ListItem alignItems="flex-start" className="ml-12 my-10">
                      <Grid container spacing={4}>
                        <Grid item xs={4}>
                          <Typography variant="h3" className="mb-3">
                            Ordered on {order.datePlaced.date.day}/
                            {order.datePlaced.date.month}/
                            {order.datePlaced.date.year}
                            <span className="text-lg">
                              {" "}
                              {} <br /> at {order.datePlaced.time.hour}:
                              {order.datePlaced.time.minute}
                              {" " + order.datePlaced.time.day
                                ? " AM"
                                : " PM"}{" "}
                              <br />
                              to Yahya kassab <br /> at address ismailia <br />{" "}
                              {/* index {appState.orders.length}, {order.index} */}
                            </span>
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          md={6}
                          lg={6}
                          className="text-center"
                        >
                          <Grid container>
                            <Grid item xs={4}>
                              <Grid container>
                                <Grid item xs={12}>
                                  <Typography variant="h5">Meal</Typography>
                                  {order.cart.map((meal, index) => (
                                    <Typography
                                      key={index}
                                      variant="h5"
                                      className="my-3"
                                    >
                                      {meal.meal.title}
                                    </Typography>
                                  ))}
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item xs={2}>
                              <Grid container>
                                <Grid item xs={12}>
                                  <Typography variant="h5">Quantity</Typography>
                                  {order.cart.map((meal, index) => (
                                    <Typography
                                      key={index}
                                      variant="h5"
                                      className="my-3"
                                    >
                                      {meal.qty}
                                    </Typography>
                                  ))}
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item xs={6}>
                              <Grid container>
                                <Grid item xs={12}>
                                  <Typography variant="h5">
                                    Description
                                  </Typography>
                                  {order.cart.map((meal, index) => (
                                    <Typography
                                      key={index}
                                      variant="h5"
                                      className="my-3"
                                    >
                                      {meal.description}
                                    </Typography>
                                  ))}
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item lg={2} xs={8}>
                          <Typography variant="h5" className="text-center">
                            {order.state == 3 ? (
                              `Delivered on ${
                                order.dateDelivered.hour +
                                ":" +
                                order.dateDelivered.minute +
                                (order.dateDelivered.day ? " AM" : " PM")
                              } `
                            ) : (
                              <Button
                                variant="contained"
                                className="bg-red-800 py-6 px-14 font-bold"
                                onClick={() =>
                                  navigate(`/${order.index}/track`)
                                }
                              >
                                Track Order
                              </Button>
                            )}
                          </Typography>
                        </Grid>
                      </Grid>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </div>
                )
              })
            )}
          </List>
        </Grid>
      </Grid>
    </Page>
  )
}
export default Orders
