import { TinaField } from "tinacms";
import { richTextField, simpleRichTextField } from "../templates/richText";

/**
 * Hero section fields for home page
 */
export const heroSection: TinaField = {
  type: "object",
  name: "hero",
  label: "Hero Section",
  fields: [
    richTextField("title", "Title", "Użyj 'Gradient' z menu aby dodać kolorowy tekst"),
    simpleRichTextField("subtitle", "Subtitle"),
    {
      type: "image",
      name: "image",
      label: "Hero Image",
    },
  ],
};

/**
 * Technology section fields
 */
export const technologySection: TinaField = {
  type: "object",
  name: "technology",
  label: "Technology Section",
  fields: [
    richTextField("title", "Section Title"),
    simpleRichTextField("description", "Section Description"),
  ],
};

/**
 * Offer section fields
 */
export const offerSection: TinaField = {
  type: "object",
  name: "offer",
  label: "Offer Section",
  fields: [
    richTextField("title", "Section Title", "Użyj 'Gradient' dla akcentu"),
    simpleRichTextField("subtitle", "Section Subtitle"),
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
        richTextField("title", "Service Title"),
        richTextField("description", "Service Description"),
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
};

/**
 * Portfolio Highlights section fields
 */
export const portfolioHighlightsSection: TinaField = {
  type: "object",
  name: "portfolioHighlights",
  label: "Portfolio Highlights Section",
  fields: [
    richTextField("title", "Section Title"),
    simpleRichTextField("description", "Section Description"),
  ],
};

/**
 * How We Work section fields
 */
export const howWeWorkSection: TinaField = {
  type: "object",
  name: "howWeWork",
  label: "How We Work Section",
  fields: [
    richTextField("title", "Section Title"),
    simpleRichTextField("description", "Section Description"),
    {
      type: "object",
      name: "steps",
      label: "Process Steps",
      list: true,
      fields: [
        richTextField("title", "Step Title"),
        richTextField("description", "Step Description"),
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
};

/**
 * FAQ section fields
 */
export const faqSection: TinaField = {
  type: "object",
  name: "faq",
  label: "FAQ Section",
  fields: [
    richTextField("title", "Section Title"),
    simpleRichTextField("description", "Section Description"),
    {
      type: "object",
      name: "items",
      label: "FAQ Items",
      list: true,
      fields: [
        richTextField("question", "Question"),
        richTextField("answer", "Answer"),
      ],
    },
  ],
};

/**
 * Contact section fields
 */
export const contactSection: TinaField = {
  type: "object",
  name: "contact",
  label: "Contact Section",
  fields: [
    richTextField("title", "Section Title"),
    simpleRichTextField("description", "Section Description"),
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
};
