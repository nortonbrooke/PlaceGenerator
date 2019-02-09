import React from 'react'
import shortid from 'shortid'
import './Select.css'

const Selector = ({
  title,
  selected,
  onChange,
  children,
  style
}) => {
  return (
    <select className='App-select'
      style={style}
      value={selected}
      id={shortid.generate()}
      title={title}
      onChange={(e) => onChange(e.target.value)}>
      {children}
    </select>
  )
}

export default Selector
