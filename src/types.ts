import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "./reducers/index";

export type TrackInfo = {
  artist: string;
  title: string;
  year: string;
  videos: string | Array<string>;
  _failed?: boolean;
};

export type GenreInfo = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tracklist: TrackInfo[];
};

export type GenreOverlay = {
  px: number;
  py: number;
  width: number;
  height: number;
  id: string;
  className: string;
};

export type MapCenterPoint = [
  "left" | "right" | number,
  "top" | "bottom" | number
];

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
