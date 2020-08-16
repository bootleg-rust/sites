// import { Cube, Download, Launch } from "grommet-icons";
import React from "react";
import { Link } from "react-router-dom";
import { styled, H1 } from "@bootleg-rust/lib-design-system";
// import { LoadCratesStats, LoadCratesSummary } from "./dashboard.resource";

const Button = styled.button``;
const Box = styled.div`
  display: flex;
  flex: 1;
`;

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
      <Box>
        <Button>
          {/* <Download color="white" /> */}
          Install Cargo
        </Button>
        <Button>
          {/* <Launch color="white" /> */}
          Getting Started
        </Button>
      </Box>

      <Box>
        <Box>
          Instantly publish your crates and install them. Use the API to
          interact and find out more information about available crates. Become
          a contributor and enhance the site with your work.{" "}
        </Box>
        <Box>
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
        </Box>
      </Box>
      {/* <LoadCratesSummary>
        {({ summary }) => ( */}
      <pre>
        {JSON.stringify(Object.keys(summary), null, 2)}
        {JSON.stringify(summary, null, 2)}
      </pre>
      {/* )}
      </LoadCratesSummary> */}
    </>
  );
}
