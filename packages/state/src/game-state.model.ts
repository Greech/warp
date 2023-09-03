import { IModule, InstanceCreator } from "@warp/core";

export interface GameState {
    name: string;
    module: InstanceCreator<any>;
    children?: GameState[];
    initial?: boolean;
}

export const STATES = 'GAME_STATE_TOKEN';