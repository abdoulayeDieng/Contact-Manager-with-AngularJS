var contactApp=angular.module('contactApp', []);

contactApp.controller('contactCtrl', ['$scope', function($scope){
		if(sessionStorage.getItem('contacts')){
			$scope.contacts=JSON.parse(sessionStorage.getItem('contacts'));
		}
		else{
			$scope.contacts = [
				{ id : 1,
		         nom : 'Dia',
		         prenom : 'Aliou',
		         phone : '77 645 21 53',
		         email : 'aliou.dia@server.sn'
			   },
			   { id : 2,
		         nom : 'Sané',
		         prenom : 'Khady',
		         phone : '76 644 12 35',
		         email : 'khady.sow@server.sn'
			   },
			   { id : 3,
		         nom : 'Diouf',
		         prenom : 'Diegane',
		         phone : '78 456 78 53',
		         email : 'diegane.diouf@server.sn'
			   }
			];
			sessionStorage.setItem("contacts",JSON.stringify($scope.contacts));
		}

		$scope.add_view_show = false;
		$scope.details_view_show = false;

		$scope.add_view = function(){
			$scope.add_view_show = true;
		}

		$scope.add = function() {    	
	    	$scope.contact.id = Math.random();

			if(sessionStorage.getItem("contacts")!==null){
			    $scope.contacts = JSON.parse(sessionStorage.getItem("contacts"));
				$scope.contacts.push($scope.contact);
			}
			else{
				$scope.contacts=[$scope.contact];
			}
			sessionStorage.setItem("contacts",JSON.stringify($scope.contacts));

			$scope.add_view_show = false;
	    }

	$scope.details = function(id) {
	    $scope.contacts = JSON.parse(sessionStorage.getItem('contacts'));
	    
	    for(let i in $scope.contacts){
	    	if($scope.contacts[i].id==id){
			    $scope.new_contact = $scope.contacts[i];
	    	}
	    }

	    $scope.selected_id = id;

	    $scope.details_view_show = true;   
		$scope.view_show = false;
	}

	$scope.update = function() {	
		$scope.contacts = JSON.parse(sessionStorage.getItem('contacts'));
	    
	    for(let i in $scope.contacts){
	    	if($scope.contacts[i].id == $scope.selected_id){
			    $scope.contacts[i].nom = $scope.new_contact.nom;
			    $scope.contacts[i].prenom = $scope.new_contact.prenom;
			    $scope.contacts[i].phone = $scope.new_contact.phone;
			    $scope.contacts[i].email = $scope.new_contact.email;
	    	}
	    }
	    sessionStorage.setItem("contacts",JSON.stringify($scope.contacts));
		
		$scope.details_view_show = false;   
		$scope.view_show = false;
	}

	$scope.remove = function() {
		if (confirm("Souhaitez-vous vraiment supprimer ce contact ?")){
			$scope.contacts = JSON.parse(sessionStorage.getItem('contacts'));
			
			$scope.contacts = $scope.contacts.filter(function(contact) {
				return contact.id != $scope.selected_id;
			});
			
			sessionStorage.setItem("contacts",JSON.stringify($scope.contacts));
		}

		$scope.details_view_show = false;   
		$scope.view_show = false;
	}	
}]);