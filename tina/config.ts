import { defineConfig } from "tinacms";

const branch = process.env.NEXT_PUBLIC_TINA_BRANCH || "main";

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID!,
  token: process.env.TINA_TOKEN!,
  
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  
  schema: {
    collections: [
      {
        name: "pages",
        label: "Pages",
        path: "content/pages",
        format: "mdx",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Page Title",
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Page Description",
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
                required: true,
              },
              {
                type: "string",
                name: "titleAccent",
                label: "Title Accent (highlighted)",
                required: true,
              },
              {
                type: "string",
                name: "titleEnd",
                label: "Title End",
              },
              {
                type: "string",
                name: "subtitle",
                label: "Subtitle",
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "string",
                name: "ctaButton",
                label: "CTA Button Text",
              },
              {
                type: "string",
                name: "briefButton",
                label: "Brief Button Text",
              },
              {
                type: "image",
                name: "image",
                label: "Hero Image",
              },
            ],
          },
        ],
      },
    ],
  },
});
