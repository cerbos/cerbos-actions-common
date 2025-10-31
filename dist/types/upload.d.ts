interface Args {
    apiEndpoint: string;
    clientID: string;
    clientSecret: string;
    storeID: string;
    fromRevision: string;
    toRevision: string;
    subDir?: string;
}
export declare const upload: (args: Args) => Promise<void>;
export {};
