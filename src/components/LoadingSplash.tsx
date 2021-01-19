
import React, { Component, PropTypes } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { POSTER_LINK } from "../constants";

type Props = {
  loading: boolean;
  onEnter: () => void;
};

const initialProps: Props = {
  loading: true,
  onEnter: () => {}
};

export default function LoadingSplash(props: Props = initialProps) {
  const {
    loading,
    onEnter
  } = props;

  return <div className='LoadingSplash'>
      <div className='LoadingSplash-logo' />

      <div className='LoadingSplash-notice'>
        help support the site! prints now available! <a href={POSTER_LINK} target='_blank'>buy online</a>
      </div>

      <div className='LoadingSplash-mobile-notice'>
        Mobile support coming soon. View on desktop or tablet for optimal experience.
      </div>

      <ReactCSSTransitionGroup transitionName="transition" transitionEnterTimeout={2000} transitionLeaveTimeout={2000}>
        {loading ? <div key='loading' className='LoadingSplash-loading'>LOADING...</div> : <div key='enter' className='LoadingSplash-enter'><a onClick={onEnter}>ENTER</a></div>}
      </ReactCSSTransitionGroup>
    </div>;
}