import * as core from "@actions/core";
import * as environment from "./environment.js";
import { Octokit } from "octokit";
import * as version from "./version.js";
import * as z from "zod";
const argsSchema = z.object({
    repository: z.string(),
    owner: z.string(),
    environment: environment.schema,
    octokit: z.instanceof(Octokit),
    version: version.schema,
});
const validateArgs = (args) => {
    return argsSchema.parse(args);
};
export const schema = z.object({
    url: z.url(),
    version: version.schema,
});
const validate = (asset) => {
    return schema.parse(asset);
};
export const asset = async (args) => {
    args = validateArgs(args);
    const assetName = `cerbos_${args.version.semver}_${args.environment.platform}_${args.environment.architecture}.tar.gz`;
    core.info(`The asset name to look for resolved to ${assetName}`);
    const { data: releases } = await args.octokit.request("GET /repos/{owner}/{repo}/releases", {
        owner: args.owner,
        repo: args.repository,
    });
    for (const release of releases) {
        for (const asset of release.assets) {
            if (asset.name === assetName) {
                const a = validate({
                    version: args.version,
                    url: asset.browser_download_url,
                });
                core.info(`The asset is resolved to ${JSON.stringify(a)}`);
                return a;
            }
        }
    }
    core.setFailed(`Failed to fetch the asset with name ${assetName} from GitHub`);
    process.exit(1);
};
//# sourceMappingURL=asset.js.map