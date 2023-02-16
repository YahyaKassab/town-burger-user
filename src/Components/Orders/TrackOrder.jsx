import { Grid, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import Page from '../Page'
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import StepContent from '@mui/material/StepContent'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import DispatchContext from '../../DispatchContext'
import StateContext from '../../StateContext'
import MessageContext from '../../MessageContext'

const steps = [
  {
    label: 'Prepairing',
    description: `The order is placed and is being prepared right now.
    It will be out for delivery soon`,
  },
  {
    label: 'Out',
    description:
      'The order is ready and is out for delivery.You will be expecting a phone call soon',
  },
  {
    label: 'Delivered',
    description: `The Order Was Successfully delivered to the given address`,
  },
]
const TrackOrder = () => {
  const { index } = useParams()
  const navigate = useNavigate()
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)
  const message = useContext(MessageContext)
  const [order, setOrder] = useState({})
  const [activeStep, setActiveStep] = React.useState(0)
  useEffect(() => {
    console.log('index ' + index)
    appDispatch({ type: 'fetchOrders' })
    if (activeStep == -1) {
      navigate('/')
      console.log('error')
      message.warning('This order doesnt exist')
    } else {
      console.log('active step')
      console.log(activeStep)
    }
  }, [])
  useEffect(() => {
    if (appState.orders.length > 0) {
      console.log('orders fetched')
      console.log(appState.orders[index])
      setActiveStep(appState.orders[index].state)
    }
  }, [appState.orders])
  return (
    <Page title="Track Order" container={true} nav={true}>
      <div className="justify-center">
        <Box sx={{ maxWidth: 400 }} className="mt-10 mx-auto">
          <Stepper
            activeStep={activeStep == 2 ? 3 : activeStep}
            orientation="vertical"
          >
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
                  <Box sx={{ mb: 2 }}></Box>
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
