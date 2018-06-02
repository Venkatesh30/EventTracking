let connection = require("connection");
let Events = require("./modalDefination").Events;
module.exports = {
    create:async function(req){
        var notification = req.body,
            scheduleTime = new Date(notification.date);
        scheduleTime.setHours(notification.hours);
        scheduleTime.setMinutes(notification.minutes);
        let timestamp = scheduleTime.getTime();
        var data = await Events.create({
            USER_ID:req.user.ID,
            TITLE:notification.title,
            DESCRIPTION:notification.description,
            SCHEDULED_TIME:timestamp
        });
        return data;
    },
    list:async function(req){
        let userId = req.user.ID;
        let data = await Events.findAll({attributes:[['TITLE','title'],['DESCRIPTION','description'],['SCHEDULED_TIME','scheduledTime']],
            where:{
                USER_ID:userId
            }
        })
        return data;
    }
}