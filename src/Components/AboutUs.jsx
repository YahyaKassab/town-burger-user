import { Grid, Typography } from "@mui/material"
import { useState } from "react"
import Page from "./Page"

const AboutUs = () => {
  return (
    <Page nav={true} container={true} title={"Add Your Complaint"}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h4">About us</Typography>
        </Grid>
      </Grid>
    </Page>
  )
}
export default AboutUs
