
import './App.css';
import StarWarsList from './components/StarwarsList/StarwarsList';
import Navbar from './components/Navbar/Navbar';
import { CSSProperties } from 'react';
import PeopleList from './components/PeopleList/PeopleList';

function App() {

  const imageUrl = 'https://images.pexels.com/photos/998641/pexels-photo-998641.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';

  return (
    <div className="App" >
      <Navbar/>
     <StarWarsList/>
     <PeopleList/>
    </div>
  );
}

export default App;
