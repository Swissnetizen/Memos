enyo.kind({
    //@public
    name: "Sam.View",
    kind: "enyo.Control",
    layoutKind: "FittableRowsLayout",
    classes: "enyo-fit",
    published: {
        //*Firebase URL
        firebase: "",
        onItemSetup: "",
    },
    events: {
        onItemOpen: "",
    },
    //@protected
    create: function() {
        this.inherited(arguments)
        this.firebaseChanged()
    },
    firebaseChanged: function() {
        this.$.list.set("firebase", this.firebase);
        return true;
    },
    components: [
        {kind: "onyx.Toolbar", name: "header", content: "Labels"},
        {kind: "Sam.NewDialogue", name: "newDialogue", onConfirm: "continueNewDialogue"},
        {kind: "Sam.FirebaseList", name: "list", fit: true, onItemSetup: "setupItem", components: [
            {kind: "onyx.Item", ontap: "sendItemTap", components: [
                {name: "name", tag: "enyo.Control", style: "float: left"},
                {name: "count", tag: "enyo.Control", style: "float: right"}
            ]}
        ]},
        {kind: "Sam.FooterBar", name: "footer", onNewTap: "newTap", onFindTap: "findTap", onEditTap: "editTap"}
    ],
    setupItem: function(inSender, inEvent) {
        var data = inEvent.data;
        this.$.name.set("content", data.name);
        this.$.count.set("content", data.count);
    },
    sendItemTap: function(inSender, inEvent) {
        inEvent.originalSender = inSender.name;
        this.doItemOpen(inEvent);
    },
    newTap: function(inSender, inEvent) {
        this.$.newDialogue.show()
    },
    continueNewDialogue: function (inSender, inEvent) {
        this.$.list.push({name: inEvent.value, count: 0});
        return true;
    }
});