import jwt from 'jsonwebtoken';
// import UserModel from 'src/models/User';

export function generateJwt(id: string, email: string) {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    return jwt.sign({
        email,
        id,
        exp: expirationDate.getTime() / 1000,
    }, process.env.JWT_SECRET);
}