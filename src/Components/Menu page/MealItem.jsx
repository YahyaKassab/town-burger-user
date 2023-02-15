import {
  Card,
  CardMedia,
  CardActions,
  CardContent,
  Button,
  Typography,
  CardHeader,
} from '@mui/material'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import DispatchContext from '../../DispatchContext'
import MessageContext from '../../MessageContext'
import StateContext from '../../StateContext'
export default function MostFamousItem(props) {
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)
  const message = useContext(MessageContext)
  const [quantity, setQuantity] = useState(0)
  const navigate = useNavigate()
  const item = props.item
  // const index = props.index

  const handleRemove = () => {
    if (quantity > 0) setQuantity(quantity - 1)
  }
  const addToCart = () => {
    if (appState.loggedIn) {
      console.log('added to cart')
      appDispatch({
        type: 'addToCart',
        value: { itemId: item.id, quantity, description: '' },
      })
      console.log(appState.cart)
    } else {
      navigate('/login')
      message.info('Login first')
    }
    // appDispatch({
    //   type: "ensurePrice",
    //   value: index,
    // })
  }

  return (
    <>
      <Card sx={{ maxWidth: 345, borderRadius: 12 }}>
        <CardMedia>
          <img src={`SliderImages\\${item.id}.jpg`} width={'100%'} alt="" />
        </CardMedia>
        <CardContent>
          <Typography
            variant="h5"
            gutterBottom
            className="my-auto text-gray-800"
          >
            {item.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            className="inline-block m-5"
          >
            {item.description}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            className="inline-block ml-12"
          >
            {item.price} $
          </Typography>
        </CardContent>
        <CardActions className="justify-center">
          <div className="flex justify-around space-x-10 md:space-x-5">
            <Typography variant="h5" className="my-auto text-gray-800">
              {quantity}
            </Typography>
            <div className="flex flex-col justify-center space-y-2">
              <IconButton onClick={() => setQuantity(quantity + 1)}>
                <AddIcon fontSize="large" />
              </IconButton>
              <IconButton onClick={handleRemove}>
                <RemoveIcon fontSize="large" />
              </IconButton>
            </div>
            <Button
              onClick={addToCart}
              variant={quantity == 0 ? 'outlined' : 'contained'}
              disabled={quantity == 0}
              className={`m-3 border-black ${
                quantity == 0 ? 'text-black' : 'contained bg-red-800'
              }`}
              style={{ borderRadius: 20 }}
            >
              Add to cart
            </Button>
          </div>
        </CardActions>
      </Card>
    </>
  )
}
