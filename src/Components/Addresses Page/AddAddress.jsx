import { Button, CssBaseline, Grid, TextField } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { useImmer } from "use-immer"
import DispatchContext from "../../DispatchContext"
import MessageContext from "../../MessageContext"
import StateContext from "../../StateContext"
import Page from "../Page"

const AddAddress = () => {
  const navigate = useNavigate()
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)
  const message = useContext(MessageContext)
  const [address, setAddress] = useImmer({
    street: "",
    details: "",
  })
  const handleSubmit = () => {
    if (address.details != "" && address.street != "") {
      appDispatch({ type: "addAddress", value: address })
      message.success("Address Added Successfully")
      navigate("/01123334417/addresses")
      console.log(appState.addresses)
    } else {
      message.error("error adding the message")
      console.log(address)
    }
  }

  return (
    <Page container={true} nav={true} title="Add Address">
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
                label="Details"
                fullWidth
                placeholder="Next to Al Hayah market"
              />
            </Grid>
            {/* <Grid item xs={12}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3434.048390332364!2d32.270486815468644!3d30.604398298856538!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f8593adca965ed%3A0x907a5726147d0648!2sTown%20Burger%20-%20Ibrahim%20Salama%20Branch%202nd%20Branch!5e0!3m2!1sen!2seg!4v1675438899517!5m2!1sen!2seg"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </Grid> */}
            <Grid item xs={12}>
              <Button
                variant="contained"
                className="bg-red-800 px-7 py-3 font-bold"
                onClick={handleSubmit}
              >
                Add Address
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Page>
  )
}
export default AddAddress
