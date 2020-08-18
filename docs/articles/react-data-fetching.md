# Ideas for SSR

# Data fetching preloading

TODO

## N+1 data fetching preloading

WIP

```tsx
import React from "react";

export function MyPage() {
  return (
    <>
      {/*
        Preload/prime the cache request for the request to fetch the list and
        details for each cat in the list (n+1)
      */}
      <ListOfCats.Preload />
      {/* component that fetches and displays a list of cat info */}
      <ListOfCats />
    </>
  );
}

function ListOfCats() {
  const { data: cats } = useLoadListOfCats();
  return (
    <div>
      <h3>list of cats</h3>
      <p>description ...</p>
      {cats &&
        cats.map((cat) => (
          <CatDetails keyid={cat.id} />
        ))}
    </div>
  );
}

ListOfCats.Preload = function ListOfCatsPreload() {
  return (
    <LoadListOfCats>
      {(cats) => cats.map((cat) => <CatDetails.Preload key={cat.id} id={cat.id} />)}
    </LoadListOfCats>
  );
};


function CatDetails({ id }: { id: string }) {
  const { data: cats } = useLoadCat({ id });
  return (
    <div>
      ID: {cat.id} <br />
      Name: {cat.name}
    </div>
  );
}

CatDetails.Preload = function ListOfCatsPreload(props: {}) {
  return (
    <LoadCat {...props} />
  );
};
```
