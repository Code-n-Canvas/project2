declare module "locomotive-scroll" {
  export interface ILocomotiveScrollOptions {
    el: HTMLElement;
    smooth: boolean;
  }

  export default class LocomotiveScroll {
    constructor(options: ILocomotiveScrollOptions);
    destroy(): void;
  }
}
