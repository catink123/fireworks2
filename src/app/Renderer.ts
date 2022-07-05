import { applyStyles } from "./Utils";

export interface Storage {
  [index: string]: any;
}

export type DrawFunction = (delta: number, ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, storage: Storage) => void;

export class Renderer {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  private renderRequestID?: number;
  private prevT = 0;

  storage: Storage = {};
  constructor(public container: HTMLElement, public drawFunction: DrawFunction) {
    this.canvas = document.createElement('canvas');
    container.appendChild(this.canvas);
    this.context = this.canvas.getContext('2d')!;

    applyStyles(this.canvas, {
      width: '100vw',
      height: '100vh',
      left: '0',
      top: '0',
      position: 'fixed'
    });

    document.addEventListener('resize', this.updateSize);
    this.updateSize();
  }

  private updateSize() {
    this.canvas.width = window.innerWidth * devicePixelRatio;
    this.canvas.height = window.innerHeight * devicePixelRatio;
  }

  private draw(t: number) {
    const delta = (t - this.prevT) / 1000;
    this.prevT = t;

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.drawFunction(delta, this.context, this.canvas, this.storage);

    this.renderRequestID = requestAnimationFrame(t => this.draw(t));
  }

  start() {
    this.renderRequestID = requestAnimationFrame(t => this.draw(t));
  }

  stop() {
    if (this.renderRequestID) cancelAnimationFrame(this.renderRequestID);
  }
}