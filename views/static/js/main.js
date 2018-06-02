(function(){
    angular.module("eventTracker",[],function(){
       // debugger;
    }).controller("MainController",["$scope",function($scope){

    }]).controller("SendNotification",["$scope","$http",function($scope,$http){
        $scope.pageData = {
            showNotificationForm:false,
            showLoader:true
        }
        $scope.events = [];
        function getList(){
            $scope.pageData.showNotificationForm = false;
            $http({
                method:"GET",
                url:"/event/list",
                headers: {
                    'Accept': "application/json"
                }
            }).then(function(data){
                if(data.data){
                    $scope.events = data.data;
                }
                $scope.pageData.showLoader = false;
            })
        }
        $scope.notification = {
            title:"vikash",
            description:"sharma",
            date:new Date(),
            time:new Date()
        };
        $scope.submit = function(){
            var notification = $scope.notification;
            $http({
                method: 'POST',
                url: '/notification/api/schedule',
                headers: {
                  'Content-Type': "application/json"
                },
                data:{
                    title:notification.title,
                    description:notification.description,
                    date:notification.date.toDateString(),
                    hours:notification.time.getHours(),
                    minutes:notification.time.getMinutes()
                } 
            }).then(function(){
                getList();
            })
        }
        getList();

    }])
    angular.bootstrap(document, ['eventTracker']);
})();