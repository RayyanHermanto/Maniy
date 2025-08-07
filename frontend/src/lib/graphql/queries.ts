export const GET_USER_WALLETS = `
  query {
    user(id: "65468ffd-06bf-498a-9d20-e52445368d34") {
      wallets {
        id
        name
        balance
        type
      }
    }
  }
`;
