import React from 'react'

const SubscribeForm = ({ status, message, onValidated }) => {
  let email
  const submit = () =>
    email && email.value.indexOf('@') > -1 &&
    onValidated({
      EMAIL: email.value
    })

  return (
    <div className='App-subscribe-form'>
      {!status &&
        <div className='message'>
          Exciting things are in the works, sign up for announcements
      </div>}
      {status === 'sending' && (
        <div className='message'>
          Sending...
        </div>
      )}
      {status === 'error' && (
        <div
          className='message error'
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
      {status === 'success' && (
        <div
          className='message success'
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
      <div className='form'>
        <input
          ref={node => (email = node)}
          type='email'
          placeholder='Your email'
          onKeyUp={(e) => e.keyCode === 13 && submit()}
        />
        <button className='small' title='Subscribe to Waidoe News'
          onClick={submit}>
          Subscribe
        </button>
      </div>
    </div>
  )
}

export default SubscribeForm
