enyo.kind({
    //*@public
    /** Sam.FirebaseList takes a url reference to the firebase
        and dumps the data in an array which is then rendered.
        It's not the most _efficent_ thing ever but it'll do, 
        later I may look into upgrading this kind to make it efficent.
    */
    kind: "enyo.List",
    name: "Sam.FirebaseList",
    published: {
        //*The url to the firebase
        firebase: undefined,
    },
    events: {
        //* Like an enyo.List's onSetupItem;
        //* inEvent.data contains the firebase data for the current location.
        onItemSetup: "",
        /** The next four events map to their firebase equivelants.
            By defaut they are handled built-in handlers however
            they can be overriden with your own handlers.
            You will need to return true from your handlers 
            to stop the default handlers from running.
        */
        onChildAdd: "",
        onChildChange: "",
        onChildRemove: "",
        onChildMove: ""
    },
    /** _push_ is the equivilent of _firebase.push_.
     *  It has two arguments.
     *  The first argument is the data, it will automatically set the new child
     *  to it. This must be an object.
     *  The second is the priority This is to be used in conjunction with 
     *  firebase's ordered lists, and this control's reorderable mode.
     *  This must be a number.
     *  The function returns the reference.
     */
    push: function(data, priority) {
        var result = this.instance.push();
        if (typeof data === "object") {
            result.set(data);
        } 
        if (typeof priority === "number") {
            result.setPriority(priority)
        }
        return result;    
    },
    /** `remove` is the equivelent of `firebase.remove()`.
     *  It accepts one argument. That argument will do different things depending
     *  on what data type it is.
     *  If the argument is a number it will find the item in the list and remove it.
     *  If the argument is a string it will delete it from the firebase, then remove it
     *  from the data array. */
    remove: function(location) {
        var itemId = typeof location === "number" ? this.data[location].id : location; 
        this.instance.child(itemId).remove();
    },
    //*@protected
    //* Actual data that is stored. Data is rendered in the reverse order.
    data: [],
    instance: undefined,
    create: function() { 
        this.inherited(arguments);
        this.firebaseChanged();
    },

    handlers: {
            //*Assigns onSetupItem to setupItem; needed to inject data into event,
        onSetupItem: "setupItem",
        onReorder: "listReorder"
    },
    setupItem: function(inSender, inEvent) {
        // *Reverses the render order without changing this.data
        // *which array.reverse() does.
        var index = inEvent.index+1;
        inEvent.data = this.data[this.data.length-index].data;
        //Injects inEvent with the new data.
        this.doItemSetup(inEvent);
        return true;
    },
    //* Resets the firebase instance and list.
    firebaseChanged: function () {
        if (this.firebase) {
            this.instance = new Firebase(this.firebase);
            this.instance.on("child_added", enyo.bind(this, "childAdd"));
            this.instance.on("child_changed", enyo.bind(this, "childChange"));
            this.instance.on("child_removed", enyo.bind(this, "childRemove"));
            this.instance.on("child_moved", enyo.bind(this, "childMove"));
        } else {
            throw("Sam.FirebaseList: Something's wrong with the firebase url.");
        }
        this.data = [];
        this.reset();
        return;
    },
    //* Applies changes to list.
    applyChanges: function() {
        this.count = this.data.length;
        this.refresh();
    },
    /** Finds an array location with the specified id, not very _efficent_.
     Accepts 3 arguments:
        1. Data in which should be searched. Accepts Arrays.
        2. Id which should be found. Accepts any datatype that can be 
            compared using the === operator(basically everyting).
    */
    findArrayLocationByItemId: function(array, id) {
        for (var i=0; i <= array.length; i+=1) {
            if (array[i].id === id) {
                return i;
            }
        }  
    },
    //* Handles `child_added` events; adds the child to the array.
    childAdd: function(snapshot, prevChildName) {
        if (this.doChildAdd({snapshot: snapshot, prevChildName: prevChildName}) === true) return;
        var data = {data: snapshot.val(), id: snapshot.name()};
        if (prevChildName) {
            var prevChildListId = prevChildName !== null ? this.findArrayLocationByItemId(this.data, prevChildName) : -1;
            this.data.splice(prevChildListId+1, 0, data);
        } else {
            this.data.push(data);
        }
        this.applyChanges();
    },
    //*
    childChange: function(snapshot) {
        if (this.doChildChange({snapshot: snapshot}) === true) return;
        var listLocation = this.findArrayLocationByItemId(this.data, snapshot.name());
        this.data[listLocation].data = snapshot.val();
        this.applyChanges();
        return true;
    },
    //*
    childRemove: function(snapshot) {
        if (this.doChildRemove({snapshot: snapshot}) === true) return;
        this.data.splice(this.findArrayLocationByItemId(this.data, snapshot.name()), 1);
        this.applyChanges();
    },
    //*
    childMove: function(snapshot, prevChildName){
        if (this.doChildChange({snapshot: snapshot, prevChildName: prevChildName}) === true) return;
        var data = {id: snapshot.name(), data: snapshot.val()};
        var listLocation = this.findArrayLocationByItemId(this.data, snapshot.name());
        var newPrevChildLocation = this.findArrayLocationByItemId(this.data, prevChildName);
        this.data.splice(listLocation, 1);
        this.data.splice(newPrevChildLocation+1, 0, data);
        this.applyChanges();
    },
    //* Sets up the priorities when the list is reordered
    listReorder: function(inSender, inEvent) {
        var from = this.data.length-(inEvent.reorderFrom+1);
        var to = this.data.length-(inEvent.reorderTo+1);
        var reorderedItem = enyo.clone(this.data[from]);
        this.data.splice(from, 1);
        this.data.splice(to, 0, reorderedItem);
        this.instance.off("child_moved");
        enyo.forEach(this.data, function(data, index) {
            var ref = this.instance.child(data.id);
            ref.setPriority(index+1);
            }, this);
        this.applyChanges();
        this.instance.on("child_moved", enyo.bind(this, "childMove"));
    },
});