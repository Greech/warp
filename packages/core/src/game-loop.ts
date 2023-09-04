import { Engine } from './engine';
import { Injectable } from './models/injectable.decorator';

@Injectable()
export class GameLoop {
    private lastTimestamp: number = 0;
    private fixedUpdateRate: number = 1 / 60; // 60 updates per second
    private isRunning: boolean = false;
    private animationFrameId: number | null = null;

    constructor(private engine: Engine) {}
    
    public start() {
        if (this.isRunning) {
            return;
        }

        this.isRunning = true;
        this.gameLoop(0); // Start the loop
    }

    public stop() {
        if (!this.isRunning) {
            return;
        }

        this.isRunning = false;
        if (this.animationFrameId !== null) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
    }

    private calculateDeltaTime(currentTimestamp: number): number {
        const deltaTime = (currentTimestamp - this.lastTimestamp) / 1000; // Convert to seconds
        this.lastTimestamp = currentTimestamp;
        return deltaTime;
    }

    private gameLoop(timestamp: number) {
        if (!this.isRunning) return;

        let deltaTime = this.calculateDeltaTime(timestamp);
        
        // Process user input with maximum possible rate
        this.engine.processInput();

        while (deltaTime >= this.fixedUpdateRate) {
            this.engine.update(this.fixedUpdateRate);
            deltaTime -= this.fixedUpdateRate;
        }

        this.engine.render();

        this.animationFrameId = requestAnimationFrame(() => this.gameLoop(timestamp));
    }
}