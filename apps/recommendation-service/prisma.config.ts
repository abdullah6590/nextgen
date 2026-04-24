import path from "path";
import { defineConfig } from "prisma/config";

const databaseUrl = process.env.DATABASE_URL || 'postgresql://admin:password@localhost:5432/eshop_db?schema=recommendations';

export default defineConfig({
  schema: path.join(__dirname, "prisma/schema.prisma"),
  migrations: {
    path: path.join(__dirname, "prisma/migrations"),
  },
  datasource: {
    url: databaseUrl,
  },
});
