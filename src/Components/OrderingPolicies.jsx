import { Grid, Typography } from "@mui/material"
import { useState } from "react"
import Page from "./Page"

const OrderingPolicies = () => {
  return (
    <Page nav={true} container={true} title={"Ordering Policies"}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h4">Policies</Typography>
        </Grid>
      </Grid>
    </Page>
  )
}
export default OrderingPolicies
