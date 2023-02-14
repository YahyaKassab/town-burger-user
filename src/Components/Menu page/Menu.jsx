import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Page from '../Page'
import { Grid } from '@mui/material'
import MealItem from './MealItem'
import Cart from './Cart'

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
  const [menu, setMenu] = useState([
    {
      image: 'SliderImages\\burger1.jpg',
      title: 'title1',
      description: 'descrition',
      price: 30,
    },
    {
      image: 'SliderImages\\burger2.jpg',
      title: 'title2',
      description: 'descrition',
      price: 30,
    },
    {
      image: 'SliderImages\\burger3.jpg',
      title: 'title3',
      description: 'descrition',
      price: 30,
    },
    {
      image: 'SliderImages\\burger1.jpg',
      title: 'title4',
      description: 'descrition',
      price: 30,
    },
    {
      image: 'SliderImages\\burger2.jpg',
      title: 'title5',
      description: 'descrition',
      price: 30,
    },
    {
      image: 'SliderImages\\burger3.jpg',
      title: 'title',
      description: 'descrition',
      price: 30,
    },
    {
      image: 'SliderImages\\burger1.jpg',
      title: 'title',
      description: 'descrition',
      price: 30,
    },
    {
      image: 'SliderImages\\burger2.jpg',
      title: 'title',
      description: 'descrition',
      price: 30,
    },
    {
      image: 'SliderImages\\burger3.jpg',
      title: 'title',
      description: 'descrition',
      price: 30,
    },
    {
      image: 'SliderImages\\burger1.jpg',
      title: 'title',
      description: 'descrition',
      price: 30,
    },
    {
      image: 'SliderImages\\burger2.jpg',
      title: 'title',
      description: 'descrition',
      price: 30,
    },
    {
      image: 'SliderImages\\burger3.jpg',
      title: 'title',
      description: 'descrition',
      price: 30,
    },
    {
      image: 'SliderImages\\burger1.jpg',
      title: 'title',
      description: 'descrition',
      price: 30,
    },
    {
      image: 'SliderImages\\burger2.jpg',
      title: 'title',
      description: 'descrition',
      price: 30,
    },
    {
      image: 'SliderImages\\burger3.jpg',
      title: 'title',
      description: 'descrition',
      price: 30,
    },
    {
      image: 'SliderImages\\burger1.jpg',
      title: 'title',
      description: 'descrition',
      price: 30,
    },
    {
      image: 'SliderImages\\burger2.jpg',
      title: 'title',
      description: 'descrition',
      price: 30,
    },
    {
      image: 'SliderImages\\burger3.jpg',
      title: 'title',
      description: 'descrition',
      price: 30,
    },
    {
      image: 'SliderImages\\burger1.jpg',
      title: 'title',
      description: 'descrition',
      price: 30,
    },
    {
      image: 'SliderImages\\burger2.jpg',
      title: 'title',
      description: 'descrition',
      price: 30,
    },
    {
      image: 'SliderImages\\burger3.jpg',
      title: 'title',
      description: 'descrition',
      price: 30,
    },
    {
      image: 'SliderImages\\burger1.jpg',
      title: 'title',
      description: 'descrition',
      price: 30,
    },
    {
      image: 'SliderImages\\burger2.jpg',
      title: 'title',
      description: 'descrition',
      price: 30,
    },
    {
      image: 'SliderImages\\burger3.jpg',
      title: 'title',
      description: 'descrition',
      price: 30,
    },
    {
      image: 'SliderImages\\burger1.jpg',
      title: 'title',
      description: 'descrition',
      price: 30,
    },
    {
      image: 'SliderImages\\burger2.jpg',
      title: 'title',
      description: 'descrition',
      price: 30,
    },
    {
      image: 'SliderImages\\burger3.jpg',
      title: 'title',
      description: 'descrition',
      price: 30,
    },
    {
      image: 'SliderImages\\burger1.jpg',
      title: 'title',
      description: 'descrition',
      price: 30,
    },
    {
      image: 'SliderImages\\burger2.jpg',
      title: 'title',
      description: 'descrition',
      price: 30,
    },
    {
      image: 'SliderImages\\burger3.jpg',
      title: 'title',
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
  }, [])

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
