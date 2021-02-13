import { RootState } from "../reducers";
import { GenreInfo, AppThunk } from "../types";
import {
  TRACKLIST_SKIP,
  TRACKLIST_NEXT,
  TRACKLIST_NEXT_VIDEO,
  TRACKLIST_EXHAUSTED,
  TRACKLIST_VIDEOS_EXHAUSTED,
} from "../constants";

const isNextTrackValid = (genreInfo: GenreInfo, trackNo: number): boolean =>
  trackNo >= 0 && genreInfo.tracklist.length > trackNo;

const isNextVideoValid = (
  genreInfo: GenreInfo,
  trackNo: number,
  videoNo: number
): boolean => {
  const track = genreInfo.tracklist[trackNo];
  return (
    (videoNo === 0 || Array.isArray(track.videos)) &&
    track.videos.length > videoNo
  );
};

export const nextTrack = (): AppThunk => (dispatch, getState) => {
  const state: RootState = getState();

  if (state == null) return;

  const nowPlaying = state.app.nowPlaying;
  const genreInfo = state.genres.find((g) => g.id === nowPlaying.genre);

  let valid =
    genreInfo != null && isNextTrackValid(genreInfo, nowPlaying.trackNo + 1);

  dispatch({
    type: valid ? TRACKLIST_NEXT : TRACKLIST_EXHAUSTED,
    genre: genreInfo ? genreInfo.id : null,
  });
};

export const skipToTrack = (genre: string, trackNo: number): AppThunk => (
  dispatch,
  getState
) => {
  const state = getState();

  if (state == null) return;

  const genreInfo = state.genres.find((g) => g.id === genre);

  if (genreInfo == null || !isNextTrackValid(genreInfo, trackNo)) {
    return;
  }

  dispatch({
    type: TRACKLIST_SKIP,
    genre,
    trackNo,
  });
};

export const nextVideo = (): AppThunk => (dispatch, getState) => {
  const state: RootState = getState();

  if (state == null) return;

  const nowPlaying = state.app.nowPlaying;
  const genreInfo = state.genres.find((g) => g.id === nowPlaying.genre);

  let valid =
    genreInfo != null &&
    isNextVideoValid(genreInfo, nowPlaying.trackNo, nowPlaying.videoNo + 1);

  dispatch({
    type: valid ? TRACKLIST_NEXT_VIDEO : TRACKLIST_VIDEOS_EXHAUSTED,
    genre: genreInfo ? genreInfo.id : null,
    trackNo: nowPlaying.trackNo,
  });
};
