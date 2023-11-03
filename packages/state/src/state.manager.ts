import { Inject, Injector, INJECTOR } from "@warp/core";
import { GameState, STATES } from "./game-state.model";

interface StateTreeBranch {
    parent: GameState | null;
    children: GameState[] | null;
}

export class StateManager {
    private states: Map<string, GameState> = new Map();
    private currentState: GameState = null;

    constructor(
        @Inject(STATES) gameStates: GameState[],
        @Inject(INJECTOR) injector: Injector
    ) {
        console.log('StateManager gameStates', gameStates);
        console.log('injector', injector);
    }

    setState(stateName: string): void {
        const requestedState = this.states.get(stateName);
        if(!requestedState) {
            throw new Error(`State ${stateName} is not defined.`);
        }
        this.currentState = requestedState;
        // handle previus step if its the step on the same level 
        // if its inner state then go to step 2 
        // 1. Remove providers and imports modules from DI
        // 2. Remove enteties
        // 3. Remove systems

        // step 2 handle new state 
        // 1. Add providers and imports to the DI 
        // 2. Register systems
        // 3. Register entities in the entity manager
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