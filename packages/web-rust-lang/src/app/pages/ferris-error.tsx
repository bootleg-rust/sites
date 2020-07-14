import React from "react";
import ferrisErrorImg from "./ferris-img.png";

export function FerrisErrorPage({ code }: { code: number }) {
  return (
    <main>
      <header>
        <div className="w-100 mw-none ph3 mw8-m mw9-l center f3">
          <div className="flex-none flex-l mt5 mb5 tc tl-l">
            <div className="w-70-l w-100">
              <h1>{code}</h1>
              <h2 className="subtitle">Whoops, this page doesn’t exist :-(</h2>
            </div>
            <div className="w-30-l w-100 mt5 mt0-l">
              <img
                id="ferris-error"
                src={ferrisErrorImg}
                alt="404 not found image"
              />
            </div>
          </div>
        </div>
      </header>
    </main>
  );
}
