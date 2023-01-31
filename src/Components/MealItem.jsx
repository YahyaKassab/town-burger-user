import {
  Card,
  CardMedia,
  CardActions,
  CardContent,
  Button,
  Typography,
  CardHeader,
} from "@mui/material"
import React, { useState } from "react"
import { useNavigate } from "react-router"
import IconButton from "@mui/material/IconButton"
import AddIcon from "@mui/icons-material/Add"
import RemoveIcon from "@mui/icons-material/Remove"
export default function MostFamousItem(props) {
  const [count, setCount] = useState(0)
  const navigate = useNavigate()
  const meal = props.meal
  console.log("meal:")
  console.log(meal)

  //handle - button
  //description doesnt show

  return (
    <>
      <Card sx={{ maxWidth: 400, borderRadius: 12 }}>
        <CardMedia>
          <img src={meal.image} width={"100%"} alt="" />
        </CardMedia>
        <CardContent>
          <Typography variant="h4" className=" font-bold">
            {meal.title}
          </Typography>
          <Typography variant="body1" className="">
            {meal.description}
          </Typography>
        </CardContent>
        <CardActions className=" justify-center">
          <div className="flex justify-center space-x-5">
            <Typography variant="h5" className="my-auto text-gray-800">
              {count}
            </Typography>
            <div className="flex flex-col justify-center space-y-2">
              <IconButton onClick={() => setCount(count + 1)}>
                <AddIcon fontSize="large" />
              </IconButton>
              <IconButton>
                <RemoveIcon fontSize="large" />
              </IconButton>
            </div>
            <Button
              onClick={() => navigate(meal.action)}
              variant="contained"
              className=" bg-red-800 m-3"
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
