
import './App.css';
import StarWarsList from './components/StarwarsList/StarwarsList';
import Navbar from './components/Navbar/Navbar';
import PeopleList from './components/PeopleList/PeopleList';


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
