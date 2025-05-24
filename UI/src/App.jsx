import "./App.css";
import Router from "./Router";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div>
      <NavBar onAddBook={() => {}} />
      <Router />
    </div>
  );
}

export default App;
