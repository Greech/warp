import { Entity } from "@warp/core";

@Entity({
    name: 'MainMenu',
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
            text: "Main Menu"
        },
        uiButton: {
            clicked: false,
            label: "Play"
        },
        scale: {
            scaleSize: true,
            scalePosition: true,
        }
    }
})
export class MenuEntity{}