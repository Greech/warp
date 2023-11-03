import { InstanceCreator } from "@warp/core";

export interface GameState {
    name: string;
    resetTo?: string;
    module?: InstanceCreator<any>;
    children?: GameState[];
}

export const STATES = 'GAME_STATE_TOKEN';