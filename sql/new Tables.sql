CREATE OR REPLACE PROCEDURE ADDUPDATE(case_id IN NUMBER ,title IN VARCHAR2,description IN VARCHAR2,method IN VARCHAR2,resourceTitle IN VARCHAR2,
resourceDes in varchar2, link IN VARCHAR2,progress in number,det_id in varchar2, result in varchar2,client_user_id in varchar2) IS 
id number(5,0);
BEGIN 
select count(*) into id from RESOURCES;
DBMS_OUTPUT.PUT_LINE(id);
INSERT INTO RESOURCES(r_id,r_user_id,case_id,title,source,description,r_date) VALUES(id,det_id,case_id,resourceTitle,link,resourceDes,TO_DATE(sysdate, 'SYYYY-MM-DD'));
INSERT INTO Updates(id,case_id,progress,description,title,method,result,update_date,r_id) VALUES(id,case_id,progress,description,title,method,result,TO_DATE(sysdate, 'SYYYY-MM-DD'),id);
INSERT INTO NOTIFICATIONS(detective_id,client_id, entity_title,entity_id,description,link,seen,noti_date,user_type)
VALUES(det_id,client_user_id,'UPDATED CASE',case_id,'YOUR CASE HAS BEEN UPDATED',null,'NO',TO_DATE(sysdate, 'SYYYY-MM-DD'),'Client');
END;
/

alter table UPDATES 
drop column link;

alter table UPDATES 
add r_id number;


-- not working yet ... trying to find a solution
CREATE OR REPLACE PROCEDURE FINALUPDATECASE(case_id IN VARCHAR2,description IN VARCHAR2,PROGRESS_RATE in number,outcome in varchar2)
is 
BEGIN 

IF (lower(outcome)='unsolved') THEN

UPDATE CASES SET TYPE='Unsolved' where case_id=case_id;
INSERT INTO UNSOLVED_CASES(case_id,reason,limitation) VALUES (case_id,description,PROGRESS_RATE);
DELETE FROM PENDING_CASES WHERE case_id=case_id;


ELSIF (lower(outcome)='solved') THEN
UPDATE CASES SET TYPE='Unsolved' where case_id=case_id;
INSERT INTO SOLVED_CASES(case_id,SOLVED_DATE,CHALLENGES) VALUES (case_id,sysdate,description);
DELETE FROM PENDING_CASES WHERE case_id=case_id;

END IF;
commit;
END;
/