import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import type { Document } from "@contentful/rich-text-types";

export function RichText({ document }: { document: Document }) {
  return <div className="prose prose-slate max-w-none">{documentToReactComponents(document)}</div>;
}
