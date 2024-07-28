
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "./app/api/graphql/schema.graphql",
  documents: ["./app/_graphql/**/*.graphql"],
  generates: {
    "./__generated__/resolversTypes.ts": {
      plugins: ["typescript", "typescript-resolvers", "typescript-mongodb", "typescript-document-nodes"],
      config: {
        contextType: "../app/api/graphql/apolloHandler#Context",
      }
    },
    "./__generated__/graphql.schema.json": {
      plugins: ["introspection"]
    },
    "./__generated__/graphql.ts": {
      plugins: ["typescript", "typescript-operations", "typescript-react-apollo"],
    }
  }
};

export default config;
