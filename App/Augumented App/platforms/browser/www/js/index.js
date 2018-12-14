/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
      //  app.receivedEvent('deviceready');
       // const box=document.getElementById("")
	    // Initialize Firebase
        var config = {
            apiKey: "AIzaSyDyKZRdv0QaYKt7tj4M8wBjKQm2_c1wSvo",
            authDomain: "uxdlab3.firebaseapp.com",
            databaseURL: "https://uxdlab3.firebaseio.com",
            projectId: "uxdlab3",
            storageBucket: "",
            messagingSenderId: "236921610393"
          };
          firebase.initializeApp(config);
          // Initialize Cloud Firestore through Firebase
      
        const bt=document.getElementById("btok");
        bt.addEventListener(
            "click",function(){
                alert("")
                const db = firebase.firestore();
                // Disable deprecated features
                db.settings({
                    timestampsInSnapshots: true
                });
                   // Add a new document with a generated id.
         db.collection("cables").orderBy("sentAt","asc")
        .onSnapshot(function(snapshot) {
            snapshot.docChanges().forEach(function(change) {
                alert(change.type);
              const m=change.doc.data();              
              m.id=change.doc.id;
                if (change.type === "added") {
                   var sceneEl = document.querySelector('a-scene');                  
                   var entity = sceneEl.querySelector('a-entity');
                 
                   entity.setAttribute('material','color:'+m.color );
                   entity.setAttribute('geometry', {
                       primitive: 'box',
                       height: m.height,
                       width: m.width,
                       depth:m.depth,
                    
                     }); 
                   
                }else
                if (change.type === "modified") {
                    console.log("Modified city: ", change.doc.data());
                    var sceneEl = document.querySelector('a-scene');                  
                    var entity = sceneEl.querySelector('a-entity');
                   
                    entity.setAttribute('material','color:'+m.color );
                    entity.setAttribute('geometry', {
                        //primitive: 'box',
                        height: m.height,
                        width: m.width,
                        depth:m.depth
                     
                      });
                    
                }else
                if (change.type === "removed") {
                    console.log("Removed city: ", change.doc.data())
                    const m=change.doc.data()
                    m.id=change.doc.id

                }
            });
        });
               
            }
        )
     
        bt.click();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        //console.log('Received Event: ' + id);
    }
};
