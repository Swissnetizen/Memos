enyo.kind({
    kind: "onyx.Toolbar", 
    name: "Sam.Header",
    published: {
        array: [],
        navTree: ""
    },
    components: [
        {content: "Labels", name: "title"},
        {kind: "onyx.InputDecorator", components: [
            {kind: "onyx.IconButton", name: "cancelFind", src: "assets/LightCross.png", style: "height: 30px", showing: false,},
            {kind: "onyx.Input", name: "findBox", showing: false},
            {kind: "onyx.IconButton", name: "carryOnFind", ontap: "continueFind", src: "assets/LightMagGlass.png", style: "height: 30px", showing: false,},
        ]}
    ],
    findBoxSetShowing: function(value) {
        this.$.findBox.setShowing(value);
        this.$.cancelFind.setShowing(value);
        this.$.carryOnFind.setShowing(value);
    },
    findTap: function(inSender, inEvent) {
        this.$.findBoxSetShowing(true);
    },
});