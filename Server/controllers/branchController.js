//const BranchModel = require('../models/branchModel');
const connectDB = require('../db/connection');

module.exports = {
    postBranch: async (req, res) => {
        const branch = req.body.branch;
        try {
            await connectDB(branch);
            res.status(200).json({
                status: 'Success',
                message: `Connected to ${branch} branch`
            });
        } catch (err) {
            res.status(500).json({
                status: 'Failed',
                message: err
            });
        }
        
    },
};


