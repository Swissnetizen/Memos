 enyo.kind({
    name: "Sam.PadItem",
    //* @public
    kind: "onyx.Item",
    classes: "onyx",
    //* @protected
    components: [
        //* Content and count labels: 
        //* 1. Keep it on the same line as content, 
        //* 2. keep it on the right instead of the left.
        {name: "content", tag: "div", style: "float: left"},
        {name: "count", tag: "div", style: "float: right"}
    ],
    //Object properties
    //* @public
    published: {
        //* The Item's label, should be used to show the pad name.
        content: "",
        //* The Item's count, should be used to indicate 
        //* how many memos are in the pad
        count: 0,
        //* The Item's Id in the db.
        padId: "",
        //* The Item's data in the db.
        data: "",
        
    },
    
    reset: function() {
        this.contentChanged();
        this.countChanged();
    },
    //* @protected
    //Runs when the component is created
    create: function() {
        this.inherited(arguments);
        this.contentChanged();
        this.countChanged();
    },
    
    //Content change handler
    contentChanged: function() {
        this.$.content.setContent(this.content);
    },
    
    //Sets the number of items label to number of items
    countChanged: function() {
        this.$.count.setContent(this.count);
    }
    
});