import { Module, ModuleWithProviders } from "@warp/core";

import { CanvasManager } from "./ui-canvas.manager";
import { UIPositionComponent } from "./components/ui-position.component";
import { UISizeComponent } from "./components/ui-size.component";
import { UIRenderSystem } from "./ui-render.system";

export const CANVAS_ID = 'CANVAS_ID';

@Module({
    components: [
        UIPositionComponent,
        UISizeComponent,
    ],
    systems: [
        UIRenderSystem
    ],
})
export class UIModule {
    static forRoot(canvasId: string): ModuleWithProviders<UIModule> {
        return {
            module: UIModule,
            providers: [
                {
                    provider: CANVAS_ID,
                    useValue: canvasId,
                },
                CanvasManager
            ],
        }
    }
}