import React from 'react'
import { concat } from '../../util'
import './Slider.css'

const Slider = ({
  label,
  min,
  max,
  value,
  step,
  unit,
  asMultiple,
  onChange
}) => {
  return (
    <div className='slider'>
      <label>{label}</label>
      <div className='control'>
        <input
          type='range'
          step={step}
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
        />
      </div>
      <div className='control-value'>
        {asMultiple
          ? concat(value, unit)
          : `${value} ${unit}`}
      </div>
    </div>
  )
}

export default Slider
