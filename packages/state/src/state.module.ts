import { Module, ModuleWithProviders } from "@warp/core";

import { StateManager } from "./state.manager";
import { GameState, STATES } from "./game-state.model";

@Module({})
export class StateModule {
    static forRoot(states: GameState[]): ModuleWithProviders<StateModule> {
        return {
            module: StateModule,
            providers: [
                {
                    provider: STATES,
                    useValue: states,
                    multi: true
                },
                StateManager
            ],
        }
    }

    static forChild(childStates: GameState[]): ModuleWithProviders<StateModule> {
        return {
            module: StateModule,
            providers: [
                {
                    provider: STATES,
                    useValue: childStates,
                    multi: true
                },
            ]
        }
    }
}