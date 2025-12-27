import { defineConfig } from "tinacms";

export default defineConfig({
  branch: "main",
  
  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

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
              
              return `admin/${locale}/portfolio/${slug}`;
            }
            return 'admin/pl/portfolio';
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
            label: "Project Description",
            required: true,
            ui: {
              component: "textarea",
            },
          },
          {
            type: "datetime",
            name: "date",
            label: "Publication Date",
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
            type: "string",
            name: "year",
            label: "Year",
          },
          {
            type: "string",
            name: "client",
            label: "Client Name",
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
            label: "Project URL",
          },
          {
            type: "boolean",
            name: "featured",
            label: "Featured Project",
            description: "Show this project on homepage",
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
              
              return `admin/${locale}/blog/${slug}`;
            }
            return 'admin/pl/blog';
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
              return `admin/${locale}/${slug}`;
            }
            return 'admin/pl/home';
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
          {
            type: "string",
            name: "tocTitle",
            label: "Table of Contents Title",
            description: "For legal pages sidebar",
          },
          {
            type: "string",
            name: "selectedProjects",
            label: "Selected Portfolio Projects",
            description: "Choose which portfolio projects to display (max 3 for highlights)",
            list: true,
            ui: {
              component: "list",
            },
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
                name: "tags",
                label: "Technologies/Tags",
                list: true,
              },
              {
                type: "string",
                name: "year",
                label: "Year",
              },
              {
                type: "string",
                name: "link",
                label: "Project Link (URL)",
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
                type: "rich-text",
                name: "title",
                label: "Title",
                description: "Użyj 'Gradient' z menu aby dodać kolorowy tekst",
                templates: [
                  {
                    name: "Gradient",
                    label: "Gradient Text",
                    fields: [
                      {
                        type: "string",
                        name: "children",
                        label: "Text",
                        ui: {
                          component: "textarea",
                        },
                      },
                    ],
                  },
                ],
              },
              {
                type: "rich-text",
                name: "subtitle",
                label: "Subtitle",
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
                type: "rich-text",
                name: "title",
                label: "Section Title",
                templates: [
                  {
                    name: "Gradient",
                    label: "Gradient Text",
                    fields: [
                      {
                        type: "string",
                        name: "children",
                        label: "Text",
                      },
                    ],
                  },
                ],
              },
              {
                type: "rich-text",
                name: "description",
                label: "Section Description",
              },
            ],
          },
          {
            type: "object",
            name: "offer",
            label: "Offer Section",
            fields: [
              {
                type: "rich-text",
                name: "title",
                label: "Section Title",
                description: "Użyj 'Gradient' dla akcentu",
                templates: [
                  {
                    name: "Gradient",
                    label: "Gradient Text",
                    fields: [
                      {
                        type: "string",
                        name: "children",
                        label: "Text",
                      },
                    ],
                  },
                ],
              },
              {
                type: "rich-text",
                name: "subtitle",
                label: "Section Subtitle",
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
                    type: "rich-text",
                    name: "title",
                    label: "Service Title",
                    templates: [
                      {
                        name: "Gradient",
                        label: "Gradient Text",
                        fields: [
                          {
                            type: "string",
                            name: "children",
                            label: "Text",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: "rich-text",
                    name: "description",
                    label: "Service Description",
                    templates: [
                      {
                        name: "Gradient",
                        label: "Gradient Text",
                        fields: [
                          {
                            type: "string",
                            name: "children",
                            label: "Text",
                          },
                        ],
                      },
                    ],
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
                  {
                    type: "string",
                    name: "link",
                    label: "Link URL",
                  },
                  {
                    type: "string",
                    name: "buttonText",
                    label: "Button Text",
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
                type: "rich-text",
                name: "description",
                label: "Description",
                templates: [
                  {
                    name: "Gradient",
                    label: "Gradient Text",
                    fields: [
                      {
                        type: "string",
                        name: "children",
                        label: "Text",
                      },
                    ],
                  },
                ],
              },
              {
                type: "string",
                name: "badge",
                label: "Badge Text",
              },
              {
                type: "rich-text",
                name: "heroTitle",
                label: "Hero Title",
                templates: [
                  {
                    name: "Gradient",
                    label: "Gradient Text",
                    fields: [
                      {
                        type: "string",
                        name: "children",
                        label: "Text",
                      },
                    ],
                  },
                ],
              },
              {
                type: "rich-text",
                name: "heroTitleHighlight",
                label: "Hero Title Highlight",
                templates: [
                  {
                    name: "Gradient",
                    label: "Gradient Text",
                    fields: [
                      {
                        type: "string",
                        name: "children",
                        label: "Text",
                      },
                    ],
                  },
                ],
              },
              {
                type: "object",
                name: "tabs",
                label: "Brief Tabs",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "label",
                    label: "Tab Label",
                  },
                  {
                    type: "string",
                    name: "value",
                    label: "Tab Value",
                  },
                ],
              },
              {
                type: "object",
                name: "form",
                label: "Form Labels",
                fields: [
                  {
                    type: "string",
                    name: "progressLabel",
                    label: "Progress Label",
                  },
                  {
                    type: "string",
                    name: "requiredMark",
                    label: "Required Mark",
                  },
                  {
                    type: "string",
                    name: "placeholderTextarea",
                    label: "Textarea Placeholder",
                  },
                  {
                    type: "string",
                    name: "placeholderText",
                    label: "Text Input Placeholder",
                  },
                  {
                    type: "string",
                    name: "placeholderTechnology",
                    label: "Technology Placeholder",
                  },
                  {
                    type: "string",
                    name: "placeholderIntegrations",
                    label: "Integrations Placeholder",
                  },
                  {
                    type: "string",
                    name: "buttonPrev",
                    label: "Previous Button",
                  },
                  {
                    type: "string",
                    name: "buttonNext",
                    label: "Next Button",
                  },
                  {
                    type: "string",
                    name: "buttonSubmit",
                    label: "Submit Button",
                  },
                  {
                    type: "string",
                    name: "buttonSubmitting",
                    label: "Submitting Button",
                  },
                  {
                    type: "string",
                    name: "successTitle",
                    label: "Success Title",
                  },
                  {
                    type: "string",
                    name: "successMessage",
                    label: "Success Message",
                    ui: {
                      component: "textarea",
                    },
                  },
                ],
              },
              {
                type: "object",
                name: "contactForm",
                label: "Contact Form",
                fields: [
                  {
                    type: "string",
                    name: "title",
                    label: "Form Title",
                  },
                  {
                    type: "string",
                    name: "placeholderName",
                    label: "Name Placeholder",
                  },
                  {
                    type: "string",
                    name: "placeholderEmail",
                    label: "Email Placeholder",
                  },
                  {
                    type: "string",
                    name: "placeholderMessage",
                    label: "Message Placeholder",
                  },
                  {
                    type: "string",
                    name: "buttonSend",
                    label: "Send Button",
                  },
                  {
                    type: "string",
                    name: "buttonSending",
                    label: "Sending Button",
                  },
                  {
                    type: "string",
                    name: "successTitle",
                    label: "Success Title",
                  },
                  {
                    type: "string",
                    name: "successMessage",
                    label: "Success Message",
                  },
                ],
              },
              {
                type: "object",
                name: "contactInfo",
                label: "Contact Info Labels",
                fields: [
                  {
                    type: "string",
                    name: "title",
                    label: "Section Title",
                  },
                  {
                    type: "string",
                    name: "emailLabel",
                    label: "Email Label",
                  },
                  {
                    type: "string",
                    name: "phoneLabel",
                    label: "Phone Label",
                  },
                  {
                    type: "string",
                    name: "addressLabel",
                    label: "Address Label",
                  },
                  {
                    type: "string",
                    name: "quickResponseLabel",
                    label: "Quick Response Label",
                  },
                  {
                    type: "string",
                    name: "quickResponseText",
                    label: "Quick Response Text",
                  },
                ],
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
          {
            type: "object",
            name: "portfolioHighlights",
            label: "Portfolio Highlights Section",
            fields: [
              {
                type: "rich-text",
                name: "title",
                label: "Section Title",
                templates: [
                  {
                    name: "Gradient",
                    label: "Gradient Text",
                    fields: [
                      {
                        type: "string",
                        name: "children",
                        label: "Text",
                      },
                    ],
                  },
                ],
              },
              {
                type: "rich-text",
                name: "description",
                label: "Section Description",
              },
            ],
          },
          {
            type: "object",
            name: "howWeWork",
            label: "How We Work Section",
            fields: [
              {
                type: "rich-text",
                name: "title",
                label: "Section Title",
                templates: [
                  {
                    name: "Gradient",
                    label: "Gradient Text",
                    fields: [
                      {
                        type: "string",
                        name: "children",
                        label: "Text",
                      },
                    ],
                  },
                ],
              },
              {
                type: "rich-text",
                name: "description",
                label: "Section Description",
              },
              {
                type: "object",
                name: "steps",
                label: "Process Steps",
                list: true,
                fields: [
                  {
                    type: "rich-text",
                    name: "title",
                    label: "Step Title",
                    templates: [
                      {
                        name: "Gradient",
                        label: "Gradient Text",
                        fields: [
                          {
                            type: "string",
                            name: "children",
                            label: "Text",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: "rich-text",
                    name: "description",
                    label: "Step Description",
                    templates: [
                      {
                        name: "Gradient",
                        label: "Gradient Text",
                        fields: [
                          {
                            type: "string",
                            name: "children",
                            label: "Text",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: "string",
                    name: "icon",
                    label: "Icon Name (clipboard, design, code, test, rocket, support)",
                  },
                  {
                    type: "string",
                    name: "duration",
                    label: "Duration",
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "faq",
            label: "FAQ Section",
            fields: [
              {
                type: "rich-text",
                name: "title",
                label: "Section Title",
                templates: [
                  {
                    name: "Gradient",
                    label: "Gradient Text",
                    fields: [
                      {
                        type: "string",
                        name: "children",
                        label: "Text",
                      },
                    ],
                  },
                ],
              },
              {
                type: "rich-text",
                name: "description",
                label: "Section Description",
              },
              {
                type: "object",
                name: "items",
                label: "FAQ Items",
                list: true,
                fields: [
                  {
                    type: "rich-text",
                    name: "question",
                    label: "Question",
                    templates: [
                      {
                        name: "Gradient",
                        label: "Gradient Text",
                        fields: [
                          {
                            type: "string",
                            name: "children",
                            label: "Text",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: "rich-text",
                    name: "answer",
                    label: "Answer",
                    templates: [
                      {
                        name: "Gradient",
                        label: "Gradient Text",
                        fields: [
                          {
                            type: "string",
                            name: "children",
                            label: "Text",
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "contact",
            label: "Contact Section",
            fields: [
              {
                type: "rich-text",
                name: "title",
                label: "Section Title",
                templates: [
                  {
                    name: "Gradient",
                    label: "Gradient Text",
                    fields: [
                      {
                        type: "string",
                        name: "children",
                        label: "Text",
                      },
                    ],
                  },
                ],
              },
              {
                type: "rich-text",
                name: "description",
                label: "Section Description",
              },
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
              {
                type: "string",
                name: "successTitle",
                label: "Success Message Title",
              },
              {
                type: "string",
                name: "successMessage",
                label: "Success Message Text",
              },
              {
                type: "string",
                name: "nameLabel",
                label: "Name Field Label",
              },
              {
                type: "string",
                name: "emailLabel",
                label: "Email Field Label",
              },
              {
                type: "string",
                name: "messageLabel",
                label: "Message Field Label",
              },
              {
                type: "string",
                name: "buttonText",
                label: "Submit Button Text",
              },
              {
                type: "string",
                name: "contactDataTitle",
                label: "Contact Data Section Title",
              },
              {
                type: "string",
                name: "quickResponseLabel",
                label: "Quick Response Label",
              },
              {
                type: "string",
                name: "quickResponseText",
                label: "Quick Response Text",
              },
            ],
          },
          // SearchBar configuration
          {
            type: "object",
            name: "searchBar",
            label: "Search Bar Translations",
            fields: [
              {
                type: "object",
                name: "blog",
                label: "Blog Search",
                fields: [
                  {
                    type: "string",
                    name: "searchPlaceholder",
                    label: "Search Placeholder",
                  },
                  {
                    type: "string",
                    name: "clearSearch",
                    label: "Clear Search Text",
                  },
                  {
                    type: "string",
                    name: "filterByTech",
                    label: "Filter By Tech Text",
                  },
                  {
                    type: "string",
                    name: "clearFilters",
                    label: "Clear Filters Text",
                  },
                  {
                    type: "string",
                    name: "showLess",
                    label: "Show Less Text",
                  },
                  {
                    type: "string",
                    name: "showMore",
                    label: "Show More Text",
                  },
                  {
                    type: "string",
                    name: "activeFilters",
                    label: "Active Filters Text",
                  },
                  {
                    type: "string",
                    name: "removeFilter",
                    label: "Remove Filter Text",
                  },
                ],
              },
              {
                type: "object",
                name: "portfolio",
                label: "Portfolio Search",
                fields: [
                  {
                    type: "string",
                    name: "searchPlaceholder",
                    label: "Search Placeholder",
                  },
                  {
                    type: "string",
                    name: "clearSearch",
                    label: "Clear Search Text",
                  },
                  {
                    type: "string",
                    name: "filterByTech",
                    label: "Filter By Tech Text",
                  },
                  {
                    type: "string",
                    name: "clearFilters",
                    label: "Clear Filters Text",
                  },
                  {
                    type: "string",
                    name: "showLess",
                    label: "Show Less Text",
                  },
                  {
                    type: "string",
                    name: "showMore",
                    label: "Show More Text",
                  },
                  {
                    type: "string",
                    name: "activeFilters",
                    label: "Active Filters Text",
                  },
                  {
                    type: "string",
                    name: "removeFilter",
                    label: "Remove Filter Text",
                  },
                ],
              },
            ],
          },
          // Blog components configuration
          {
            type: "object",
            name: "blog",
            label: "Blog Components",
            fields: [
              {
                type: "string",
                name: "noArticles",
                label: "No Articles Text",
              },
              {
                type: "string",
                name: "readMore",
                label: "Read More Text",
              },
              {
                type: "string",
                name: "readTime",
                label: "Read Time Template",
                description: "Use {minutes} as placeholder, e.g. '{minutes} min read'",
              },
              {
                type: "string",
                name: "by",
                label: "By (author prefix)",
              },
              {
                type: "string",
                name: "backToBlog",
                label: "Back to Blog Text",
              },
              {
                type: "string",
                name: "publishedOn",
                label: "Published On Text",
              },
              {
                type: "string",
                name: "shareTitle",
                label: "Share Title",
              },
              {
                type: "object",
                name: "shareButtons",
                label: "Share Buttons",
                fields: [
                  {
                    type: "string",
                    name: "twitter",
                    label: "Twitter Label",
                  },
                  {
                    type: "string",
                    name: "linkedin",
                    label: "LinkedIn Label",
                  },
                  {
                    type: "string",
                    name: "facebook",
                    label: "Facebook Label",
                  },
                  {
                    type: "string",
                    name: "copyLink",
                    label: "Copy Link Label",
                  },
                ],
              },
              {
                type: "string",
                name: "tableOfContentsTitle",
                label: "Table of Contents Title",
              },
              {
                type: "object",
                name: "authorBox",
                label: "Author Box",
                fields: [
                  {
                    type: "string",
                    name: "title",
                    label: "Title",
                  },
                  {
                    type: "string",
                    name: "bio",
                    label: "Bio",
                  },
                  {
                    type: "string",
                    name: "contact",
                    label: "Contact Text",
                  },
                ],
              },
              {
                type: "string",
                name: "relatedArticlesTitle",
                label: "Related Articles Title",
              },
              {
                type: "string",
                name: "otherProjectsTitle",
                label: "Other Projects Title",
              },
            ],
          },
          // Rich-text body for simple pages (brief, blog listing, etc.)
          {
            type: "rich-text",
            name: "body",
            label: "Page Content",
            description: "Rich text content for simple pages like Brief, Blog listing, etc.",
            isBody: true,
          },
        ],
      },
    ],
  },
});
