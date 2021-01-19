
import { Action, GenreInfo, GenreOverlay, Dispatch } from "../types";
import { GENRE_SELECTED, GENRE_INFO_REQUEST, GENRE_INFO_SUCCESS, GENRE_INFO_FAILURE, GENRE_OVERLAYS_REQUEST, GENRE_OVERLAYS_SUCCESS, GENRE_OVERLAYS_FAILURE } from "../constants";

export function selectGenre(genreId: string): {
  type: string;
  newGenre: string;
} {
  return {
    type: GENRE_SELECTED,
    newGenre: genreId
  };
}

function requestGenreInfo(): Action {
  return {
    type: GENRE_INFO_REQUEST
  };
}

function receiveGenreInfo(json: GenreInfo[]): {
  type: string;
  genreInfo: GenreInfo[];
  receivedAt: number;
} {
  return {
    type: GENRE_INFO_SUCCESS,
    genreInfo: json,
    receivedAt: Date.now()
  };
}

function failureGenreInfo(error: string): {
  type: string;
  error: string;
  receivedAt: number;
} {
  return {
    type: GENRE_INFO_FAILURE,
    error,
    receivedAt: Date.now()
  };
}

export function fetchGenreInfo() {
  return (dispatch: Dispatch<any, any>) => {
    dispatch(requestGenreInfo());
    return fetch('/data/genre-info.json').then(response => response.json()).then(json => dispatch(receiveGenreInfo(json))).catch(error => dispatch(failureGenreInfo(error)));
  };
}

function requestGenreOverlays(): Action {
  return {
    type: GENRE_OVERLAYS_REQUEST
  };
}

function receiveGenreOverlays(json: GenreOverlay[]): {
  type: string;
  genreOverlays: GenreOverlay[];
  receivedAt: number;
} {
  return {
    type: GENRE_OVERLAYS_SUCCESS,
    genreOverlays: json,
    receivedAt: Date.now()
  };
}

function failureGenreOverlays(error: string): {
  type: string;
  error: string;
  receivedAt: number;
} {
  return {
    type: GENRE_OVERLAYS_FAILURE,
    error,
    receivedAt: Date.now()
  };
}

export function fetchGenreOverlays() {
  return (dispatch: Dispatch<any, any>) => {
    dispatch(requestGenreOverlays());
    return fetch('/data/genre-overlays.json').then(response => response.json()).then(json => dispatch(receiveGenreOverlays(json))).catch(error => dispatch(failureGenreOverlays(error)));
  };
}