import { Action, Dispatch } from "redux";
import { GenreInfo, GenreOverlay } from "../types";
import {
  GENRE_SELECTED,
  GENRE_INFO_REQUEST,
  GENRE_INFO_SUCCESS,
  GENRE_INFO_FAILURE,
  GENRE_OVERLAYS_REQUEST,
  GENRE_OVERLAYS_SUCCESS,
  GENRE_OVERLAYS_FAILURE,
} from "../constants";

export function selectGenre(
  genreId: string
): Action<string> & {
  newGenre: string;
} {
  return {
    type: GENRE_SELECTED,
    newGenre: genreId,
  };
}

function requestGenreInfo(): Action<string> {
  return {
    type: GENRE_INFO_REQUEST,
  };
}

function receiveGenreInfo(
  json: GenreInfo[]
): Action<string> & {
  genreInfo: GenreInfo[];
  receivedAt: number;
} {
  return {
    type: GENRE_INFO_SUCCESS,
    genreInfo: json,
    receivedAt: Date.now(),
  };
}

function failureGenreInfo(
  error: string
): Action<string> & {
  error: string;
  receivedAt: number;
} {
  return {
    type: GENRE_INFO_FAILURE,
    error,
    receivedAt: Date.now(),
  };
}

export function fetchGenreInfo() {
  return async (dispatch: Dispatch<any>) => {
    dispatch(requestGenreInfo());

    try {
      const response = await fetch("/data/genre-info.json");
      const json = await response.json();
      return dispatch(receiveGenreInfo(json));
    } catch (error) {
      return dispatch(failureGenreInfo(error));
    }
  };
}

function requestGenreOverlays(): Action<string> {
  return {
    type: GENRE_OVERLAYS_REQUEST,
  };
}

function receiveGenreOverlays(
  json: GenreOverlay[]
): {
  type: string;
  genreOverlays: GenreOverlay[];
  receivedAt: number;
} {
  return {
    type: GENRE_OVERLAYS_SUCCESS,
    genreOverlays: json,
    receivedAt: Date.now(),
  };
}

function failureGenreOverlays(
  error: string
): Action<string> & {
  error: string;
  receivedAt: number;
} {
  return {
    type: GENRE_OVERLAYS_FAILURE,
    error,
    receivedAt: Date.now(),
  };
}

export function fetchGenreOverlays() {
  return async (dispatch: Dispatch<any>) => {
    dispatch(requestGenreOverlays());

    try {
      const response = await fetch("/data/genre-overlays.json");
      const json = await response.json();
      return dispatch(receiveGenreOverlays(json));
    } catch (error) {
      return dispatch(failureGenreOverlays(error));
    }
  };
}
