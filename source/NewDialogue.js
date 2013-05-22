enyo.kind({
    kind: "enyo.Popup", 
    name: "Sam.NewDialogue", 
    classes: "onyx", 
    events: {
        onCancel: "",
        onConfirm: ""
    },
    published: {
        hideOnCanceled: true,
        confirmLabel: "Create"
    },
    components: [
        {kind: "enyo.Control", name: "title", content: "New Catergory..."},
        {kind: "enyo.Control", name: "line", style: "border-bottom: 1px solid rgba(0, 0, 0, 0.2);"},
        {kind: "onyx.InputDecorator", name: "input", components: [
            {kind: "onyx.Input", placeholder: "Enter some text..."}
        ]},
        {kind: "onyx.Button", name: "confirmCreate", content: this.confirmLabel, classes: "onyx-affermitive", ontap: "continue"},
        {kind: "onyx.Button", name: "confirmCreate", content: "Cancel", ontap: "DoHide"}
    ],
    continue: function(inSender, inEvent) {
        inEvent.originalInSender = inSender;
        inEvent.value = this.$.input.hasNode().value;
        this.doConfirm(inEvent);
        this.DoHide();
        return true;
    },
    DoHide: function() {
        if (this.hideOnCanceled === true) {
            this.hide()
        } 
        inEvent.originalInSender = inSender;
        inEvent.value = this.$.input.hasNode().value;
        this.doCancel(inEvent);
        return true;
    }
});