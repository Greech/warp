import 'reflect-metadata';
import { ClassProvider, ValueProvider } from './models/provider.model';

export class Injector {
    private dependencies: Map<Function | string, any> = new Map();
    private multiDependencies: Map<Function | string, any[]> = new Map();

    registerDependency(dependency: Function | ClassProvider | ValueProvider) {
        if (typeof dependency === 'function') {
            dependency = this.instantiate(dependency as new (...args: any[]) => any);
            this.dependencies.set(dependency.constructor, dependency);
            return;
        }
        
        if (dependency.multi) {
            const existingMulti = this.multiDependencies.get(dependency.provide) || [];

            if((dependency as ClassProvider).useClass) {
                existingMulti.push(this.instantiate((dependency as ClassProvider).useClass as new (...args: any[]) => any));
            } else {
                existingMulti.push((dependency as ValueProvider).useValue);
            }
            this.multiDependencies.set(dependency.provide, existingMulti);
        } else {
            if((dependency as ClassProvider).useClass) {
                const dependencyInstance = this.instantiate((dependency as ClassProvider).useClass as new (...args: any[]) => any);
                this.dependencies.set(dependency.provide, dependencyInstance);
            } else {
                this.dependencies.set(dependency.provide, dependency);
            }
        }
    }

    getDependency<T>(dependencyClass: Function | string): T | T[] {
        if (this.multiDependencies.has(dependencyClass)) {
            return this.multiDependencies.get(dependencyClass);
        }

        const dependency = this.dependencies.get(dependencyClass);
        if (!dependency) {
            throw new Error(`Missing dependency: ${dependencyClass}`);
        }
        return dependency;
    }

    // Automatically inject dependencies based on constructor parameters
    instantiate<T>(classType: new (...args: any[]) => T): T {
        const paramTypes: any[] = Reflect.getMetadata('design:paramtypes', classType) || [];
        // Use the class name as metadata key
        const metadataKey = `${classType.name}_inject_metadata`; 

        const injectedParams: string[] = Reflect.getMetadata(metadataKey, classType) || [];

        const resolvedDependencies = paramTypes.map((paramType, index) => {
            const injectedParam = injectedParams[index];
            if (injectedParam !== undefined) {
                return this.getDependency(injectedParam);
            } else {
                return this.getDependency(paramType);
            }
        });

        return new classType(...resolvedDependencies);
    }


    dispose(classesToDispose: Function[] = []) {
         // Iterate through the provided classes and call a dispose method if available.
         classesToDispose.forEach((dependencyClass) => {
            if (this.multiDependencies.has(dependencyClass)) {
                const multiDeps = this.multiDependencies.get(dependencyClass);
                multiDeps.forEach((dep) => {
                    if (typeof dep.dispose === 'function') {
                        dep.dispose();
                    }
                });
            } else {
                const dependency = this.dependencies.get(dependencyClass);
                if (dependency && typeof dependency.dispose === 'function') {
                    dependency.dispose();
                }
            }
        });
      }
}