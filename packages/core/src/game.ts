// game.ts
import { Engine } from "./engine";
import { EntityManager } from './entity';
import { GameLoop } from './game-loop';
import { Injector, INJECTOR } from "./injector";
import { IModule, InstanceCreator } from './meta';
import { ModuleRegistrar } from './registrar/module-registrar';
import { ProviderRegistrar } from './registrar/provider-registrar';

export class Game {
    private injector: Injector;
    private moduleRegistrar: ModuleRegistrar;
    private providerRegistrar: ProviderRegistrar;

    constructor() {
        this.injector = new Injector();
        this.moduleRegistrar = new ModuleRegistrar();
        this.providerRegistrar = new ProviderRegistrar();
    }

    public initialize(GameModule: new () => any) {
        const gameModule = new GameModule() as IModule; 

        const coreProviders = [
            { provide: INJECTOR, useValue: this.injector },
            Engine,
            EntityManager,
            GameLoop
        ] as InstanceCreator[];

        this.providerRegistrar.registerProviders(coreProviders, this.injector);

        // Register modules and their providers
        this.moduleRegistrar.registerModules(gameModule.config.imports, this.injector);
        this.moduleRegistrar.getModuleInstances().forEach((gameModule: IModule) => {
            this.providerRegistrar.registerProviders(gameModule.config.providers, this.injector);
        });

        console.log('this.injector', this.injector);
    }
}
