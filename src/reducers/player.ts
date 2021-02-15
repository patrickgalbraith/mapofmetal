import { AnyAction } from "redux";
import {
  PLAYER_PLAY,
  PLAYER_PAUSE,
  PLAYER_LOAD,
  PLAYER_VOLUME,
  PLAYER_READY,
  PLAYER_API_READY,
  PLAYER_STATE_CHANGE,
  PLAYER_DURATION_CHANGE,
  PLAYER_QUALITY_CHANGE,
  PLAYER_STATE_UNSTARTED,
  PLAYER_STATE_PLAYING,
  PLAYER_STATE_PAUSED,
  PLAYER_STOP,
  PLAYER_STATE_ENDED,
  TRACKLIST_NEXT,
  TRACKLIST_NEXT_VIDEO,
  TRACKLIST_SKIP,
} from "../constants";

export type State = {
  apiReady: boolean;
  playerReady: boolean;
  stopped: boolean;
  state: number;
  volume: number | null;
  videoId: string | null;
  duration: number;
  quality: YT.SuggestedVideoQuality;
};

const initialState: State = {
  apiReady: false,
  playerReady: false,
  stopped: false,
  state: PLAYER_STATE_UNSTARTED,
  volume: null,
  videoId: null,
  duration: 0,
  quality: "default",
};

export default function player(
  state: State = initialState,
  action: AnyAction
): State {
  if (action.type === PLAYER_API_READY) {
    return {
      ...state,
      apiReady: true,
    };
  }

  if (action.type === PLAYER_READY) {
    return {
      ...state,
      playerReady: true,
      videoId: action.videoId,
      volume: action.volume,
    };
  }

  if (action.type === PLAYER_LOAD) {
    return {
      ...state,
      videoId: action.videoId,
    };
  }

  if (action.type === PLAYER_PLAY && state.state !== PLAYER_STATE_PLAYING) {
    return {
      ...state,
      state: PLAYER_STATE_PLAYING,
      stopped: false,
    };
  }

  if (action.type === PLAYER_PAUSE && state.state === PLAYER_STATE_PLAYING) {
    return {
      ...state,
      state: PLAYER_STATE_PAUSED,
      stopped: false,
    };
  }

  if (action.type === PLAYER_STOP && state.state !== PLAYER_STATE_ENDED) {
    return {
      ...state,
      stopped: true,
    };
  }

  if (action.type === PLAYER_VOLUME) {
    return {
      ...state,
      volume: action.volume,
    };
  }

  if (action.type === PLAYER_QUALITY_CHANGE) {
    return {
      ...state,
      quality: action.quality,
    };
  }

  if (action.type === PLAYER_STATE_CHANGE) {
    return {
      ...state,
      state: action.playerState,
    };
  }

  if (action.type === PLAYER_DURATION_CHANGE) {
    return {
      ...state,
      duration: action.duration,
    };
  }

  if (
    action.type === TRACKLIST_SKIP ||
    action.type === TRACKLIST_NEXT ||
    action.type === TRACKLIST_NEXT_VIDEO
  ) {
    return {
      ...state,
      stopped: false,
    };
  }

  return state;
}
