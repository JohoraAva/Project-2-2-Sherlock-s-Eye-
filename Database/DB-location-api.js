const database = require('./database');

async function getDistrictsByDivision(division_name){
    const sql =`SELECT * 
                FROM DIVISIONS  div JOIN DISTRICTS dis
                ON (div.ID=dis.DIVISION_ID) 
                WHERE lower(div.NAME)=lower(:division_name)`;

    const binds={
        division_name:division_name
    }

    return (await database.execute(sql, binds, database.options)).rows;
    
}

async function getUpzillasByDistrict(district_name){
    const sql =`SELECT * 
                FROM UPAZILAS up   JOIN DISTRICTS dis
                ON (up.district_id=dis.ID) 
                WHERE lower(dis.name)=lower(:district_name)`;

    const binds={
        district_name:district_name
    }

    return (await database.execute(sql, binds, database.options)).rows;
    
}



module.exports = {
    getDistrictsByDivision,
    getUpzillasByDistrict
}