const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const owner = require('../databases/owner');

router.post('/owner/register', async (req, res) => {
    console.log(req.body)

    try {
        
        console.log('라우터 저장 코드')
       
        const owner_pw = await bcrypt.hash(req.body.owner_pw, 10);
        req.body.owner_pw = owner_pw;
        const result = await owner.ownerInsert(req.body);
        res.status(201).json({ result });
    } catch (error) {
        console.error('Error creating business', error.message);
        res.status(500).json({ error: error.message });
    }

})


module.exports = router;