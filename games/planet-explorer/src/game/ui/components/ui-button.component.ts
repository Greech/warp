import { Component } from "@warp/core";

interface UIButtonComponentParameters {
    clicked: boolean;
    label: string;
}

@Component({
    name: 'uiButton'
})
export class UIButtonComponent {
    constructor(parameters: UIButtonComponentParameters){}
}