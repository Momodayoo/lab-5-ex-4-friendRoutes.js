const friends = require('../models/friends');

function getFriends(req, res) {
    res.json(friends);
}

function filterFriends(req, res) {
    let filterGender = req.query.gender;
    let filterLetter = req.query.letter;
    let matchingFriends = [...friends];

    if (filterGender) {
        matchingFriends = matchingFriends.filter(friend => friend.gender === filterGender);
    }
    if (filterLetter) {
        matchingFriends = matchingFriends.filter(friend => friend.name.toLowerCase().startsWith(filterLetter.toLowerCase()));
    }
    if (matchingFriends.length > 0) {
        res.status(200).json(matchingFriends);
    } else {
        res.status(404).json({ error: `No friends matching gender ${filterGender}` });
    }
}

function getFriendInfo(req, res) {
    const info = {
        'user-agent': req.headers['user-agent'],
        'content-type': req.headers['content-type'],
        accept: req.headers.accept
    };
    res.json(info);
}

function getFriendById(req, res) {
    const friendId = req.params.id;
    const matchedFriend = friends.find(friend => friend.id === parseInt(friendId));

    if (matchedFriend) {
        res.status(200).json({ result: `Friend #${friendId} found`, data: matchedFriend });
    } else {
        res.status(404).json({ result: `Friend #${friendId} not found` });
    }
}

function addFriend(req, res) {
    const newFriend = req.body;

    if (!newFriend.name || !newFriend.gender) {
        res.status(500).json({ error: 'Friend object must contain a name and gender' });
        return;
    } else if (!newFriend.id) {
        newFriend.id = friends.length + 1;
    }

    friends.push(newFriend);
    res.status(200).json(newFriend);
}

function updateFriend(req, res) {
    const friendId = req.params.id;
    const updatedFriend = req.body;

    const oldFriend = friends.find(friend => friend.id === parseInt(friendId));

    if (oldFriend) {
        const oldFriendIndex = friends.indexOf(oldFriend);
        const mergedFriend = { ...oldFriend, ...updatedFriend };
        friends[oldFriendIndex] = mergedFriend;

        res.status(200).json({
            result: 'Updated friend with ID ' + friendId,
            data: mergedFriend
        });
    } else {
        res.status(404).json({ result: 'No friend with ID ' + friendId });
    }
}

module.exports = {
    getFriends,
    filterFriends,
    getFriendInfo,
    getFriendById,
    addFriend,
    updateFriend
};
