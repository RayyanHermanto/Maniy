"use client";

import { useEffect, useState } from "react";
import { fetchGraphQL } from "../lib/graphql/fetchGraphql";
import { GET_USER_WALLETS } from "../lib/graphql/queries";

type Wallet = {
  id: string;
  name: string;
  balance: number;
  type: string;
};

export default function Home() {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGraphQL<{ user: { wallets: Wallet[] } }>(GET_USER_WALLETS)
      .then((data) => {
        setWallets(data.user.wallets);
        setLoading(false);
      })
      .catch((err) => {
        console.error("GraphQL error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Wallets</h2>
      <ul>
        {wallets.map((wallet) => (
          <li key={wallet.id}>
            <strong>{wallet.name}</strong> - {wallet.type} - ${wallet.balance}
          </li>
        ))}
      </ul>
    </div>
  );
}
