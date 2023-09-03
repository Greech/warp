import { Engine } from './engine';
import { GameLoop } from './game-loop'; // Import your existing GameLoop class
import { Type } from './models/type.model';

export const gameInitializer = <M>(gameModule: Type<M>) => {
    const engine = new Engine(gameModule);
    const gameLoop: GameLoop = new GameLoop(engine);

    (window as any).warp = {
        engine,
        gameLoop
    }
}