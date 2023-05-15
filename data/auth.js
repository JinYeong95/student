import { db } from '../db/database.js';

export async function findByStudentnumber(studentnumber){
    return db.execute('select * from student where studentnumber=?', [studentnumber]).then((result) => result[0][0]);
}

export async function createstudent(student){
    const { studentnumber, studentname, studentphone, studentemail, studentaddress } = student;
    return db.execute('insert into student (studentnumber, studentname, studentphone, studentemail, studentaddress) values (?, ?, ?, ?, ?)', [studentnumber, studentname, studentphone, studentemail, studentaddress]).then((result) => result[0].insertIdx);
}
// 1번. 학생을 등록

export async function findByStudentname(studentname){
    return db.execute('select studentname from student where studentname=?', [studentname]).then((result) => result[0][0]);
}
