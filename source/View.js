enyo.kind({
    //@public
    name: "Sam.View",
    kind: "enyo.Control",
    layoutKind: "FittableRowsLayout",
    classes: "enyo-fit",
    published: {
        //*Firebase URL
        firebase: "",
    },
    events: {
        onItemSetup: "",
        onItemOpen: "",
    },
    //@protected
    create: function() {
        this.inherited(arguments)
        this.$.list.set("firebase", this.firebase);
    },
    components: [
        {kind: "onyx.Toolbar", name: "header", content: "Labels"},
        {kind: "Sam.FirebaseList", name: "list", fit: true, onItemSetup: "setupItem", components: [
            {kind: "onyx.Item", components: [
                {name: "name", tag: "enyo.Control", style: "float: left"},
                {name: "count", tag: "enyo.Control", style: "float: right"}
            ]}
        ]},
        {kind: "Sam.FooterBar", name: "footer"}
    ],
    setupItem: function (inSender, inEvent) {
        inEvent.originalSender = inSender.name;
        enyo.bind(this, "doItemSetup")(inEvent);
    }
});