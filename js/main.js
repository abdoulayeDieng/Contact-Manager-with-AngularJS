var contactApp=angular.module('contactApp', []);

contactApp.service('contactService', function() {
	this.init = function(){
		if(sessionStorage.getItem('contacts')){
			this.contacts=JSON.parse(sessionStorage.getItem('contacts'));
		}
		else{
			this.contacts = [
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
			sessionStorage.setItem("contacts",JSON.stringify(this.contacts));
		}
	}
    
    this.add = function(contact) {    	
    	contact.id = Math.random();

		if(sessionStorage.getItem("contacts")!==null){
		    this.contacts = JSON.parse(sessionStorage.getItem("contacts"));
			this.contacts.push(contact);
		}
		else{
			this.contacts=[contact];
		}
		sessionStorage.setItem("contacts",JSON.stringify(this.contacts));
    }

    this.selected_id = null;
	this.details = function(id) {
	    this.contacts = JSON.parse(sessionStorage.getItem('contacts'));
	    
	    for(let i in this.contacts){
	    	if(this.contacts[i].id==id){
			    this.new_contact = this.contacts[i];
	    	}
	    }

	    this.selected_id = id;
	}

	this.update = function() {	
		this.contacts = JSON.parse(sessionStorage.getItem('contacts'));
	    
	    for(let i in this.contacts){
	    	if(this.contacts[i].id == this.selected_id){
			    this.contacts[i].nom = this.new_contact.nom;
			    this.contacts[i].prenom = this.new_contact.prenom;
			    this.contacts[i].phone = this.new_contact.phone;
			    this.contacts[i].email = this.new_contact.email;
	    	}
	    }
	    sessionStorage.setItem("contacts",JSON.stringify(this.contacts));
	}
	
	this.remove = function(id) {
		if (confirm("Souhaitez-vous vraiment supprimer ce contact ?")){
			this.contacts = JSON.parse(sessionStorage.getItem('contacts'));
			
			this.contacts = this.contacts.filter(function(contac) {
				return contac.id !== id;
			});
			
			sessionStorage.setItem("contacts",JSON.stringify(this.contacts));
		}
	}
});

contactApp.controller('contact2Ctrl',['$scope','contactService',function($scope,contactService){
	$scope.contactService = contactService;
	$scope.init = contactService.init;
	$scope.init();
	
	$scope.add_view_show = false;
    $scope.details_view_show = false;
	
	$scope.add_view = function(){
			$scope.add_view_show = true;
		}
	
	$scope.add = function(contact) {
		contactService.add(contact);
		$scope.add_view_show = false;
		$scope.init();
	} 
	
	$scope.details = function(id) {
		contactService.details(id);
		$scope.details_view_show = true;   
		$scope.view_show = false;
	} 

	$scope.update = function() {
		contactService.update();
		$scope.details_view_show = false;   
		$scope.view_show = false;
		$scope.init();
	}

	$scope.remove = function(id) {
		contactService.remove(id);
		$scope.details_view_show = false;   
		$scope.view_show = false;
		$scope.init();
	}
}]);