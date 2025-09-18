import { Octokit } from "octokit";
interface SetupArgs {
    binaries: string[];
    githubToken: string;
    octokit: Octokit;
    version: string;
}
declare const _default: (args: SetupArgs) => Promise<void>;
export default _default;
