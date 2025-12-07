import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeHighlight from 'rehype-highlight';

export async function markdownToHtml(markdown: string): Promise<string> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result = await (unified() as any)
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(markdown);

  return String(result);
}
