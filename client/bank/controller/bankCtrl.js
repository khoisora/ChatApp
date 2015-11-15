angular.module('demo').controller('BankCtrl', ['$scope', '$meteor', function($scope, $meteor){
	$scope.user = $meteor.object(Meteor.users, Meteor.userId()).subscribe('users');
}]);