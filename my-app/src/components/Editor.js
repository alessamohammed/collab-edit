import React, { Component } from "react";
import './Editor.css'; 


class Editor extends Component {
  componentDidMount() {
    //// Initialize Firebase.
    //// TODO: replace with your Firebase project configuration.
    var paillierBigint = require('paillier-bigint')
    var Firepad = require('firepad');

    

    var config = {
        apiKey: "AIzaSyDRooT9uC6Voiq3JXV7Kjz8O-mvoKzAPfw",
        authDomain: "collab-edit-426.firebaseapp.com",
        projectId: "collab-edit-426",
        storageBucket: "collab-edit-426.appspot.com",
        messagingSenderId: "672605221994",
        appId: "1:672605221994:web:3ceb3c2c364e7c5c990613",
        databaseURL: "https://collab-edit-426-default-rtdb.firebaseio.com/"
     
    };
    window.firebase.initializeApp(config);


   
    var firepadRef = this.getExampleRef();


    //// Get Firebase Database reference.
    //// Create CodeMirror (with lineWrapping on).
    var codeMirror = window.CodeMirror(document.getElementById('firepad-container'), { lineWrapping: true });
    //// Create Firepad (with rich text toolbar and shortcuts enabled).
    var firepad = Firepad.fromCodeMirror(firepadRef, codeMirror,
        { richTextToolbar: true, richTextShortcuts: true });
    //// Initialize contents.
    firepad.on('ready', function() {
      if (firepad.isHistoryEmpty()) {
        firepad.setHtml('<span style="font-size: 24px;">Rich-text editing with <span style="color: red">Firepad!</span></span><br/><br/>Collaborative-editing made easy.\n');
      }
    });
  }

  // Helper to get hash from end of URL or generate a random one.
  getExampleRef() {
    var ref = window.firebase.database().ref();
    var hash = window.location.hash.replace(/#/g, '');
    if (hash) {
      ref = ref.child(hash);
    } else {
      ref = ref.push(); // generate unique location.
      window.location = window.location + '#' + ref.key; // add it as a hash to the URL.
    }
    if (typeof console !== 'undefined') {
      console.log('Firebase data: ', ref.toString());
    }
    return ref;
  }

  
  render() {
    return (
        <div>
            <div id="firepad-container"></div>
        </div>
        
    );
  }
}
export default Editor;