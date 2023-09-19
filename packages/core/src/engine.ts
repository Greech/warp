import { Injectable } from './meta/injectable';
import { ISystem } from './models';

export interface EngineState {
    updaters: ISystem[],
    renderers: ISystem[],
    inputProcessors: ISystem[],
}

@Injectable()
export class Engine {
    private state: EngineState = null;

    updateState(state: EngineState): void {
        this.state = { ...state };
    }

    processInput(): void {
        this.state.inputProcessors.forEach(system => {
        });
    }

    update(deltaTime: number) {
        this.state.updaters.forEach(system => {
            system.update(deltaTime);
        });
    }

    render() {
        this.state.renderers.forEach(system => {
            system.render();
        });
    }
}