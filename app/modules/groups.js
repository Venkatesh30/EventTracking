var groups = require("../models/modalDefination").GROUPS;
var groupsAssociation = require("../models/modalDefination").GROUP_ASSOCIATION;
var users = require("../models/modalDefination").USERS;

groupsAssociation.belongsTo(groups,{foreignKey: 'GROUP_ID',targetKey: 'ID'});

module.exports = {
    createGroup : function(options){
        let type = options.type?options.type:'INDIVIDUAL';
        let groupName = options.groupName?options.groupName:'SELF';
        return groups.create({
            NAME:groupName,
            TYPE:type
        })
    },
    createGroupAssociation : function(options){
        if(options.groupId && options.userId){
            return groupsAssociation.create({
                GROUP_ID:options.groupId,
                USER_ID:options.userId
            });
        }
        else{
            return Promise.reject({
                isSuccess : false,
                error : "Empty Parameters"
            })
        }
    },
    getAllUsers:function(req){
        return users.findAll();
    },
    getMyGroups:function(req){
        return groupsAssociation.findAll({
            include : [{
                model: groups,
                attributes:['NAME']
            }],
            where : {
                USER_ID:req.ID
            }
        })
    }
}