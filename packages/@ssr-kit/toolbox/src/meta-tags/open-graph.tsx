import React from "react";
import { Helmet } from "react-helmet-async";

const isDef = (a: any): boolean => typeof a !== "undefined";

function Image({
  alt,
  url,
  secureUrl,
  mimeType,
  width,
  height,
}: {
  alt: string;
  url: string;
  secureUrl?: string;
  mimeType?: string;
  width?: number;
  height?: number;
}) {
  // prettier-ignore
  return (
    <Helmet>
      {isDef(url) && <meta property="og:image" content={url} />}
      {isDef(url) && <meta property="og:image:url" content={url} />}
      {isDef(alt) && <meta property="og:image:alt" content={alt} />}
      {/* Optional */}
      {isDef(url) && <meta property="og:image:url" content={url} />}
      {isDef(secureUrl) && <meta property="og:image:secure_url" content={secureUrl} />}
      {isDef(mimeType) && <meta property="og:image:type" content={mimeType} />}
      {isDef(width) && <meta property="og:image:width" content={String(width)} />}
      {isDef(height) && <meta property="og:image:height" content={String(height)} />}
    </Helmet>
  );
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

type OpenGraphProps = {
  url?: string;
  title?: string;
  description?: string;
  siteName?: string;
  determiner?: string;
  type?: "article" | "book" | "profile" | "website";
  data?: Article | Book | Profile;
  locale?: string;
  alternativeLocales?: string[];
};

function _OpenGraph({
  type,
  url,
  title,
  description,
  siteName,
  determiner,
  locale,
  alternativeLocales,
}: OpenGraphProps) {
  // prettier-ignore
  return (
    <Helmet>
      {isDef(type) && <meta property="og:type" content={type} />}
      {isDef(url) && <meta property="og:url" content={url} />}
      {isDef(title) && <meta property="og:title" content={title} />}
      {isDef(description) && <meta property="og:description" content={description} />}
      {isDef(siteName) && <meta property="og:site_name" content={siteName} />}
      {isDef(determiner) && <meta property="og:determiner" content={determiner} />}

      {/* Locales */}
      {isDef(locale) && <meta property="og:locale" content={locale} />}
      {(alternativeLocales || []).map((alt, idx) => (
        isDef(alt) && <meta key={idx} property="og:locale:alternative" content={alt} />
      ))}

      {/* TODO: implement rendering of Article & Book & Profile */}
    </Helmet>
  );
}

export const OpenGraph = _OpenGraph as typeof _OpenGraph & {
  Image: typeof Image;
  // Video: typeof Video;
  // Audio: typeof Audio;
  // Music: typeof Music;
};

OpenGraph.Image = Image;
// OpenGraph.Video = Video;
// OpenGraph.Audio = Audio;
// OpenGraph.Music = Music;
