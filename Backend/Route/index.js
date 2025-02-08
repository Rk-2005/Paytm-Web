// backend/user/index.js
import { Router } from 'express';
import userRouter from "./User.js";
import accountRouter from "./account.js";

const router = Router();

router.use("/user", userRouter);
router.use("/account", accountRouter);

export default router;
