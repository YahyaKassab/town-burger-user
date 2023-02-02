import { Button, Grid, TextField, Typography } from "@mui/material"
import { useState } from "react"
import Page from "../Page"

const AddComplaint = () => {
  return (
    <Page nav={true} container={true} title={"Add Your Complaint"}>
      <Grid container direction={"column"} spacing={4}>
        <Grid item xs={6}>
          <Typography variant="h4" className=" font-sans text-center">
            Add Your Complaint here
          </Typography>
        </Grid>
        <form>
          <Grid container spacing={6} direction="column" className="mt-10">
            <Grid item xs={6}>
              <TextField
                id="Title"
                label="Title"
                placeholder="Title"
                fullWidth
                multiline
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="Description"
                label="Description"
                placeholder="Description"
                multiline
                fullWidth
                rows={5}
              />
            </Grid>
            <Grid item xs={6}>
              <Button variant="contained" className="bg-red-800 text-white">
                Submit Complaint
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Page>
  )
}
export default AddComplaint
