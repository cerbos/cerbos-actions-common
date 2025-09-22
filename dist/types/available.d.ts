import * as version from "./version.js";
interface Args {
    binary: string;
    version?: version.Version;
}
interface Available {
    inPath: boolean;
    inToolCache?: boolean;
    path: string;
    cachePath?: string;
}
export declare const available: (args: Args) => Promise<Available>;
export {};
