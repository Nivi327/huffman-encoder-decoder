import { useContext } from 'react';
import './App.css';
import ReadTextFile from './context/ReadTextFile';
import TextFileContext from './context/textFileContext';
import Compressor from './Compressor';
import Nav from './Nav';

function App() {
  return (
    <div className="App">
      <Nav />
        <ReadTextFile>
          <Compressor />
        </ReadTextFile>
    </div>
  );
}

export default App;
