import { Injector } from './injector';
import { Engine } from "./engine";
import { EntityManager } from './entity';
import { GameLoop } from './game-loop';
import { IModule, InstanceCreator, ModuleWithProviders } from './meta';

export class Game {
    private injector: Injector;
    private moduleInstances: Map<Function, IModule> = new Map();

    constructor() {
        this.injector = new Injector();
    }

    public initilize(GameModule: new () => any) {
        const gameModule = new GameModule() as IModule; 

        const coreProviders = [Engine, EntityManager, GameLoop];
        coreProviders.forEach(provider => {
            this.injector.registerDependency(provider);
        });

        // register root providers
        this.registerProviders(gameModule.config.providers);
        const gameModules = gameModule.config.imports;
        this.registerModules(gameModules);

        // Register all providers for root level
        this.moduleInstances.forEach((gameModule: IModule, key: Function) => {
            this.registerProviders(gameModule.config.providers);
        });

        console.log('this.injector', this.injector);
    }

    private registerModules(modules: InstanceCreator<any>[] | ModuleWithProviders<any>[] | any[] | null) {
        modules.forEach(gameModule => {
            let moduleInstance = null;

            if(typeof gameModule === 'function') {
                moduleInstance = new gameModule as IModule;
                this.moduleInstances.set(gameModule, moduleInstance);
            }

            if(typeof gameModule === 'object' && gameModule.module) {
                moduleInstance = new gameModule.module() as IModule;
                const moduleProviders = moduleInstance.config.providers || [];
                moduleInstance.config.providers = [
                    ...moduleProviders,
                    ...gameModule.providers
                ]

                this.moduleInstances.set(gameModule.module, moduleInstance);
            }

            const moduleImports = moduleInstance.config.imports; 
            if(moduleImports && moduleImports.length > 0) {
                this.registerModules(moduleImports);
            }
        });
    }

    private registerProviders(providers: InstanceCreator[] | null): void {
        if(!providers) {
            return;
        }
        providers.forEach(provider => {
            this.injector.registerDependency(provider);
        })
    }
}