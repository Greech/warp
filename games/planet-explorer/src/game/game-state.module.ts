import { Module } from "@warp/core";
import { GameState, StateModule } from "@warp/state";
import { GameplayModule } from "./gameplay/gameplay.module";
import { MainMenuModule } from "./main-menu/main-menu.module";

const gameStates: GameState[] = [
    {
        name: 'main-menu',
        module: MainMenuModule,
    },
    {
        name: 'gameplay',
        module: GameplayModule,
    },
    {
        name: '',
        resetTo: 'main-menu'
    }
]; 

@Module({
    imports: [
        StateModule.forRoot(gameStates),
    ]
})
export class GameStateModule {}