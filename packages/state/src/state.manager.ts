import { Inject, InstanceCreator } from "@warp/core";
import { GameState, STATES } from "./game-state.model";

interface StateTreeBranch {
    parent: GameState | null;
    children: GameState[] | null;
}

export class StateManager {
    private states: Map<string, GameState> = new Map();
    private currentState: GameState = null;

    constructor(@Inject(STATES) gameStates: GameState[]) {
        console.log('StateManager gameStates', gameStates);
    }

    setState(stateName: string): void {
        const requestedState = this.states.get(stateName);
        if(!requestedState) {
            throw new Error(`State ${stateName} is not defined.`);
        }
        this.currentState = requestedState;
    }

    // Build the tree structure based on the root game state where children are poiting to the parent
    registerRootState(state: GameState) {
        const gameStateTree: StateTreeBranch = {
            parent: null,
            children: state.children
        };

        gameStateTree.children.map((child: GameState) => {
            const childState = {
                parent: state,
                children: child.children
            }
        });
    }

    buildChildTree(parent: GameState | null, child: GameState): StateTreeBranch {
        return {
            parent,
            children: child.children
        }
    }
}