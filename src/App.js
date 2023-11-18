import logo from './logo.svg';
import './App.css';

import Nav from './components/Nav';
import Nav2 from './components/Nav2';
import Editor from './components/editor/Editor';
import UseEffect from './components/states/UseEffect';
import Viewer from './components/table/Viewer';
import AdvanceTable from './components/Advanced/AdvanceTable';
import DropDown from './components/Helper/DropDown';


function App() {
  console.log("hey");
  return (
    <div className="App">
    
      <Nav/>
      <Nav2/>
      <Editor/>
        {/* <AdvanceTable/> */}
  
      {/* <UseEffect/> */}
       
    </div>
  );
} 

export default App;
