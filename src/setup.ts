// Copyright 2021-2025 Zenauth Ltd.
// SPDX-License-Identifier: Apache-2.0

import * as asset from "./asset.js";
import * as download from "./download.js";
import * as environment from "./environment.js";
import { Octokit } from "octokit";
import * as version from "./version.js";
import * as z from "zod";

const owner = "cerbos";
const repository = "cerbos";

const argsSchema = z.object({
  binaries: z.array(z.string().nonempty()),
  githubToken: z.string(),
  octokit: z.instanceof(Octokit),
  version: version.versionSchema,
});

export interface Args {
  binaries: string[];
  githubToken: string;
  octokit: Octokit;
  version: string;
}

const validateArgs = (args: Args): Args => {
  return argsSchema.parse(args);
};

export const setup = async (args: Args) => {
  args = validateArgs(args);

  const ver = await version.version({
    owner: owner,
    repository: repository,
    octokit: args.octokit,
    version: args.version,
  });

  download.download({
    asset: await asset.asset({
      owner: owner,
      repository: repository,
      environment: environment.environment(),
      octokit: args.octokit,
      version: ver,
    }),
    binaries: args.binaries,
  });
};
