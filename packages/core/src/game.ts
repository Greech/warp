import { Injector } from './injector';
import { Engine } from "./engine";
import { EntityManager } from './entity';
import { GameLoop } from './game-loop';

export class Game {
    private injector: Injector;

    constructor() {
        this.injector = new Injector();
        // Register all providers
        // this.injector.registerDependency(this.entityManager);

        // add systems
        // const systemClasses = this.discoverClasses<SystemConstructor>('ecs:system');
        // this.systems = systemClasses.map(systemClass => {
        //     return this.injector.instantiate<ISystem>(systemClass);
        // });

        // add enteties
        // const entitiesClasses = this.discoverClasses<EntityConstructor>('ecs:entity');
        // entitiesClasses.forEach(entityClass => {
        //     this.entityManager.addEntity(new entityClass());
        // });
    }

    public initilize(GameModule: new () => any) {
        // create a tree of the game so you can easily manage the state whithin the game 
        // register core providers
        const coreProviders = [Engine, EntityManager, GameLoop];
        coreProviders.forEach(provider => {
            this.injector.registerDependency(provider);
        });
    }
}