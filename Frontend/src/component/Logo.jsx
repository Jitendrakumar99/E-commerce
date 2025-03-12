import React from 'react'
import Lottie from 'lottie-react'
function Logo() {
  return (
	<Lottie
		autoplay
		loop
		path='/Logo.json'
		style={{width:"100px",height:"100px"}}
	/>
  )
}

export default Logo
