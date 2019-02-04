import React from 'react'
import classnames from 'classnames'
import isEqual from 'lodash/isEqual'
import Categories from '../util/Categories'

const Nav = ({ selected, onClick }) => {
  return (<div className='App-nav'>
    <button className={classnames('nav-button', {selected: isEqual(Categories.food, selected)})}
      title='Food near me'
      onClick={() => onClick(Categories.food)}>
      Food
    </button>
    <button className={classnames('nav-button', {selected: isEqual(Categories.entertainment, selected)})}
      title='Entertainment near me'
      onClick={() => onClick(Categories.entertainment)}>
      Entertainment
    </button>
    <button className={classnames('nav-button', {selected: isEqual(Categories.stores, selected)})}
      title='Stores near me'
      onClick={() => onClick(Categories.stores)}>
      Stores
    </button>
    <button className={classnames('nav-button', {selected: isEqual(Categories.services, selected)})}
      title='Services near me'
      onClick={() => onClick(Categories.services)}>
      Services
    </button>
  </div>)
}

export default Nav
