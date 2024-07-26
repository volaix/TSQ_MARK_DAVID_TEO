
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "./app/api/graphql/_schemas/main.graphql",
  generates: {
    "./__generated__/resolversTypes.ts": {
      plugins: ["typescript", "typescript-resolvers", "typescript-mongodb", "typescript-document-nodes"],
      config: {
        contextType: "../app/api/graphql/apolloHandler#MyContext",
      }
    },
    "./__generated__/graphql.schema.json": {
      plugins: ["introspection"]
    }
  }
};

export default config;
