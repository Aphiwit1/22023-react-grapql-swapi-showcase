
import './App.css';
import StarWarsList from './features/StarwarsList/StarwarsList';
import Navbar from './features/Navbar/Navbar';
import PeopleList from './features/PeopleList/PeopleList';


function App() {


  return (
    <div className="App" >
      <Navbar/>
     <StarWarsList/>
      <PeopleList/>
    </div>
  );
}

export default App;
