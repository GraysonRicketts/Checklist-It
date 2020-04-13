import UserModel from "../../models/User";
import { Router } from "express";
import userRouter from './users';

export default function apiRouter(userModel: UserModel): Router {
    const router = Router();

    router.use('/users', userRouter(userModel));

    return router;
}