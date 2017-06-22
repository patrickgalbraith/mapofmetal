declare module 'openseadragon' {
  declare type Options = any
  declare class Viewer {
    constructor(options: Options): Viewer;
    viewport: any;
    addHandler: (a: string, b: any) => any;
    destroy: () => void;
  }
  declare function OpenSeadragon(options: Options): Viewer<Options>
}