import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { POSTER_LINK } from "../../constants";

type Props = {
  loading: boolean;
  onEnter: () => void;
};

const initialProps: Props = {
  loading: true,
  onEnter: () => {},
};

export default function LoadingSplash(props = initialProps) {
  const { loading, onEnter } = props;

  return (
    <div className="LoadingSplash">
      <div className="LoadingSplash-logo" />

      <div className="LoadingSplash-notice">
        help support the site! prints now available!{" "}
        <a href={POSTER_LINK} target="_blank" rel="noopener noreferrer">
          buy online
        </a>
      </div>

      <div className="LoadingSplash-mobile-notice">
        Mobile support coming soon. View on desktop or tablet for optimal
        experience.
      </div>

      <TransitionGroup>
        {loading ? (
          <LoadingTransition key="loading">
            <div className="LoadingSplash-loading">LOADING...</div>
          </LoadingTransition>
        ) : (
          <LoadingTransition key="enter">
            <div className="LoadingSplash-enter">
              <button onClick={onEnter}>ENTER</button>
            </div>
          </LoadingTransition>
        )}
      </TransitionGroup>
    </div>
  );
}

const LoadingTransition = (props: any) => (
  <CSSTransition
    {...props}
    classNames="transition"
    timeout={{ enter: 2000, exit: 2000 }}
  />
);
