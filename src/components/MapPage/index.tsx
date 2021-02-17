import React, { Component, Dispatch } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { RootState } from "../../reducers";
import { MapCenterPoint } from "../../types";
import MapLayer from "../MapLayer";
import AboutModal from "../AboutModal";
import SettingsModal from "../SettingsModal";
import ShareModal from "../ShareModal";

import { skipToTrack } from "../../actions/TrackList";
import { changeMapCenter, dragStart, dragEnd } from "../../actions/Map";
import { selectGenre } from "../../actions/Genre";

import { MAP_TILE_SOURCE } from "../../constants";
import PlayerContainer from "../PlayerContainer";
import GenreInfoPanel from "../GenreInfoPanel";

type ModalReference = {
  key: string;
  component: any;
};

type State = {
  currentModal: ModalReference | null;
  currentTime: number;
  showGenreInfo: boolean;
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
    showGenreInfo: false,
  };

  changeGenre(genreId: string): void {
    const { selectGenre } = this.props;
    selectGenre(genreId);
    this.setState({ showGenreInfo: true });
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

  toggleGenreInfoPanel(newVisibility?: boolean) {
    newVisibility =
      typeof newVisibility === "undefined"
        ? !this.state.showGenreInfo
        : newVisibility;

    this.setState({ showGenreInfo: newVisibility! });
  }

  render() {
    const { currentModal, currentTime, showGenreInfo } = this.state;

    const {
      overlays,
      currentGenre,
      currentTrackList,
      mapCenter,
      mapDragging,
      isPlayerStopped,
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
        {/* <TopBar
          changeMapCenter={changeMapCenter}
          openModal={this.openModal.bind(this)}
        /> */}

        {/* <GenreInfo
          current={currentGenre}
          playing={currentTrackList.genre}
          onNowPlayingClick={() => this.changeGenre(currentTrackList.genre!.id)}
        /> */}

        {/* <TrackList
          current={currentGenre}
          playing={currentTrackList}
          onTrackClick={(trackNo) => this.changeTrack(trackNo)}
        /> */}

        {/* <PlayerControlsContainer currentTime={currentTime} /> */}

        <div className="MapPage-content">
          <CSSTransition
            in={!isPlayerStopped}
            timeout={200}
            classNames="transition"
          >
            <PlayerContainer
              currentTime={currentTime}
              showNowPlaying={
                true
              } /* TODO toggle based on whether on mobile and showing genre info panel */
              onNowPlayingClick={() =>
                this.changeGenre(currentTrackList.genre!.id)
              }
              onPlaybackTime={(s) => {
                this.setState({ currentTime: s });
              }}
            />
          </CSSTransition>
          <CSSTransition
            in={showGenreInfo}
            timeout={200}
            classNames="transition"
          >
            <GenreInfoPanel
              currentGenre={currentGenre}
              playing={currentTrackList}
              onTrackClick={(trackNo) => this.changeTrack(trackNo)}
              onCloseClick={() => this.toggleGenreInfoPanel(false)}
            />
          </CSSTransition>
        </div>

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
    isPlayerStopped: state.player.stopped,
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
