import React, { Component } from 'react'
import isEqual from 'lodash/isEqual'
import isEmpty from 'lodash/isEmpty'
import isNil from 'lodash/isNil'
import noop from 'lodash/noop'
import shortid from 'shortid'
import { Categories, getCategoryTypes } from '../../util'
import Container from '../../components/Container'
import Nav from '../../components/Nav'
import Slider from '../../components/Slider'
import Toolbar from '../../components/Toolbar'
import Select from '../../components/Select'
import Radius from '../../assets/Radius'
import EmptyPlaces from '../EmptyPlaces'
import Place from '../Place'
import PoweredByGoogleDark from '../../assets/powered_by_google_on_white_hdpi.png'
import PoweredByGoogleLight from '../../assets/powered_by_google_on_non_white_hdpi.png'
import classnames from 'classnames'
import './Places.css'

class Places extends Component {
  componentWillUnmount () {
    const { clearLocation } = this.props
    clearLocation()
  }

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
      priceLevel,
      priceLevelToggled,
      setPriceLevel,
      getNearbyPlaces,
      placeId,
      setRandom
    } = this.props
    return (
      <div className='App-places'>
        <Container>
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
          </Nav>
          <Toolbar>
            <Select
              selected={type}
              title='Change type'
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
                white: radiusToggled,
                black: radiusToggled && nightMode
              })} />
            </button>
            <button
              className={classnames('price-level', 'green', {
                selected: priceLevelToggled
              })}
              title='Specify price level'
              onClick={() => setPriceLevel(priceLevelToggled ? 0 : 2)}>
              <span>$</span>
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
          {priceLevelToggled && (
            <Slider
              label='Price'
              unit='$'
              asMultiple
              min={1}
              max={4}
              step={1}
              value={priceLevel}
              onChange={value => setPriceLevel(value)}
            />
          )}
          {!isEmpty(location) && <Toolbar>
            <button
              title='Generate places'
              disabled={isEqual(places.length, 1)}
              onClick={(e) => {
                if (isEmpty(places)) {
                  getNearbyPlaces({
                    location,
                    type,
                    radius,
                    priceLevel
                  })
                } else {
                  setRandom()
                }
              }}>
            Generate
            </button>
          </Toolbar>}
        </Container>
        {isEmpty(places)
          ? <EmptyPlaces
            location={location}
            category={category}
            type={type}
            radius={radius} />
          : <Place
            key={placeId}
            placeId={placeId}
            location={location} />}
        <div className='attributions' title='Nearby places attributions'>
          {attributions.map(a => a)}
          <img
            src={nightMode ? PoweredByGoogleLight : PoweredByGoogleDark}
            width={144} height={18}
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
  getNearbyPlaces: noop,
  clearLocation: noop
}

export default Places
