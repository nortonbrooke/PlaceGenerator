import React from 'react'

const Slider = ({ label, min, max, value, step, onChange }) => {
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
        miles
      </div>
    </div>
  )
}

export default Slider
