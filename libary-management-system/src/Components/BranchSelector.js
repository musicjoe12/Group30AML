import React from 'react';
import { Select } from 'antd';
import axios from 'axios';

// Import this into page

// const [transferBranch, setTransferBranch] = useState(''); 

//     const [isTransferModalVisible, setIsTransferModalVisible] = useState(false)

//     // Selected branch
//     const [selectedBranch, setSelectedBranch] = useState('BranchSheffield'); // default branch
//     // Branches
//     const branches = [
//       { key: 'BranchSheffield', label: 'Sheffield Branch' },
//       { key: 'BranchManchester', label: 'Manchester Branch' },
//     ];

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