import { Octokit } from "octokit";
import * as z from "zod";
export declare const versionSchema: z.ZodUnion<readonly [z.ZodLiteral<"">, z.ZodLiteral<"latest">, z.ZodString]>;
export declare const semVerSchema: z.ZodString;
interface Args {
    owner: string;
    repository: string;
    octokit: Octokit;
    version: string;
}
export declare const schema: z.ZodObject<{
    semver: z.ZodString;
}, z.core.$strip>;
export interface Version {
    semver: string;
}
export declare const version: (args: Args) => Promise<Version>;
export {};
