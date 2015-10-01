angular.module('starter.controllers', [])

appcore.controller('AppCtrl', function($scope, $ionicModal, $timeout,$firebaseAuth,$state, $location) {
    

    
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };
  
  
  // Perform the login action when the user submits the login form
    $scope.dologin = function(username, password) {
   
    var ref = new Firebase("https://mosqseltest.firebaseio.com");
     ref.unauth();
    ref.authWithPassword({
    email : username,
    password : password
    }, function(error, authData) {
    if (error) {
    alert(error);
    } else {
    alert("Success! Redirecting...");
    $scope.closeLogin();
    
    }
    });
        
 		
	}
  
      $scope.register = function(username, password) {
          $state.go("register");
          
      
      }
    
  
  
})

appcore.controller("LoginController", function($scope, $firebaseAuth, $location,$state) {
 
    $scope.dologin = function(username, password) {
        if(username === undefined && password === undefined ){
        alert("Please fill up the details");
        }else{
        
    
    var ref = new Firebase("https://mosqseltest.firebaseio.com");
    
    ref.authWithPassword({
    email : username,
    password : password
    }, function(error, authData) {
    if (error) {
    alert(error);
    console.log("Login Failed!", error);
    } else {
    alert("Success!");
    $state.go("app.events");
    
    }
    }, {
  remember: "sessionOnly"
}
    );
        }


        
	}
 
    $scope.register = function(username, password) {
$state.go("register");
        }
    
        $scope.resetpassword = function(username) {
$state.go("resetpassword");
        }
 
    
    
});

appcore.controller("RegisterController", function($scope, $firebaseAuth, $location,$state,$ionicPopup) {
 
    $scope.back = function() {
    $state.go("login");
    }

       
    
    $scope.register = function(username, password) {
        
        if(username === undefined && password === undefined ){
        alert("Please fill up the details");
        }else{
  
        var ref = new Firebase("https://mosqseltest.firebaseio.com");

        var fbAuth = $firebaseAuth(ref);
        fbAuth.$createUser(username, password).then(function() {
            return fbAuth.$authWithPassword({
                email: username,
                password: password
            });
        }).then(function(authData) {
            ref.child("users").child(authData.uid).set(authData);
            alert("Successfully registered "+username+ " as user");
            $state.go("app.events");
            
            

            
        }).catch(function(error) {
            alert("ERROR " + error);
        });
        
        }
    }
    
     $scope.registerMosque = function(username, password, keyword) {
  
        if(keyword === "quemosque"){
        
        var ref = new Firebase("https://mosqseltest.firebaseio.com");

        var fbAuth = $firebaseAuth(ref);
        fbAuth.$createUser(username, password).then(function() {
            return fbAuth.$authWithPassword({
                email: username,
                password: password
            });
        }).then(function(authData) {
            ref.child("users").child(authData.uid).set(authData);
            alert("Success");
            $state.go("app.events");
            
            
        // add extra information to user    
            var hopperRef = ref.child("users").child(authData.uid);
            hopperRef.update({
            "usertype": "mosque"
            });
            
            alert("Successfully assigned " + username +" as Mosque Account"  );
             
            
        }).catch(function(error) {
            alert("ERROR " + error);
        });
        
        
        
        }else{alert("Wrong Keyword.")} 
         
        
        
        
   
        
    }
 
    
    
});

appcore.controller("ResetPasswordController", function($scope, $firebaseAuth, $location,$state) {
 
    $scope.back = function() {
    $state.go("login");
    }

 
    $scope.register = function(username) {
  
        var ref = new Firebase("https://mosqseltest.firebaseio.com");

        
ref.resetPassword({
    email : username
  }, function(error) {
  if (error === null) {
    alert("Password reset email sent successfully");
  } else {
    alert("Error sending password reset email:"+ error);
  }
});
        
        
   
        
    }
 
    
    
});






appcore.controller('SearchCtrl', function($scope, $stateParams) {
    $scope.data = {};
    $scope.mosques = [
    { name: 'Masjid Sultan Salahuddin Abdul Aziz Shah',
      city: 'Shah Alam',
      district: 'Petaling', 
      address: 'No.2, Persiaran Masjid Seksyen 10, 40000',  
      phonenum: '03-55199988',
      faxnum:'03-55101317',
    },
    { name: 'Masjid Al-Ehsan Bandar Kinrara',      
      city:'Petaling',
      district: 'Petaling', 
      address: 'Bandar Kinrara 4',  
      phonenum: '012-6664952',
    },
    { name: 'Masjid Meranti',
      city:'Puchong',
      district: 'Sepang', 
      address: 'Masjid Meranti Batu 9, Kampung Pulau Meranti',  
      phonenum: '013-2716394',
      faxnum:'03-80684008',
    },   
    { name: 'Masjid Ar-Rahman',
      city: 'Ijok',
      district: 'Kuala Selangor', 
      address: 'Kampung Bukit Badong, 45600',
    },
  ];
  
    $scope.clearSearch = function() {
    $scope.data.searchQuery = '';
  };
 
})


appcore.controller('EventsCtrl', function($scope, $firebase, $ionicModal, $timeout, $location, $ionicPopup, $firebaseAuth) {
    
  $scope.doRefresh = function() {
    
    
    $timeout( function() {
      //simulate async response
     
      //Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    
    }, 1000);
      
  };
    var ref = new Firebase("https://mosqseltest.firebaseio.com/events");

    // create an AngularFire reference to the data

    var authData = ref.getAuth();
    var sync = $firebase(ref);
    // download the data into a local object
    var syncObject = sync.$asObject();
    syncObject.$bindTo($scope, "data");
    
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/createEvent.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.addEvent = function() {
      var confirmPopup = $ionicPopup.confirm({
       title: 'Mosque Account?',
       template: 'This add features is only for Mosque Account. Proceed?'
     });
     confirmPopup.then(function(res) {
       if(res) {
         $scope.modal.show();
       } else {
         
       }
     });
    
  };
    
    
    
    $scope.add = function(eventName, eventDetails, eventLocation, eventDate, eventTime){
     
        
    var ref = new Firebase("https://mosqseltest.firebaseio.com");

    var eventsRef = ref.child("events");
        
    
        
    eventsRef.push({
    name  : eventName,
    details : eventDetails,
    location: eventLocation,
    date: eventDate.toDateString(),
    time :eventTime.toLocaleTimeString()
    });
        

    $scope.modal.hide();
        
        
    }
    
    $scope.deleteEvent = function(key){
        
        var confirmPopup = $ionicPopup.confirm({
       title: 'Delete Event?',
       template: 'This cannot be undo.Proceed'
     });
     confirmPopup.then(function(res) {
       if(res) {
           var itemRef = new Firebase("https://mosqseltest.firebaseio.com/events/"+key);
           itemRef.remove();
        
       } else {
         
       }
     });
     
    
        
   
        
    }

        
  $scope.checkmosque = function() {
        
        var result1;
        var ref = new Firebase("https://mosqseltest.firebaseio.com");
          
        
      
      ref.onAuth(function(authData) {
        if (authData) {
        
        var amOnline = new Firebase('https://mosqseltest.firebaseio.com/users/'+authData.uid+'/usertype').on("value", function(snapshot) {
        
        if(snapshot.val() !== null)
        {
        
        result1 = true;
        
        }
      });
      
       
      
  } else {
    console.log("Client unauthenticated.");
    
  }
});
          
      
      
 
     return result1;
  };
    
    
    



});

appcore.controller('AnnouncementsCtrl', function($scope, $firebase, $ionicModal, $timeout, $location, $ionicPopup) {
    
      $scope.doRefresh = function() {
    
    
    $timeout( function() {
      //simulate async response
     
      //Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    
    }, 1000);
      
  };
    
    var ref = new Firebase("https://mosqseltest.firebaseio.com/announcements");

    // create an AngularFire reference to the data
   
    var authData = ref.getAuth();
    var sync = $firebase(ref);
    // download the data into a local object
    var syncObject = sync.$asObject();
    syncObject.$bindTo($scope, "data");
    
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/createAnnouncement.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.addEvent = function() {
      var confirmPopup = $ionicPopup.confirm({
       title: 'Mosque Account?',
       template: 'This add features is only for Mosque Account. Proceed?'
     });
     confirmPopup.then(function(res) {
       if(res) {
         $scope.modal.show();
       } else {
         
       }
     });
    
  };
    
    
    $scope.add = function(eventName, eventDetails, eventAuthor){
    var ref = new Firebase("https://mosqseltest.firebaseio.com");

    var announcementsRef = ref.child("announcements");
        
            
    announcementsRef.push({
    name  : eventName,
    details : eventDetails,
    author : eventAuthor
    
    });
        

   
     $scope.modal.hide();
        
        
    }
    
    $scope.deleteEvent = function(key){
     
        var confirmPopup = $ionicPopup.confirm({
       title: 'Delete Announcement?',
       template: 'This cannot be undo.Proceed'
     });
     confirmPopup.then(function(res) {
       if(res) {
            var itemRef = new Firebase("https://mosqseltest.firebaseio.com/announcements/"+key);
            
           itemRef.remove();
        
       } else {
         
       }
     });
        
   

        
        
    };
    
      $scope.checkmosque = function() {
        
        var result1;
        var ref = new Firebase("https://mosqseltest.firebaseio.com");
          
        
      
      ref.onAuth(function(authData) {
        if (authData) {
        
        var amOnline = new Firebase('https://mosqseltest.firebaseio.com/users/'+authData.uid+'/usertype').on("value", function(snapshot) {
        
        if(snapshot.val() !== null)
        {
        
        result1 = true;
       
        }
      });
      
       
      
  } else {
    console.log("Client unauthenticated.");
    
  }
});
          
      
      
    
     return result1;
  };


    
    
    
    
    
    
    

});


appcore.controller('NewsCtrl', function($scope, $firebase, $ionicModal, $timeout, $location,  $ionicPopup) {
    
      $scope.doRefresh = function() {
    
    
    $timeout( function() {
      //simulate async response
     
      //Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    
    }, 1000);
      
  };
    
    var ref = new Firebase("https://mosqseltest.firebaseio.com/news");

    // create an AngularFire reference to the data
    
    var authData = ref.getAuth();
    var sync = $firebase(ref);
    // download the data into a local object
    var syncObject = sync.$asObject();
    syncObject.$bindTo($scope, "data");
    
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/createNews.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.addEvent = function() {
      var confirmPopup = $ionicPopup.confirm({
       title: 'Mosque Account?',
       template: 'This add features is only for Mosque Account. Proceed?'
     });
     confirmPopup.then(function(res) {
       if(res) {
         $scope.modal.show();
       } else {
         
       }
     });
    
  };
    
    
    $scope.add = function(eventName, eventDetails, eventDate, eventAuthor){
    var ref = new Firebase("https://mosqseltest.firebaseio.com");

    var newsRef = ref.child("news");
        
            
    newsRef.push({
    name  : eventName,
    details : eventDetails,
    date : eventDate.toDateString(),
    author : eventAuthor
    
    });
        

  
     $scope.modal.hide();
        
        
    }
    
    
    
    $scope.deleteEvent = function(key){
        
        
       
     
        var confirmPopup = $ionicPopup.confirm({
       title: 'Delete News?',
       template: 'This cannot be undo.Proceed'
     });
     confirmPopup.then(function(res) {
       if(res) {
            var itemRef = new Firebase("https://mosqseltest.firebaseio.com/news/"+key);
              itemRef.remove();
        
       } else {
         
       }
     });
  

        
    };
    
    
      $scope.checkmosque = function() {
        
        var result1;
        var ref = new Firebase("https://mosqseltest.firebaseio.com");
          
        
      
      ref.onAuth(function(authData) {
        if (authData) {
        
        var amOnline = new Firebase('https://mosqseltest.firebaseio.com/users/'+authData.uid+'/usertype').on("value", function(snapshot) {
        
        if(snapshot.val() !== null)
        {
       
        result1 = true;
 
        }
      });
      
       
      
  } else {
    console.log("Client unauthenticated.");
    
  }
});
          
      
      

     return result1;
  };

    
    
    
    
    
    


});