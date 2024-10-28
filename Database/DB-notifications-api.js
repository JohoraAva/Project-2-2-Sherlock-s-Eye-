const res = require('express/lib/response');
const Database = require('../database');
const database = new Database();

async function getUnseenNotificationsByDetectiveId(user_id){
    const sql = `SELECT * FROM NOTIFICATIONS WHERE detective_id = :user_id AND upper(seen) = 'NO'
                        ORDER BY noti_date DESC`;
    
    const binds={
        user_id : user_id
    }
    let result = (await database.execute(sql, binds)).rows;
    return result;
}

async function getUnseenNotificationsByClientId(user_id){
    const sql = `SELECT * FROM NOTIFICATIONS WHERE client_id = :user_id AND upper(seen) = 'NO'
                        ORDER BY noti_date DESC`;
    
    const binds={
        user_id : user_id
    }
    let result = (await database.execute(sql, binds)).rows;
    return result;
}


async function updateUnseenNotifications(user_id,user_type){
    const sql = `BEGIN 
                SETSEENNOTI(user_id,user_type);
                END;`;
    
    const binds={
        user_id : user_id,
        user_type:user_type
    }
    let result = (await database.execute(sql, binds)).rows;
    return result;
}

async function getAllNotificationsByDetectiveId(user_id){

    const sql = `SELECT * FROM NOTIFICATIONS WHERE detective_id = :user_id
                ORDER BY noti_date  DESC`;
    
    
    const binds={
        user_id : user_id
    }
    let result = (await database.execute(sql, binds)).rows;
    return result;
}

async function getAllNotificationsByClientId(user_id){

    const sql = `SELECT * FROM NOTIFICATIONS WHERE client_id = :user_id
                ORDER BY noti_date  DESC`;
    
    
    const binds={
        user_id : user_id
    }
    let result = (await database.execute(sql, binds)).rows;
    return result;
}

async function getUnseenNotificationCountByDetectiveId(user_id){

    const sql = `SELECT COUNT(*) COUNT FROM NOTIFICATIONS WHERE detective_id= :user_id AND seen = 'NO'`;

    
    const binds={
        user_id : user_id
    }
    let result = (await database.execute(sql, binds)).rows;
    return result[0];
}

async function getUnseenNotificationCountByClientId(user_id){

   
     const sql = `SELECT COUNT(*) COUNT FROM NOTIFICATIONS WHERE client_id = :user_id AND seen = 'NO'`;

    
    const binds={
        user_id : user_id
    }
    let result = (await database.execute(sql, binds)).rows;
    return result[0];
}





module.exports = {
    getUnseenNotificationsByClientId,
    getUnseenNotificationsByDetectiveId,
    getAllNotificationsByClientId,
    getAllNotificationsByDetectiveId,
    getUnseenNotificationCountByDetectiveId,
    getUnseenNotificationCountByClientId,
    updateUnseenNotifications
}