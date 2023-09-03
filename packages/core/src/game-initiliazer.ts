import { Game } from './game'; // Import your existing GameLoop class
import { Type } from './models/type.model';

export const gameInitializer = <M>(gameModule: Type<M>) => {
    const game: Game = new Game();
    game.initilize(gameModule);

    (window as any).warp = {
        game
    }
}