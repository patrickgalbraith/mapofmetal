import React, { Component, PropTypes } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { POSTER_LINK } from '../constants'

const initialProps = {
  loading: true
}

export default function LoadingSplash(props = initialProps) {
  const { loading, onEnter } = props

  return (
    <div className='LoadingSplash'>
      <div className='LoadingSplash-logo' />

      <div className='LoadingSplash-notice'>
        help support the site! prints now available! <a href={POSTER_LINK} target='_blank'>buy online</a>
      </div>

      <ReactCSSTransitionGroup
        transitionName="transition"
        transitionEnterTimeout={2000}
        transitionLeaveTimeout={2000}>
        {
          loading
          ? <div key='loading' className='LoadingSplash-loading'>LOADING...</div>
          : <div key='enter' className='LoadingSplash-enter'><a onClick={onEnter}>ENTER</a></div>
        }
      </ReactCSSTransitionGroup>
    </div>
  )
}