import './App.css';
import Navbar from './Components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Carousel } from 'antd';

//Pages
import Homepage from "./Pages/Homepage";
import BrowseMedia from './Pages/BrowseMedia';
import ManageMedia from './Pages/ManageMedia';
import ManageInventory from './Pages/ManageInventory';

function App() {
  return (
    <Router>
      <Navbar /> {}
      <Routes>
      <Route path="/homepage" element={<Homepage />} />
        <Route path="/browse-media" element={<BrowseMedia />} />
        <Route path="/manage-media" element={<ManageMedia />} />
        <Route path="/manage-inventory" element={<ManageInventory />} />
      </Routes>
    </Router>
  );
  
}



export default App;
