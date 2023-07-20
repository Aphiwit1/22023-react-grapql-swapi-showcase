
import './App.css';
import StarWarsList from './components/StarwarsList';
import Navbar from './components/Navbar/Navbar';
import { CSSProperties } from 'react';

function App() {

  const imageUrl = 'https://images.pexels.com/photos/998641/pexels-photo-998641.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';

  return (
    <div className="App" >
      <Navbar/>
     <StarWarsList/>
   
    </div>
  );
}

export default App;
