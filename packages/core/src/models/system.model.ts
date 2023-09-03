export interface ISystem {
    isRenderer?: boolean;
    update(deltaTime: number): void;
    render(): void;
}