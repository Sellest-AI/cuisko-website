import fs from 'fs'
import path from 'path'
import { MDXRemote } from 'next-mdx-remote/rsc'  // note the /rsc import
import remarkGfm from 'remark-gfm'

/** Renders a file from /content. */
export const MarkdownPage = ({ file }: { file: string }) => {
  const filePath = path.join(process.cwd(), "content", `${file}.md`)
  const source = fs.readFileSync(filePath, 'utf8')

  return <MDXRemote
    source={source}
    options={{
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    }}
  />
}
