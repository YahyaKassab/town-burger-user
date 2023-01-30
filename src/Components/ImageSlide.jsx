import { useState } from "react"
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@mui/material"
import "./home.css"

const ImageSlide = (props) => {
  const [slides, setSlides] = useState(props.slides)
  const [showCard, setShowCard] = useState(false)
  const toggleCard = () => {
    setShowCard(!showCard)
  }
  return (
    <>
      <div className="slider-image relative">
        <div className={`${props.slides[props.index].position}`}>
          {showCard ? (
            <Card
              // sx={{ minWidth: 240, maxWidth: 400, }}
              // style={{  , width: 200 }}
              className={`text-white w-60  xl:w-80`}
            >
              <CardContent>
                <Typography
                  variant="h4"
                  className="text-bold font-sans text-black"
                >
                  Triple Fire
                </Typography>
                <Typography
                  variant="body1"
                  className="hidden sm:block mt-2 text-gray-700"
                >
                  cheese Lorem ipsum dolor sit, amet consect
                </Typography>
              </CardContent>
              <CardActions className="flex justify-end">
                <Button onClick={() => toggleCard()} size="large">
                  hide
                </Button>
                <Button variant="contained" className="text-bold bg-red-800">
                  Order now
                </Button>
              </CardActions>
            </Card>
          ) : (
            <Button
              onClick={() => toggleCard()}
              variant="outlined"
              size="large"
              className=" border-cyan-50"
            >
              <Typography variant="h6" className="text-white">
                Details
              </Typography>
            </Button>
          )}
        </div>
        <img src={props.slides[props.index].url} className="image" alt="" />
      </div>
    </>
  )
}
export default ImageSlide
