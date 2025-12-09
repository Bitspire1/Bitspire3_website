import { defineConfig } from "tinacms";

export default defineConfig({
  branch: "master",
  
  // Use cloud credentials when available
  ...(process.env.NEXT_PUBLIC_TINA_CLIENT_ID && process.env.TINA_TOKEN ? {
    clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
    token: process.env.TINA_TOKEN,
  } : {}),

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public",
    },
  },
  
  search: {
    tina: {
      indexerToken: process.env.TINA_SEARCH_TOKEN || '',
      stopwordLanguages: ['eng']
    }
  },
  
  schema: {
    collections: [
      {
        label: "Header",
        name: "header",
        path: "content/global",
        format: "mdx",
        match: {
          include: "**/header",
        },
        fields: [
          {
            type: "image",
            name: "logo",
            label: "Logo",
            required: true,
          },
          {
            type: "string",
            name: "logoAlt",
            label: "Logo Alt Text",
            required: true,
          },
          {
            type: "object",
            name: "navigation",
            label: "Navigation Links",
            list: true,
            fields: [
              {
                type: "string",
                name: "label",
                label: "Label",
                required: true,
              },
              {
                type: "string",
                name: "href",
                label: "Link",
                required: true,
              },
            ],
          },
          {
            type: "object",
            name: "ctaButton",
            label: "CTA Button",
            fields: [
              {
                type: "string",
                name: "text",
                label: "Button Text",
                required: true,
              },
              {
                type: "string",
                name: "href",
                label: "Button Link",
                required: true,
              },
            ],
          },
        ],
      },
      {
        label: "Footer",
        name: "footer",
        path: "content/global",
        format: "mdx",
        match: {
          include: "**/footer",
        },
        fields: [
          {
            type: "string",
            name: "companyName",
            label: "Company Name",
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
                name: "location",
                label: "Location",
              },
            ],
          },
          {
            type: "object",
            name: "navigation",
            label: "Footer Navigation",
            list: true,
            fields: [
              {
                type: "string",
                name: "label",
                label: "Label",
              },
              {
                type: "string",
                name: "href",
                label: "Link",
              },
            ],
          },
          {
            type: "object",
            name: "socialMedia",
            label: "Social Media",
            list: true,
            fields: [
              {
                type: "string",
                name: "platform",
                label: "Platform",
              },
              {
                type: "string",
                name: "url",
                label: "URL",
              },
            ],
          },
          {
            type: "string",
            name: "copyright",
            label: "Copyright Text",
          },
          {
            type: "object",
            name: "legalLinks",
            label: "Legal Links",
            list: true,
            fields: [
              {
                type: "string",
                name: "label",
                label: "Label",
              },
              {
                type: "string",
                name: "href",
                label: "Link",
              },
            ],
          },
          {
            type: "string",
            name: "cookieSettingsText",
            label: "Cookie Settings Button Text",
          },
        ],
      },
      {
        label: "Pages",
        name: "pages",
        path: "content/pages",
        format: "mdx",
        match: {
          include: "**/*",
        },
        fields: [
          { type: "string", name: "title", label: "Page Title" },
          {
            type: "string",
            name: "description",
            label: "Meta Description",
            ui: { component: "textarea" },
          },
          { type: "string", name: "lastUpdate", label: "Last Update" },
          { type: "string", name: "selectedProjects", label: "Selected Projects", list: true },
          {
            type: "object",
            name: "hero",
            label: "Hero Section",
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "titleAccent", label: "Title Accent" },
              { type: "string", name: "titleEnd", label: "Title End" },
              { type: "string", name: "subtitle", label: "Subtitle", ui: { component: "textarea" } },
              { type: "string", name: "ctaButton", label: "CTA Button" },
              { type: "string", name: "briefButton", label: "Brief Button" },
              { type: "image", name: "image", label: "Image" },
            ],
          },
          {
            type: "object",
            name: "technology",
            label: "Technology Section",
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
              {
                type: "object",
                name: "items",
                label: "Items",
                list: true,
                fields: [
                  { type: "string", name: "name", label: "Name" },
                  { type: "image", name: "icon", label: "Icon" },
                  { type: "boolean", name: "useBrightness", label: "Use Brightness" },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "offer",
            label: "Offer Section",
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "titleAccent", label: "Title Accent" },
              { type: "string", name: "subtitle", label: "Subtitle", ui: { component: "textarea" } },
              { type: "string", name: "sectionLabel", label: "Section Label" },
              {
                type: "object",
                name: "services",
                label: "Services",
                list: true,
                fields: [
                  { type: "string", name: "title", label: "Title" },
                  { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
                  { type: "string", name: "icon", label: "Icon" },
                  { type: "string", name: "features", label: "Features", list: true },
                  { type: "string", name: "link", label: "Link" },
                  { type: "string", name: "buttonText", label: "Button Text" },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "brief",
            label: "Brief Section",
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
              { type: "string", name: "buttonText", label: "Button Text" },
              {
                type: "object",
                name: "contact",
                label: "Contact",
                fields: [
                  { type: "string", name: "email", label: "Email" },
                  { type: "string", name: "phone", label: "Phone" },
                  { type: "string", name: "address", label: "Address" },
                  { type: "string", name: "addressLine2", label: "Address Line 2" },
                  { type: "string", name: "city", label: "City" },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "portfolio",
            label: "Portfolio Section",
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
              { type: "string", name: "sectionLabel", label: "Section Label" },
            ],
          },
          {
            type: "object",
            name: "portfolioHighlights",
            label: "Portfolio Highlights",
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
              {
                type: "object",
                name: "projects",
                label: "Projects",
                list: true,
                fields: [
                  { type: "string", name: "title", label: "Title" },
                  { type: "string", name: "slug", label: "Slug" },
                  { type: "string", name: "excerpt", label: "Excerpt", ui: { component: "textarea" } },
                  { type: "image", name: "image", label: "Image" },
                  { type: "string", name: "imageAlt", label: "Image Alt" },
                  { type: "string", name: "category", label: "Category" },
                  { type: "string", name: "date", label: "Date" },
                  { type: "boolean", name: "featured", label: "Featured" },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "howWeWork",
            label: "How We Work",
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
              {
                type: "object",
                name: "steps",
                label: "Steps",
                list: true,
                fields: [
                  { type: "string", name: "title", label: "Title" },
                  { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
                  { type: "string", name: "icon", label: "Icon" },
                  { type: "string", name: "duration", label: "Duration" },
                ],
              },
              { type: "string", name: "ctaTitle", label: "CTA Title" },
              { type: "string", name: "ctaDescription", label: "CTA Description", ui: { component: "textarea" } },
              { type: "string", name: "ctaButton", label: "CTA Button" },
            ],
          },
          {
            type: "object",
            name: "faq",
            label: "FAQ Section",
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
              {
                type: "object",
                name: "items",
                label: "Items",
                list: true,
                fields: [
                  { type: "string", name: "question", label: "Question" },
                  { type: "string", name: "answer", label: "Answer", ui: { component: "textarea" } },
                ],
              },
              { type: "string", name: "ctaQuestion", label: "CTA Question" },
              { type: "string", name: "ctaButton", label: "CTA Button" },
            ],
          },
          {
            type: "object",
            name: "contact",
            label: "Contact Section",
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
              { type: "string", name: "email", label: "Email" },
              { type: "string", name: "phone", label: "Phone" },
              { type: "string", name: "address", label: "Address" },
              { type: "string", name: "addressLine2", label: "Address Line 2" },
              { type: "string", name: "city", label: "City" },
              { type: "string", name: "successTitle", label: "Success Title" },
              { type: "string", name: "successMessage", label: "Success Message", ui: { component: "textarea" } },
              { type: "string", name: "nameLabel", label: "Name Label" },
              { type: "string", name: "emailLabel", label: "Email Label" },
              { type: "string", name: "messageLabel", label: "Message Label" },
              { type: "string", name: "buttonText", label: "Button Text" },
              { type: "string", name: "contactDataTitle", label: "Contact Data Title" },
            ],
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
      {
        label: "Blog",
        name: "blog",
        path: "content/blog",
        format: "mdx",
        match: {
          include: "**/*",
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
            type: "datetime",
            name: "date",
            label: "Publication Date",
          },
          {
            type: "string",
            name: "author",
            label: "Author",
          },
          {
            type: "string",
            name: "category",
            label: "Category",
          },
          {
            type: "string",
            name: "excerpt",
            label: "Excerpt",
            ui: {
              component: "textarea",
            },
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
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
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
        label: "Portfolio",
        name: "portfolio",
        path: "content/portfolio",
        format: "mdx",
        match: {
          include: "**/*",
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
            label: "Description",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
          },
          {
            type: "string",
            name: "category",
            label: "Category",
          },
          {
            type: "string",
            name: "year",
            label: "Year",
          },
          {
            type: "string",
            name: "client",
            label: "Client",
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
            type: "image",
            name: "image",
            label: "Project Image",
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
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
          },
          {
            type: "boolean",
            name: "featured",
            label: "Featured Project",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Content",
            isBody: true,
          },
        ],
      },
    ],
  },
});
