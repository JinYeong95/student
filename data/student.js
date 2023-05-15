import { db } from '../db/database.js';
import * as userRepository from './auth.js';

const SELECT_JOIN = 'select in.idx, in.studentnumber, in.studentname, gr.javascore, gr.pythonscore, gr.cscore, gr.total, gr.average from studentinfo as in left outer join studentgrade as gr on info.idx = grade.idx';
const ORDER_DESC = 'order by gr.average desc';
 // 2번 ! 내림차순으로 정렬(평균)

export async function getAll(){
    return db.execute(`${SELECT_JOIN} ${ORDER_DESC}`)
    .then((result) => result[0]);
}

export async function getAllbystudentnumber(studentnumber){
    return db.execute(`${SELECT_JOIN} WHERE in.studentnumber=? ${ORDER_DESC}`, [studentnumber])
    .then((result) => result[0]);
}
// 5번. 학번으로 검색하기
export async function getByIdx(idx){
    return db.execute(`${SELECT_JOIN} WHERE in.idx=?`, [idx])
    .then((result) => result[0][0]);
}

export async function create(text, studentIdx){
    return db.execute('insert into studentgrade (javascore, pythonscore, cscore, regdate) values (?, ?, ?, ?)', [javascore, pythonscore, cscore, new Date()])
    .then((result) => console.log(result));
}
// UPDATE studentgrade SET total = javascore + pythonscore + cscore;
// UPDATE studentgrade SET average = (javascore + pythonscore + cscore) / 3;
// 6번 : 학생 점수를 등록하기, node에서는 구현을 못했는데 mysql식은 저렇게 해서 구현함(total, average)
export async function update(idx, javascore, pythonscore, cscore){
    return db.execute('update studentgrade SET javascore=?, pythonscore=?, cscore=?, where idx=?', [javascore, pythonscore, cscore, idx]).then(() => getByIdx(idx));
}
// 7번. 학생 점수를 수정하기

export async function remove(idx){
    return db.execute('delete from studentgrade where idx=?', [idx]);
}

// 8번. 학생 점수를 삭제하기(점수 항목을 전체 삭제)