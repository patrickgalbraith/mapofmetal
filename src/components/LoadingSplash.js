import React, { Component, PropTypes } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

const initialProps = {
  loading: true
}

export default function LoadingSplash(props = initialProps) {
  const { loading, onEnter } = props

  return (
    <div className='LoadingSplash'>
      <div className='LoadingSplash-logo' />

      <ReactCSSTransitionGroup
        transitionName="transition"
        transitionEnterTimeout={2000}
        transitionLeaveTimeout={2000}>
        {
          loading
          ? <div key='loading' className='LoadingSplash-loading'>LOADING...</div>
          : <div key='enter' className='LoadingSplash-enter' onClick={onEnter}>ENTER</div>
        }
      </ReactCSSTransitionGroup>
    </div>
  )
}