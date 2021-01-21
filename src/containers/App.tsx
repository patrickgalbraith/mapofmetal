import React, { Component, Dispatch } from "react"
import { connect } from "react-redux"
import ReactCSSTransitionGroup from "react-addons-css-transition-group"
import MapPage from "./MapPage"
import LoadingSplash from "../components/LoadingSplash"
import FatalErrorScreen from "../components/FatalErrorScreen"
import { fetchGenreInfo, fetchGenreOverlays } from "../actions/Genre"
import { RootState } from "../reducers"

type AppState = {
  entered: boolean
  fatalRenderError: boolean
}

type AppProps = StateProps & DispatchProps

class App extends Component<AppProps, AppState> {
  state: AppState = {
    entered: false,
    fatalRenderError: false
  }

  componentDidMount() {
    const { fetchGenreInfo, fetchGenreOverlays } = this.props
    fetchGenreInfo()
    fetchGenreOverlays()
  }

  render() {
    const { entered, fatalRenderError } = this.state
    const { loading, fatalError } = this.props

    return <div className='App'>
        {fatalError || fatalRenderError
          ? <FatalErrorScreen />
          : <ReactCSSTransitionGroup transitionName="transition" transitionEnterTimeout={3000} transitionLeaveTimeout={3000}>
            {!entered
              ? <div key='LoadingPage' className='Page'>
                  <LoadingSplash loading={loading} onEnter={() => this.setState({ entered: true })} />
                </div>
              : <div key='MainPage' className='Page'>
                  <MapPage />
                </div>}
          </ReactCSSTransitionGroup>}
      </div>
  }

  unstable_handleError(...args: any[]) {
    console.error(...args)
    this.setState({ fatalRenderError: true })
  }
}

const mapStateToProps = (state: RootState) => {
  if (state == null) {
    return {
      fatalError: false,
      loading: true
    }
  }

  return {
    fatalError: state.app.fatalError,
    loading: state.genres.length <= 0 || state.map.overlays.length <= 0
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    fetchGenreInfo: () => dispatch(fetchGenreInfo()),
    fetchGenreOverlays: () => dispatch(fetchGenreOverlays())
  }
}

type StateProps = ReturnType<typeof mapStateToProps>
type DispatchProps = ReturnType<typeof mapDispatchToProps>

export default connect(mapStateToProps, mapDispatchToProps)(App)