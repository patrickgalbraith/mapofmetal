
import { State as ReduxState } from "../reducers";
import { GenreInfo as GenreInfoItem, GenreOverlay, TrackInfo, MapCenterPoint, Dispatch } from "../types";

import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import VideoPlayer from "./VideoPlayer";
import TopBar from "../components/TopBar";
import PlayerControls from "./PlayerControls";
import MapLayer from "../components/MapLayer";
import LoadingSplash from "../components/LoadingSplash";
import GenreInfo from "../components/GenreInfo";
import TrackList from "../components/TrackList";
import AboutModal from "../components/modals/About";
import SettingsModal from "../components/modals/Settings";
import ShareModal from "../components/modals/Share";

import { MAP_TILE_SOURCE } from "../constants";

import { skipToTrack } from "../actions/TrackList";
import { changeMapCenter, dragStart, dragEnd } from "../actions/Map";
import { selectGenre } from "../actions/Genre";

type ModalReference = {
  key: string;
  component: ReactClass<any> | null | undefined;
};

type State = {
  currentModal: ModalReference | null;
  currentTime: number;
};

type Props = {
  key: string | null | undefined;
  className: string | null | undefined;
  overlays: GenreOverlay[];
  currentGenre: GenreInfoItem;
  currentTrackList: {
    genre: GenreInfoItem;
    trackNo: number;
  };
  mapCenter: MapCenterPoint;
  mapDragging: boolean;
  selectGenre: typeof selectGenre;
  changeMapCenter: typeof changeMapCenter;
  dragStart: typeof dragStart;
  dragEnd: typeof dragEnd;
  skipToTrack: typeof skipToTrack;
};

class MapPage extends Component {

  props: Props;
  state: State;

  constructor(): void {
    super();

    this.state = {
      currentModal: null,
      currentTime: 0
    };
  }

  changeGenre(genreId: string): void {
    const {
      selectGenre
    } = this.props;
    selectGenre(genreId);
  }

  openModal(type: string): void {
    let currentModal: ModalReference | null | undefined = null;

    switch (type) {
      case 'About':
        currentModal = {
          key: type,
          component: AboutModal
        };
        break;
      case 'Settings':
        currentModal = {
          key: type,
          component: SettingsModal
        };
        break;
      case 'Share':
        currentModal = {
          key: type,
          component: ShareModal
        };
        break;

    }

    this.setState({ currentModal });
  }

  closeModal(): void {
    this.setState({
      currentModal: null
    });
  }

  changeTrack(trackNo: number): void {
    this.props.skipToTrack(this.props.currentGenre.id, trackNo);
  }

  render() {
    const {
      currentModal,
      currentTime
    } = this.state;

    const {
      overlays,
      currentGenre,
      currentTrackList,
      mapCenter,
      mapDragging,
      changeMapCenter,
      dragStart,
      dragEnd
    } = this.props;

    const Modal: ReactClass<any> | null | undefined = currentModal ? currentModal.component : null;
    const classes: string = ['MapPage', this.props.className, mapDragging ? 'is-dragging' : ''].join(' ');

    return <div className={classes} key={this.props.key}>
        <TopBar changeMapCenter={changeMapCenter} openModal={this.openModal.bind(this)} />

        <VideoPlayer onPlaybackTime={(s: number) => {this.setState({ currentTime: s });}} />

        <GenreInfo current={currentGenre} playing={currentTrackList.genre} onNowPlayingClick={() => this.changeGenre(currentTrackList.genre.id)} />

        <TrackList current={currentGenre} playing={currentTrackList} onTrackClick={trackNo => this.changeTrack(trackNo)} />

        <PlayerControls currentTime={currentTime} />

        <ReactCSSTransitionGroup transitionName="transition" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
          {Modal && currentModal && currentModal.key ? <Modal key={currentModal.key} close={() => this.closeModal()} /> : null}
        </ReactCSSTransitionGroup>

        <MapLayer tileSources={MAP_TILE_SOURCE} overlays={overlays} centerPosition={mapCenter} onOverlayClick={genreId => this.changeGenre(genreId)} onDragStart={() => dragStart()} onDragEnd={() => dragEnd()} />
      </div>;
  }
}

const mapStateToProps = (state: ReduxState) => {
  if (state == null) return {};

  return {
    overlays: state.map.overlays,
    currentGenre: state.genres.find(g => state && g.id === state.app.selectedGenre),
    currentTrackList: {
      genre: state.genres.find(g => state && g.id === state.app.nowPlaying.genre),
      trackNo: state.app.nowPlaying.trackNo
    },
    mapCenter: state.map.center,
    mapDragging: state.map.dragging
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any, any>) => {
  return {
    selectGenre: i => dispatch(selectGenre(i)),
    changeMapCenter: c => dispatch(changeMapCenter(c)),
    dragStart: () => dispatch(dragStart()),
    dragEnd: () => dispatch(dragEnd()),
    skipToTrack: (g, t) => dispatch(skipToTrack(g, t))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MapPage);