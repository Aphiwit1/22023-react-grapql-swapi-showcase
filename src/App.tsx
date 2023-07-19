
import './App.css';
import StarWarsList from './components/StarwarsList';
import Navbar from './components/Navbar/Navbar';
import { CSSProperties } from 'react';

function App() {

  const imageUrl = 'https://images.pexels.com/photos/998641/pexels-photo-998641.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';

  const divStyle: CSSProperties = {
    backgroundImage: `url(${imageUrl})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '500px', // Set the desired height
    width: '100%', // Set the desired width
    color: 'white', // Set the text color
    fontSize: '24px', // Set the font size
    textAlign: 'center',
    paddingTop: '200px', // Adjust the padding as needed
  };

  return (
    <div className="App" >
      <Navbar/>
     <StarWarsList/>
   
    </div>
  );
}

export default App;
