Ext.define('Ext.ux.colorpick.SliderController', {
    extend : 'Ext.app.ViewController',
    alias: 'controller.colorpick-slidercontroller',

    // After the component is rendered
    onFirstBoxReady: function() {
        var me         = this,
            view       = me.getView(),
            container  = view.getDragContainer(),
            dragHandle = view.getDragHandle(),
            dd         = dragHandle.dd;

        // configure draggable constraints 
        dd.constrain = true;
        dd.constrainTo = container.getEl();
        dd.initialConstrainTo = dd.constrainTo; // needed otheriwse error EXTJS-13187
        
        // event handlers
        dd.on('drag', me.onHandleDrag, me);
        me.mon(view.getEl(), {
            mousedown: me.onMouseDown,
            mouseup: me.onMouseUp,
            scope: me
        });
    },

    // Fires when handle is dragged; fires "handledrag" event on the slider
    // with parameter  "percentY" 0-1, representing the handle position on the slider
    // relative to the height
    onHandleDrag: function(e) {
        var me              = this,
            view            = me.getView(),
            container       = view.getDragContainer(),
            dragHandle      = view.getDragHandle(),
            y               = dragHandle.getY() - container.getY(),
            containerEl     = container.getEl(),
            containerHeight = containerEl.getHeight(),
            yRatio          = y/containerHeight;

        // Adjust y ratio for dragger always being 1 pixel from the edge on the bottom
        if (yRatio > 0.99) {
            yRatio = 1;
        }

        view.fireEvent('handledrag', yRatio);
    },

    // Whenever we mousedown over the slider area
    onMouseDown: function(e) {
        var me         = this,
            view       = me.getView(),
            dragHandle = view.getDragHandle();

        // position drag handle accordingly
        dragHandle.setY(e.getY());
        me.onHandleDrag();

        // tie into the default dd mechanism
        dragHandle.dd.onMouseDown(e, dragHandle.dd.el);
    },

    onMouseUp: function () {
        var view       = this.getView(),
            dragHandle = view.getDragHandle();

        dragHandle.dd.dragEnded = true; // work around DragTracker bug
    }
});
