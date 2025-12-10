// tina/config.ts
import { defineConfig } from "tinacms";
var branch = process.env.NEXT_PUBLIC_TINA_BRANCH || "rozpierdol";
var config_default = defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      {
        name: "pages",
        label: "Pages",
        path: "content/pages",
        format: "mdx",
        ui: {
          router: ({ document }) => {
            const locale = document._sys.breadcrumbs[0] || "pl";
            return `/admin/${locale}`;
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Page Title",
            required: true
          },
          {
            type: "string",
            name: "description",
            label: "Page Description"
          },
          {
            type: "object",
            name: "hero",
            label: "Hero Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
                required: true
              },
              {
                type: "string",
                name: "titleAccent",
                label: "Title Accent (highlighted)",
                required: true
              },
              {
                type: "string",
                name: "titleEnd",
                label: "Title End"
              },
              {
                type: "string",
                name: "subtitle",
                label: "Subtitle",
                ui: {
                  component: "textarea"
                }
              },
              {
                type: "string",
                name: "ctaButton",
                label: "CTA Button Text"
              },
              {
                type: "string",
                name: "briefButton",
                label: "Brief Button Text"
              },
              {
                type: "image",
                name: "image",
                label: "Hero Image"
              }
            ]
          },
          {
            type: "object",
            name: "technology",
            label: "Technology Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Section Title",
                required: true
              },
              {
                type: "string",
                name: "description",
                label: "Section Description",
                ui: {
                  component: "textarea"
                }
              },
              {
                type: "object",
                name: "items",
                label: "Technology Items",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "name",
                    label: "Technology Name",
                    required: true
                  },
                  {
                    type: "image",
                    name: "icon",
                    label: "Technology Icon/Logo",
                    required: true
                  },
                  {
                    type: "boolean",
                    name: "useBrightness",
                    label: "Apply Brightness Filter (for dark logos)",
                    description: "Enable for logos that need brightness-0 invert filter"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
