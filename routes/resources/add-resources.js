require('dotenv').config();
const router = require('express').Router();
const bcrypt= require('bcryptjs');
const jwt = require('jsonwebtoken');


const DB_auth = require('../../Database/DB-auth-api');
const DB_detective = require('../../Database/DB-detective-api');
const DB_case = require('../../Database/DB-case-api');
const DB_resources = require('../../Database/DB-resources-api');



router.get('/add-resources', (req, res) => {

    const whoNowUser=req.session.isLoggedIn;
    let result;
    result = await DB_auth.getLoginInfoByEmail(whoNowUser);

    console.log("hereeeee in resource");
    res.render('body/resources/add-resources.ejs', {
        title : 'Sherlocks Eye RESOURCE CONTRIBUTION',
            //body : ['auth/register'],
            user : null,
            curr_user:result[0].USER_ID
            //errors : errors
    })
});

router.post('/add-resources/:user', async (req, res) => {
    const whoNowUser=req.session.isLoggedIn;
    let result;
    result = await DB_auth.getLoginInfoByEmail(whoNowUser);
    console.log("ok in post addResources Post  route");
    console.log(req.body);
    let gotResource= 
    {
            title: req.body.title,
            desc: req.body.description,
            link: req.body.uploadedFile,
            case_id:req.body.caseId
    
    }
    let resResult;
    resResult=await DB_resources.addResources(result[0].USER_ID,gotResource.case_id,gotResource.title,gotResource.link,gotResource.desc);//addCase(req.body, result[0].USER_ID);
    res.redirect('/api/user/userID/'+result[0].USER_ID);

    
});