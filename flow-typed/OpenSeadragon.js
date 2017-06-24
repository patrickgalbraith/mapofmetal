declare module 'openseadragon' {
  declare type Options = any

  declare class Viewer {
    constructor(options: Options): Viewer;
    viewport: any;
    addHandler: (a: string, b: any) => any;
    destroy: () => void;
  }

  declare class Point {
    constructor(x: number, y: number): Point
  }

  declare export default function OpenSeadragon(options: Options): Viewer
}