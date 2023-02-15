import { Button, CssBaseline, Grid, TextField } from '@mui/material'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useImmer } from 'use-immer'
import DispatchContext from '../../DispatchContext'
import MessageContext from '../../MessageContext'
import StateContext from '../../StateContext'
import Page from '../Page'

const AddAddress = () => {
  const navigate = useNavigate()
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)
  const message = useContext(MessageContext)
  const [address, setAddress] = useImmer({
    street: '',
    details: '',
  })
  const handleSubmit = async () => {
    if (address.details != '' && address.street != '') {
      const response = await axios
        .post('/Customer/AddAddress', {
          customerId: appState.user.id,
          details: address.details,
          street: address.street,
        })
        .then((res) => {
          message.success('Address Added Successfully')
          console.log(res.data)
          navigate('/addresses')
        })
        .catch((res) => {
          console.log('error')
          console.log(res)
          handleSubmit()
        })
    } else {
      message.error('Fields must not be blank')
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
