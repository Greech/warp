import { Module } from "@warp/core";
import { GameState, StateModule } from "@warp/state";
import { GameplayModule } from "./gameplay/gameplay.module";
import { MainMenuModule } from "./main-menu/main-menu.module";

const gameStates: GameState[] = [
    {
        name: 'main-menu',
        module: MainMenuModule,
        initial: true,
    },
    {
        name: 'gameplay',
        module: GameplayModule,
    },
]; 

@Module({
    imports: [
        StateModule.forRoot(gameStates).module,
    ]
})
export class GameStateModule {}