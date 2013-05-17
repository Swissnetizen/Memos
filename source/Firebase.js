enyo.kind({
    //* @public
    kind: "enyo.Component",
    name: "Sam.Firebase",
    published: {
        //* Url to the Firebase Ref.
        url: "",
    },
    //* object is not a published property 
    //* because published properties have getter
    //* methods and getting the firebase object
    //* through a method isn't the best idea.
    //*Events(Used to read Values), Read firebase's docs.
    events: {
        onValue: "",
        onChildAdded: "",
        onChildChanged: "",
        onChildRemoved: "",
        onChildMoved: ""
    }, 
    //* @protected
    create: function() {
        this.inherited(arguments);
        this.objectChanged();
    },
    
    urlChanged: function() {
        if (this.url !== "") {
            //* Creates the new firebase
            this.object = new Firebase(this.url);
            //Sets up the event handlers
            this.object.on("value", this.doValue);
            this.object.on("child_added", this.doChildAdded);
            this.object.on("child_changed", this.doChildChanged);
            this.object.on("child_removed", this.doChildRemoved);
            this.object.on("child_moved", this.doChildMoved);
        }
    }

});