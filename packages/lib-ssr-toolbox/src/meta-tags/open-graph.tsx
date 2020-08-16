import React from "react";

function simpleMeta(property: string) {
  return function Meta({ content }: { content: string }) {
    return <meta property={property} content={content} />;
  };
}
// Types crated referencing https://ogp.me/#no_vertical
type Article = {
  publishedTime?: Date;
  modifiedTime?: Date;
  expirationTime?: Date;
  authors?: Profile[];
  section?: string;
  tags?: string[];
};
type Book = {
  authors?: Profile[];
  isbn?: string;
  releaseDate?: Date;
  tags?: string[];
};
type Profile = {
  firstName?: string;
  lastName?: string;
  username?: string;
  gender?: "male" | "female";
};

function Type({
  content,
  article,
  book,
  profile,
}: {
  content: "article" | "book" | "profile" | "website";
  article?: Article;
  book?: Book;
  profile?: Profile;
}) {
  if (
    (Boolean(article) && content !== "article") ||
    (Boolean(book) && content !== "book") ||
    (Boolean(profile) && content !== "profile")
  ) {
    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line no-console
      console.error(`<meta> type ${content} expected`);
    }
  }
  return (
    <>
      <meta property="og:type" content={content} />
      {/* TODO: implement rendering the extra object tags */}
    </>
  );
}

function Locale({
  content,
  alternatives,
}: {
  content: string;
  alternatives?: string[];
}) {
  return (
    <>
      <meta property="og:locale" content={content} />
      {(alternatives || []).map((alternative, idx) => (
        <meta
          key={idx}
          property="og:locale:alternative"
          content={alternative}
        />
      ))}
    </>
  );
}

function Image({
  content,
  alt,
  url,
  secureUrl,
  mimeType,
  width,
  height,
}: {
  content: string;
  alt: string;
  url?: string;
  secureUrl?: string;
  mimeType?: string;
  width?: number;
  height?: number;
}) {
  return (
    <>
      <meta property="og:image" content={content} />
      <meta property="og:image:alt" content={alt} />
      {url && <meta property="og:image:url" content={url} />}
      {secureUrl && <meta property="og:image:secure_url" content={secureUrl} />}
      {mimeType && <meta property="og:image:type" content={mimeType} />}
      {width && <meta property="og:image:width" content={String(width)} />}
      {height && <meta property="og:image:height" content={String(height)} />}
    </>
  );
}

export const OG = {
  Url: simpleMeta("og:url"),
  Type: Type,
  Title: simpleMeta("og:title"),
  Description: simpleMeta("og:description"),
  Determiner: simpleMeta("og:determiner"),
  Locale,
  SiteName: simpleMeta("og:site_name"),
  Image,
  // TODO: these all have structured object types to implement
  // Video,
  // Audio,
  // Music,
};
