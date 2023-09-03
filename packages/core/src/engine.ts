import 'reflect-metadata'; // Import required for metadata

import { Injector } from './injector';
import { BaseEntity, EntityManager } from './entity';
import { ISystem } from './models';
import { IModule } from './models/module.decorator';

type SystemConstructor = new () => ISystem;
type EntityConstructor = new () => BaseEntity;

export class Engine {
    private injector: Injector;
    private updateSystems: ISystem[] = [];
    private renderSystems: ISystem[] = [];

    constructor(GameModule: new () => any) {
        this.injector = new Injector();
        console.log('GameModule', GameModule);

        const gameModule = new GameModule() as IModule;
        console.log('gamemodule', gameModule);

        // Register all providers
        // this.injector.registerDependency(this.entityManager);

        // add systems
        // const systemClasses = this.discoverClasses<SystemConstructor>('ecs:system');
        // this.systems = systemClasses.map(systemClass => {
        //     return this.injector.instantiate<ISystem>(systemClass)
        // });

        // add enteties
        // const entitiesClasses = this.discoverClasses<EntityConstructor>('ecs:entity');
        // entitiesClasses.forEach(entityClass => {
        //     this.entityManager.addEntity(new entityClass());
        // });
    }

    processInput(): void {

    }

    update(deltaTime: number) {
        this.updateSystems.forEach(system => {
            system.update(deltaTime);
        });
    }

    render() {
        this.renderSystems.forEach(system => {
            system.render();
        });
    }
}