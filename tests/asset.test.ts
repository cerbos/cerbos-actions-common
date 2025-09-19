// Copyright 2021-2025 Zenauth Ltd.
// SPDX-License-Identifier: Apache-2.0

import * as asset from "../src/asset";
import { createEnvironment } from "./environment.test";
import { createVersion } from "./version.test";
import { describe, it } from "node:test";
import assert from "node:assert";
import { Octokit } from "octokit";

describe("Asset function", () => {
  const owner = "cerbos";
  const repository = "cerbos";
  const cerbosVersion = createVersion("0.46.0");
  const octokit = new Octokit({
    request: {
      fetch,
    },
  });

  it("should return correct asset name and URL for v0.46.0 (Linux x86_64)", async () => {
    const a = await asset.asset({
      owner: owner,
      repository: repository,
      octokit: octokit,
      environment: createEnvironment("Linux", "x86_64"),
      version: cerbosVersion,
    });

    assert.strictEqual(a.version.semver, "0.46.0");
    assert.strictEqual(
      a.url,
      "https://github.com/cerbos/cerbos/releases/download/v0.46.0/cerbos_0.46.0_Linux_x86_64.tar.gz",
    );
  });

  it("should return correct asset name and URL for v0.46.0 (Linux arm64)", async () => {
    const a = await asset.asset({
      owner: owner,
      repository: repository,
      octokit: octokit,
      environment: createEnvironment("Linux", "arm64"),
      version: cerbosVersion,
    });

    assert.strictEqual(a.version.semver, "0.46.0");
    assert.strictEqual(
      a.url,
      "https://github.com/cerbos/cerbos/releases/download/v0.46.0/cerbos_0.46.0_Linux_arm64.tar.gz",
    );
  });

  it("should return correct asset name and URL for v0.46.0 (Darwin x86_64)", async () => {
    const a = await asset.asset({
      owner: owner,
      repository: repository,
      octokit: octokit,
      environment: createEnvironment("Darwin", "x86_64"),
      version: cerbosVersion,
    });

    assert.strictEqual(a.version.semver, "0.46.0");
    assert.strictEqual(
      a.url,
      "https://github.com/cerbos/cerbos/releases/download/v0.46.0/cerbos_0.46.0_Darwin_x86_64.tar.gz",
    );
  });

  it("should return correct asset name and URL for v0.46.0 (Darwin arm64)", async () => {
    const a = await asset.asset({
      owner: owner,
      repository: repository,
      octokit: octokit,
      environment: createEnvironment("Darwin", "arm64"),
      version: cerbosVersion,
    });

    assert.strictEqual(a.version.semver, "0.46.0");
    assert.strictEqual(
      a.url,
      "https://github.com/cerbos/cerbos/releases/download/v0.46.0/cerbos_0.46.0_Darwin_arm64.tar.gz",
    );
  });
});
