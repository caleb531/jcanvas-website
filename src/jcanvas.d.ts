/// <reference types="jquery"/>
// Based on
// <https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/jcanvas/index.d.ts>,
// but with additional jCanvas methods that were missing in the above type
// definitions

interface JCanvasRect {
    x: number;
    y: number;
    width: number;
    height: number;
}

interface JCanvasSliceDef {
    fillStyle: string;
    x: number;
    y: number;
    /**
     * Radius in pixels
     */
    radius: number;
    /**
     * Start angle in degrees from north
     */
    start: number;
    /**
     * End angle in degrees from north
     */
    end: number;
    /**
     * Distance between slices as a fraction of the radius
     */
    spread?: number | undefined;

    layer?: boolean | undefined;
    name?: string | undefined;
    groups?: string[] | undefined;
}

interface JCanvasTextDef {
    fillStyle: string;
    strokeStyle: string;
    strokeWidth: number;
    x: number;
    y: number;
    fontSize: number;
    fontFamily: string;
    text: string;
}

interface JQuery {
    clearCanvas(rect?: JCanvasRect): JQuery;
    drawSlice(def: JCanvasSliceDef): JQuery;
    drawText(def: JCanvasTextDef): JQuery;
    removeLayers(): JQuery;
    detectPixelRatio(): JQuery;
}

// note this declare module is necessary to tell TypeScript not to interpret the whole file as one module;
// the JQuery interface below should extend the existing jquery module interface
declare module "jcanvas" {
    function jcanvas(jquery: JQueryStatic, window: Window): void;
    export = jcanvas;
}
