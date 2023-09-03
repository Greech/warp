export class CanvasManager {
    private canvasElement: HTMLCanvasElement;
    private canvasContext: CanvasRenderingContext2D;

    constructor(canvasId: string) {
        const canvas = this.getCanvasElement(canvasId);
        this.canvasElement = canvas;
        this.canvasContext = canvas.getContext("2d");
        this.resize([window.innerWidth, window.innerHeight]);
    }

    get canvas(): HTMLCanvasElement {
        return this.canvasElement;
    }

    get context(): CanvasRenderingContext2D {
        return this.canvasContext;
    }

    getDimension(): [number, number] {
        return [
            this.context.canvas.width,
            this.context.canvas.height
        ]
    }

    resize([screenWidth,  screenHeight]: [ number,  number ]) {
        const canvas = this.context.canvas;
        // Set the canvas size to match the screen dimensions
        canvas.width = screenWidth;
        canvas.height = screenHeight;

        // Calculate the scaling factor to maintain the aspect ratio
        const scale = this.getScale(screenWidth, canvas.width, screenHeight, canvas.height);

        // Apply the scaling transformation
        this.context.scale(scale, scale);
    }

    private getScale(screenWidth: number, canvasWidth: number, screenHeight: number, canvasHeight: number): number {
        return Math.min(screenWidth / canvasWidth, screenHeight / canvasHeight);
    }

    private getCanvasElement(canvasId: string): HTMLCanvasElement {
        return document.getElementById(canvasId) as HTMLCanvasElement;
    }
}