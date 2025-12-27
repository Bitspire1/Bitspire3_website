import { TinaField } from "tinacms";
import { richTextField } from "../templates/richText";

/**
 * Brief section fields - form labels, tabs, and contact info
 * This section is complex with nested objects
 */
export const briefSection: TinaField = {
  type: "object",
  name: "brief",
  label: "Brief CTA Section",
  fields: [
    richTextField("description", "Description"),
    {
      type: "string",
      name: "badge",
      label: "Badge Text",
    },
    richTextField("heroTitle", "Hero Title"),
    richTextField("heroTitleHighlight", "Hero Title Highlight"),
    {
      type: "object",
      name: "tabs",
      label: "Brief Tabs",
      list: true,
      fields: [
        { type: "string", name: "label", label: "Tab Label" },
        { type: "string", name: "value", label: "Tab Value" },
      ],
    },
    {
      type: "object",
      name: "form",
      label: "Form Labels",
      fields: [
        { type: "string", name: "progressLabel", label: "Progress Label" },
        { type: "string", name: "requiredMark", label: "Required Mark" },
        { type: "string", name: "placeholderTextarea", label: "Textarea Placeholder" },
        { type: "string", name: "placeholderText", label: "Text Input Placeholder" },
        { type: "string", name: "placeholderTechnology", label: "Technology Placeholder" },
        { type: "string", name: "placeholderIntegrations", label: "Integrations Placeholder" },
        { type: "string", name: "buttonPrev", label: "Previous Button" },
        { type: "string", name: "buttonNext", label: "Next Button" },
        { type: "string", name: "buttonSubmit", label: "Submit Button" },
        { type: "string", name: "buttonSubmitting", label: "Submitting Button" },
        { type: "string", name: "successTitle", label: "Success Title" },
        { type: "string", name: "successMessage", label: "Success Message", ui: { component: "textarea" } },
      ],
    },
    {
      type: "object",
      name: "contactForm",
      label: "Contact Form",
      fields: [
        { type: "string", name: "title", label: "Form Title" },
        { type: "string", name: "placeholderName", label: "Name Placeholder" },
        { type: "string", name: "placeholderEmail", label: "Email Placeholder" },
        { type: "string", name: "placeholderMessage", label: "Message Placeholder" },
        { type: "string", name: "buttonSend", label: "Send Button" },
        { type: "string", name: "buttonSending", label: "Sending Button" },
        { type: "string", name: "successTitle", label: "Success Title" },
        { type: "string", name: "successMessage", label: "Success Message" },
      ],
    },
    {
      type: "object",
      name: "contactInfo",
      label: "Contact Info Labels",
      fields: [
        { type: "string", name: "title", label: "Section Title" },
        { type: "string", name: "emailLabel", label: "Email Label" },
        { type: "string", name: "phoneLabel", label: "Phone Label" },
        { type: "string", name: "addressLabel", label: "Address Label" },
        { type: "string", name: "quickResponseLabel", label: "Quick Response Label" },
        { type: "string", name: "quickResponseText", label: "Quick Response Text" },
      ],
    },
    {
      type: "object",
      name: "contact",
      label: "Contact Information",
      fields: [
        { type: "string", name: "email", label: "Email" },
        { type: "string", name: "phone", label: "Phone" },
        { type: "string", name: "address", label: "Company Name" },
        { type: "string", name: "addressLine2", label: "Street Address" },
        { type: "string", name: "city", label: "City & Postal Code" },
      ],
    },
  ],
};
