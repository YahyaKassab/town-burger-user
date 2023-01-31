import * as React from "react"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import Divider from "@mui/material/Divider"
import ListItemText from "@mui/material/ListItemText"
import ListItemAvatar from "@mui/material/ListItemAvatar"
import Avatar from "@mui/material/Avatar"
import Typography from "@mui/material/Typography"
import { Button, Grid } from "@mui/material"

export default function Cart() {
  return (
    <div className="justify-center ml-12">
      <List sx={{ width: "100%" }}>
        <ListItem alignItems="flex-start">
          <Grid container spacing={1}>
            <Grid item>
              <ListItemAvatar>
                <Avatar
                  alt="Remy Sharp"
                  src="SliderImages\burger1.jpg"
                  sx={{ width: 120, height: 120 }}
                />
              </ListItemAvatar>
            </Grid>
            <Grid item>
              <ListItemText
                primary={
                  <Typography variant="h4" className="ml-3">
                    Triple fire
                  </Typography>
                }
                secondary={
                  <Typography
                    sx={{ display: "inline" }}
                    className="ml-4"
                    component="span"
                    variant="body1"
                    color="text.primary"
                  >
                    Ali Connors Ali Connors
                  </Typography>
                }
              />
            </Grid>
            <Grid item className=" mt-0 ">
              <Button
                variant="contained"
                className="absolute top-24 left-40 md:left-44"
              >
                rarrar
              </Button>
            </Grid>
          </Grid>
        </ListItem>

        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary="Summer BBQ"
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  to Scott, Alex, Jennifer
                </Typography>
                {" — Wish I could come, but I'm out of town this…"}
              </React.Fragment>
            }
          />
        </ListItem>
      </List>
    </div>
  )
}
