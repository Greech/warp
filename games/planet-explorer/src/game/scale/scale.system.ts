import { EntityManager, ISystem, System } from "@warp/core";
import { UIPositionComponent } from "../ui/components/ui-position.component";
import { UISizeComponent } from "../ui/components/ui-size.component";
import { ScaleComponent } from "./scale.component";

@System({
    components: [ScaleComponent, UIPositionComponent, UISizeComponent]
})
export class ScaleSystem implements ISystem {
    private entityManager: EntityManager;

    constructor(entityManager: EntityManager) {
        this.entityManager = entityManager;
    }

    update(deltaTime: number) {
        this.entityManager
            .getAllEntitiesWithComponents([ScaleComponent, UIPositionComponent, UISizeComponent])
            .forEach(entity => {
                const scale = entity.getComponent<ScaleComponent>(ScaleComponent);
                const position = entity.getComponent<UIPositionComponent>(UIPositionComponent);
                const size = entity.getComponent<UISizeComponent>(UISizeComponent);

                // Calculate new scaled position based on scaledWidth and scaledHeight
                if(scale.scalePosition) {
                    // position.x =  (position.x, scaledWidth);
                    // position.y = calculateNewY(position.y, scaledHeight);
                }

                // Calculate new scaled size based on scaledWidth and scaledHeight
                if(scale.scaleSize) {
                    // size.width = calculateNewWidth(size.width, scaledWidth);
                    // size.height = calculateNewHeight(size.height, scaledHeight);
                }
            });
    }

    render(): void {
        
    }
}