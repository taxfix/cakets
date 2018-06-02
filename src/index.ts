export interface Module<T> {
    (): T
}

const UnitModule: Module<any> = () => ({});

export const inject = <T, M>(implementation: (m: M) => T) => <P extends M>(module: Module<P> = UnitModule): Module<T & P> => {
    const o = module() as T & P;
    for (const key of Object.keys(implementation(o)) as Array<keyof T>) {
        const method = implementation(o)[key];
        (o as T)[key] = method;
    }
    return () => o;
};

export const declare = <T>(implementation: T): <P extends any>(module?: Module<P>) => Module<T & P> =>
    inject((_: any) => implementation);