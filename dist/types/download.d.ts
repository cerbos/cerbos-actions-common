import { Asset } from "./asset";
interface DownloadArgs {
    asset: Asset;
    binaries: string[];
}
declare const _default: (args: DownloadArgs) => Promise<void>;
export default _default;
