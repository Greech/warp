
export interface EntityConfiguration {
    name: string;
    components: {[key in string]: any}
}

export function Entity({name, components}: EntityConfiguration) {
    return function(target: Function) {
        return class extends (target as any) {
        constructor(...args: any[]) {
            super(...args);
            Object.assign(this, { name: 'Entity' });
            Object.assign(this, { entityName: name });
            Object.assign(this, { components });
        }
        };
    } as ClassDecorator;
}