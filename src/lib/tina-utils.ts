/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Convert Tina's rich-text JSON body to markdown string
 */
export function convertTinaBodyToMarkdown(body: any): string {
  if (typeof body === 'string') return body;
  
  if (!body || !body.children || !Array.isArray(body.children)) {
    return '';
  }
  
  const processNode = (node: any): string => {
    if (!node) return '';
    
    // Text node
    if (node.type === 'text') {
      let text = node.text || '';
      if (node.bold) text = `**${text}**`;
      if (node.italic) text = `*${text}*`;
      if (node.code) text = `\`${text}\``;
      return text;
    }
    
    // Process children
    const children = node.children?.map(processNode).join('') || '';
    
    // Element nodes
    switch (node.type) {
      case 'h1':
        return `\n# ${children}\n`;
      case 'h2':
        return `\n## ${children}\n`;
      case 'h3':
        return `\n### ${children}\n`;
      case 'h4':
        return `\n#### ${children}\n`;
      case 'h5':
        return `\n##### ${children}\n`;
      case 'h6':
        return `\n###### ${children}\n`;
      case 'p':
        return `\n${children}\n`;
      case 'blockquote':
        return `\n> ${children}\n`;
      case 'ul':
        return `\n${children}\n`;
      case 'ol':
        return `\n${children}\n`;
      case 'li':
        return `- ${children}\n`;
      case 'a':
        return `[${children}](${node.url || '#'})`;
      case 'img':
        return `\n![${node.alt || ''}](${node.url || ''})\n`;
      case 'code_block':
        return `\n\`\`\`${node.lang || ''}\n${children}\n\`\`\`\n`;
      case 'hr':
        return '\n---\n';
      default:
        return children;
    }
  };
  
  return body.children.map(processNode).join('');
}
