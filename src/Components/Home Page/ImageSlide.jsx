import { useState } from 'react'
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from '@mui/material'
import FiberManualRecordOutlinedIcon from '@mui/icons-material/FiberManualRecordOutlined'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import './home.css'
import { useNavigate } from 'react-router'
import LoadingIcon from '../LoadingIcon'
const rightArrowStyles = {
  position: 'absolute',
  top: '50%',
  transform: 'translate(0, -50%)',
  right: '0px',
  borderRadius: 10,
  fontSize: '45px',
  color: '#fff',
  zIndex: 1,
  cursor: 'pointer',
}

const leftArrowStyles = {
  position: 'absolute',
  top: '50%',
  transform: 'translate(0, -50%)',
  left: '0px',
  borderRadius: 10,
  fontSize: '45px',
  color: '#fff',
  zIndex: 1,
  cursor: 'pointer',
}

const ImageSlide = (props) => {
  const navigate = useNavigate()
  const [showCard, setShowCard] = useState(false)

  const toggleCard = () => {
    setShowCard(!showCard)
  }
  const goToPrevious = () => {
    const isFirstSlide = props.index == 0
    const newIndex = isFirstSlide ? props.slides.length - 1 : props.index - 1
    props.setIndex(newIndex)
  }
  const goToNext = () => {
    const isLastSlide = props.index == props.slides.length - 1
    const newIndex = isLastSlide ? 0 : props.index + 1
    props.setIndex(newIndex)
  }
  const handleClick = (slideIndex, e) => {
    e.preventDefault()
    props.setIndex(slideIndex)
  }

  if (props.isFetching) return <LoadingIcon />
  return (
    <>
      <div className={`top-left`} id="slider">
        {showCard ? (
          <Card className={`text-white w-60  xl:w-80`}>
            <CardContent>
              <Typography
                variant="h4"
                className="text-bold font-sans text-black"
              >
                {props.slides[props.index].item1.title}
              </Typography>
              <Typography
                variant="body1"
                className="hidden sm:block mt-2 text-gray-700"
              >
                {props.slides[props.index].item1.description}
              </Typography>
            </CardContent>
            <CardActions className="flex justify-end">
              <Button onClick={() => toggleCard()} size="large">
                hide
              </Button>
              <Button
                variant="contained"
                onClick={() => navigate(`/menu`)}
                className="text-bold bg-red-800"
              >
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
      <div
        onClick={() => goToPrevious()}
        className="bg-gray-600 bg-opacity-50 px-4 py-8 mx-0"
        style={leftArrowStyles}
      >
        ❰
      </div>
      <div
        className="bg-gray-600 bg-opacity-50 px-4 py-8 mx-0"
        onClick={() => goToNext()}
        style={rightArrowStyles}
      >
        ❱
      </div>
      <img
        src={`SliderImages\\1.jpg`}
        className="image"
        style={{ borderRadius: 10 }}
        alt=""
      />
      <div className="flex flex-row justify-center space-x-3">
        {props.slides != null
          ? props.slides.map((slide, slideIndex) => (
              <a
                key={slideIndex}
                href="#"
                className="text-black no-underline"
                onClick={(e) => handleClick(slideIndex, e)}
              >
                <div className="" key={slideIndex}>
                  {props.index == slideIndex ? (
                    <FiberManualRecordIcon fontSize="large" />
                  ) : (
                    <FiberManualRecordOutlinedIcon fontSize="large" />
                  )}
                </div>
              </a>
            ))
          : ''}
      </div>
    </>
  )
}
export default ImageSlide
