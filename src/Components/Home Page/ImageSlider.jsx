import { useState } from "react"
import "./home.css"
import { Typography } from "@mui/material"
import ImageSlide from "./ImageSlide"

const ImageSlider = (props) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  console.log("path:")
  console.log(props.slides[currentIndex].url)
  return (
    <div>
      <div className="slider-image relative">
        <ImageSlide
          slides={props.slides}
          index={currentIndex}
          setIndex={setCurrentIndex}
        />
      </div>
    </div>
  )
}
export default ImageSlider
