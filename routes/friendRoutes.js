const express = require('express');
const router = express.Router();
const friendsController = require('../controller/friendsController');

router.get('/', friendsController.getFriends);
router.get('/filter', friendsController.filterFriends);
router.get('/info', friendsController.getFriendInfo);
router.get('/:id', friendsController.getFriendById);
router.post('/', friendsController.addFriend);
router.put('/:id', friendsController.updateFriend);

module.exports = router;
