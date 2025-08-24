import { useState } from 'react';
import { ApolloClient, InMemoryCache, gql, HttpLink } from '@apollo/client';
import { ApolloProvider, useMutation } from '@apollo/client/react';
import './App.css';

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:3000/graphql' }),
  cache: new InMemoryCache(),
});

// Mutation untuk membuat user
const CREATE_USER = gql`
  mutation($name: String!, $email: String!) {
    createUser(name: $name, email: $email) {
      id
      name
      email
    }
  }
`;

// Mutation untuk mengirim transaksi
const SEND_TRANSACTION = gql`
  mutation(
    $userId: String!
    $from: String!
    $to: String!
    $amount: Float!
    $note: String!
    $date: DateTime
  ) {
    sendTransaction(
      userId: $userId
      from: $from
      to: $to
      amount: $amount
      note: $note
      date: $date
    ) {
      id
      user {
        id
        name
      }
      from
      to
      amount
      note
      date
    }
  }
`;


function CreateUserForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [createUser, { data, loading, error }] = useMutation(CREATE_USER);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createUser({ variables: { name, email } });
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px' }}>
      <h2>Create User</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br /><br />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br /><br />
        <button type="submit">Kirim</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
      {data && (
        <div style={{ marginTop: '20px' }}>
          <h3>Output:</h3>
          <pre>{JSON.stringify(data.createUser, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

function TransactionForm() {
  const [userId, setUserId] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [date, setDate] = useState('');

  const [sendTransaction, { data, loading, error }] = useMutation(SEND_TRANSACTION);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendTransaction({
      variables: {
        userId,
        from,
        to,
        amount: parseFloat(amount),
        note,
        date: date ? new Date(date).toISOString() : null,
      },
    });
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px' }}>
      <h2>Send Transaction</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        /><br /><br />
        <input
          type="text"
          placeholder="From"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        /><br /><br />
        <input
          type="text"
          placeholder="To"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        /><br /><br />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        /><br /><br />
        <input
          type="text"
          placeholder="Note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        /><br /><br />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        /><br /><br />
        <button type="submit">Kirim</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
      {data && (
        <div style={{ marginTop: '20px' }}>
          <h3>Output:</h3>
          <pre>{JSON.stringify(data.sendTransaction, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <ApolloProvider client={client}>
      <CreateUserForm />
      <TransactionForm />
    </ApolloProvider>
  );
}

export default App;
