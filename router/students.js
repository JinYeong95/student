import express from 'express';
import * as studentController from '../controller/student.js';
import {body} from 'express-validator';
import {validate} from '../middleware/validator.js';


const router = express.Router();

const validateStudent = [
    body('javascore')
        .trim()
        .withMessage('자바 점수 입력좀'),
    body('pythonscore')
        .trim()
        .withMessage('파이썬 점수 입력좀'),
    body('cscore')
        .trim()
        .withMessage('C언어 점수 입력좀'),
        validate
        .optional({nullable: true, checkFalsy:true})
]

const app = express();
app.use(express.json());

import { isAuth } from '../middleware/auth.js';


router.get('/',  isAuth, studentController.getStudentinfos);

router.get('/:idx',  isAuth, studentController.getStudentinfo); 


// text가 4자리 이하인 경우 에러처리해보기 (5/2)
// POST
// id: Date.now().toString()
router.post('/',  isAuth, validateStudent, studentController.createStudent);


router.put('/:idx', isAuth,  validateStudent, studentController.updateStudent);

// Delete
router.delete('/:idx', isAuth, studentController.deleteStudent);



export default router;
