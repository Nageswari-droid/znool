import "./App.css";
import Router from "./Router";
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <NavBar onAddBook={() => {}} />
      <Router />
    </>
  );
}

export default App;
