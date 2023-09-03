import { Entity } from "@warp/core";

@Entity({
    name: 'IngameBackground',
    components: {
        uiPosition: {
            x: 400,
            y: 300
        },
        uiSize: {
            width: 200,
            height: 300
        },
        uiLabel: {
            text: "THIS IS BACKGROUND"
        },
        scale: {
            scaleSize: true,
            scalePosition: true,
        }
    }
})
export class BackgroundEntity {}