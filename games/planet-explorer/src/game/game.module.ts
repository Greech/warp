import { Module } from "@warp/core";

import { UIButtonComponent } from "./ui/components/ui-button.component";
import { UISizeComponent } from "./ui/components/ui-size.component";
import { UIImageComponent } from "./ui/components/ui-image.component";
import { UIInteractionComponent } from "./ui/components/ui-interaction.component";
import { UILabelComponent } from "./ui/components/ui-label.component";
import { UIPositionComponent } from "./ui/components/ui-position.component";
import { GameStateModule } from "./game-state.module";

@Module({
    imports: [GameStateModule],
    components: [
        UIButtonComponent,
        UISizeComponent,
        UIImageComponent,
        UIInteractionComponent,
        UILabelComponent,
        UIPositionComponent,
    ],
})
export class GameModule {}