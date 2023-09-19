import { InstanceCreator } from "./module";

export interface SystemConfiguration {
    components: InstanceCreator[]
}

export function System({ components }: SystemConfiguration) {
    return function(target: InstanceCreator) {
        return class extends (target as InstanceCreator) {
            constructor(...args: any[]) {
                super(...args);
                Object.assign(this, { name: 'System' });
                Object.assign(this, { components });
            }
            
            update(...updateArgs: any[]) {
                // Your custom logic before calling the original update method
                this.entityManager
                    .getAllEntitiesWithComponents(components)
                    .forEach((entity: any) => {
                        const result = super.update(...updateArgs, entity);
                    });              
            }
        };
    } as ClassDecorator;
}