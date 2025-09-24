import * as core from '@actions/core'
import * as available from './available.js'
import * as child from 'child_process'
import * as z from 'zod'

const binaryCerbosctl = 'cerbosctl'
const workspaceEnvKey = 'GITHUB_WORKSPACE'

const argsSchema = z.object({
  clientID: z.string().nonempty(),
  clientSecret: z.string().nonempty(),
  storeID: z.string().nonempty(),
  fromRevision: z.string().default('HEAD~1'),
  toRevision: z.string().default('HEAD'),
  subDir: z.string().optional()
})

interface Args {
  clientID: string
  clientSecret: string
  storeID: string
  fromRevision: string
  toRevision: string
  subDir?: string
}

const validateArgs = (args: Args): Args => {
  return argsSchema.parse(args)
}

export const upload = async (args: Args) => {
  args = validateArgs(args)

  const av = await available.available({
    binary: binaryCerbosctl
  })
  if (!av.inPath) {
    core.setFailed(
      `Failed to find binary ${binaryCerbosctl} in PATH, please add https://github.com/cerbos/cerbos-setup-action action to your workflow.`
    )
    process.exit(1)
  }

  const workspaceDir = process.env[workspaceEnvKey]
  if (!workspaceDir) {
    core.setFailed(
      `Environment variable ${workspaceEnvKey} is not set by the workflow runner.`
    )
    process.exit(1)
  }

  let command = `${av.path} upload-git ${args.fromRevision} ${args.toRevision} --path=${workspaceDir} --store-id=${args.storeID} --client-id=${args.clientID} --client-secret=${args.clientSecret}`
  if (args.subDir && args.subDir !== '') {
    core.info(`Subdirectory is set to ${args.subDir}`)
    command += ` --subdir ${args.subDir}`
  } else {
    core.info('Subdirectory is not set')
  }

  core.info(`The command to run is: ${command}`)
  core.startGroup(`The results for the command ${command}`)
  child.exec(command, (err, stdout, stderr) => {
    let exitCode = 0
    if (err) {
      exitCode = 1
      core.setFailed(`Failed to run Cerbosctl`)
      core.error(err.message)
    }

    if (stderr) {
      exitCode = 1
      core.setFailed(`An error occured`)
      core.error(stderr)
    }

    if (stdout) {
      core.info(stdout)
    }

    core.endGroup()
    process.exit(exitCode)
  })
}
