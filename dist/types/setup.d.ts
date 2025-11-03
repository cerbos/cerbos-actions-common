import { Octokit } from 'octokit';
export interface Args {
    binaries: string[];
    octokit: Octokit;
    version: string;
}
export declare const setup: (args: Args) => Promise<void>;
