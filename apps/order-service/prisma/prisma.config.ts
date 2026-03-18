import { defineConfig } from '@prisma/config'

export default defineConfig({
  earlyAccess: true,
  studio: {
    port: 5556,
  },
  datasource: {
    url: process.env.POSTGRES_URI,
  },
})
