import * as core from '@actions/core';
import { Octokit } from 'octokit';
import * as z from 'zod';
export const versionSchema = z.union([
    z.literal(''),
    z.literal('latest'),
    z
        .string()
        .regex(/^v(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/)
]);
export const semVerSchema = z
    .string()
    .regex(/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/);
const argsSchema = z.object({
    repository: z.string(),
    owner: z.string(),
    octokit: z.instanceof(Octokit),
    version: versionSchema
});
const validateArgs = (args) => {
    return argsSchema.parse(args);
};
export const schema = z.object({
    semver: semVerSchema
});
export const version = async (args) => {
    args = validateArgs(args);
    let semver = '';
    if (args.version === '' || args.version === 'latest') {
        const { data } = await args.octokit.request('GET /repos/{owner}/{repo}/releases/latest', {
            owner: args.owner,
            repo: args.repository
        });
        semver = data.tag_name.split('v')[1];
    }
    else if (args.version.startsWith('v')) {
        semver = args.version.split('v')[1];
    }
    core.info(`The version is resolved to ${args.version}`);
    return schema.parse({
        semver: semver
    });
};
//# sourceMappingURL=version.js.map