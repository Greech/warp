import { UIImageComponent } from "../components/ui-image.component";
import { UILabelComponent } from "../components/ui-label.component";
import { UIPositionComponent } from "../components/ui-position.component";
import { UISizeComponent } from "../components/ui-size.component";

import { EntityManager, ISystem, System } from "@warp/core";
import { CanvasManager } from "@warp/ui";
 
@System({
    components: [UIPositionComponent, UISizeComponent] 
})
export class UIRenderSystem implements ISystem{
    private canvasManager: CanvasManager; // The rendering context for the canvas
    private entityManager: EntityManager;

    constructor(canvasManager: CanvasManager, entityManager: EntityManager) {
        this.canvasManager = canvasManager;
        this.entityManager = entityManager;
    }

    update() {
        const uiEntities = this.entityManager.getAllEntitiesWithComponents([
            UIPositionComponent,
            UISizeComponent,
        ]);

        console.log('context', this.canvasManager.context);

        uiEntities.forEach(uiEntity => {
            const context = this.canvasManager.context;
            const position = uiEntity.getComponent<UIPositionComponent>(UIPositionComponent);
            const size = uiEntity.getComponent<UISizeComponent>(UISizeComponent);

            context.fillStyle = 'black'; // Set fill color
            context.fillRect(position.x, position.y, size.width, size.height);

            console.log('context', context);

            // Example: Draw label text
            const labelComponent = uiEntity.getComponent<UILabelComponent>(UILabelComponent);
            if (labelComponent) {
            console.log('labelComponent', labelComponent);

                context.fillStyle = 'black';
                context.font = '24px Arial';
                context.fillText(labelComponent.text, position.x, position.y + 30);
            }

            // Example: Draw image
            const imageComponent = uiEntity.getComponent<UIImageComponent>(UIImageComponent);
            if (imageComponent) {
                const image = imageComponent.image;
                context.drawImage(image, position.x, position.y, size.width, size.height);
            }
        });
    }

    render(): void {
        
    }
}