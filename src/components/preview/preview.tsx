import React from "react";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkReact from "remark-react";
import RemarkCode from "./remark-code";
import { defaultSchema } from "hast-util-sanitize";
import { useLive } from "../contexts/useLive";

const schema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    code: [...(defaultSchema.attributes?.code || []), "className"],
  },
};

const Preview: React.FC = () => {
  const { doc } = useLive();

  const options = {
    createElement: React.createElement,
    sanitize: schema,
    remarkReactComponents: {
      code: RemarkCode,
    },
  };

  const md: any = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkReact, options as any)
    .processSync(doc).result;
  return (
    <div id="preview-container" className="preview markdown-body">
      {md}
    </div>
  );
};

export default Preview;
