import { Module } from "@warp/core";

import { MenuEntity } from "./entities/menu.entity";

@Module({
    entities: [
        MenuEntity
    ]
})
export class MainMenuModule {}