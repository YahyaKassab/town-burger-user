import {
  Card,
  CardMedia,
  CardActions,
  CardContent,
  Button,
  Typography,
  CardHeader,
} from "@mui/material"
import React, { useContext, useState } from "react"
import { useNavigate } from "react-router"
import IconButton from "@mui/material/IconButton"
import AddIcon from "@mui/icons-material/Add"
import RemoveIcon from "@mui/icons-material/Remove"
import DispatchContext from "../../DispatchContext"
export default function MostFamousItem(props) {
  const appDispatch = useContext(DispatchContext)
  const [qty, setQty] = useState(0)
  const navigate = useNavigate()
  const meal = props.meal

  //handle - button
  //description doesnt show
  const handleRemove = () => {
    if (qty > 0) setQty(qty - 1)
  }
  const addToCart = () => {
    appDispatch({ type: "addToCart", value: { meal, qty } })
  }

  return (
    <>
      <Card sx={{ maxWidth: 345, borderRadius: 12 }}>
        <CardMedia>
          <img src={meal.image} width={"100%"} alt="" />
        </CardMedia>
        <CardContent>
          <Typography
            variant="h5"
            gutterBottom
            className="my-auto text-gray-800"
          >
            {meal.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {meal.description}
          </Typography>
        </CardContent>
        <CardActions className="justify-center">
          <div className="flex justify-around space-x-10 md:space-x-5">
            <Typography variant="h5" className="my-auto text-gray-800">
              {qty}
            </Typography>
            <div className="flex flex-col justify-center space-y-2">
              <IconButton onClick={() => setQty(qty + 1)}>
                <AddIcon fontSize="large" />
              </IconButton>
              <IconButton onClick={handleRemove}>
                <RemoveIcon fontSize="large" />
              </IconButton>
            </div>
            <Button
              onClick={addToCart}
              variant={qty == 0 ? "outlined" : "contained"}
              disabled={qty == 0}
              className={`m-3 border-black ${
                qty == 0 ? "text-black" : "contained bg-red-800"
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
