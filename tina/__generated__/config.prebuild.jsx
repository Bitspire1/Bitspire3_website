// tina/config.ts
import { defineConfig } from "tinacms";
var config_default = defineConfig({
  branch: "master",
  // Only use cloud credentials if available (for production)
  ...process.env.NEXT_PUBLIC_TINA_CLIENT_ID && process.env.TINA_TOKEN ? {
    clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
    token: process.env.TINA_TOKEN
  } : {},
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
        name: "header",
        label: "Header",
        path: "content/global",
        format: "mdx",
        match: {
          include: "**/header.mdx"
        },
        ui: {
          router: ({ document }) => {
            const pathParts = document._sys.relativePath.split("/");
            const locale = pathParts[0];
            return `preview/${locale}/home`;
          }
        },
        fields: [
          {
            type: "image",
            name: "logo",
            label: "Logo"
          },
          {
            type: "string",
            name: "logoAlt",
            label: "Logo Alt Text"
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
                label: "Label"
              },
              {
                type: "string",
                name: "href",
                label: "Link"
              }
            ]
          },
          {
            type: "object",
            name: "ctaButton",
            label: "CTA Button",
            fields: [
              {
                type: "string",
                name: "text",
                label: "Button Text"
              },
              {
                type: "string",
                name: "href",
                label: "Button Link"
              }
            ]
          }
        ]
      },
      {
        name: "footer",
        label: "Footer",
        path: "content/global",
        format: "mdx",
        match: {
          include: "**/footer.mdx"
        },
        ui: {
          router: ({ document }) => {
            const pathParts = document._sys.relativePath.split("/");
            const locale = pathParts[0];
            return `preview/${locale}/home`;
          }
        },
        fields: [
          {
            type: "string",
            name: "companyName",
            label: "Company Name"
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            ui: {
              component: "textarea"
            }
          },
          {
            type: "object",
            name: "contact",
            label: "Contact Information",
            fields: [
              {
                type: "string",
                name: "email",
                label: "Email"
              },
              {
                type: "string",
                name: "phone",
                label: "Phone"
              },
              {
                type: "string",
                name: "location",
                label: "Location"
              }
            ]
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
                label: "Label"
              },
              {
                type: "string",
                name: "href",
                label: "Link"
              }
            ]
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
                label: "Platform"
              },
              {
                type: "string",
                name: "url",
                label: "URL"
              },
              {
                type: "string",
                name: "icon",
                label: "Icon Name"
              }
            ]
          },
          {
            type: "string",
            name: "copyright",
            label: "Copyright Text"
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
                label: "Label"
              },
              {
                type: "string",
                name: "href",
                label: "Link"
              }
            ]
          },
          {
            type: "string",
            name: "cookieSettingsText",
            label: "Cookie Settings Button Text"
          }
        ]
      },
      {
        name: "portfolio",
        label: "Portfolio",
        path: "content/portfolio",
        format: "mdx",
        match: {
          include: "**/*.mdx"
        },
        ui: {
          router: ({ document }) => {
            const pathParts = document._sys.relativePath.split("/");
            if (pathParts.length >= 2) {
              const locale = pathParts[0];
              const slug = pathParts[1].replace(".mdx", "");
              return `preview/${locale}/portfolio/${slug}`;
            }
            return "preview/pl/portfolio";
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Project Title",
            required: true
          },
          {
            type: "string",
            name: "slug",
            label: "URL Slug",
            required: true
          },
          {
            type: "string",
            name: "description",
            label: "Project Description",
            required: true,
            ui: {
              component: "textarea"
            }
          },
          {
            type: "datetime",
            name: "date",
            label: "Publication Date"
          },
          {
            type: "string",
            name: "excerpt",
            label: "Short Excerpt",
            ui: {
              component: "textarea"
            }
          },
          {
            type: "string",
            name: "category",
            label: "Category"
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true
          },
          {
            type: "string",
            name: "year",
            label: "Year"
          },
          {
            type: "string",
            name: "client",
            label: "Client Name"
          },
          {
            type: "image",
            name: "image",
            label: "Project Image"
          },
          {
            type: "string",
            name: "imageAlt",
            label: "Image Alt Text"
          },
          {
            type: "string",
            name: "link",
            label: "Project URL"
          },
          {
            type: "boolean",
            name: "featured",
            label: "Featured Project",
            description: "Show this project on homepage"
          },
          {
            type: "rich-text",
            name: "body",
            label: "Content",
            isBody: true
          }
        ]
      },
      {
        name: "blog",
        label: "Blog",
        path: "content/blog",
        format: "mdx",
        match: {
          include: "**/*.mdx"
        },
        ui: {
          router: ({ document }) => {
            const pathParts = document._sys.relativePath.split("/");
            if (pathParts.length >= 2) {
              const locale = pathParts[0];
              const slug = pathParts[1].replace(".mdx", "");
              return `preview/${locale}/blog/${slug}`;
            }
            return "preview/pl/blog";
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Post Title",
            required: true
          },
          {
            type: "string",
            name: "slug",
            label: "URL Slug",
            required: true
          },
          {
            type: "string",
            name: "description",
            label: "Meta Description",
            required: true
          },
          {
            type: "string",
            name: "excerpt",
            label: "Short Excerpt",
            ui: {
              component: "textarea"
            }
          },
          {
            type: "datetime",
            name: "date",
            label: "Publication Date",
            required: true
          },
          {
            type: "string",
            name: "author",
            label: "Author Name",
            required: true
          },
          {
            type: "string",
            name: "category",
            label: "Category"
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true
          },
          {
            type: "image",
            name: "image",
            label: "Featured Image"
          },
          {
            type: "string",
            name: "imageAlt",
            label: "Image Alt Text"
          },
          {
            type: "number",
            name: "readTime",
            label: "Read Time (minutes)"
          },
          {
            type: "rich-text",
            name: "body",
            label: "Content",
            isBody: true
          }
        ]
      },
      {
        name: "pages",
        label: "Pages",
        path: "content/pages",
        format: "mdx",
        match: {
          include: "**/*.mdx"
        },
        ui: {
          router: ({ document }) => {
            const pathParts = document._sys.relativePath.split("/");
            if (pathParts.length >= 2) {
              const locale = pathParts[0];
              const slug = pathParts[1].replace(".mdx", "");
              return `preview/${locale}/${slug}`;
            }
            return "preview/pl/home";
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
            name: "titleAccent",
            label: "Title Accent (for legal pages)"
          },
          {
            type: "string",
            name: "description",
            label: "Meta Description"
          },
          {
            type: "string",
            name: "lastUpdate",
            label: "Last Update Date",
            description: "For legal pages (YYYY-MM-DD)"
          },
          {
            type: "string",
            name: "selectedProjects",
            label: "Selected Portfolio Projects",
            description: "Choose which portfolio projects to display (max 3 for highlights)",
            list: true
          },
          // Portfolio listing page projects
          {
            type: "object",
            name: "projects",
            label: "Portfolio Projects",
            description: "List of projects for portfolio listing page",
            list: true,
            fields: [
              {
                type: "string",
                name: "title",
                label: "Project Title"
              },
              {
                type: "string",
                name: "description",
                label: "Project Description",
                ui: {
                  component: "textarea"
                }
              },
              {
                type: "image",
                name: "image",
                label: "Project Image"
              },
              {
                type: "string",
                name: "imageAlt",
                label: "Image Alt Text"
              },
              {
                type: "string",
                name: "tags",
                label: "Technologies/Tags",
                list: true
              },
              {
                type: "string",
                name: "year",
                label: "Year"
              },
              {
                type: "string",
                name: "link",
                label: "Project Link (URL)"
              }
            ]
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
                label: "Section ID (for anchor links)"
              },
              {
                type: "string",
                name: "title",
                label: "Section Title"
              },
              {
                type: "string",
                name: "content",
                label: "Section Content",
                ui: {
                  component: "textarea"
                }
              }
            ]
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
                label: "Title"
              },
              {
                type: "string",
                name: "titleAccent",
                label: "Title Accent (Highlighted Text)"
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
                label: "Section Title"
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
                    label: "Technology Name"
                  },
                  {
                    type: "image",
                    name: "icon",
                    label: "Icon"
                  },
                  {
                    type: "boolean",
                    name: "useBrightness",
                    label: "Use Brightness Filter"
                  }
                ]
              }
            ]
          },
          {
            type: "object",
            name: "offer",
            label: "Offer Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Section Title"
              },
              {
                type: "string",
                name: "titleAccent",
                label: "Title Accent"
              },
              {
                type: "string",
                name: "subtitle",
                label: "Section Subtitle",
                ui: {
                  component: "textarea"
                }
              },
              {
                type: "string",
                name: "sectionLabel",
                label: "Section Label"
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
                    label: "Service Title"
                  },
                  {
                    type: "string",
                    name: "description",
                    label: "Service Description",
                    ui: {
                      component: "textarea"
                    }
                  },
                  {
                    type: "string",
                    name: "icon",
                    label: "Icon (emoji)"
                  },
                  {
                    type: "string",
                    name: "features",
                    label: "Features",
                    list: true
                  },
                  {
                    type: "string",
                    name: "link",
                    label: "Link URL"
                  },
                  {
                    type: "string",
                    name: "buttonText",
                    label: "Button Text"
                  }
                ]
              }
            ]
          },
          {
            type: "object",
            name: "brief",
            label: "Brief CTA Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title"
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: {
                  component: "textarea"
                }
              },
              {
                type: "string",
                name: "buttonText",
                label: "Button Text"
              },
              {
                type: "object",
                name: "contact",
                label: "Contact Information",
                fields: [
                  {
                    type: "string",
                    name: "email",
                    label: "Email"
                  },
                  {
                    type: "string",
                    name: "phone",
                    label: "Phone"
                  },
                  {
                    type: "string",
                    name: "address",
                    label: "Company Name"
                  },
                  {
                    type: "string",
                    name: "addressLine2",
                    label: "Street Address"
                  },
                  {
                    type: "string",
                    name: "city",
                    label: "City & Postal Code"
                  }
                ]
              }
            ]
          },
          {
            type: "object",
            name: "portfolio",
            label: "Portfolio Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Section Title"
              },
              {
                type: "string",
                name: "description",
                label: "Section Description"
              },
              {
                type: "string",
                name: "sectionLabel",
                label: "Section Label"
              }
            ]
          },
          {
            type: "object",
            name: "portfolioHighlights",
            label: "Portfolio Highlights Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Section Title"
              },
              {
                type: "string",
                name: "description",
                label: "Section Description"
              }
            ]
          },
          {
            type: "object",
            name: "howWeWork",
            label: "How We Work Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Section Title"
              },
              {
                type: "string",
                name: "description",
                label: "Section Description"
              },
              {
                type: "object",
                name: "steps",
                label: "Process Steps",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "title",
                    label: "Step Title"
                  },
                  {
                    type: "string",
                    name: "description",
                    label: "Step Description",
                    ui: {
                      component: "textarea"
                    }
                  },
                  {
                    type: "string",
                    name: "icon",
                    label: "Icon Name (clipboard, design, code, test, rocket, support)"
                  },
                  {
                    type: "string",
                    name: "duration",
                    label: "Duration"
                  }
                ]
              },
              {
                type: "string",
                name: "ctaTitle",
                label: "CTA Title"
              },
              {
                type: "string",
                name: "ctaDescription",
                label: "CTA Description"
              },
              {
                type: "string",
                name: "ctaButton",
                label: "CTA Button Text"
              }
            ]
          },
          {
            type: "object",
            name: "faq",
            label: "FAQ Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Section Title"
              },
              {
                type: "string",
                name: "description",
                label: "Section Description"
              },
              {
                type: "object",
                name: "items",
                label: "FAQ Items",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "question",
                    label: "Question"
                  },
                  {
                    type: "string",
                    name: "answer",
                    label: "Answer",
                    ui: {
                      component: "textarea"
                    }
                  }
                ]
              },
              {
                type: "string",
                name: "ctaQuestion",
                label: "CTA Question"
              },
              {
                type: "string",
                name: "ctaButton",
                label: "CTA Button Text"
              }
            ]
          },
          {
            type: "object",
            name: "contact",
            label: "Contact Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Section Title"
              },
              {
                type: "string",
                name: "description",
                label: "Section Description"
              },
              {
                type: "string",
                name: "email",
                label: "Email"
              },
              {
                type: "string",
                name: "phone",
                label: "Phone"
              },
              {
                type: "string",
                name: "address",
                label: "Company Name"
              },
              {
                type: "string",
                name: "addressLine2",
                label: "Street Address"
              },
              {
                type: "string",
                name: "city",
                label: "City & Postal Code"
              },
              {
                type: "string",
                name: "successTitle",
                label: "Success Message Title"
              },
              {
                type: "string",
                name: "successMessage",
                label: "Success Message Text"
              },
              {
                type: "string",
                name: "nameLabel",
                label: "Name Field Label"
              },
              {
                type: "string",
                name: "emailLabel",
                label: "Email Field Label"
              },
              {
                type: "string",
                name: "messageLabel",
                label: "Message Field Label"
              },
              {
                type: "string",
                name: "buttonText",
                label: "Submit Button Text"
              },
              {
                type: "string",
                name: "contactDataTitle",
                label: "Contact Data Section Title"
              }
            ]
          },
          // Rich-text body for simple pages (brief, blog listing, etc.)
          {
            type: "rich-text",
            name: "body",
            label: "Page Content",
            description: "Rich text content for simple pages like Brief, Blog listing, etc.",
            isBody: true
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
