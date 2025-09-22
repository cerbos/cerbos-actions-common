import * as core from '@actions/core';
import * as os from 'os';
import * as z from 'zod';
export const schema = z.object({
    architecture: z.enum(['arm64', 'x86_64']),
    platform: z.enum(['Darwin', 'Linux', 'Windows'])
});
export const validate = (environment) => {
    return schema.parse(environment);
};
export const environment = () => {
    const architecture = os.arch();
    const platform = os.platform().toString();
    let env = {
        architecture: '',
        platform: ''
    };
    switch (architecture) {
        case 'x64':
            env.architecture = 'x86_64';
            break;
        case 'arm64':
            env.architecture = 'arm64';
            break;
    }
    switch (platform) {
        case 'linux':
            env.platform = 'Linux';
            break;
        case 'darwin':
            env.platform = 'Darwin';
            break;
        case 'win32':
            env.platform = 'Windows';
            break;
    }
    env = validate(env);
    core.info(`Environment is parsed as ${JSON.stringify(env)}`);
    return env;
};
//# sourceMappingURL=environment.js.map