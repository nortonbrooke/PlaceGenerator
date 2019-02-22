import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
  return (<footer className='App-footer'>
    <a href='mailto:brooke@waidoe.com'>Contact</a>
    <Link to='/terms'>Terms</Link>
    <Link to='/privacy'>Privacy</Link>
  </footer>)
}

export default Footer
