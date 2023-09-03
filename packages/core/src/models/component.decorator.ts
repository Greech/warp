// ComponentDecorator.ts
export function Component({name}: { name: string}) {
    return function(target: Function) {
        return class extends (target as any) {
        constructor(...args: any[]) {
            super(...args);
            Object.assign(this, { name: 'Component' });
            Object.assign(this, { componentName: name });
        }
        };
    } as ClassDecorator;
}