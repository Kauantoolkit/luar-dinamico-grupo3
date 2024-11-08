import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Luar',

  projectId: '2yrpcu57',
  dataset: 'lunar',
  studioHost: 'luar334543',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
