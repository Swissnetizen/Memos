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
        /** navTree, a function which navigates the current array location. 
            Arguments given: data in the location.
            Result: the id.
            By default it is set to return the argument. */    
        navTree: function(d) { return d;}
    },
    //*@protected
    //* Actual data that is stored. Data is rendered in the reverse order.
    data: [],
        instance: undefined,
        create: function() { 
            this.inherited(arguments);
            this.firebaseChanged();
        },
        //*Assigns onSetupItem to setupItem; needed to inject data into event,
        handlers: {
            onSetupItem: "setupItem"
        },
        events: {
            //* Like an enyo.List's onSetupItem;
            //* inEvent.data contains the firebase data for the current location.
            onItemSetup: ""
        },
        setupItem: function(inSender, inEvent) {
            // *Reverses the render order without changing this.data
            // *which array.reverse() does.
            inEvent.data = this.data[this.data.length-inEvent.index];
            //Injects inEvent with the new data.
            this.doItemSetup(inEvent);
            return true;
        },
        //* Resets the firebase instance and list.
        firebaseChanged: function () {
            if (this.firebase) {
                this.instance = new Firebase(this.firebase);
                this.instance.on("child_added", enyo.bind(this, "childAdd"));
                // this.instance.on("child_changed", this.childChange);
                // this.nstance.on("child_moved", this.childMove);
                // this.instance.on("child_removed", this.childRemove);
            } else {
                enyo.throw("Sam.FirebaseList: Something's wrong with the firebase url.");
            }
            this.data = [];
            this.reset();
            return;
        },
        /** Finds an array location with the specified id, not very _efficent_.
         Accepts 3 arguments:
            1. Data in which should be searched. Accepts Arrays.
            2. Id which should be found. Accepts any datatype that can be 
                compared using the === operator(basically everyting).
            3. navTree, a function which navigates the current array location, 
                is given the, data in the location and should return the id of 
                the location.
         */
        findArrayLocationByItemId: function(array, id, navTree) {
            for (var i=0; i <= array.length; i+=1) {
                if (navTree(array[i]) === id) {
                    return i;
                }
            }  
        },
        //* Handles `child_added` events; adds the child to the array.
        childAdd: function(snapshot, prevChildName) {
            var data = snapshot.val().id = snapshot.name();
            var prevChildListId = prevChildName !== null ? this.findArrayLocationByItemId(this.data, prevChildName, this.navTree) : -1;
            this.data.splice(prevChildListId+1, 0, data);
            this.count = this.data.length;
            this.refresh();
        },
        //*
        child_changed: "",
        //*
        child_moved: "",
        //*
        child_removed: "",
    });