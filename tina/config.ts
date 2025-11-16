import { defineConfig } from "tinacms";

export default defineConfig({
  branch: "main",
  
  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "a40ff8b9-0082-4d76-bcf4-65199fb84432",
  // Get this from tina.io
  token: process.env.TINA_TOKEN || "8498b0864d915e53c11e066762bb90a6c122c739",

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
        name: "portfolio",
        label: "Portfolio",
        path: "content/portfolio",
        format: "mdx",
        match: {
          include: '**/*',
        },
        ui: {
          router: ({ document }) => {
            // Extract locale and slug from the path
            // document._sys.relativePath format: "pl/skladamy.mdx" or "en/eduvantage.mdx"
            const pathParts = document._sys.relativePath.split('/');
            if (pathParts.length >= 2) {
              const locale = pathParts[0]; // 'pl' or 'en'
              const slug = pathParts[1].replace('.mdx', '');
              
              return `/admin/preview/${locale}/portfolio/${slug}`;
            }
            return '/admin/preview/pl/portfolio';
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Project Title",
            required: true,
          },
          {
            type: "string",
            name: "slug",
            label: "URL Slug",
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Meta Description",
            required: true,
          },
          {
            type: "string",
            name: "excerpt",
            label: "Short Excerpt",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "datetime",
            name: "date",
            label: "Publication Date",
            required: true,
          },
          {
            type: "string",
            name: "category",
            label: "Category",
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
          },
          {
            type: "image",
            name: "image",
            label: "Featured Image",
          },
          {
            type: "string",
            name: "imageAlt",
            label: "Image Alt Text",
          },
          {
            type: "string",
            name: "link",
            label: "Project URL",
          },
          {
            type: "string",
            name: "client",
            label: "Client Name",
          },
          {
            type: "string",
            name: "year",
            label: "Year",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Content",
            isBody: true,
          },
        ],
      },
      {
        name: "blog",
        label: "Blog",
        path: "content/blog",
        format: "mdx",
        match: {
          include: '**/*',
        },
        ui: {
          router: ({ document }) => {
            // Extract locale and slug from the path
            // document._sys.relativePath format: "pl/post-slug.mdx" or "en/post-slug.mdx"
            const pathParts = document._sys.relativePath.split('/');
            if (pathParts.length >= 2) {
              const locale = pathParts[0]; // 'pl' or 'en'
              const slug = pathParts[1].replace('.mdx', '');
              
              return `/admin/preview/${locale}/blog/${slug}`;
            }
            return '/admin/preview/pl/blog';
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Post Title",
            required: true,
          },
          {
            type: "string",
            name: "slug",
            label: "URL Slug",
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Meta Description",
            required: true,
          },
          {
            type: "string",
            name: "excerpt",
            label: "Short Excerpt",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "datetime",
            name: "date",
            label: "Publication Date",
            required: true,
          },
          {
            type: "string",
            name: "author",
            label: "Author Name",
            required: true,
          },
          {
            type: "string",
            name: "category",
            label: "Category",
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
          },
          {
            type: "image",
            name: "image",
            label: "Featured Image",
          },
          {
            type: "string",
            name: "imageAlt",
            label: "Image Alt Text",
          },
          {
            type: "number",
            name: "readTime",
            label: "Read Time (minutes)",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Content",
            isBody: true,
          },
        ],
      },
      {
        name: "pages",
        label: "Pages",
        path: "content/pages",
        format: "mdx",
        match: {
          include: '**/*',
        },
        ui: {
          router: ({ document }) => {
            // Extract locale and slug from the path
            // document._sys.relativePath format: "pl/home.mdx" or "en/portfolio.mdx"
            const pathParts = document._sys.relativePath.split('/');
            if (pathParts.length >= 2) {
              const locale = pathParts[0]; // 'pl' or 'en'
              const slug = pathParts[1].replace('.mdx', '');
              
              // Always include slug in URL for consistency
              return `/admin/preview/${locale}/${slug}`;
            }
            return '/admin/preview/pl/home';
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
            label: "Meta Description",
          },
          {
            type: "string",
            name: "lastUpdate",
            label: "Last Update Date",
            description: "For legal pages (YYYY-MM-DD)",
          },
          // Portfolio fields
          {
            type: "object",
            name: "projects",
            label: "Portfolio Projects",
            list: true,
            fields: [
              {
                type: "string",
                name: "title",
                label: "Project Title",
              },
              {
                type: "string",
                name: "description",
                label: "Project Description",
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "string",
                name: "tags",
                label: "Tags",
                list: true,
              },
              {
                type: "string",
                name: "year",
                label: "Year",
              },
              {
                type: "string",
                name: "image",
                label: "Image Path",
              },
              {
                type: "string",
                name: "imageAlt",
                label: "Image Alt Text",
              },
              {
                type: "string",
                name: "link",
                label: "Project Link",
              },
            ],
          },
          // Legal pages sections
          {
            type: "object",
            name: "sections",
            label: "Legal Sections",
            list: true,
            fields: [
              {
                type: "string",
                name: "id",
                label: "Section ID (for anchor links)",
              },
              {
                type: "string",
                name: "title",
                label: "Section Title",
              },
              {
                type: "string",
                name: "content",
                label: "Section Content",
                ui: {
                  component: "textarea",
                },
              },
            ],
          },
          // Home page fields
          {
            type: "object",
            name: "hero",
            label: "Hero Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
              },
              {
                type: "string",
                name: "titleAccent",
                label: "Title Accent (Highlighted Text)",
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
                  },
                  {
                    type: "image",
                    name: "icon",
                    label: "Icon",
                  },
                  {
                    type: "boolean",
                    name: "useBrightness",
                    label: "Use Brightness Filter",
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
                label: "Section Title",
              },
              {
                type: "string",
                name: "subtitle",
                label: "Section Subtitle",
                ui: {
                  component: "textarea",
                },
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
                  },
                  {
                    type: "string",
                    name: "description",
                    label: "Service Description",
                    ui: {
                      component: "textarea",
                    },
                  },
                  {
                    type: "string",
                    name: "icon",
                    label: "Icon (emoji)",
                  },
                  {
                    type: "string",
                    name: "features",
                    label: "Features",
                    list: true,
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "brief",
            label: "Brief CTA Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "string",
                name: "buttonText",
                label: "Button Text",
              },
              {
                type: "object",
                name: "contact",
                label: "Contact Information",
                fields: [
                  {
                    type: "string",
                    name: "email",
                    label: "Email",
                  },
                  {
                    type: "string",
                    name: "phone",
                    label: "Phone",
                  },
                  {
                    type: "string",
                    name: "address",
                    label: "Company Name",
                  },
                  {
                    type: "string",
                    name: "addressLine2",
                    label: "Street Address",
                  },
                  {
                    type: "string",
                    name: "city",
                    label: "City & Postal Code",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
});
