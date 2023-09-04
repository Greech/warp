import 'reflect-metadata';

export class Injector {
    private dependencies: Map<Function, any> = new Map();

    registerDependency<T>(dependency: T) {
        if(typeof dependency === 'function') {
            dependency = this.instantiate(dependency as new (...args: any[]) => T);
        }

        this.dependencies.set(dependency.constructor, dependency);
    }

    getDependency<T>(dependencyClass: Function): T {
        const dependency = this.dependencies.get(dependencyClass);
        if (!dependency) {
            throw new Error(`Missing dependency: ${dependencyClass.name}`);
        }
        return dependency;
    }

    // Automatically inject dependencies based on constructor parameters
    instantiate<T>(classType: new (...args: any[]) => T): T {
        const dependencies: any[] = Reflect.getMetadata('design:paramtypes', classType) || [];
        const resolvedDependencies = dependencies.map(dep => this.getDependency(dep));
        return new classType(...resolvedDependencies);
    }

    dispose(classesToDispose: Function[] = []) {
        // Iterate through the provided classes and call a dispose method if available.
        classesToDispose.forEach((dependencyClass) => {
          const dependency = this.dependencies.get(dependencyClass);
          if (dependency && typeof dependency.dispose === 'function') {
            dependency.dispose();
          }
        });
      }
}