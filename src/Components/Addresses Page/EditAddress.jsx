import { Button, CssBaseline, Grid, TextField } from '@mui/material'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useImmer } from 'use-immer'
import DispatchContext from '../../DispatchContext'
import MessageContext from '../../MessageContext'
import StateContext from '../../StateContext'
import LoadingIcon from '../LoadingIcon'
import Page from '../Page'

const EditAddress = () => {
  const { addressid } = useParams()
  const navigate = useNavigate()
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)
  const message = useContext(MessageContext)
  const [address, setAddress] = useImmer({})
  const [isFetching, setIsFetching] = useState(true)

  useEffect(() => {
    //fetch the address
    const fetch = async () => {
      await axios
        .get(`/Customer/GetAddressById?id=${addressid}`)
        .then((res) => {
          console.log(res.data.message)
          console.log(res.data.result)
          setAddress(res.data.result)
          setIsFetching(false)
        })
        .catch((res) => {
          console.log('Failed to fetch the address')
        })
    }
    fetch()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (address.street != '') {
      await axios
        .put(`/Customer/UpdateAddress`, {
          Id: addressid,
          Street: address.street,
          Details: address.details,
        })
        .then((res) => {
          console.log(res.data.message)
          message.success(res.data.message)
          console.log(res.data)
        })
        .catch((res) => {
          console.log('failed')
          console.log(res)
        })
    }
  }

  if (isFetching) return <LoadingIcon />
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
