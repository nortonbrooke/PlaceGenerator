import React from 'react'
// import LogoLight from '../../assets/logo-light.svg'
// import LogoDark from '../../assets/logo-dark.svg'
import Moon from '../../assets/moon.svg'
import Sun from '../../assets/sun.svg'
import './Header.css'

const Header = ({ nightMode, setNightMode }) => {
  return <header className='App-header'
    onClick={() => setNightMode(!nightMode)}>
    {/* <img src={nightMode ? LogoLight : LogoDark}
      height={28}
      alt='waidoe'
      className='logo'
      title='way&#x2022;doe' /> */}
    <img src={nightMode ? Moon : Sun}
      height={28} width={28}
      alt={nightMode ? 'Moon' : 'Sun'}
      title='Switch mode'
      className='mode-icon' />
  </header>
}

export default Header
