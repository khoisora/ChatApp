angular.module('demo').controller('ChatCtrl', ['$scope', '$meteor', '$uibModal',  function ($scope, $meteor, $uibModal) {
//SETUP
    $scope.showSucceeded = false;
    $scope.showFailed = false;

    $scope.users = $meteor.collection(function(){
        return Meteor.users.find(
            {'_id': {$ne: Meteor.userId()}}
        )}
    );

    $meteor.subscribe('users').then(function(subscriptionHandle){
        $scope.toUserId = $scope.users[0]._id;
        $scope.toUser = $scope.users[0];
    });

    //////////////
    $meteor.subscribe('messages');

    /////////////change to user
    $scope.switchToUser = function(userId){
        $scope.toUserId = userId;
        $scope.toUser = $scope.$meteorObject(Meteor.users, userId, false);
    }

    ////////////
    $meteor.autorun($scope, function() {
        $scope.messages = $meteor.collection(function(){
            return Messages.find({
                $or:[
                    {$and:[
                        {from: $scope.getReactively('toUserId')},
                        {to: Meteor.userId()}]
                    },
                    {$and:[
                        {from: Meteor.userId()},
                        {to: $scope.getReactively('toUserId')}]}
                ]
            },{
                sort: {ts: 1}
            });
        })
    });

    /////////////
    $scope.messageCollection = $meteor.collection(Messages);
    $scope.sendMessage = function () {
        if($scope.message === '') return;

        $scope.messageCollection.save(
            {   from: Meteor.userId(),
                to: $scope.toUserId,
                sender: Meteor.user().username,
                message: $scope.message,
                ts: new Date().toISOString()
            })
        ;


        $scope.message = '';
    }

    ////////////////
    $scope.sendMoneyTo = function (user) {
      console.log("chay");
      if(!Meteor.user()) return;

    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'client/chat/view/modal.ng.html',
      controller: 'ModalCtrl',
      resolve: {
        toUser: function () {
          return user;
        }
      }
    });



  modalInstance.result.then(function (result) {
      var transactionResult = performTransaction(Meteor.user(), result.toUser, result.amt);
      if(transactionResult){

          $scope.showSucceeded = true;
         setTimeout(function () 
         {
           $scope.$apply(function()
           {
             $scope.showSucceeded = false;
           });
         }, 4000);

      }else{

          $scope.showFailed = true;
           setTimeout(function () 
           {
             $scope.$apply(function()
             {
               $scope.showFailed = false;
             });
           }, 4000);

      }
      //$scope.selected = selectedItem;
    });
  };

  var performTransaction = function(fromUser, toUser, amt){
    //var meteorFromUser = $scope.$meteorObject(Meteor.users, fromUser._id);
    //var meteorToUser = $scope.$meteorObject(Meteor.users, toUser._id);

    if(parseFloat(fromUser.balance) < parseFloat(amt)) return false;
    /*console.log("from user1 " + fromUser.balance);    
    console.log("to user1 "  +toUser.balance);*/
    fromUser.balance =  parseFloat(fromUser.balance) - parseFloat(amt);
    toUser.balance = parseFloat(toUser.balance) + parseFloat(amt);

    Meteor.users.update({_id: Meteor.userId()},{$set:{balance: fromUser.balance}});
    Meteor.users.update({_id: toUser._id},{$set:{balance: toUser.balance}});

    /*var meteorFromUser = $scope.$meteorObject(Meteor.users, fromUser._id);
    var meteorToUser = $scope.$meteorObject(Meteor.users, toUser._id);
    console.log("from user2 " + meteorFromUser.balance);    
    console.log("to user2 "  +meteorToUser.balance);*/
    return true;
  }


}]);

