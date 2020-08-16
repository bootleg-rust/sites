import React from "react";

function Card({
  content,
}: {
  content: "summary" | "summary_large_image" | "app" | "player";
}) {
  return <meta name="twitter:card" content={content} />;
}

function Site({ content }: { content: string }) {
  return <meta name="twitter:site" content={content} />;
}
function SiteId({ content }: { content: number }) {
  return <meta name="twitter:site:id" content={String(content)} />;
}

function Creator({ content }: { content: string }) {
  return <meta name="twitter:creator" content={content} />;
}
function CreatorId({ content }: { content: number }) {
  return <meta name="twitter:creator" content={String(content)} />;
}

function Title({ content }: { content: string }) {
  return <meta name="twitter:title" content={content} />;
}
function Description({ content }: { content: string }) {
  return <meta name="twitter:description" content={content} />;
}
function Image({ content, alt }: { content: string; alt: string }) {
  return (
    <>
      <meta name="twitter:image" content={content} />
      <meta name="twitter:image:alt" content={alt} />
    </>
  );
}
function Player({
  content,
  stream,
  width,
  height,
}: {
  content: string;
  stream?: string;
  width: number;
  height: number;
}) {
  // TODO: twitter docs are unclear about `twitter:player:stream`.
  // Does it optionally replace `twitter:player`? if so it would mean that `twitter:player` should be optional
  return (
    <>
      <meta name="twitter:card" content="app" />
      <meta name="twitter:player" content={content} />
      {stream && <meta name="twitter:player:stream" content={stream} />}
      <meta name="twitter:player:width" content={String(width)} />
      <meta name="twitter:player:height" content={String(height)} />
    </>
  );
}

function App({
  // apple
  appStoreCountry,
  iphoneId,
  iphoneName,
  iphoneUrl,
  ipadId,
  ipadName,
  ipadUrl,
  // google
  googlePlayId,
  googlePlayName,
  googlePlayUrl,
}: {
  // apple
  appStoreCountry?: string;
  iphoneId: string;
  iphoneName?: string;
  iphoneUrl?: string;
  ipadId: string;
  ipadName?: string;
  ipadUrl?: string;
  // google
  googlePlayId: string;
  googlePlayName?: string;
  googlePlayUrl?: string;
}) {
  return (
    <>
      <meta name="twitter:card" content="app" />
      {/* Apple */}
      {appStoreCountry && (
        <meta name="twitter:app:country" content={appStoreCountry} />
      )}

      <meta name="twitter:app:id:iphone" content={iphoneId} />
      {iphoneName && (
        <meta name="twitter:app:name:iphone" content={iphoneName} />
      )}
      {iphoneUrl && <meta name="twitter:app:url:iphone" content={iphoneUrl} />}

      <meta name="twitter:app:id:ipad" content={ipadId} />
      {ipadName && <meta name="twitter:app:name:ipad" content={ipadName} />}
      {ipadUrl && <meta name="twitter:app:url:ipad" content={ipadUrl} />}

      {/* Google */}
      <meta name="twitter:app:id:googleplay" content={googlePlayId} />
      {googlePlayName && (
        <meta name="twitter:app:name:googleplay" content={googlePlayName} />
      )}
      {googlePlayName && (
        <meta name="twitter:app:url:googleplay" content={googlePlayUrl} />
      )}
    </>
  );
}

export const Twitter = {
  Card,
  Site,
  SiteId,
  Creator,
  CreatorId,
  Title,
  Description,
  Image,
  Player,
  App,
};
