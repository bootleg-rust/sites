export {};
// import queryString from "query-string";
// import React from "react";
// import { LoadResource, Resource } from "../../common";

// function teamResource(
//   { team_identifier }: { team_identifier: string } = { team_identifier: "" },
// ) {
//   const url = `http://localhost:8000/api/v1/teams/${team_identifier}`;
//   const headers = {};

//   const filterBookmakers = ({ json }) => ({
//     crates: json.crates,
//   });
//   return new Resource()
//     .withFetchArgs(url, { headers })
//     .withTransformResponse(filterBookmakers);
// }

// export function LoadTeam() {
//   const resource = teamResource();
//   return (
//     <LoadResource load={resource}>
//       {(result) => <pre>{JSON.stringify(result, null, 2)}</pre>}
//     </LoadResource>
//   );
// }

// function searchResource({
//   page = 1,
//   sort = "relevance",
//   letter,
//   q,
//   user_id,
//   team_id,
// }: {
//   page?: number;
//   sort?: string;
//   letter?: string;
//   q?: string;
//   user_id?: number;
//   team_id?: number;
// } = {}) {
//   const params = {
//     page,
//     q,
//     sort,
//     user_id,
//     team_id,
//     letter,
//     per_page: 10,
//   };
//   const paramStr = String(queryString.stringify(params));
//   const urlParams = paramStr ? "?" + paramStr : "";
//   const url = `http://localhost:8000/api/v1/crates${urlParams}`;
//   const headers = {};

//   const filterBookmakers = ({ json }) => ({
//     crates: json.crates,
//   });
//   return new Resource()
//     .withFetchArgs(url, { headers })
//     .withTransformResponse(filterBookmakers);
// }

// export function LoadSomething() {
//   const resource = searchResource();
//   return (
//     <LoadResource load={resource}>
//       {(result) => <pre>{JSON.stringify(result, null, 2)}</pre>}
//     </LoadResource>
//   );
// }
