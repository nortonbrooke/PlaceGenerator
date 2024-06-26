import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
  return (<footer className='footer'>
    <a href='mailto:nortonbrooke60@gmail.com'>Contact</a>
    <Link to='/terms'>Terms</Link>
    <Link to='/privacy'>Privacy</Link>
  </footer>)
}

export default Footer
