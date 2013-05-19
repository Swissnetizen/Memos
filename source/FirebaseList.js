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
        var data = {data: snapshot.val(), id: snapshot.name()};
        if (prevChildName) {
            var prevChildListId = prevChildName !== null ? this.findArrayLocationByItemId(this.data, prevChildName) : -1;
            this.data.splice(prevChildListId+1, 0, data);
        } else {
            this.data.push(data);
        }
        this.count = this.data.length;
        this.refresh();
    },
    //*
    childChange: function(snapshot) {
        var listLocation = this.findArrayLocationByItemId(this.data, snapshot.name());
        this.data[listLocation].data = snapshot.val();
        return true;
    },
    //*
    child_moved: "",
    //*
    child_removed: "",
});