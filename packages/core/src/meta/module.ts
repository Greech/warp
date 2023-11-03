// ModuleDecorator.ts

export type InstanceCreator<T = any> = (new (...args: any) => T);

export interface IModule {
    name: 'GameModule',
    config: ModuleConfig,
}

export interface ModuleWithProviders<T> {
    module: InstanceCreator<T>,
    providers?: InstanceCreator[] | any[];
}

export interface ModuleConfig { 
    imports?: InstanceCreator<any>[] | ModuleWithProviders<any>[] | any[],
    providers?: InstanceCreator[];
    systems?: InstanceCreator[],
    entities?: InstanceCreator[],
    // Handler for the game canvas
    components?: InstanceCreator[],
}

export function Module(config: ModuleConfig) {
    return function(target: Function) {
        return class extends (target as any) {
        constructor(...args: any[]) {
            super(...args);
            Object.assign(this, { name: 'GameModule' });
            Object.assign(this, { config });
        }
        };
    } as ClassDecorator;
}
