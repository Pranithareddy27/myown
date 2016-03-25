/**
 * 
 */
var app=angular.module('app' , ['ngRoute'])

.config(function($routeProvider) {
        $routeProvider
            .when('/start', {
           
            	templateUrl : 'start.html',
                controller  : 'startcontrol'
            })
            
            .when('/index', {
                templateUrl : 'index.html',
                controller  : 'customerscontrol'
            })
            
            .when('/view/:id', {
            
            	templateUrl : 'view.html',
                controller  : 'view'
            })
            
          .when('/addcustomer', {
                templateUrl : 'addcustomer.html',
                controller  : 'customercontrol'
            })  
              
            
    })
    
    
    app.controller('startcontrol',function($scope){
    	
    })
    
    app.controller('customerscontrol', [ '$scope', '$http','$rootScope', function($scope, $http,$rootScope) {
		$scope.title = 'List of Customers';

		$http({
			
			method : 'GET',
			url : 'customers'
		}).then(function(response) {
			$rootScope.customers = response.data;
		});
	} 
       ])

app.controller('customercontrol', [ '$scope', '$http','$rootScope', function($scope, $http,$rootScope) {
		       $scope.msg = 'Add new Customer!';
		       $rootScope.customer = {};
		       $scope.addEntry=function(){
		    	   alert('entered');
		       }
		
		$scope.saveCustomer = function(){
			//Validation
			
			
			$http({
				    method: 'POST',
				    url : 'savecustomer',
				    data : $rootScope.customer
			     }).then(function(response){
				     if(response.data.status){
					        alert('Customer Added Successfully!');
					        $rootScope.customer = {};
				  }  
				     else {
					        alert('Customer Addition Failed!');
				}
			});
		};

	} ]);

     app.controller('view',['$scope','$rootScope','$routeParams',function($scope,$rootScope,$routeParams){
	          $scope.index=$routeParams.id;
              $scope.a=$rootScope.customers[$routeParams.id];
}])




