// Copyright 2021-2026 Zenauth Ltd.
// SPDX-License-Identifier: Apache-2.0

import * as core from '@actions/core'
import {Octokit} from 'octokit'
import * as z from 'zod'

export const versionSchema = z.union([
  z.literal(''),
  z.literal('latest'),
  z
    .string()
    .regex(
      /^v(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/
    )
])

export const semVerSchema = z
  .string()
  .regex(
    /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/
  )

const argsSchema = z.object({
  repository: z.string(),
  owner: z.string(),
  octokit: z.instanceof(Octokit),
  version: versionSchema
})

interface Args {
  owner: string
  repository: string
  octokit: Octokit
  version: string
}

const validateArgs = (args: Args): Args => {
  return argsSchema.parse(args)
}

export const schema = z.object({
  semver: semVerSchema
})

export interface Version {
  semver: string
}

export const version = async (args: Args): Promise<Version> => {
  args = validateArgs(args)

  let semver = ''
  if (args.version === '' || args.version === 'latest') {
    let data
    try {
      const response = await args.octokit.request(
        'GET /repos/{owner}/{repo}/releases/latest',
        {
          owner: args.owner,
          repo: args.repository
        }
      )
      data = response.data
    } catch (error) {
      const err = error as Error
      core.setFailed(
        `Failed to fetch releases from GitHub API: ${JSON.stringify(err)}}`
      )
      return process.exit(1)
    }

    semver = data.tag_name.split('v')[1]
  } else if (args.version.startsWith('v')) {
    semver = args.version.split('v')[1]
  }
  core.info(`The version is resolved to ${args.version}`)

  return schema.parse({
    semver: semver
  })
}
