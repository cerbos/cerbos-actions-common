import * as core from '@actions/core';
import * as io from '@actions/io';
import * as tc from '@actions/tool-cache';
import * as version from './version.js';
import * as z from 'zod';
const argsSchema = z.object({
    binary: z.string(),
    version: version.schema.optional()
});
const validateArgs = (args) => {
    return argsSchema.parse(args);
};
const schema = z.object({
    inPath: z.boolean(),
    inToolCache: z.boolean().optional(),
    path: z.string(),
    cachePath: z.string().optional()
});
const validate = (available) => {
    return schema.parse(available);
};
export const available = async (args) => {
    args = validateArgs(args);
    let path = '';
    try {
        path = await io.which(args.binary, true);
    }
    catch (e) {
        const err = e;
        if (!err.message.startsWith('Unable to locate executable file')) {
            core.setFailed(JSON.stringify(err));
            process.exit(1);
        }
    }
    if (!path) {
        core.info(`Failed to find binary ${args.binary} in PATH`);
    }
    if (!args.version) {
        core.warning(`Skipped finding binary ${args.binary} in tool cache`);
        return validate({
            inPath: path !== '',
            path: path
        });
    }
    const cached = tc.find(args.binary, args.version.semver);
    if (!cached) {
        core.info(`Failed to find binary ${args.binary} in tool cache`);
    }
    return validate({
        inPath: path !== '',
        inToolCache: cached !== '',
        path: path,
        cachePath: cached
    });
};
//# sourceMappingURL=available.js.map