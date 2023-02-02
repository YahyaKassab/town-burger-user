import { Grid, Typography } from "@mui/material"
import React, { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import Page from "../Page"
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye"
import Box from "@mui/material/Box"
import Stepper from "@mui/material/Stepper"
import Step from "@mui/material/Step"
import StepLabel from "@mui/material/StepLabel"
import StepContent from "@mui/material/StepContent"
import Button from "@mui/material/Button"
import Paper from "@mui/material/Paper"
import DispatchContext from "../../DispatchContext"
import StateContext from "../../StateContext"
import MessageContext from "../../MessageContext"

const steps = [
  {
    label: "Prepairing",
    description: `The order is placed and is being prepared right now.
    It will be out for delivery soon`,
  },
  {
    label: "Out",
    description:
      "The order is ready and is out for delivery.You will be expecting a phone call soon",
  },
  {
    label: "Delivered",
    description: `The Order Was Successfully delivered to the given address`,
  },
]
const TrackOrder = () => {
  const { index } = useParams()
  const navigate = useNavigate()
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)
  const message = useContext(MessageContext)
  const [activeStep, setActiveStep] = React.useState(
    appState.orders[index] ? appState.orders[index].state : -1
  )
  useEffect(() => {
    if (activeStep == -1) {
      navigate("/")
      console.log("error")
      message.warning("This order doesnt exist")
    } else {
      console.log("active step")
      console.log(activeStep)
      console.log("state:")
      console.log(appState.orders[index].state)
    }
  }, [activeStep])

  const handleNext = () => {
    appDispatch({
      type: "orderStep",
      value: { index, step: activeStep == 1 ? activeStep + 2 : activeStep + 1 },
    })
    setActiveStep((prevActiveStep) =>
      prevActiveStep == 1 ? prevActiveStep + 2 : prevActiveStep + 1
    )
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  return (
    <Page title="Track Order" container={true} nav={true}>
      <div className="justify-center">
        <Box sx={{ maxWidth: 400 }} className="mt-10 mx-auto">
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={index}>
                <StepLabel
                  optional={
                    index === 2 ? (
                      <Typography variant="caption">Last step</Typography>
                    ) : null
                  }
                >
                  <Typography variant="h3">{step.label}</Typography>
                </StepLabel>
                <StepContent>
                  <Typography variant="h5">{step.description}</Typography>
                  <Box sx={{ mb: 2 }}>
                    <div>
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 1, mr: 1, py: 3, px: 4 }}
                      >
                        <Typography variant="h4">
                          {" "}
                          {index === steps.length - 1 ? "Finish" : "Continue"}
                        </Typography>
                      </Button>
                      <Button
                        disabled={index === 0}
                        onClick={handleBack}
                        sx={{ mt: 1, mr: 1, py: 3, px: 4 }}
                      >
                        <Typography variant="h4">Back</Typography>
                      </Button>
                    </div>
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </Box>
      </div>
    </Page>
  )
}
export default TrackOrder
// <Page container={true} nav={true} title="Track Order">
{
  /* <Grid container direction={"column"}>
        <Grid
          item
          xs={12}
          className="text-center justify-center"
          style={{ marginTop: "5%" }}
        >
          <Grid container spacing={0} direction={"column"}>
            <Grid item xs={4}>
              <Grid container className="justify-center">
                <Grid item xs={8}>
                  <Grid container className="justify-center">
                    <Grid item xs={6} lg={4}>
                      <Typography variant="h4">Being Prepared</Typography>
                    </Grid>
                    <Grid item xs={6} lg={4}>
                      nigga
                    </Grid>
                    <Grid item xs={0} lg={4}></Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Grid container className="justify-center">
                <Grid item xs={8}>
                  <Grid container className="justify-center">
                    <Grid item xs={6} lg={4}>
                      <Typography variant="h4">Out For Delivery</Typography>
                    </Grid>
                    <Grid item xs={6} lg={4}>
                      <PanoramaFishEyeIcon />
                    </Grid>
                    <Grid item xs={0} lg={4}></Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Grid container className="justify-center">
                <Grid item xs={8}>
                  <Grid container className="justify-center">
                    <Grid item xs={6} lg={4}>
                      <Typography variant="h4">Delivered</Typography>
                    </Grid>
                    <Grid item xs={6} lg={4}>
                      <PanoramaFishEyeIcon />
                    </Grid>
                    <Grid item xs={0} lg={4}></Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid> */
}

{
  /* </Page> */
}
