import express from 'express';
import {body} from 'express-validator';
import {validate} from '../middleware/validator.js';
import * as authController from '../controller/auth.js';


const router = express.Router();

const validateCredential = [
    body('studentnumber')
        .trim()
        .isLength({min:4})
        .withMessage('학번은 최소 4자 이상 입력좀'),
    body('studentname')
        .trim()
        .isLength({min:4})
        .withMessage('이름을 입력'),
    validate
];

const validateSignup = [
    ...validateCredential,
    body('studentphone').notEmpty().withMessage('폰번호 입력'),
    body('studentemail').isEmail().normalizeEmail().withMessage('이메일을 입력'),
    body('studentaddress').notEmpty().withMessage('주소 입력')
        .optional({nullable: true, checkFalsy:true}), // data가 null이어도 true.
    validate
];

router.post('/signup', validateSignup, authController.signup);

router.post('/login', validateCredential, authController.login);

import { isAuth } from '../middleware/auth.js';

router.get('/me', isAuth, authController.me);

export default router;

