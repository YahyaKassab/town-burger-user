import React, { useEffect } from 'react'

function LoadingIcon() {
  return (
    <div className="text-center justify-content-center">
      <div className="spinner-border justify-content-center" role="status">
        <span className="sr-only"></span>
      </div>
    </div>
  )
}

export default LoadingIcon
