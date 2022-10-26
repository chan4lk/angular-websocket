angular
  .module('app.home')
  .controller('HomeController', HomeController)

angular
  .module('app.home')
  .component('home', {
    templateUrl: 'home/home.view.html',
    controller: 'HomeController',
    controllerAs: 'vm'
  });

function HomeController($rootScope) {
  "ngInject";
  var vm = this;

  vm.message = "Welcome to the home page";

  var ws = new WebSocket('ws://localhost:40510');

    // event emmited when connected
    ws.onopen = function () {
        console.log('websocket is connected ...')

        // sending a send event to websocket server
        ws.send('connected')
    }

    // event emmited when receiving message 
    ws.onmessage = function (ev) {
      $rootScope.$watch('updateData', function(data) {
        console.log(data);
        $rootScope.emit('updateData', ev);
      });

      $rootScope.$emit('updateData', ev);

      console.log(ev);
    }

}