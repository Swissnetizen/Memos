enyo.kind({
    kind: "onyx.Popup", 
    name: "Sam.NewDialogue", 
    classes: "onyx",
    style: "background: #eaeaea; color:#333333;",
    events: {
        onCancel: "",
        onConfirm: ""
    },
    published: {
        hideOnCanceled: true,
        confirmLabel: "Create"
    },
    floating: true,
    centered: true,
    scrim: true,
    create: function() {
        this.inherited(arguments);
        this.hideOnCanceledChanged();
    },
    hideOnCanceledChanged: function() {
        this.$.confirmCreate.set("content", this.confirmLabel);
    },
    components: [
        {kind: "enyo.Control", name: "title", content: "New Catergory..."},{tag: "br"},
        {kind: "enyo.Control", name: "line", style: "border-bottom: 1px solid rgba(0, 0, 0, 0.2); width:100%"},
        {tag: "br"},
        {kind: "onyx.InputDecorator", components: [
            {kind: "onyx.Input", name: "input", placeholder: "Enter some text..."}
        ]},
        {tag: "br"},
        {kind: "onyx.Button", name: "confirmCreate", classes: "onyx-affirmative", ontap: "continue",  style: "width:100%"},
        {tag: "br"},
        {kind: "onyx.Button", name: "cancelCreate", content: "Cancel", ontap: "DoHide", style: "width:100%;"}
    ],
    continue: function() {
        var inEvent = {};
        inEvent.value = this.$.input.hasNode().value;
        this.$.input.hasNode().value = "";
        this.doConfirm(inEvent);
        this.hide();
        return true;
    },
    DoHide: function() {
        if (this.hideOnCanceled === true) {
            this.hide()
        }
        var inEvent = {};
        inEvent.value = this.$.input.hasNode().value;
        this.$.input.hasNode().value = "";
        this.doCancel(inEvent);
        return true;
    }
});