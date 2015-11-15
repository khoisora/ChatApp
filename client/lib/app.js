angular.module('demo',['angular-meteor', 'ui.router','angularMoment','luegg.directives', 'ui.bootstrap','ng-context-menu']);

function onReady() {
  angular.bootstrap(document, ['demo'], {
    strictDi: true
  });
}



