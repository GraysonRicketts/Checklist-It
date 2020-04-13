import { Router } from 'express';
import UserModel, { UserInput } from '../../models/User';
import { generateJwt } from '../../config/auth';

export default function userRouter(userModel: UserModel): Router {
    const router = Router();

    router.post('/', (req, res) => {
        const user = req.body.user as UserInput;
    
        if(!user.email) {
            return res.status(422).json({
                errors: {
                    email: 'is required',
                },
            });
        }
    
        if(!user.password) {
            return res.status(422).json({
                errors: {
                    password: 'is required',
                },
            });
        }
    
        const createdUser = userModel.insertOne(user);
        return res.json({
            id: createdUser.id,
            email: createdUser.email,
            token: generateJwt(createdUser.email)
        });
    });

    return router;
}

