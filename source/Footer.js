enyo.kind({
    //@public
    kind: "onyx.Toolbar",
    name: "Sam.FooterBar",
    events: {
        onNewTap: "",
        onFindTap: "",
        onEditTap: ""
    },
    //@protected
    layoutKind:"FittableColumnsLayout", 
    components: [
        {kind: "onyx.IconButton", name: "new", src: "assets/LightPlus.png", style: "height: 30px", ontap: "tapHandlers"},
        {kind: "onyx.IconButton", name: "find", src: "assets/LightMagGlass.png", style: "height: 30px", ontap: "tapHandlers"},
        {fit: true},    
        {kind: "onyx.Button", name: "edit", content: "Edit", ontap: "tapHandlers"}
    ],
    tapHandlers: function(inSender, inEvent) {
        var name = inSender.name;
        inEvent.originalSender = name;
        this["do" + name[0].toUpperCase() + name.slice(1) + "Tap"](inEvent);
        return true;
    }
});