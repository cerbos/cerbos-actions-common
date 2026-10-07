import { Octokit } from "octokit";
import * as z from "zod";
import * as environment from "./environment.js";
import * as version from "./version.js";
interface Args {
    repository: string;
    owner: string;
    octokit: Octokit;
    environment: environment.Environment;
    version: version.Version;
}
export declare const schema: z.ZodObject<{
    url: z.ZodURL;
    version: z.ZodObject<{
        semver: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export interface Asset {
    url: string;
    version: version.Version;
}
export declare const asset: (args: Args) => Promise<Asset>;
export {};
