
import jsonWebToken from 'jsonwebtoken';
import util from 'util';

const jwt = {
    sign: util.promisify(jsonWebToken.sign),
    assyncVerify: util.promisify(jsonWebToken.verify)

}

export default jwt;
