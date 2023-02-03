import { Button, CssBaseline, Grid, TextField } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { useImmer } from "use-immer"
import DispatchContext from "../../DispatchContext"
import MessageContext from "../../MessageContext"
import StateContext from "../../StateContext"
import Page from "../Page"

const EditAddress = () => {
  const { index } = useParams()
  const navigate = useNavigate()
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)
  const message = useContext(MessageContext)
  const [address, setAddress] = useImmer(appState.addresses[index])
  const handleSubmit = () => {
    if (address.details != "" && address.street != "") {
      appDispatch({ type: "editAddress", value: { index, data: address } })
      message.success("Address Updated Successfully")
      navigate("/01123334417/addresses")
    } else {
      message.error("error editing the message")
      console.log(address)
    }
  }
  return (
    <Page container={true} nav={true} title="Edit Address">
      <CssBaseline />
      <Grid container className="mt-12">
        <Grid item xs={12} md={8} lg={6} className="mx-auto">
          <Grid container spacing={4}>
            <Grid item xs={12} lg={6}>
              <TextField
                disabled
                required
                label="Country"
                fullWidth
                defaultValue="Egypt"
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                disabled
                required
                label="City"
                fullWidth
                defaultValue="Ismailia"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                onChange={(e) =>
                  setAddress((draft) => {
                    draft.street = e.target.value
                  })
                }
                value={address.street}
                label="Street"
                fullWidth
                placeholder="Fox street"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                onChange={(e) =>
                  setAddress((draft) => {
                    draft.details = e.target.value
                  })
                }
                value={address.details}
                label="Details"
                fullWidth
                placeholder="Next to Al Hayah market"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                className="bg-red-800 px-7 py-3 font-bold"
                onClick={handleSubmit}
              >
                Update Address
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Page>
  )
}
export default EditAddress
