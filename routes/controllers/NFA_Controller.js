const express = require('express'),
      router = express.Router(),
      NFA = require('../../db/models/NFA_Schema'),
      OnlyNotEmpty = require('../../utils/OnlyNotEmpty');
      
// ************* Check if needed
bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Return all the NFAs from the database
router.get('/getNFAs', (req, res) => {
    console.log(`Entered /getNFAs`);
    NFA.find({}, (err, NFAs) => {
          // Problem with NFA schema
          if (err) return res.status(500).send(err);
          // There is no NFAs in the system
          if (!NFAs) return res.status(404).send({ "message": "No NFA found" });
          // Return the found NFAs
          res.status(200).send(NFAs);
    });
});



module.exports = router;