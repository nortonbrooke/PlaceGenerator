import React from 'react'
import ExpandLight from '../../assets/expand-light.svg'
import ExpandDark from '../../assets/expand-dark.svg'
import MailchimpSubscribe from 'react-mailchimp-subscribe'
import SubscribeForm from '../SubscribeForm'
import { Constants } from '../../util'
import classnames from 'classnames'
import './Footer.css'

const Footer = ({ nightMode, showFooter, toggleFooter }) => {
  return (<div className='App-footer'>
    <div className={classnames('toggle', { closed: !showFooter })}
      onClick={() => toggleFooter()}>
      <img src={nightMode ? ExpandLight : ExpandDark}
        alt='Toggle footer'
        height={28}
      />
    </div>
    {showFooter && <footer>
      <MailchimpSubscribe
        url={Constants.MAILCHIMP_URL}
        render={({ subscribe, status, message }) => (
          <SubscribeForm
            status={status}
            message={message}
            onValidated={formData => subscribe(formData)}
          />
        )}
      />
      <div className='contact'>
        <button className='small' title='Contact Waidoe'>
          <a href='mailto:contact.waidoe@gmail.com'>Contact</a>
        </button>
      </div>
      <div style={{ color: 'transparent' }}>&copy; Waidoe 2019</div>
    </footer>}
  </div>)
}

export default Footer
