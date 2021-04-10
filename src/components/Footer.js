import React from 'react'
import '../css/footer.css'
import { Typography } from '@material-ui/core'

function Footer() {
  return (
    <footer>
      <Typography variant='caption' component='span'>
        Energy Meter Dashboard &copy; 2021
      </Typography>
    </footer>
  )
}

export default Footer
