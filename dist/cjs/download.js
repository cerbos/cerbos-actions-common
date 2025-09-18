"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var path = __importStar(require("node:path"));
var asset_1 = require("./asset");
var core = __importStar(require("@actions/core"));
var io = __importStar(require("@actions/io"));
var tc = __importStar(require("@actions/tool-cache"));
var z = __importStar(require("zod"));
var SchemaArgs = z.object({
    asset: asset_1.Schema,
    binaries: z.array(z.string()),
});
var ValidateArgs = function (args) {
    return SchemaArgs.parse(args);
};
exports.default = (function (args) { return __awaiter(void 0, void 0, void 0, function () {
    var binariesToDownload, _i, _a, binary, which, e_1, err, cached, extractedAsset, asset, error_1, cachedBinaryPaths, _b, binariesToDownload_1, binary, binaryPath, cachedBinaryPath, error_2, _c, cachedBinaryPaths_1, cachedBinaryPath;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                args = ValidateArgs(args);
                binariesToDownload = [];
                _i = 0, _a = args.binaries;
                _d.label = 1;
            case 1:
                if (!(_i < _a.length)) return [3, 7];
                binary = _a[_i];
                which = "";
                _d.label = 2;
            case 2:
                _d.trys.push([2, 4, , 5]);
                return [4, io.which(binary, true)];
            case 3:
                which = _d.sent();
                return [3, 5];
            case 4:
                e_1 = _d.sent();
                err = e_1;
                if (!err.message.startsWith("Unable to locate executable file")) {
                    core.setFailed(JSON.stringify(err));
                    process.exit(1);
                }
                return [3, 5];
            case 5:
                if (!which) {
                    core.info("Failed to find binary ".concat(binary, " in PATH"));
                }
                cached = tc.find(binary, args.asset.version);
                if (!cached) {
                    core.info("Failed to find binary ".concat(binary, " in tool cache"));
                }
                if (!cached && !which) {
                    core.info("Adding the ".concat(binary, " to the list of binaries to download"));
                    binariesToDownload.push(binary);
                }
                else if (cached && !which) {
                    core.info("Adding the binary ".concat(binary, " already available in the tool cache to PATH"));
                    core.addPath(cached);
                }
                else if (!cached && which) {
                    core.info("Removing the binary ".concat(binary, " from PATH and adding it to the list of binaries to (re)download"));
                    io.rmRF(which);
                    binariesToDownload.push(binary);
                }
                else {
                    core.info("Skipping the binary ".concat(binary, " as it is already in the tool cache and available in PATH"));
                }
                _d.label = 6;
            case 6:
                _i++;
                return [3, 1];
            case 7:
                if (binariesToDownload.length === 0) {
                    core.info("Found all binaries in the tool cache. Skipping...");
                    return [2];
                }
                extractedAsset = "";
                _d.label = 8;
            case 8:
                _d.trys.push([8, 11, , 12]);
                core.info("Downloading the asset from URL ".concat(args.asset.url));
                return [4, tc.downloadTool(args.asset.url)];
            case 9:
                asset = _d.sent();
                return [4, tc.extractTar(asset)];
            case 10:
                extractedAsset = _d.sent();
                core.info("Successfully extracted downloaded asset to ".concat(extractedAsset));
                return [3, 12];
            case 11:
                error_1 = _d.sent();
                core.setFailed("Error occured during retrieval of the archive: ".concat(error_1));
                process.exit(1);
                return [3, 12];
            case 12:
                cachedBinaryPaths = [];
                _d.label = 13;
            case 13:
                _d.trys.push([13, 18, , 19]);
                core.info("Adding the following binaries to the tool cache if exists in the downloaded asset: ".concat(binariesToDownload));
                _b = 0, binariesToDownload_1 = binariesToDownload;
                _d.label = 14;
            case 14:
                if (!(_b < binariesToDownload_1.length)) return [3, 17];
                binary = binariesToDownload_1[_b];
                binaryPath = path.join(extractedAsset, binary);
                return [4, tc.cacheFile(binaryPath, binary, binary, args.asset.version)];
            case 15:
                cachedBinaryPath = _d.sent();
                cachedBinaryPaths.push(cachedBinaryPath);
                core.info("The binary ".concat(binary, " at ").concat(cachedBinaryPath, " is added to the tool cache"));
                _d.label = 16;
            case 16:
                _b++;
                return [3, 14];
            case 17: return [3, 19];
            case 18:
                error_2 = _d.sent();
                core.setFailed("Error occured while adding binaries to the tool cache: ".concat(error_2));
                process.exit(1);
                return [3, 19];
            case 19:
                try {
                    for (_c = 0, cachedBinaryPaths_1 = cachedBinaryPaths; _c < cachedBinaryPaths_1.length; _c++) {
                        cachedBinaryPath = cachedBinaryPaths_1[_c];
                        core.addPath(cachedBinaryPath);
                        core.info("Added the binary ".concat(cachedBinaryPath, " from the tool cache to PATH"));
                    }
                }
                catch (error) {
                    core.setFailed("Error occured while adding binaries from the tool cache to PATH: ".concat(error));
                    process.exit(1);
                }
                return [2];
        }
    });
}); });
//# sourceMappingURL=download.js.map