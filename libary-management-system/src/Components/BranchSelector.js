import React from 'react';
import { Select } from 'antd';
import axios from 'axios';

// Import this into page

// import BranchSelector from '../Components/BranchSelector';


// const [transferBranch, setTransferBranch] = useState(''); 

//     const [isTransferModalVisible, setIsTransferModalVisible] = useState(false)

//     // Selected branch
//     const [selectedBranch, setSelectedBranch] = useState('BranchSheffield'); // default branch
//     // Branches
//     const branches = [
//       { key: 'BranchSheffield', label: 'Sheffield Branch' },
//       { key: 'BranchManchester', label: 'Manchester Branch' },
//     ];


//Dropdown
// {/* <div className="branch-selector-container">
// <BranchSelector
// selectedBranch={selectedBranch}
// setSelectedBranch={setSelectedBranch}
// branches={branches}
// fetchBooks={fetchBooks}
// /> */}

const { Option } = Select;

const BranchSelector = ({ selectedBranch, setSelectedBranch, branches, fetchBooks }) => {
  const handleBranchChange = (value) => {
    setSelectedBranch(value);
    axios.post('http://localhost:8080/api/change-branch', { branch: value })
      .then(response => {
        fetchBooks();
        console.log('Branch updated successfully:', response.data);
      })
      .catch(error => {
        console.error('There was an error updating the branch:', error);
      });
  };

  return (
    <Select value={selectedBranch} onChange={handleBranchChange} style={{ width: 200 }}>
      {branches.map((branch) => (
        <Option key={branch.key} value={branch.key}>
          {branch.label}
        </Option>
      ))}
    </Select>
  );
};

export default BranchSelector;