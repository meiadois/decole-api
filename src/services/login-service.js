require('dotenv/config');
const bcrypt = require('bcrypt');

exports.createHashedPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt();
        return await bcrypt.hash(password, salt);

    } catch{
        return null;
    }
}

exports.login = async (password, input) => {
    if (await bcrypt.compare(input, password)) {
        return true;
    }
    return false;
}