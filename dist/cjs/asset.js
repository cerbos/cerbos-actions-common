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
exports.Schema = void 0;
var octokit_1 = require("octokit");
var z = __importStar(require("zod"));
var core = __importStar(require("@actions/core"));
var environment_1 = require("./environment");
var owner = "cerbos";
var repository = "cerbos";
var SchemaArgs = z.object({
    environment: environment_1.Schema,
    octokit: z.instanceof(octokit_1.Octokit),
    version: z.union([
        z.literal(""),
        z.literal("latest"),
        z
            .string()
            .regex(/^v(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/),
    ]),
});
var ValidateArgs = function (args) {
    return SchemaArgs.parse(args);
};
exports.Schema = z.object({
    url: z.url(),
    version: z
        .string()
        .regex(/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/),
});
var Validate = function (asset) {
    return exports.Schema.parse(asset);
};
exports.default = (function (args) { return __awaiter(void 0, void 0, void 0, function () {
    var data, assetName, releases, _i, releases_1, release, _a, _b, asset, a;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                args = ValidateArgs(args);
                if (!(args.version === "" || args.version === "latest")) return [3, 2];
                return [4, args.octokit.request("GET /repos/{owner}/{repo}/releases/latest", {
                        owner: owner,
                        repo: repository,
                    })];
            case 1:
                data = (_c.sent()).data;
                args.version = data.tag_name.split("v")[1];
                return [3, 3];
            case 2:
                if (args.version.startsWith("v")) {
                    args.version = args.version.split("v")[1];
                }
                _c.label = 3;
            case 3:
                core.info("The asset version is resolved to ".concat(args.version));
                assetName = "cerbos_".concat(args.version, "_").concat(args.environment.platform, "_").concat(args.environment.architecture, ".tar.gz");
                core.info("The asset name is resolved to ".concat(assetName));
                return [4, args.octokit.request("GET /repos/{owner}/{repo}/releases", {
                        owner: owner,
                        repo: repository,
                    })];
            case 4:
                releases = (_c.sent()).data;
                for (_i = 0, releases_1 = releases; _i < releases_1.length; _i++) {
                    release = releases_1[_i];
                    for (_a = 0, _b = release.assets; _a < _b.length; _a++) {
                        asset = _b[_a];
                        if (asset.name === assetName) {
                            a = Validate({
                                version: args.version,
                                url: asset.browser_download_url,
                            });
                            core.info("The asset is resolved to ".concat(JSON.stringify(a)));
                            return [2, a];
                        }
                    }
                }
                core.setFailed("Failed to fetch the asset with name ".concat(assetName, " from GitHub"));
                process.exit(1);
                return [2];
        }
    });
}); });
//# sourceMappingURL=asset.js.map