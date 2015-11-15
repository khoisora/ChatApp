angular.module('demo').controller('ModalCtrl',['$scope', '$uibModalInstance', 'toUser', function ($scope, $uibModalInstance, toUser) {

  $scope.step = 1;
  $scope.toUser = toUser;

  $scope.next = function(){
    if(isFloat($scope.amt) || !/^\d+$/.test($scope.secuCode)) {
      $scope.error = "Please enter whole number in Amount!";
      return;
    }else if($scope.secuCode !== Meteor.user().secuCode){
      $scope.error = "Security code not match!";
      return;
    }


function isFloat(n) {
    return n === +n && n !== (n|0);
}


    $scope.step = ($scope.step === 1)? 2 : 1;   
    $scope.error = '';
  }

  $scope.back = function(){
    $scope.step = ($scope.step === 1)? 2 : 1;  
  }

  $scope.confirm = function () {
    $uibModalInstance.close({
      amt: $scope.getTotal($scope.amt),
      toUser: $scope.toUser
    });
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

  var range=[100.0,50.0,10.0,1.0];
  var fee = [0.001, 0.003, 0.005, 0.007];

  $scope.getProcessingFee = function(amt){
    var amount = parseFloat(amt);
    for(var i =0; i < fee.length; i++){
      //var compare = parseFloat(range[1]);
      if(amount >= range[i]){
        var finalAmt = amount*fee[i];
        return finalAmt.toFixed(2);
      } 
    }
    return 0;
  }

  $scope.getTotal = function(amt){
    var amount = parseFloat(amt);
    var processingAmt = parseFloat($scope.getProcessingFee(amount));
    var totalAmt = processingAmt + amount;
    return totalAmt.toFixed(2);
  }  

}]);