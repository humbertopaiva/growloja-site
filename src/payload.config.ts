import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { Users } from "./collections/Users";
import { Clients } from "./collections/Clients";
import { Diagnostics } from "./collections/Diagnostics";
import { createDbAdapter } from "./db/adapter";
import { seedDemo } from "./lib/diagnostic/seed";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: " · Growloja",
    },
    importMap: {
      baseDir: path.resolve(dirname),
      importMapFile: path.resolve(dirname, "app/(payload)/admin/importMap.js"),
    },
  },
  collections: [Users, Clients, Diagnostics],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "troque-este-segredo-local",
  cors: process.env.NEXT_PUBLIC_SITE_URL ? [process.env.NEXT_PUBLIC_SITE_URL] : [],
  csrf: process.env.NEXT_PUBLIC_SITE_URL ? [process.env.NEXT_PUBLIC_SITE_URL] : [],
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: createDbAdapter(),
  async onInit(payload) {
    const email = process.env.PAYLOAD_ADMIN_EMAIL;
    const password = process.env.PAYLOAD_ADMIN_PASSWORD;
    if (email && password) {
      const { totalDocs: userCount } = await payload.count({ collection: "users", overrideAccess: true });
      if (userCount === 0) {
        await payload.create({
          collection: "users",
          overrideAccess: true,
          data: { email, password, name: "Admin Growloja" },
        });
      }
    }

    const shouldSeedDemo =
      process.env.PAYLOAD_SEED_DEMO === "true" || process.env.NODE_ENV !== "production";
    if (!shouldSeedDemo) return;

    const { totalDocs } = await payload.count({ collection: "diagnostics", overrideAccess: true });
    if (totalDocs === 0) {
      await seedDemo(payload);
    }
  },
});
