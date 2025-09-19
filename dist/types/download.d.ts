import * as asset from "./asset";
interface Args {
    asset: asset.Asset;
    binaries: string[];
}
export declare const download: (args: Args) => Promise<void>;
export {};
