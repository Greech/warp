// module-registrar.ts

import { Injector } from "../injector";
import { IModule, InstanceCreator, ModuleWithProviders } from "../meta";

export class ModuleRegistrar {
    private moduleInstances: Map<Function, IModule> = new Map();

    registerModules(modules: InstanceCreator<any>[] | ModuleWithProviders<any>[] | any[] | null, injector: Injector): void {
        modules?.forEach(gameModule => this.registerModule(gameModule, injector));
    }

    private registerModule(gameModule: InstanceCreator<any> | ModuleWithProviders<any> | any, injector: Injector): void {
        let moduleInstance: IModule;

        if (this.isInstanceCreator(gameModule)) {
            moduleInstance = this.createAndStoreModuleInstance(gameModule);
        } else if (this.isModuleWithProviders(gameModule)) {
            moduleInstance = this.createAndStoreModuleInstance(gameModule.module);
            this.mergeProviders(moduleInstance, gameModule.providers);
        }

        this.registerModuleImports(moduleInstance, injector);
    }

    private isInstanceCreator(obj: any): obj is InstanceCreator<any> {
        return typeof obj === 'function';
    }

    private isModuleWithProviders(obj: any): obj is ModuleWithProviders<any> {
        return typeof obj === 'object' && obj.module;
    }

    private createAndStoreModuleInstance(moduleType: InstanceCreator<any>): IModule {
        const moduleInstance = new moduleType() as IModule;
        this.moduleInstances.set(moduleType, moduleInstance);
        return moduleInstance;
    }

    private mergeProviders(moduleInstance: IModule, providers?: InstanceCreator<any>[]): void {
        console.log('mergeProviders', moduleInstance);
        moduleInstance.config.providers = [
            ...(moduleInstance.config.providers || []),
            ...(providers || [])
        ];
    }

    private registerModuleImports(moduleInstance: IModule, injector: Injector): void {
        const moduleImports = moduleInstance?.config.imports;
        if (moduleImports && moduleImports.length > 0) {
            this.registerModules(moduleImports, injector);
        }
    }

    getModuleInstances(): Map<Function, IModule> {
        return this.moduleInstances;
    }
}
