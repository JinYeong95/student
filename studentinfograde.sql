SELECT * FROM student.studentinfo;
use student;
insert into studentinfo (studentname, studentnumber, studentphone, studentemail, studentaddress) values('강진영', '2014165002', '010-2978-1923', 'tealroad@naver.com', '서울 도봉구');

select * from studentinfo;

create table studentgrade(
	idx int primary key,
    javascore int default 0,
    pythonscore int default 0,
    cscore int default 0,
    total int default 0,
    average float default 0,
    regdate datetime default now(),
    foreign key(idx) references studentinfo(idx)
);
-- total 열 값 갱신
UPDATE studentgrade SET total = javascore + pythonscore + cscore;

-- average 열 값 갱신
UPDATE studentgrade SET average = (javascore + pythonscore + cscore) / 3;

insert into studentgrade (idx, javascore, pythonscore, cscore) values (2, 50, 40, 30);  

select * from studentgrade;