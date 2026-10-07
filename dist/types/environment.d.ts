import * as z from "zod";
export declare const schema: z.ZodObject<{
    architecture: z.ZodEnum<{
        arm64: "arm64";
        x86_64: "x86_64";
    }>;
    platform: z.ZodEnum<{
        Darwin: "Darwin";
        Linux: "Linux";
        Windows: "Windows";
    }>;
}, z.core.$strip>;
export interface Environment {
    architecture: string;
    platform: string;
}
export declare const validate: (environment: Environment) => Environment;
export declare const environment: () => Environment;
