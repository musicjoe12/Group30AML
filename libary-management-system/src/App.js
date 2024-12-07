//npm i - only run if there have been changes to the package.json file 
//npm run start


import './App.css';
import Navbar from './Components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './Context/UserContext';
import { SearchProvider } from './Context/SearchContext';

//Pages
import Homepage from "./Pages/Homepage";
import BrowseMedia from './Pages/BrowseMedia';
import ManageMedia from './Pages/ManageMedia';
import ManageInventory from './Pages/ManageInventory';

function App() {
  return (
  <SearchProvider>
    <UserProvider>
    <Router>
      <Navbar /> {}
      <Routes>
        
        <Route path="/" element={<Homepage />} />
        <Route path="/browse-media" element={<BrowseMedia />} />
        <Route path="/manage-media" element={<ManageMedia />} />
        <Route path="/manage-inventory" element={<ManageInventory />} />
      </Routes>
    </Router>
    </UserProvider>
  </SearchProvider>
  );
  
}



export default App;
