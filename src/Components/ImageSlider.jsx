import { useState } from "react"
import "./home.css"
import ImageSlide from "./ImageSlide"

const ImageSlider = (props) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  console.log("path:")
  console.log(props.slides[currentIndex].url)
  return (
    <div>
      <ImageSlide
        slides={props.slides}
        index={currentIndex}
        setIndex={setCurrentIndex}
      />
    </div>
  )
}
export default ImageSlider
