// import { Cube, Download, Launch } from "grommet-icons";
import React from "react";
import { Link } from "react-router-dom";
import { H1 } from "@bootleg-rust/lib-design-system";
import { flx } from "@pseudo-su/flex-elements";
// import { LoadCratesStats, LoadCratesSummary } from "./dashboard.resource";

const stats = { num_downloads: 20000000, num_crates: 1000000000 };
const summary = {
  new_crates: [],
  most_downloaded: [],
  most_recently_downloaded: [],
  just_updated: [],
  popular_keywords: [],
  popular_categories: [],
};

function StatNumber({ number = 0 }) {
  const numberStr = String(number);
  const strGroups = [];
  for (let i = 0; i < numberStr.length / 3; i++) {
    const start = numberStr.length - (i + 1) * 3;
    const end = start + 3;
    strGroups.unshift(numberStr.slice(start, end));
  }
  return <>{strGroups.join(",")}</>;
}

export function Dashboard() {
  return (
    <>
      <Link to="/redirect">Redirect</Link>
      <H1>The Rust community’s crate registry (but not)</H1>
      <flx.div>
        <flx.button>
          {/* <Download color="white" /> */}
          Install Cargo
        </flx.button>
        <flx.button>
          {/* <Launch color="white" /> */}
          Getting Started
        </flx.button>
      </flx.div>

      <flx.div>
        <flx.div>
          Instantly publish your crates and install them. Use the API to
          interact and find out more information about available crates. Become
          a contributor and enhance the site with your work.{" "}
        </flx.div>
        <flx.div>
          {/* <LoadCratesStats>
            {({ stats }) => ( */}
          <>
            {/* <Download /> */}
            <StatNumber number={stats.num_downloads} /> Downloads
            {/* <Cube /> */}
            <StatNumber number={stats.num_crates} /> Crates
          </>
          {/* )}
          </LoadCratesStats> */}
        </flx.div>
      </flx.div>
      {/* <LoadCratesSummary>
        {({ summary }) => ( */}
      <flx.pre>
        {JSON.stringify(Object.keys(summary), null, 2)}
        {JSON.stringify(summary, null, 2)}
      </flx.pre>
      {/* )}
      </LoadCratesSummary> */}
    </>
  );
}
