import * as asset from './asset.js';
import * as download from './download.js';
import * as environment from './environment.js';
import { Octokit } from 'octokit';
import * as version from './version.js';
import * as z from 'zod';
const owner = 'cerbos';
const repository = 'cerbos';
const argsSchema = z.object({
    binaries: z.array(z.string().nonempty()),
    octokit: z.instanceof(Octokit),
    version: version.versionSchema
});
const validateArgs = (args) => {
    return argsSchema.parse(args);
};
export const setup = async (args) => {
    args = validateArgs(args);
    const ver = await version.version({
        owner: owner,
        repository: repository,
        octokit: args.octokit,
        version: args.version
    });
    await download.download({
        asset: await asset.asset({
            owner: owner,
            repository: repository,
            environment: environment.environment(),
            octokit: args.octokit,
            version: ver
        }),
        binaries: args.binaries
    });
};
//# sourceMappingURL=setup.js.map