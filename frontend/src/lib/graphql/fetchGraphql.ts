export async function fetchGraphQL<T = any>(query: string): Promise<T> {
  const res = await fetch("http://localhost:3000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  const json = await res.json();

  if (json.errors) {
    throw new Error(JSON.stringify(json.errors));
  }

  return json.data;
}
