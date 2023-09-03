import { BaseEntity } from "./base-entity";

export class EntityManager {
    private entities: BaseEntity[] = [];

    addEntity(entity: BaseEntity): void {
        this.entities.push(entity);
    }

    getAllEntitiesWithComponents(componentTypes: Function[]): BaseEntity[] {
        return this.entities.filter(entity =>
            componentTypes.every(componentType => entity.hasComponent(componentType))
        );
    }
}