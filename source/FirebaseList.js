
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
        //The url to the firebase
    firebase: undefined
    },
    //*@protected
    data: [],
        instance: undefined,
        create: function() { 
            this.inherited(arguments);
            this.firebaseChanged();
        },
        //Asigns onSetuItem to setupItem; needed to inject data into event,
        handlers: {
            onSetupItem: "setupItem"
        },
        events: {
            onItemSetup: ""
        },
        setupItem: function(inSender, inEvent) {
            inEvent.data = this.data[inEvent.index];
            this.doItemSetup(inEvent);  
        },
        //* Resets the firebase instance and list.
        firebaseChanged: function () {
            if (this.firebase) {
                this.instance = new Firebase(this.firebase);
                this.instance.on("child_added", this.childAdd);
                this.instance.on("child_changed",this.childChange);
                this.nstance.on("child_moved", this.childMove);
                this.instance.on("child_removed", this.childRemove);
            } else {
                enyo.throw("Sam.FirebaseList: Something's wrong with the firebase url.");
            }
            return;
        },
        //* Finds an array location with the specified id, not very _efficent_.
        findArrayLocationByItemId: function(array, id) {
            for (var i=0; i <= array.length; i+1) {
                if (array[i].id === id) {
                    return i;
                } 
            }  
        },
        //* Handles `child_added` events; adds the child to the array.
        childAdd: function(snapshot, prevChildName) {
            var data = snapshot.val().id = snapshot.name();
            var prevChildListId;
            if (prevChildName === null) {
                prevChildListId = this.findArrayLocationByItemId(this.data, prevChildName);
            } else {
                prevChildListId = -1; //* Sets the id to minus 1, so it's zero when spliced into the array;
            }
            this.data.splice(prevChildListId+1, 0, data);            
            this.refresh();
        },
        //*
        child_changed: function() {,
        //*
        child_moved: "",
        //*
        child_removed: "",
        
    });    
