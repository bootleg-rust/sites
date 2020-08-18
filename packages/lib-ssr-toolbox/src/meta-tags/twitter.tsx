import React from "react";
import { Helmet } from "react-helmet-async";

const isDef = (a: any): boolean => typeof a !== "undefined";

function Image({ url, alt }: { url: string; alt: string }) {
  return (
    <Helmet>
      {isDef(url) && <meta name="twitter:image" content={url} />}
      {isDef(alt) && <meta name="twitter:image:alt" content={alt} />}
    </Helmet>
  );
}

function Player({
  url,
  stream,
  width,
  height,
}: {
  url: string;
  stream?: string;
  width: number;
  height: number;
}) {
  // TODO: twitter docs are unclear about `twitter:player:stream`.
  // Does it optionally replace `twitter:player`? if so it would mean that `twitter:player` should be optional
  return (
    // prettier-ignore
    <Helmet>
      {isDef(url) && <meta name="twitter:player" content={url} />}
      {isDef(stream) && <meta name="twitter:player:stream" content={stream} />}
      {isDef(width) && <meta name="twitter:player:width" content={String(width)} />}
      {isDef(height) && <meta name="twitter:player:height" content={String(height)} />}
    </Helmet>
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
  // prettier-ignore
  return (
    <Helmet>
      {/* Apple */}
      {isDef(appStoreCountry) && <meta name="twitter:app:country" content={appStoreCountry} />}

      {isDef(iphoneId) && <meta name="twitter:app:id:iphone" content={iphoneId} />}
      {isDef(iphoneName) && <meta name="twitter:app:name:iphone" content={iphoneName} />}
      {isDef(iphoneUrl) && <meta name="twitter:app:url:iphone" content={iphoneUrl} />}

      {isDef(ipadId) && <meta name="twitter:app:id:ipad" content={ipadId} />}
      {isDef(ipadName) && <meta name="twitter:app:name:ipad" content={ipadName} />}
      {isDef(ipadUrl) && <meta name="twitter:app:url:ipad" content={ipadUrl} />}

      {/* Google */}
      {isDef(googlePlayId) && <meta name="twitter:app:id:googleplay" content={googlePlayId} />}
      {isDef(googlePlayName) && <meta name="twitter:app:name:googleplay" content={googlePlayName} />}
      {isDef(googlePlayName) && <meta name="twitter:app:url:googleplay" content={googlePlayUrl} />}
    </Helmet>
  );
}

type TwitterCardProps = {
  card?: "summary" | "summary_large_image" | "app" | "player";
  site?: string;
  siteId?: string;
  creator?: string;
  creatorId?: string;
  title?: string;
  description?: string;
};

function _TwitterCard({
  card,
  site,
  siteId,
  creator,
  creatorId,
  title,
  description,
}: TwitterCardProps) {
  // prettier-ignore
  return (
    <Helmet>
      {isDef(card) && <meta name="twitter:card" content={card} />}
      {isDef(site) && <meta name="twitter:site" content={site} />}
      {isDef(siteId) && <meta name="twitter:site:id" content={siteId} />}
      {isDef(creator) && <meta name="twitter:creator" content={creator} />}
      {isDef(creatorId) && <meta name="twitter:creator:id" content={creatorId} />}
      {isDef(title) && <meta name="twitter:title" content={title} />}
      {isDef(description) && <meta name="twitter:description" content={description} />}
    </Helmet>
  );
}
export const TwitterCard = _TwitterCard as typeof _TwitterCard & {
  App: typeof App;
  Player: typeof Player;
  Image: typeof Image;
};

TwitterCard.App = App;
TwitterCard.Player = Player;
TwitterCard.Image = Image;
