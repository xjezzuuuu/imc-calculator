import { Router } from "express";
import * as ctrl from "../controller/index.controller";

const router = Router();

router.post("/send-email", ctrl.sendEmail);

export default router;
