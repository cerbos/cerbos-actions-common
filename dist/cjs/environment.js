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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validate = exports.Schema = void 0;
var core = __importStar(require("@actions/core"));
var os = __importStar(require("os"));
var z = __importStar(require("zod"));
exports.Schema = z.object({
    architecture: z.enum(["arm64", "x86_64"]),
    platform: z.enum(["Darwin", "Linux", "Windows"]),
});
var Validate = function (environment) {
    return exports.Schema.parse(environment);
};
exports.Validate = Validate;
exports.default = (function () {
    var architecture = os.arch();
    var platform = os.platform().toString();
    var env = {
        architecture: "",
        platform: "",
    };
    switch (architecture) {
        case "x64":
            env.architecture = "x86_64";
            break;
        case "arm64":
            env.architecture = "arm64";
            break;
    }
    switch (platform) {
        case "linux":
            env.platform = "Linux";
            break;
        case "darwin":
            env.platform = "Darwin";
            break;
        case "win32":
            env.platform = "Windows";
            break;
    }
    env = (0, exports.Validate)(env);
    core.info("Environment is parsed as ".concat(JSON.stringify(env)));
    return env;
});
//# sourceMappingURL=environment.js.map