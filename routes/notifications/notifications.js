require('dotenv').config();
const router = require('express').Router();
const bcrypt= require('bcryptjs');
const jwt = require('jsonwebtoken');



const DB_auth = require('../../Database/DB-auth-api');
const DB_notifications = require('../../Database/DB-notifications-api');
//new
router.get('/unseen',verify, async (req,res)=>{  
    const whoNowUser = req.session.isLoggedIn;
    let result,unseenNoti,updateNoti;
    result = await DB_auth.getLoginInfoByEmail(whoNowUser); 
    if((result[0].TYPE).toLowerCase()==='detective')
        unseenNoti = await DB_notifications.getUnseenNotificationsByDetectiveId(result[0].USER_ID);
    else if((result[0].TYPE).toLowerCase()==='client')
        unseenNoti = await DB_notifications.getUnseenNotificationsByClientId(result[0].USER_ID);

    updateNoti=await DB_notifications. updateUnseenNotifications(result[0].USER_ID,result[0].TYPE);
    res.render('layout.ejs', {
        title : 'SEE ALL UNSEEN NOTIFICATIONS',
        body2: ['notifications/unseen_notifications'],
        result:result,
        unseenNoti:unseenNoti,
        updateNoti:updateNoti,
        user:result[0]
    });
});

//all
router.get('/all',verify, async (req,res)=>{   
    const whoNowUser = req.session.isLoggedIn;
    let result,allNoti;
    result = await DB_auth.getLoginInfoByEmail(whoNowUser); 
    if((result[0].TYPE).toLowerCase()==='detective')
        allNoti = await DB_notifications. getAllNotificationsByDetectiveId(result[0].USER_ID);
    else if((result[0].TYPE).toLowerCase()==='client')
        allNoti= await DB_notifications.getAllNotificationsByClientId(result[0].USER_ID);

    

    res.render('layout.ejs', {
        title : 'SEE ALL NOTIFICATIONS',
        body2: ['notifications/all_notifications'],
        result:result,
        allnNoti:allNoti,
        user:result[0]
    });
   
});

//new count
router.get('/count', verify, async (req,res)=>{   
    const whoNowUser = req.session.isLoggedIn;
    let result,countNoti;
    result = await DB_auth.getLoginInfoByEmail(whoNowUser); 
    if((result[0].TYPE).toLowerCase()==='detective')
        countNoti= await DB_notifications.getUnseenNotificationCountByDetectiveId(result[0].USER_ID);
    else if((result[0].TYPE).toLowerCase()==='client')
        countNoti= await DB_notifications.getUnseenNotificationCountByClientId(result[0].USER_ID);

    

    res.render('layout.ejs', {
        title : 'COUNT UNSEEN NOTIFICATIONS',
        body2: ['notifications/count_unseen_notifications'],
        result:result,
        countNoti:countNoti,
        user:result[0]
    });
    
});

module.exports = router;