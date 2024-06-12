import type { Options as FlowOptions } from '@vxrn/vite-flow'
import type { Hono } from 'hono'
import type { OutputAsset, OutputChunk } from 'rollup'
import type { InlineConfig, UserConfig } from 'vite'

type RollupOutputList = [OutputChunk, ...(OutputChunk | OutputAsset)[]]

export type BuildArgs = { step?: string; only?: string; analyze?: boolean }

export type AfterBuildProps = {
  options: VXRNConfig
  clientOutput: RollupOutputList
  serverOutput: RollupOutputList
  webBuildConfig: UserConfig
  buildArgs?: BuildArgs
  clientManifest: {
    // app/[user].tsx
    [key: string]: ClientManifestEntry
  }
}

export type ClientManifestEntry = {
  file: string // assets/_user_-Bg0DW2rm.js
  src?: string // app/[user].tsx
  isDynamicEntry?: boolean // true for import.meta.globbed
  isEntry?: boolean // true for index.html
  name: string // _user_
  imports: string[]
  css?: string[]
}

export type VXRNConfig = {
  /**
   * The entry points to your app. For web, it defaults to using your `root` to look for an index.html
   *
   * Defaults:
   *   native: ./src/entry-native.tsx
   */
  entries?: {
    native?: string
    web?: string
  }
  root?: string
  host?: string
  port?: number
  flow?: FlowOptions

  // for hooking into things
  afterBuild?: (props: AfterBuildProps) => void | Promise<void>
  onServe?: (options: VXRNConfig, app: Hono) => void
}

export type HMRListener = (update: { file: string; contents: string }) => void
