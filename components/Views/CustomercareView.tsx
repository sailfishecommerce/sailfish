import DisplayTextView from "@/components/Views/DisplayTextView";

interface TextViewInterface {
  content: {
    type: string;
    text: string;
    inlineStyleRanges: formatStylesType;
  };
}

interface Props {
  pageContent: Array<{
    key: string;
    text: string;
    type: string;
    inlineStyleRanges: formatStylesType;
  }>;
}

type formatStylesType = Array<{
  style: string;
}>;
export function TextView({ content }: TextViewInterface) {
  return (
    <>
      <div className="textView">
        {content.inlineStyleRanges.length === 0 && (
          <hr className="border-white border-b-2 my-4" />
        )}
        <DisplayTextView content={content} />
      </div>
      <style jsx>
        {`
          .textView p,
          .textView h1 {
            font-family: "Roboto", sans-serif !important;
          }
        `}
      </style>
    </>
  );
}

export default function CustomercareView({ pageContent }: Props) {
  return (
    <article className="container lg:w-3/4 bg-gray-100 h-full content">
      {pageContent.map((content) => (
        <TextView key={content.key} content={content} />
      ))}
    </article>
  );
}
