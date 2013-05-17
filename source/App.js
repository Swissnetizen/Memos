enyo.kind({
    name: "App",
	kind: "enyo.Application",
    classes: "onyx",
    style: "border-radius: 20px;",
    components: [
        //{kind: "enyo.List", name: "test23", onSetupItem: "setup"}
        {kind: "Sam.FirebaseList", name: "test23", firebase: "https://clsxb06mv57.firebaseio-demo.com//scoreList", onItemSetup: "setupItem", components: [
            {kind: "enyo.Control", name: "text"}
            ] }
        //{kind: "Sam.MemosPadViewList", name: "test23", urlRef: "https://clsxb06mv57.firebaseio-demo.com//scoreList"}
      
       ],
    setupItem: function(inSender, inEvent) {
        var data = inEvent.data;
        this.$.text.setContent(data.name);
    }
	
});