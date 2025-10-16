import "./App.css";
import { BrowserRouter as Router} from "react-router-dom";
import MainPage from "./pages/MainPage";
// import Sidebar from './Components/Sidebar'
function App() {
  return (
    <>
      <Router>
        <MainPage />
      </Router>
    </>
  );
}

export default App;
