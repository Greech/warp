// provider-registrar.ts
import { Injector } from '../injector';
import { InstanceCreator } from '../meta';
import { ClassProvider, ValueProvider } from '../models/provider.model';

export class ProviderRegistrar {
    registerProviders(providers: ValueProvider[] | ClassProvider[] |  InstanceCreator[] | null, injector: Injector): void {
        providers?.forEach(provider => {
            injector.registerDependency(provider);
        });
    }
}