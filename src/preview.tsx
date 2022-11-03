import React from 'react'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkReact from 'remark-react'
import RemarkCode from './remark-code'
import { defaultSchema } from 'hast-util-sanitize'

interface Props {
  doc: string
}

const schema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    code: [...(defaultSchema.attributes?.code || []), 'className']
  }
}

const Preview: React.FC<Props> = (props) => {


const options =  {
    createElement: React.createElement,
      sanitize: schema,
      remarkReactComponents: {
        code: RemarkCode
      }
}

  const md: any = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkReact, options as any)
    .processSync(props.doc).result
  return <div id='preview-container' className='preview markdown-body'>{md}</div>
}

export default Preview
