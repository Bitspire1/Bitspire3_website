import { defineConfig } from "tinacms";

const branch = process.env.NEXT_PUBLIC_TINA_BRANCH || "rozpierdol";

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
        ui: {
          router: ({ document }) => {
            // Extract locale from path (e.g., "pl/home.mdx" -> "pl")
            const locale = document._sys.breadcrumbs[0] || 'pl';
            return `/admin/${locale}`;
          },
        },
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
          {
            type: "object",
            name: "technology",
            label: "Technology Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Section Title",
                required: true,
              },
              {
                type: "string",
                name: "description",
                label: "Section Description",
                ui: {
                  component: "textarea",
                },
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
                    required: true,
                  },
                  {
                    type: "image",
                    name: "icon",
                    label: "Technology Icon/Logo",
                    required: true,
                  },
                  {
                    type: "boolean",
                    name: "useBrightness",
                    label: "Apply Brightness Filter (for dark logos)",
                    description: "Enable for logos that need brightness-0 invert filter",
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "offer",
            label: "Offer Section",
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
                name: "subtitle",
                label: "Subtitle",
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "string",
                name: "sectionLabel",
                label: "Section Label",
              },
              {
                type: "object",
                name: "services",
                label: "Services",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "title",
                    label: "Service Title",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "description",
                    label: "Service Description",
                    required: true,
                    ui: {
                      component: "textarea",
                    },
                  },
                  {
                    type: "string",
                    name: "icon",
                    label: "Icon (emoji)",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "features",
                    label: "Features",
                    list: true,
                  },
                  {
                    type: "string",
                    name: "link",
                    label: "CTA Link",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "buttonText",
                    label: "Button Text",
                    required: true,
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "portfolio",
            label: "Portfolio Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Section Title",
              },
              {
                type: "string",
                name: "description",
                label: "Section Description",
              },
              {
                type: "string",
                name: "sectionLabel",
                label: "Section Label",
              },
            ],
          },
          {
            type: "string",
            name: "selectedProjects",
            label: "Selected Projects (slugs)",
            list: true,
            description: "List of project slugs to display (e.g., 'pl/eduvantage')",
          },
        ],
      },
    ],
  },
});
