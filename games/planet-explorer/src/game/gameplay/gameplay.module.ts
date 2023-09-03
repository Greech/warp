import { Module } from "@warp/core";
import { BackgroundEntity } from "./entities/background.entity";

@Module({
    entities: [
        BackgroundEntity
    ]
})
export class GameplayModule {}