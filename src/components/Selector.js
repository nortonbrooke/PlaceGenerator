import React from 'react'
import shortid from 'shortid'
import isNil from 'lodash/isNil'

const Selector = ({ title, selected, options, onChange }) => {
  return (<select value={selected} id='select' title={title}
    onChange={(e) => onChange(e.target.value)}>
    {options.map((o) => {
      if (!isNil(o.group)) {
        return (<optgroup key={shortid.generate()} label={o.label}>
          {o.group.map((a) => <option key={shortid.generate()} value={a.value}>{a.label}</option>)}
        </optgroup>)
      }
      return <option key={shortid.generate()} value={o.value}>
        {o.label}
      </option>
    })}
  </select>)
}

export default Selector
