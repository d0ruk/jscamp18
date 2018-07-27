const React = require("react");
const apiURL = "http://localhost:3000/api";

const styles = {
  main: {},
  body: {
    padding: ".3em",
  },
  section: {
    margin: ".5em",
    padding: ".5em",
    border: "1px solid rgba(0,0,255,.5)",
  },
  title: {
    color: "midnightblue",
  }
};

class BlogApp extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      all: [],
    };

    this.onDelete = id => {
      this.setState({ isLoading: true });
      makeReq(`/${id}`, "delete")
        .then(res => {
          const id = res.id;
          const { all } = this.state;
          this.setState({ all: all.filter(p => id !== p.id) });
        })
        .catch(console.error)
        .finally(() => { this.setState({ isLoading: false }) })
    }

    this.init = () => {
      makeReq("/")
        .then(data => { this.setState({ all: data.posts }) })
        .catch(console.error)
        .then(() => { this.setState({ isLoading: false }) });
    }

    this.init();
  }

  render() {
    const { isLoading, all } = this.state;

    return isLoading
      ? <h1>Loading...</h1>
      : (
        <main style={styles.main}>
          <h1>BLOG</h1>
          <hr/>
          <br/>
          <List
            posts={all}
            onDelete={this.onDelete}
          />
        </main>
      );
  }
}

const List = ({ posts, onDelete }) => posts.map(p => (
  <section key={p.id} style={styles.section}>
    <h3 style={styles.title}>{p.title}</h3>
    <i>yazan: {p.author}</i>
    <hr/>
    <div style={styles.body}>
      <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
        {p.body}
      </pre>
    </div>
    <button onClick={() => onDelete(p.id)}>Sil</button>
  </section>
));

function makeReq(to, method = "get") {
  let fetch;
  if (__dirname) fetch = require("node-fetch");
  else fetch = window.fetch;

  return fetch(apiURL + to, { method })
    .then(res => res.json())
    .catch(console.error)
}

module.exports = BlogApp;
