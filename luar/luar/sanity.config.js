import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Luar',

  projectId: '2yrpcu57',
  dataset: 'lunar',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
