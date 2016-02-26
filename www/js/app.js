// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
<<<<<<< HEAD
angular.module('internkatta', ['ionic','ngRoute','firebase'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs).
    // The reason we default this to hidden is that native apps don't usually show an accessory bar, at
    // least on iOS. It's a dead giveaway that an app is using a Web View. However, it's sometimes
    // useful especially with forms, though we would prefer giving the user a little more room
    // to interact with the app.
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // Set the statusbar to use the default style, tweak this to
      // remove the status bar on iOS or change it to use white instead of dark colors.
=======
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
>>>>>>> 63094f846aefd0ff6963a0274b1641adf0ffd14f
      StatusBar.styleDefault();
    }
  });
})
<<<<<<< HEAD

.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
  $ionicConfigProvider.backButton.text('').previousTitleText(false);//.text('').icon('ion-arrow-left-c');
  $stateProvider
  
     .state('login', {
                url: '/login/:eventId',
                templateUrl: "templates/login.html",
                controller:"loginController"
     })
    .state('home',{
      url:'/home',
      templateUrl:'templates/home.html',
      controller:"HomeController"
    })
    .state('find',{
      url:'/find',
      templateUrl:'templates/find.html',
      controller:'findController'
    })    
    .state('internshiplist',{
      url:'/internshiplist',
      templateUrl:'templates/internshiplist.html',
      controller:'listController'
    })
    .state('findinternship',{
      url:'/findinternship/:ID',
      templateUrl:'templates/findinternship.html',
      controller:'view'
    })
   $urlRouterProvider.otherwise("/login/135");

})


.controller('NavCtrl', function($scope, $ionicSideMenuDelegate) {
  $scope.showMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };
  $scope.showRightMenu = function () {
    $ionicSideMenuDelegate.toggleRight();
  };
  $scope.exitapp = function () {  
    //document.addEventListener("backbutton",onBackKeyDown,false);
    //function onBackKeyDown(){
      //alert('fsd');
      //ionic.Platform.exitApp();
        navigator.notification.confirm(
          'Exit Internkatta ?'
        , function(button) {
              if (button == 2) {
                  navigator.app.exitApp();
              } 
          }
        , 'Exit'
        , 'No,Yes'
        );  
      //}
  };
})

.controller('HomeController', function($scope,$ionicPlatform, $ionicSideMenuDelegate) {
  //alert('hi');loginController
  $ionicPlatform.registerBackButtonAction(function (event) {
    if($state.current.name=="home"){
      navigator.app.exitApp();
    }
    else {
      navigator.app.backHistory();
    }
  }, 100);
})

.controller('loginController', function($scope,$state, $ionicSideMenuDelegate) {
  //alert('hi');
    setTimeout(function () {    
      $state.go('home');// = '#home'; 
    },3800); // 3.8 seconds  
})

.controller('findController', function($scope,$http, $timeout,$state, $ionicModal,$ionicPopover, $ionicSideMenuDelegate) {
  $scope.onPop = function($event) {
    $scope.popover.show($event);
  };
      $http.get("jsondata/city.json")
      .success(function (response) 
      {
       $scope.city = response;
      });  
      $http.get("jsondata/functionalarea.json")
      .success(function (response) 
      {
       $scope.functionalarea = response;
      });  
      $http.get("jsondata/category.json")
      .success(function (response) 
      {
       $scope.category = response;
      });  

      $scope.frm = {};

      $scope.findInternss = function($param){
        var optionsCSV = '';
        $scope.category.forEach(function(option) {

          if (option.value) {

            // If this is not the first item
            if (optionsCSV) {
              optionsCSV += ','
            }
            optionsCSV += option.Category_Name;
          }

        })
        // Save the csv to your db (replace alert with your code)
        alert($param.CityName+' '+$param.FunctionalArea+' '+optionsCSV);
        $state.go('internshiplist');
            /*var request = $http({
                method: "post",
                url: "php/findIntern.php",
                data: {
                    CityName: $param.CityName,
                    FunctionalArea: $param.FunctionalArea,
                    options : optionsCSV
                },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
            /* Check whether the HTTP Request is Successfull or not. *
            request.success(function (data) {
                $scope.message = "From PHP file : "+data;
                //window.location.href('findinternshipresult.html');
            });        
            $log.info($param);
            $http.post('php/findIntern.php',{'city':$param.city,'selectedArea':$param.selectedArea,'Category_Name':optionsCSV})
            .success(function(data){
              alert('success'+$param.city);
            })
            .error(function(err){
              alert('failure');
            });*/
      }
})

.controller('listController', ['$scope','$firebaseArray','$ionicSideMenuDelegate', function($scope,$firebaseArray,$ionicSideMenuDelegate) {
      console.log("Home Controller");

    var city = "1";
    var ref = new Firebase("https://devintern.firebaseio.com/internships");
    
    $scope.InternshipList = $firebaseArray(ref);
    //$scope.InternshipList = $firebaseArray(ref.orderByChild('CityID').equalTo(city) && ref.orderByChild('CategoryID').equalTo(city));

    
    console.log($scope.InternshipList);
    console.log($firebaseArray(ref).length);
    
    //$scope.Internships = $scope.InternshipList.length;

   $scope.Internships = 10;
  


}])
.controller('view',['$scope','$ionicModal','$stateParams','$ionicSideMenuDelegate','$firebaseObject', function($scope,$ionicModal,$stateParams, $ionicSideMenuDelegate,$firebaseObject) {
  
//alert('hi view '+$stateParams.InternshipID);
  console.log($stateParams.ID);
    
    $scope.getID = $stateParams.ID ;
    var ref = new Firebase("https://devintern.firebaseio.com/internships/"+$scope.getID);
    
    
    var internshipData = $firebaseObject(ref);

    console.log(internshipData);
    internshipData.$bindTo($scope,"InternshipData");
   

}])

.controller('HomeTabCtrl', function($scope) {
}); 




/*angular.module('internkatta.controllers', [])

.controller('NavCtrl', function($scope, $ionicSideMenuDelegate) {
  $scope.showMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };
  $scope.showRightMenu = function () {
    $ionicSideMenuDelegate.toggleRight();
  };
})
.controller('HomeTabCtrl', function($scope) {
})*/
=======
>>>>>>> 63094f846aefd0ff6963a0274b1641adf0ffd14f
