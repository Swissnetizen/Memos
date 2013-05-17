enyo.kind({
    name: "Sam.MemosPadViewList",
    kind: "enyo.List",
    classes: "onyx",
    fit: true,
    enableSwipe: false,
    data: ["GLaDOS"],
    listRef: "",
    components: [
        //* The class prevents other styles from glitching through the 
        //* Floated _div_s
        {kind: "onyx.Item", name: "padItem", ontap: "tapHandler", classes: "PadItemFloatFix", components: [
            //* _content_ and _count_'s styles: 
            //* 1. Keep it on the same line as content, 
            //* 2. keep it on the right instead of the left.
            {name: "content", tag: "div", style: "float: left"},
            {name: "count", tag: "div", style: "float: right"}]
        }
    ],
    //* @public
    published: {
        //* The refrence url to the firebase.
        refUrl: ""
    },
    events: {
        //* Runs when there's an error, includes error message.
        onerror: ""
    },
    //* @protected
    handlers: {
        //* The lists setupItem.
        onSetupItem: "setupItem"
    },
    create: function() {
        this.inherited(arguments);
        this.refUrlChanged();
    },
    refUrlChanged: function() {
        this.listRef = new Firebase("https://clsxb06mv57.firebaseio-demo.com/scoreList");
        this.data = [];
        //* Attaches event handlers.
        this.listRef.on("child_added", enyo.bind(this, "refreshListWithNewDataValue"));
    //     this.listRef.on("child_changed", this.changeRow);
    //     this.listRef.on("child_removed", this.removeListRow);
    //     this.listRef.on("child_moved", this.reorderList);
     },
    //* Executes once(Unless refUrl is changed).
    refreshListWithNewDataValue: function(snapshot, prevChildName) {
        var message = snapshot.val();
        message.dbId = snapshot.ref().path.m[0];
        //* Checks if the object is at the beginning.
        if (prevChildName === null) {
            this.data.push(message);
            this.count = this.data.length;
            this.refresh(); 
        } else if (prevChildName !== null) {
      //      for (i=0; i<== )
        }
    },
    //* Runs for every control in the list
    setupItem: function(inSender, inEvent) {
        var data = this.data[inEvent.index];
        this.$.content.setContent(data.name);
        this.$.count.setContent(data.count);
        return true;
    },
   tapHandler: function(inSender, inEvent) {
        
        
    }    
});

