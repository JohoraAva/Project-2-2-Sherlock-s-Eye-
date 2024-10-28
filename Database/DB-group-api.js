const Database = require('../database');
const database = new Database();

async function createGroup(group){
    const sql = `BEGIN
                ADD_GROUP(:name,:description,:admin_id,:cover_photo,:date_of_creation);
                END;`;
    
    const binds={
        name : group.name,
        description : group.description,
        admin_id : group.admin_id,
        cover_photo: group.cover_photo,
        date_of_creation:group.date_of_creation
    }
    await database.execute(sql, binds, database.options);
    return ;
    
}

async function updateGroup(group){
    const sql =`BEGIN
                    UPDATE_GROUP(:group_name, :description, :cover_photo);
                end;`;

    const binds={
        name : group.name,
        description : group.description,
        cover_photo: group.cover_photo,
        
    }
    return (await database.execute(sql, binds)).outBinds;
}

async function updateGroupAdmin(name ,admin_id, new_admin) {
    const sql =`BEGIN
                UPDATE_ADMIN(:name ,:admin_id, :new_admin);
                end;`;

    const binds={
        name:name,
        admin_id : admin_id,
        new_admin:new_admin
    }
    return (await database.execute(sql, binds)).outBinds;
}

async function deleteGroup(name,admin_id){
    const sql = `DELETE FROM GROUPS WHERE name=:name AND admin_id=:admin_id`;
    const binds = {
        name:name,
        admin_id:admin_id
    }
    await database.execute(sql, binds);
    return binds;
}

async function getGroups(){
    const sql = `SELECT *
                FROM Groups  NATURAL JOIN  GROUP_MEMBERS  `;
    const binds = {

    }
    const result = (await database.execute(sql, binds)).rows;
    return result;
}

async function getGroupsByUserId(user_id){
    const sql = `SELECT *
                FROM Groups g NATURAL JOIN  GROUP_MEMBERS gm 
                where user_id=:user_id`;
    const binds = {
        user_id : user_id
    }
    const result = (await database.execute(sql, binds)).rows;
    return result;
}

// async function getSuggestedGroups(user_id){
//     const sql = `SELECT G.*, IS_GROUP_MEMBER(G.GROUP_ID, :user_id) IS_GROUP_MEMBER,
//                     IS_PENDING_MEMBER(G.GROUP_ID, :user_id) IS_PENDING_MEMBER,
//                 (SELECT COUNT(*) FROM GROUP_MEMBERS GM WHERE GM.GROUP_ID = G.GROUP_ID) GROUP_MEMBER_COUNT,
//                 (SELECT COUNT(*) FROM GROUP_MEMBERS GM JOIN FOLLOWS F ON GM.USER_ID = F.FOLLOWING
//                             WHERE F.FOLLOWER= :user_id AND GM.GROUP_ID = G.GROUP_ID) GROUP_MEMBER_FOLLOWING_COUNT
//                 FROM GROUPS G
//                 WHERE IS_GROUP_MEMBER(G.GROUP_ID, :user_id) = 'NO'
//                 ORDER BY GROUP_MEMBER_COUNT+2*GROUP_MEMBER_FOLLOWING_COUNT DESC`;
//     const binds = {
//         user_id : user_id
//     }
//     const result = (await database.execute(sql, binds)).rows;
//     return result;
// }


// async function getPendingGroupsByUserId(user_id){
//     const sql = `SELECT G.*,IS_GROUP_MEMBER(G.GROUP_ID, :user_id) IS_GROUP_MEMBER,
//                     IS_PENDING_MEMBER(G.GROUP_ID, :user_id) IS_PENDING_MEMBER,
//                     (SELECT COUNT(*) FROM GROUP_MEMBERS GM WHERE GM.GROUP_ID = G.GROUP_ID) GROUP_MEMBER_COUNT
//                 FROM GROUPS G JOIN PENDING_MEMBERS PM ON G.GROUP_ID = PM.GROUP_ID 
//                 WHERE PM.USER_ID = :user_id`;
//     const binds = {
//         user_id : user_id
//     }
//     const result = (await database.execute(sql, binds)).rows;
//     return result;
// }

async function getGroupsByAdminId(admin_id){
    const sql = `SELECT *
                FROM Groups g NATURAL JOIN  GROUP_MEMBERS gm 
                where admin_id=:admin_id`;
    const binds = {
        admin_id : admin_id
    }
    const result = (await database.execute(sql, binds)).rows;
    return result;
}

// async function getGroup(group_id, user_id){
//     const sql = `SELECT G.*, IS_GROUP_MEMBER(G.GROUP_ID, :user_id) IS_GROUP_MEMBER,
//                         IS_PENDING_MEMBER(G.GROUP_ID, :user_id) IS_PENDING_MEMBER,
//                     ( SELECT COUNT(*) FROM GROUP_MEMBERS GM WHERE GM.GROUP_ID = G.GROUP_ID) GROUP_MEMBER_COUNT
//                 FROM GROUPS G WHERE G.GROUP_ID = :group_id`;
//     const binds = {
        
//         group_id : group_id,
//         user_id : user_id
//     }
//     const result = (await database.execute(sql, binds)).rows;
//     return result[0];
// }

// async function searchGroups(user_id, str){
//     const sql = `SELECT G.*, IS_GROUP_MEMBER(G.GROUP_ID, :user_id) IS_GROUP_MEMBER,
//                         IS_PENDING_MEMBER(G.GROUP_ID, :user_id) IS_PENDING_MEMBER,
//                     (SELECT COUNT(*) FROM GROUP_MEMBERS GM WHERE GM.GROUP_ID = G.GROUP_ID) GROUP_MEMBER_COUNT
//                 FROM GROUPS G
//                 WHERE UPPER(G.GROUP_NAME) LIKE UPPER('%'||:str||'%')
//                 ORDER BY GROUP_MEMBER_COUNT DESC`;
//     const binds = {
//         user_id : user_id,
//         str : str
//     }
//     const result = (await database.execute(sql, binds)).rows;
//     return result;
// }

module.exports = {
    createGroup,
    updateGroup,
    updateGroupAdmin,
    deleteGroup,
    getGroups,
    getGroupsByUserId,
    getGroupsByAdminId,
}