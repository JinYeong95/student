import * as studentRepository from '../data/student.js'
import { getSocketIO } from '../connection/socket.js';

export async function getStudentinfos(req,res){
    const studentnumber = req.query.studentnumber;
    const data = await (studentnumber ? studentRepository.getAllbystudentnumber(studentnumber) : studentRepository.getAll());
    res.status(200).json(data);
}

export async function getStudentinfo(req, res, next){
    const idx = req.params.idx;
    const info = await studentRepository.getByIdx(idx);
        if(info){
            res.status(200).json(info);
        }else{
            res.status(404).json({message: `해당 학생의 정보가 없습니다` })
        }
}

export async function createStudent(req, res, next){
    const {text} = req.body;
    const student = await studentRepository.create(text, req.studentIdx);
    res.status(201).json(student);
    getSocketIO().emit('Students', student);
}


export async function updateStudent(req, res,next){
    const idx = req.params.idx;
    const text = req.body.text;
    const student = await studentRepository.getByIdx(idx);
    
    if(!student){
        res.status(404).json({message: `학생 정보가 잘못되었거나 없습니다` })
    }
    if(student.studentIdx !== req.studentIdx){
        return res.sendStatus(403)
    }
    const updated = await studentRepository.update(idx,text);
    res.status(200).json(updated)
    
}


export async function deleteStudent(req,res,next){
    const idx = req.params.idx;
    const student = await studentRepository.getByIdx(idx);
    if(!student){
        res.status(404).json({message: `학생 정보가 없거나 잘못입력하셨습니다.` })        
    }
    if(student.studentIdx !== req.studentIdx){
        return res.sendStatus(403)
    }
    await studentRepository.remove(idx);
    res.sendStatus(204);
}