enyo.kind({
    name: "Sam.ViewList",
    kind: "enyo.List",
    classes: "onyx",
    fit: true,
    enableSwipe: false,
    components: [
        //* The class prevents other styles from glitching through the 
        //* Floated _div_s
        {kind: "onyx.Item", name: "padItem", ontap: "tapHandler", classes: "PadItemFloatFix", components: [
            //* _content_ and _count_'s styles: 
            //* 1. Keep it on the same line as content, 
            //* 2. keep it on the right instead of the left.
            {name: "title", tag: "div", style: "float: left"},
            {name: "count", tag: "div", style: "float: right"}]
        }
    ],
    //* @public
    published: {
        //* The data to show in the list.
        data: [],
    }, 
    events: {
        //* Runs when a List Item is tapped.
        onItemTap: "" 
    },
    //* @protected
    handlers: {
        //* The lists setupItem.
        onSetupItem: "setupItem"
    },
    create: function() {
        this.inherited(arguments);
        this.dataChanged();
    },
    //* Runs for every control in the list
    setupItem: function(inSender, inEvent) {
        var data = this.data[inEvent.index];
        this.$.title.setContent(data.title);
        this.$.count.setContent(data.count);
        return true;
    },
    dataChanged: function() {
        this.count = this.data.length;
//        this.reset();
    }, 
    //* Custom function to allow allow the Data published property to support arrays.
    getData: function() {
        return enyo.clone(this.data);
    },
    tapHandler: function(inSender, inEvent) {
        this.doItemTap({data: this.data[inEvent.index], index: inEvent.index});
      //  console.log({data: this.data[inEvent.index], index: inEvent.index});
        
    }    
});

