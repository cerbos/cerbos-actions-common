interface Args {
    policiesDir: string;
    testsDir?: string;
}
export declare const compile: (args: Args) => Promise<void>;
export {};
