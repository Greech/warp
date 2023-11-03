export interface Provider {
    provide: string | Function;
    multi?: boolean;
}

export interface ClassProvider extends Provider {
    useClass: Function;
}

export interface ValueProvider extends Provider {
    useValue: any;
}
