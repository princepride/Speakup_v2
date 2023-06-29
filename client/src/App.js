import './App.css';
import { ContextProvider } from './contexts/ContextProvider';
import RoutePage from './pages/RoutePage';


function App() {
    return (
      <div className="App">
        <ContextProvider>
          <RoutePage />
        </ContextProvider>
      </div>
    );
}

export default App;
