import * as core from '@actions/core';
import * as available from './available.js';
import * as child from 'child_process';
import * as path from 'path';
import * as z from 'zod';
const binaryCerbos = 'cerbos';
const compileFailureErrorCode = 3;
const testFailureErrorCode = 4;
const workspaceEnvKey = 'GITHUB_WORKSPACE';
const argsSchema = z.object({
    policiesDir: z.string().nonempty(),
    testsDir: z.string().optional()
});
const validateArgs = (args) => {
    return argsSchema.parse(args);
};
export const compile = async (args) => {
    args = validateArgs(args);
    const av = await available.available({
        binary: binaryCerbos
    });
    if (!av.inPath) {
        core.setFailed('Failed to find cerbos binary in PATH, please add https://github.com/cerbos/cerbos-setup-action action to your workflow.');
        process.exit(1);
    }
    const workspaceDir = process.env[workspaceEnvKey];
    const absPoliciesDir = path.join(workspaceDir, args.policiesDir);
    core.info(`Policies directory is set to ${absPoliciesDir}`);
    let command = `${path} compile ${absPoliciesDir}`;
    if (args.testsDir && args.testsDir !== '') {
        const absTestsDir = path.join(workspaceDir, args.testsDir);
        core.info(`Tests directory is set to ${absTestsDir}`);
        command += ` --tests ${absTestsDir}`;
    }
    else {
        core.info('Tests directory is not set');
    }
    core.info(`The command to run is: ${command}`);
    core.startGroup(`The results for the command ${command}`);
    child.exec(command, (err, stdout, stderr) => {
        let exitCode = 0;
        if (err) {
            switch (err.code) {
                case compileFailureErrorCode:
                    exitCode = compileFailureErrorCode;
                    core.setFailed(`Compilation failed`);
                    break;
                case testFailureErrorCode:
                    exitCode = testFailureErrorCode;
                    core.setFailed(`Tests failed`);
                    break;
                default:
                    exitCode = 1;
                    core.setFailed(`Failed to launch Cerbos`);
                    break;
            }
            core.error(err.message);
        }
        if (stderr) {
            if (exitCode === 0) {
                exitCode = 1;
            }
            core.error(stderr);
        }
        if (stdout) {
            core.info(stdout);
        }
        core.endGroup();
        process.exit(exitCode);
    });
};
//# sourceMappingURL=compile.js.map