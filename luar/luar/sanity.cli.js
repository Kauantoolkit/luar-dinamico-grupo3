import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '2yrpcu57',
    dataset: 'lunar'
  },
  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  autoUpdates: true,
})
