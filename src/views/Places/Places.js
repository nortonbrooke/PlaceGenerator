import React, { Component } from 'react'
import isEqual from 'lodash/isEqual'
import isEmpty from 'lodash/isEmpty'
import isNil from 'lodash/isNil'
import noop from 'lodash/noop'
import shortid from 'shortid'
import { Categories, getCategoryTypes } from '../../util'
import Nav from '../../components/Nav'
import Slider from '../../components/Slider'
import Toolbar from '../../components/Toolbar'
import Select from '../../components/Select'
import Radius from '../../assets/Radius'
import Clover from '../../assets/clover.svg'
import Reset from '../../assets/reset.svg'
import EmptyPlaces from '../EmptyPlaces'
import Place from '../Place'
import PoweredByGoogleDark from '../../assets/google-dark.png'
import PoweredByGoogleLight from '../../assets/google-light.png'
import classnames from 'classnames'
import './Places.css'

class Places extends Component {  
  render () {
    const {
      nightMode,
      location,
      places,
      attributions,
      category,
      setCategory,
      type,
      setType,
      radius,
      radiusToggled,
      setRadius,
      setRandom,
      reset,
      placeId,
      getNearbyPlaces
    } = this.props
    return (
      <div className='App-places'>
        <div>
          <Nav>
            <button
              className={classnames({
                selected: isEqual(Categories.food.id, category)
              })}
              title='Food near me'
              onClick={() => setCategory(Categories.food.id)}
            >
              Food
            </button>
            <button
              className={classnames({
                selected: isEqual(Categories.entertainment.id, category)
              })}
              title='Entertainment near me'
              onClick={() => setCategory(Categories.entertainment.id)}
            >
              Entertainment
            </button>
            <button
              className={classnames({
                selected: isEqual(Categories.stores.id, category)
              })}
              title='Stores near me'
              onClick={() => setCategory(Categories.stores.id)}
            >
              Stores
            </button>
            <button
              className={classnames({
                selected: isEqual(Categories.services.id, category)
              })}
              title='Services near me'
              onClick={() => setCategory(Categories.services.id)}
            >
              Services
            </button>
          </Nav>
          <Toolbar>
            <Select
              selected={type}
              title='Select type'
              style={{flex: 4}}
              onChange={(type) => setType(type)}>
              {getCategoryTypes(category).map((o) => {
                if (!isNil(o.group)) {
                  return (<optgroup key={shortid.generate()} label={o.label}>
                    {o.group.map((a) => <option key={shortid.generate()} value={a.value}>{a.label}</option>)}
                  </optgroup>)
                }
                return <option key={shortid.generate()} value={o.value}>
                  {o.label}
                </option>
              })}
            </Select>
            <button
              className={classnames('yellow', {
                selected: radiusToggled
              })}
              title='Change radius'
              onClick={() => setRadius(radiusToggled ? 0 : 5)}>
              <Radius className={classnames({
                white: radiusToggled
              })} />
            </button>
          </Toolbar>
          {radiusToggled && (
            <Slider
              label='Radius'
              unit='miles'
              min={5}
              max={30}
              step={5}
              value={radius}
              onChange={value => setRadius(value)}
            />
          )}
          <Toolbar>
            <button
              className='red'
              disabled={isEmpty(places)}
              title='Reset to first place'
              onClick={() => reset()}>
              <img src={Reset} alt='Reset to first place' width={20} height={20} />
            </button>
            <button
              className='green'
              title='Generate random place'
              onClick={() => {
                setRandom()
                if (isEmpty(places)) {
                  getNearbyPlaces({
                    location,
                    type,
                    radius
                  })
                }
              }}>
              <img src={Clover} alt='Generate random place' width={20} height={20} />
            </button>
            <button
              title='Find places'
              style={{flex: 3}}
              disabled={!isEmpty(places)}
              onClick={() => getNearbyPlaces({
                location,
                type,
                radius
              })}>
              Find
            </button>
          </Toolbar>
        </div>
        {isEmpty(places)
          ? <EmptyPlaces />
          : <Place
            key={placeId}
            placeId={placeId}
            location={location} />}
        <div className='attributions' title='Nearby places attributions'>
          {attributions.map(a => a)}
          <img
            src={nightMode ? PoweredByGoogleLight : PoweredByGoogleDark}
            height={18}
            width={144}
            alt='powered by Google'
            title='powered by Google'
          />
        </div>
      </div>
    )
  }
}

Places.defaultProps = {
  location: [],
  places: [],
  attributions: [],
  getNearbyPlaces: noop
}

export default Places
