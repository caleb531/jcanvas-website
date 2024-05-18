declare module 'jcanvas';
declare module 'jcanvas/dist/umd/jcanvas-*.min.js';

interface JQueryStatic {
  jCanvas: {
    defaults: Record<string, any>;
    clearCache(): void;
  };
}
interface JCanvasParams {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}
interface JQuery {
  clearCanvas(params?: JCanvasParams): JQuery;
  removeLayers(): JQuery<HTMLCanvasElement>;
  detectPixelRatio(): JQuery<HTMLCanvasElement>;
}
