import React, { Component, Dispatch } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { RootState } from "../../reducers";
import { MapCenterPoint } from "../../types";
import VideoPlayerContainer from "../VideoPlayerContainer";
import TopBar from "../TopBar";
import PlayerControlsContainer from "../PlayerControlsContainer";
import MapLayer from "../MapLayer";
import GenreInfo from "../GenreInfo";
import TrackList from "../TrackList";
import AboutModal from "../AboutModal";
import SettingsModal from "../SettingsModal";
import ShareModal from "../ShareModal";

import { skipToTrack } from "../../actions/TrackList";
import { changeMapCenter, dragStart, dragEnd } from "../../actions/Map";
import { selectGenre } from "../../actions/Genre";

import { MAP_TILE_SOURCE } from "../../constants";

type ModalReference = {
  key: string;
  component: any;
};

type State = {
  currentModal: ModalReference | null;
  currentTime: number;
};

type Props = StateProps &
  DispatchProps & {
    key?: string | null;
    className?: string | null;
  };

class MapPage extends Component<Props, State> {
  state: State = {
    currentModal: null,
    currentTime: 0,
  };

  changeGenre(genreId: string): void {
    const { selectGenre } = this.props;
    selectGenre(genreId);
  }

  openModal(type: string): void {
    let currentModal: ModalReference | null = null;

    switch (type) {
      case "About":
        currentModal = {
          key: type,
          component: AboutModal,
        };
        break;
      case "Settings":
        currentModal = {
          key: type,
          component: SettingsModal,
        };
        break;
      case "Share":
        currentModal = {
          key: type,
          component: ShareModal,
        };
        break;
    }

    this.setState({ currentModal });
  }

  closeModal(): void {
    this.setState({
      currentModal: null,
    });
  }

  changeTrack(trackNo: number): void {
    this.props.skipToTrack(this.props.currentGenre!.id, trackNo);
  }

  render() {
    const { currentModal, currentTime } = this.state;

    const {
      overlays,
      currentGenre,
      currentTrackList,
      mapCenter,
      mapDragging,
      changeMapCenter,
      dragStart,
      dragEnd,
    } = this.props;

    const Modal = currentModal ? currentModal.component : null;
    const classes: string = [
      "MapPage",
      this.props.className,
      mapDragging ? "is-dragging" : "",
    ].join(" ");

    return (
      <div className={classes} key={this.props.key}>
        <TopBar
          changeMapCenter={changeMapCenter}
          openModal={this.openModal.bind(this)}
        />

        <VideoPlayerContainer
          onPlaybackTime={(s) => {
            this.setState({ currentTime: s });
          }}
        />

        <GenreInfo
          current={currentGenre}
          playing={currentTrackList.genre}
          onNowPlayingClick={() => this.changeGenre(currentTrackList.genre!.id)}
        />

        <TrackList
          current={currentGenre}
          playing={currentTrackList}
          onTrackClick={(trackNo) => this.changeTrack(trackNo)}
        />

        <PlayerControlsContainer currentTime={currentTime} />

        <TransitionGroup>
          {Modal && currentModal && currentModal.key && (
            <CSSTransition
              key={currentModal.key}
              classNames="transition"
              timeout={{ enter: 500, exit: 500 }}
            >
              <Modal close={() => this.closeModal()} />
            </CSSTransition>
          )}
        </TransitionGroup>

        <MapLayer
          tileSources={MAP_TILE_SOURCE}
          overlays={overlays}
          centerPosition={mapCenter}
          onOverlayClick={(genreId) => this.changeGenre(genreId)}
          onDragStart={() => dragStart()}
          onDragEnd={() => dragEnd()}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    overlays: state.map.overlays,
    currentGenre: state.genres.find(
      (g) => state && g.id === state.app.selectedGenre
    ),
    currentTrackList: {
      genre: state.genres.find(
        (g) => state && g.id === state.app.nowPlaying.genre
      ),
      trackNo: state.app.nowPlaying.trackNo,
    },
    mapCenter: state.map.center,
    mapDragging: state.map.dragging,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    selectGenre: (i: string) => dispatch(selectGenre(i)),
    changeMapCenter: (c: MapCenterPoint) => dispatch(changeMapCenter(c)),
    dragStart: () => dispatch(dragStart()),
    dragEnd: () => dispatch(dragEnd()),
    skipToTrack: (g: string, t: number) => dispatch(skipToTrack(g, t)),
  };
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(MapPage);
