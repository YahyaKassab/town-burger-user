import { Button, Grid, Rating, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { useContext, useState } from 'react'
import { useImmer } from 'use-immer'
import MessageContext from '../../MessageContext'
import StateContext from '../../StateContext'
import Page from '../Page'

const AddReview = () => {
  const appState = useContext(StateContext)
  const message = useContext(MessageContext)
  const [review, setReview] = useImmer({
    customerId: appState.user.id,
    title: '',
    description: '',
    rating: 0,
  })

  const handleSubmit = async (e) => {
    console.log('nigga')
    e.preventDefault()
    await axios
      .post(`/Customer/AddReview`, review)
      .then((res) => {
        message.success(res.data.message)
        console.log(res.data)
      })
      .catch((res) => {
        message.error('failed')
      })
  }

  return (
    <Page nav={true} container={true} title={'Add Your Complaint'}>
      <Grid container direction={'row'} spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h4" className=" font-sans text-center">
            Add Your Complaint here
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            // className="mx-12"
            id="Title"
            label="Title"
            placeholder="Title"
            fullWidth
            multiline
            onChange={(e) => {
              setReview((draft) => {
                draft.title = e.target.value
              })
              console.log(review.title)
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="Description"
            label="Description"
            placeholder="Description"
            multiline
            fullWidth
            rows={5}
            onChange={(e) => {
              setReview((draft) => {
                draft.description = e.target.value
              })
              console.log(review.description)
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Rating
            name="simple-controlled"
            value={review.rating}
            size="large"
            precision={0.5}
            onChange={(e, newValue) => {
              setReview((draft) => {
                draft.rating = newValue
              })
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            onClick={handleSubmit}
            className="bg-red-800 text-white"
          >
            Submit Review
          </Button>
        </Grid>
      </Grid>
    </Page>
  )
}
export default AddReview
