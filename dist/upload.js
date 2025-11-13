import * as core from '@actions/core';
import * as available from './available.js';
import * as child from 'child_process';
import * as z from 'zod';
const binaryCerbosctl = 'cerbosctl';
const workspaceEnvKey = 'GITHUB_WORKSPACE';
const argsSchema = z.object({
    apiEndpoint: z.httpUrl().nonempty(),
    clientID: z.string().nonempty(),
    clientSecret: z.string().nonempty(),
    storeID: z.string().nonempty(),
    fromRevision: z.string().optional(),
    toRevision: z.string().optional(),
    subDir: z.string().optional()
});
const validateArgs = (args) => {
    return argsSchema.parse(args);
};
export const upload = async (args) => {
    args = validateArgs(args);
    const av = await available.available({
        binary: binaryCerbosctl
    });
    if (!av.inPath) {
        core.setFailed(`Failed to find binary ${binaryCerbosctl} in PATH, please add https://github.com/cerbos/cerbos-setup-action action to your workflow.`);
        process.exit(1);
    }
    const workspaceDir = process.env[workspaceEnvKey];
    if (!workspaceDir) {
        core.setFailed(`Environment variable ${workspaceEnvKey} is not set by the workflow runner.`);
        process.exit(1);
    }
    let command = `${av.path} hub store upload-git --path=${workspaceDir} --api-endpoint="${args.apiEndpoint}" --store-id=${args.storeID} --client-id=${args.clientID} --client-secret=${args.clientSecret}`;
    if (args.subDir && args.subDir !== '') {
        core.info(`--subdir is set to ${args.subDir}`);
        command += ` --subdir=${args.subDir}`;
    }
    else {
        core.info('--subdir is not set');
    }
    if (args.fromRevision && args.fromRevision !== '') {
        core.info(`--from is set to ${args.fromRevision}`);
        command += ` --from=${args.fromRevision}`;
    }
    else {
        core.info('--from is not set');
    }
    if (args.toRevision && args.toRevision !== '') {
        core.info(`--to is set to ${args.toRevision}`);
        command += ` --to=${args.toRevision}`;
    }
    else {
        core.info('--to is not set');
    }
    core.info(`The command to run is: ${command}`);
    core.startGroup(`The results for the command ${command}`);
    child.exec(command, (err, stdout, stderr) => {
        let exitCode = 0;
        if (err) {
            exitCode = 1;
            core.setFailed(`Failed to run Cerbosctl`);
            core.error(err.message);
        }
        if (stderr) {
            exitCode = 1;
            core.setFailed(`An error occured`);
            core.error(stderr);
        }
        if (stdout) {
            core.info(stdout);
        }
        core.endGroup();
        process.exit(exitCode);
    });
};
//# sourceMappingURL=upload.js.map