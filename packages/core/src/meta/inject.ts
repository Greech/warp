export const Inject = (dependencyName: string) => {
  return (target: any, propertyKey: string | symbol, parameterIndex: number) => {
    // Use the class name as metadata key
    const metadataKey = `${target.name}_inject_metadata`; 

    // Store the dependency information in the class's metadata
    if (!Reflect.hasMetadata(metadataKey, target)) {
      Reflect.defineMetadata(metadataKey, [], target);
    }

    const dependencies = Reflect.getMetadata(metadataKey, target) as string[];
    // Store the dependency name, not the index
    dependencies[parameterIndex] = dependencyName; 
  };
};