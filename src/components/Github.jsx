import { useState } from "react";

export default function Github() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState("");

  async function searchUser(e) {
    e.preventDefault();
    setError("");
    setUser(null);
    setRepos([]);

    try {
      const userRes = await fetch(`https://api.github.com/users/${username}`);
      if (!userRes.ok) {
        throw new Error("User not found");
      }

      const userData = await userRes.json();
      setUser(userData);

      const repoRes = await fetch(
        `https://api.github.com/users/${username}/repos?sort=created&per_page=5`
      );
      const repoData = await repoRes.json();
      setRepos(repoData);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div style={styles.container}>
      <form onSubmit={searchUser} style={styles.search}>
        <input
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button>Search</button>
      </form>

      {error && <p style={styles.error}>{error}</p>}

      {user && (
        <div style={styles.card}>
          <img src={user.avatar_url} alt="" style={styles.avatar} />
          <h3>{user.login}</h3>
          <p>{user.bio}</p>
          <p>Followers: {user.followers}</p>
        </div>
      )}

      {repos.length > 0 && (
        <div style={styles.repos}>
          <h4>Latest Repositories</h4>
          <ul>
            {repos.map((repo) => (
              <li key={repo.id}>{repo.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#0f172a",
    color: "#e5e7eb",
    padding: "40px",
    fontFamily: "Arial",
  },
  search: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  card: {
    background: "#020617",
    padding: "20px",
    borderRadius: "10px",
    width: "300px",
  },
  avatar: {
    width: "100px",
    borderRadius: "50%",
  },
  repos: {
    marginTop: "20px",
  },
  error: {
    color: "#f87171",
  },
};
