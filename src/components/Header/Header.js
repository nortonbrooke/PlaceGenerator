import React from 'react'
import LogoLight from '../../assets/logo-light.svg'
import LogoDark from '../../assets/logo-dark.svg'
import './Header.css'

const Header = ({ nightMode }) => {
  return <header className='App-header'>
    <img src={nightMode ? LogoLight : LogoDark}
      height={28}
      alt='waidoe'
      className='logo'
      title='way&#x2022;doe' />
  </header>
}

export default Header
