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
  const [isFetching, setIsFetching] = useState(false)
  const [menu, setMenu] = useState([
    {
      id: 1,
      imageSource: 'SliderImages\\burger1.jpg',
      type: 'beef burger',
      title: 'title1',
      description: 'descrition',
      price: 30,
    },
  ])
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    const fetch = async () => {
      setIsFetching(true)
      const response = await axios
        .get('/Menu/GetFullMenu')
        .then((res) => {
          setMenu(res.data.result)
          console.log(res.data)
        })
        .catch((res) => {
          message.error(res.response)
        })
      const cartResponse = await axios
        .get(`/Orders/GetCartByCustomerId?Id=${appState.user.id}`)
        .then((res) => {
          appDispatch({ type: 'setCart', value: res.data.result })
          console.log(res.data)
        })

      setIsFetching(false)
    }
    fetch()
  }, [])

  if (isFetching) return <LoadingIcon />

  return (
    <>
      <Page container={true} nav={true} title={'Our Delicious menu'}>
        <Grid container direction={'row-reverse'} spacing={3} className="mt-16">
          <Grid item xs={12} md={6} lg={4}>
            <Cart />
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
                  <Tab
                    label="Full Menu"
                    className="font-bold text-red-800"
                    {...a11yProps(0)}
                  />
                  <Tab
                    className="font-bold text-red-800"
                    label="Beef Burgers"
                    {...a11yProps(1)}
                  />
                  <Tab
                    className="font-bold text-red-800"
                    label="Chicken Burgers"
                    {...a11yProps(2)}
                  />
                  <Tab
                    className="font-bold text-red-800"
                    label="Kids Meals"
                    {...a11yProps(3)}
                  />
                  <Tab
                    className="font-bold text-red-800"
                    label="Drinks"
                    {...a11yProps(4)}
                  />
                  <Tab
                    className="font-bold text-red-800"
                    label="Side Meals"
                    {...a11yProps(5)}
                  />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <Grid container spacing={4} className="my-20 justify-center">
                  {menu.map((item, index) => (
                    <Grid item key={index} xl={4} lg={6} xs={12}>
                      <MealItem meal={item} />
                    </Grid>
                  ))}
                </Grid>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Grid container spacing={4} className="my-20 justify-center">
                  {menu.map((item, index) => (
                    <Grid item key={index} lg={4} md={6} xs={12}>
                      <MealItem meal={item} />
                    </Grid>
                  ))}
                </Grid>
              </TabPanel>
              <TabPanel value={value} index={2}>
                Item Three
              </TabPanel>
              <TabPanel value={value} index={3}>
                Item Three
              </TabPanel>
              <TabPanel value={value} index={4}>
                Item Three
              </TabPanel>
              <TabPanel value={value} index={5}>
                Item Three
              </TabPanel>
            </Box>
          </Grid>
        </Grid>
      </Page>
    </>
  )
}
