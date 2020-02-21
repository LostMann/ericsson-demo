const sc = require("./index");

function getProfile(userId) {
    return sc.request(`/profile/${userId}`);
}

module.exports = { getProfile };