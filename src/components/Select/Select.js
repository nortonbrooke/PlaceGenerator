import React from 'react'
import shortid from 'shortid'
import CaretLight from '../../assets/caret-light.svg'
import CaretDark from '../../assets/caret-dark.svg'
import './Select.css'

const Selector = ({
  title,
  selected,
  onChange,
  children,
  style,
  nightMode
}) => {
  return (<div className='App-select' style={style}>
    <select
      value={selected}
      id={shortid.generate()}
      title={title}
      onChange={(e) => onChange(e.target.value)}>
      {children}
    </select>
    <img
      src={nightMode ? CaretLight : CaretDark}
      height={11}
      alt=''
      className='caret'
    />
  </div>)
}

export default Selector
