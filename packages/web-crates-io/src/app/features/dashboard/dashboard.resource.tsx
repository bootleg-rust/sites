export {};
// import React from "react";
// import { LoadResource, Resource } from "../../common";

// function cratesSummaryResource() {
//   const url = `http://localhost:8000/api/v1/summary`;
//   const headers = {};

//   const transformFn = ({ json }) => ({
//     summary: {
//       new_crates: json.new_crates,
//       most_downloaded: json.most_downloaded,
//       most_recently_downloaded: json.most_recently_downloaded,
//       just_updated: json.just_updated,
//       popular_keywords: json.popular_keywords,
//       popular_categories: json.popular_categories,
//     },
//   });

//   return new Resource()
//     .withFetchArgs(url, { headers })
//     .withTransformResponse(transformFn);
// }

// function cratesStatsResource() {
//   const url = `http://localhost:8000/api/v1/summary`;
//   const headers = {};

//   const transformFn = ({ json }: { json: any }) => ({
//     stats: {
//       num_downloads: json.num_downloads,
//       num_crates: json.num_crates,
//     },
//   });

//   return new Resource()
//     .withFetchArgs(url, { headers })
//     .withTransformResponse(transformFn);
// }

// export function LoadCratesSummary({ children }: { children: React.ReactNode }) {
//   const resource = cratesSummaryResource();
//   return <LoadResource load={resource}>{children}</LoadResource>;
// }

// export function LoadCratesStats({ children }: { children: React.ReactNode }) {
//   const resource = cratesStatsResource();
//   return <LoadResource load={resource}>{children}</LoadResource>;
// }
