import { GameState } from "./game-state.model";

export class StateManager {
    private states: Map<string, GameState> = new Map();

    registerState(stateName: string, state: GameState) {
        this.states.set(stateName, state);

    }
}