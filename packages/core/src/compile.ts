import { IModule } from './models/module.decorator';
function compile(GameModule: new () => IModule) {
    const gameModule = new GameModule;

    // Make flat structure from gameModule

    /**
     * export interface ModuleConfig { 
        imports?: InstanceCreator[],
        providers?: InstanceCreator[] | any[] | ModuleWithProviders<any>[];
        systems?: InstanceCreator[],
        entities?: InstanceCreator[],
        components?: InstanceCreator[],
    }
    */

    // 1. parent (Parent state module )

    // const applicationMap = {
    //     root: {
    //         providers,
    //         systems,
    //         entities,
    //         children: []
    //     },
    //     routeName1: {
    //         providers,
    //         systems,
    //         entities,
    //         // parent module name or pointert to class
    //         parent,
    //     }
    // };

    // state manager logic 
    // 1. Read the current state / initial state
    // 2. Find this state in the applicationMap
    // 3. Check is new state is the child of current state 
    // 4. If yes - add routed providers, systems and enteties to the current state configuration 
    // 5. If no - remove existitngs providers, systems and enteties from current state configuration and add new ones

    // imports
    // take Imports (modules) and move all providers on the top level
    // make it in loop until no providers list in child 

    // same with the root providers
    // return {
    //     providers,
    //     systems,
    //     entities,
    // }
}