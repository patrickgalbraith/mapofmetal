declare type MediaQueryListListener = (mql: MediaQueryList) => void;

declare type MediaQueryList = {
  +matches: boolean;
  +media: string;
  addListener(listener: MediaQueryListListener): void;
  removeListener(listener: MediaQueryListListener): void;
};

declare function matchMedia(mediaQuery: string): MediaQueryList;