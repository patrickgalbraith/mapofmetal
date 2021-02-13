import React, { Component, Dispatch, ErrorInfo } from "react";
import { connect } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import MapPage from "../MapPage";
import LoadingSplash from "../LoadingSplash";
import FatalErrorScreen from "../FatalErrorScreen";
import { fetchGenreInfo, fetchGenreOverlays } from "../../actions/Genre";
import { RootState } from "../../reducers";

type AppState = {
  entered: boolean;
  fatalRenderError: boolean;
};

type AppProps = StateProps & DispatchProps;

class App extends Component<AppProps, AppState> {
  state: AppState = {
    entered: false,
    fatalRenderError: false,
  };

  componentDidMount() {
    const { fetchGenreInfo, fetchGenreOverlays } = this.props;
    fetchGenreInfo();
    fetchGenreOverlays();
  }

  render() {
    const { entered, fatalRenderError } = this.state;
    const { loading, fatalError } = this.props;

    return (
      <div className="App">
        {fatalError || fatalRenderError ? (
          <FatalErrorScreen />
        ) : (
          <TransitionGroup>
            {!entered ? (
              <IntroTransition key="LoadingPage">
                <div className="Page">
                  <LoadingSplash
                    loading={loading}
                    onEnter={() => this.setState({ entered: true })}
                  />
                </div>
              </IntroTransition>
            ) : (
              <IntroTransition key="MainPage">
                <div className="Page">
                  <MapPage />
                </div>
              </IntroTransition>
            )}
          </TransitionGroup>
        )}
      </div>
    );
  }

  static getDerivedStateFromError() {
    return { fatalRenderError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(error, errorInfo);
  }
}

const IntroTransition = (props: any) => (
  <CSSTransition
    {...props}
    classNames="transition"
    timeout={{ enter: 3000, exit: 3000 }}
  />
);

const mapStateToProps = (state: RootState) => {
  if (state == null) {
    return {
      fatalError: false,
      loading: true,
    };
  }

  return {
    fatalError: state.app.fatalError,
    loading: state.genres.length <= 0 || state.map.overlays.length <= 0,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    fetchGenreInfo: () => dispatch(fetchGenreInfo()),
    fetchGenreOverlays: () => dispatch(fetchGenreOverlays()),
  };
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(App);
