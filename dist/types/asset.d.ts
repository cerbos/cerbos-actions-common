import { Octokit } from "octokit";
import * as z from "zod";
import { Environment } from "./environment";
interface AssetArgs {
    octokit: Octokit;
    environment: Environment;
    version: string;
}
export declare const Schema: z.ZodObject<{
    url: z.ZodURL;
    version: z.ZodString;
}, z.core.$strip>;
export interface Asset {
    url: string;
    version: string;
}
declare const _default: (args: AssetArgs) => Promise<Asset>;
export default _default;
