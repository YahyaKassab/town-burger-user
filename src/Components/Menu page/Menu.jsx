import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Page from '../Page'
import { Grid } from '@mui/material'
import MealItem from './MealItem'
import Cart from './Cart'
import axios from 'axios'
import MessageContext from '../../MessageContext'
import LoadingIcon from '../LoadingIcon'
import StateContext from '../../StateContext'
import DispatchContext from '../../DispatchContext'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

export default function Menu() {
  const message = useContext(MessageContext)
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)
  const [isFetching, setIsFetching] = useState(true)
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    const fetch = async () => {
      const response = await axios
        .get('/Menu/GetFullMenu')
        .then((res) => {
          console.log('success fetching the menu')
          appDispatch({ type: 'setMenu', value: res.data.result })
        })
        .catch((res) => {
          console.log('failed fetching the menu')
          console.log(res)
          message.error(res.response)
        })
      setIsFetching(false)
    }
    fetch()
  }, [])

  if (isFetching) return <LoadingIcon />

  return (
    <>
      <Page container={false} nav={true} title={'Our Delicious menu'}>
        <Grid container className="mt-16 justify-center">
          <Grid item xs={12} lg={10}>
            <Grid container direction={'row-reverse'} spacing={3}>
              <Grid item xs={12} md={6} lg={4}>
                {appState.loggedIn ? <Cart /> : ''}
              </Grid>
              <Grid item xs={12} md={6} lg={8}>
                <Box sx={{ width: '100%' }}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs
                      value={value}
                      onChange={handleChange}
                      variant="scrollable"
                      textColor="secondary"
                      indicatorColor="secondary"
                      aria-label="basic tabs example"
                      scrollButtons
                      allowScrollButtonsMobile
                    >
                      {appState.menuTypes.map((type, index) => (
                        <Tab
                          key={index}
                          label={type}
                          className="font-bold text-red-800"
                          {...a11yProps(index)}
                        />
                      ))}
                    </Tabs>
                  </Box>
                  {appState.menuTypes.map((type, index) => (
                    <TabPanel value={value} key={index} index={index}>
                      <Grid
                        container
                        spacing={4}
                        className="my-20 justify-center"
                      >
                        {appState.menu.map((item, index) => {
                          if (
                            item.type.toLowerCase() == type.toLowerCase() ||
                            type == 'Full Menu'
                          )
                            return (
                              <Grid item key={index} lg={6} xs={12} xl={4}>
                                <MealItem item={item} />
                              </Grid>
                            )
                          else return ''
                        })}
                      </Grid>
                    </TabPanel>
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Page>
    </>
  )
}
