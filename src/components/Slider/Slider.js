import React from 'react'
import './Slider.css'

const Slider = ({
  label,
  min,
  max,
  value,
  step,
  unit,
  onChange
}) => {
  return (
    <div className='App-slider'>
      <label>{label}</label>
      <div className='control'>
        {min}
        <input
          type='range'
          step={step}
          min={min}
          max={max}
          value={value}
          onChange={(e) => setTimeout(onChange(e.target.value), 500)}
        />
        {max}
      </div>
      <div className='control-value'>
        <div className='value'>{value}</div>
        {unit}
      </div>
    </div>
  )
}

export default Slider
