import { scryptSync, randomBytes} from 'crypto';

function criaHashESal (password){
    const salt = randomBytes(16).toString('hex');

    const senhaHash = scryptSync(password, salt, 64).toString('hex');

    return `${salt}:${senhaHash}`;
}

export default criaHashESal;