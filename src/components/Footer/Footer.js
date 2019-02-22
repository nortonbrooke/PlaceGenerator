import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
  return (<footer className='App-footer'>
    <a href='mailto:brooke@waidoe.com'>Contact</a> | <Link to='/terms-of-service'>Terms of Service</Link> | <Link to='/privacy-policy'>Privacy Policy</Link>
  </footer>)
}

export default Footer
