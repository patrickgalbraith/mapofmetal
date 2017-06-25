// @flow
export type { Dispatch } from 'redux'

export type Action = {
  type: string
}

export type TrackInfo = {
  artist: string,
  title: string,
  year: string,
  videos: string | Array<string>,
  _failed?: boolean
}

export type GenreInfo = {
  id: string,
  title: string,
  description: string,
  tracklist: TrackInfo[]
}

export type GenreOverlay = {
  px: number,
  py: number,
  width: number,
  height: number,
  id: string,
  className: string
}

export type MapCenterPoint = ['left' | 'right' | number, 'top' | 'bottom' | number]