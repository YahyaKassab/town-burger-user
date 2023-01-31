import React, { useState } from "react"
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

export default function Cart() {
  const count = [1, 2]
  const [qty, setQty] = useState(1)
  const [showEdit, setShowEdit] = useState(true)
  const handleEdit = (index) => {
    setShowEdit(false)
  }
  const handleConfirm = (index) => {
    setShowEdit(true)
  }
  const handleRemove = (index) => {
    if (qty > 0) setQty(qty - 1)
  }
  return (
    <div className="justify-center ml-12">
      <Typography variant="h3" className="my-3">
        Cart
      </Typography>
      <List sx={{ width: "100%" }}>
        {count.map((item, index) => (
          <>
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
                      <div className="flex flex-col">
                        <Typography
                          sx={{ display: "inline" }}
                          className="ml-9"
                          component="span"
                          variant="h3"
                          color="text.primary"
                        >
                          {qty}
                        </Typography>
                        <div className="flex flex-row justify-center space-x-5 mt-2">
                          <Button
                            variant="contained"
                            className="bg-red-900  h-12 self-center"
                            style={{ borderRadius: 10 }}
                          >
                            Delete
                          </Button>

                          {showEdit ? (
                            <Button
                              variant="contained"
                              className=" bg-blue-800"
                              onClick={handleEdit}
                              style={{ borderRadius: 10 }}
                            >
                              Edit
                            </Button>
                          ) : (
                            <div className="flex">
                              <div className="flex flex-col justify-center space-y-1 mx-5">
                                <IconButton onClick={() => setQty(qty + 1)}>
                                  <AddIcon fontSize="large" />
                                </IconButton>
                                <IconButton onClick={handleRemove}>
                                  <RemoveIcon fontSize="large" />
                                </IconButton>
                              </div>
                              <Button
                                variant="contained"
                                className=" bg-blue-800 h-12 self-center"
                                onClick={handleConfirm}
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
        ))}
      </List>
    </div>
  )
}
