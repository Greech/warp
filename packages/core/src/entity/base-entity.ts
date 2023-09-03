export class BaseEntity {
    private UUID: string;
    private components: Map<Function, any> = new Map();

    constructor() {
        this.UUID = crypto.randomUUID();
    }

    getUUID(){
        return this.UUID;
    }

    addComponent(component: any): BaseEntity {
        this.components.set(component.constructor, component);
        return this;
    }

    getComponent<T>(componentType: Function): T {
        return this.components.get(componentType);
    }

    hasComponent(componentType: Function): boolean {
        return this.components.has(componentType);
    }
}