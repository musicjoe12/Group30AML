import React from 'react';
import { Select } from 'antd';


const { Option } = Select;

const MediaTypeSelector = ({ mediaType, onMediaTypeChange }) => {
    return (
        <Select
        style={{ width: 200 }}
        placeholder="Select Media Type"
        >
            <Option value='Books'>Books</Option>
            <Option value='Movies'>Movies</Option>
            <Option value='Games'>Games</Option>
        </Select>
    );
};

export default MediaTypeSelector;