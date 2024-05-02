import CardContainer from "./components/CardContainer";
import "/src/styles/app.css";

function App() {
  return (
    <>
      <div className="app">
        <header className="app-header">
          <h1>Memory Game</h1>
        </header>
        <main>
          <CardContainer />
        </main>
        <footer>
          <h3>Click all 12 without clicking the same one twice!</h3>
          <a href="https://github.com/DavAnders">
            <p>DavAnders</p>
          </a>
        </footer>
      </div>
    </>
  );
}

export default App;
