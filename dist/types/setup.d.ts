import { Octokit } from "octokit";
export interface Args {
    binaries: string[];
    githubToken: string;
    octokit: Octokit;
    version: string;
}
export declare const setup: (args: Args) => Promise<void>;
