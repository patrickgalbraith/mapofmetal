declare class YTVideoPlayer {
  constructor(options: PlayerOptions): YTVideoPlayer;

  cueVideoById(videoId: string | {videoId: string,
                    startSeconds?: number,
                    endSeconds?: number,
                    suggestedQuality?: string }, 
                  startSeconds?: number, 
                  suggestedQuality?: string): void;

  loadVideoById(videoId: string | {videoId: string,
                      startSeconds?: number,
                      endSeconds?: number,
                      suggestedQuality?: string},
                    startSeconds?: number,
                    suggestedQuality?: string): void;

  cueVideoByUrl(mediaContentUrl: string | {mediaContentUrl: string,
                      startSeconds?: number,
                      endSeconds?: number,
                      suggestedQuality?: string},
                    startSeconds?: number,
                    suggestedQuality?: string): void;

  loadVideoByUrl(mediaContentUrl: string | {mediaContentUrl: string,
                      startSeconds?: number,
                      endSeconds?: number,
                      suggestedQuality?: string},
                    startSeconds?: number,
                    suggestedQuality?: string): void;
                    
  cuePlaylist(playlist: string | string[] | {list: string | string[],
                    listType?: string,
                    index?: number,
                    startSeconds?: number,
                    suggestedQuality?: string},
                  index?: number,
                  startSeconds?: number,
                  suggestedQuality?: string): void;

  loadPlaylist(playlist: string | string[] | {list: string | string[],
                    listType?: string,
                    index?: number,
                    startSeconds?: number,
                    suggestedQuality?: string},
                  index?: number,
                  startSeconds?: number,
                  suggestedQuality?: string): void;

  playVideo(): void;
  pauseVideo(): void;
  stopVideo(): void;
  seekTo(seconds: number, allowSeekAhead: ?boolean): void;

  nextVideo(): void;
  previousVideo(): void;
  playVideoAt(index: number): void;
  mute(): void;
  unMute(): void;
  isMuted(): boolean;
  setVolume(volume: number): void;
  getVolume(): number;
  setSize(width: number, height: number): *; // return value is undocumented
  getPlaybackRate(): number;
  setPlaybackRate(suggestedRate: number): void;
  getAvailablePlaybackRates(): number[];
  setLoop(loopPlaylists: boolean): void;
  setShuffle(shufflePlaylist: boolean): void;
  getVideoLoadedFraction(): number;
  getPlayerState(): number;
  getCurrentTime(): number;
  getVideoStartBytes(): number; //deprecated
  getVideoBytesLoaded(): number; //deprecated
  getVideoBytesTotal(): number; //deprecated
  getPlaybackQuality(): string;
  setPlaybackQuality(suggestedQuality: string): void;
  getAvailableQualityLevels(): string[];
  getDuration(): number;
  getVideoUrl(): string;
  getVideoEmbedCode(): string;
  getPlaylist(): string[];
  getPlaylistIndex(): number;
  addEventListener(event: string, listener: string): void;
  removeEventListener(event: string, listener: string): void;
  getIframe(): HTMLIFrameElement;
  destroy(): void;

  // Undocumented functions
  getVideoData(): {
    title?: string,
    author?: string,
    video_id?: string
  };
}

declare type YTPlayerOptions = {
  height: number | string | void,
  width: number | string | void,
  videoId: string | void,
  events: any,
  playerVars: any
}

declare var YT: {
  Player: (elementOrId: HTMLElement | string, options: YTPlayerOptions) => YTVideoPlayer;
}