import {
  Card,
  CardMedia,
  CardActions,
  CardContent,
  Button,
  Typography,
  CardHeader,
} from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router'
export default function MostFamousItem(props) {
  const navigate = useNavigate()
  const meal = props.meal.item1
  return (
    <>
      <Card sx={{ maxWidth: 400, borderRadius: 12 }}>
        <CardMedia>
          <img src={`SliderImages\\${meal.id}.jpg`} width={'100%'} alt="" />
        </CardMedia>
        <CardContent>
          <Typography variant="h4" className=" font-bold">
            {meal.title}
          </Typography>
          <Typography variant="body1" className="">
            {meal.description}
          </Typography>
          <Typography variant="body1" className="">
            {meal.price} $
          </Typography>
        </CardContent>
        <CardActions className=" justify-end">
          <Button
            onClick={() => navigate('/menu')}
            variant="contained"
            className=" bg-red-800 m-3"
          >
            Order now
          </Button>
        </CardActions>
      </Card>
    </>
  )
}
