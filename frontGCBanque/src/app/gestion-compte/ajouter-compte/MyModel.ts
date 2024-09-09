core.js:5980  ERROR TypeError: Cannot read properties of null (reading 'push')
    at push.0JfT.MultiOfdComponent.saveCurrentObjectValues (multi-ofd.component.ts:1155:39)
    at push.0JfT.MultiOfdComponent.onBreadcrumbClick (multi-ofd.component.ts:1084:13)
    at MultiOfdComponent_li_7_Template_a_click_1_listener (multi-ofd.component.html:17:42)
    at executeListenerWithErrorHandling (core.js:14994:16)
    at wrapListenerIn_markDirtyAndPreventDefault (core.js:15035:22)
    at HTMLAnchorElement.<anonymous> (dom_renderer.ts:66:34)
    at ZoneDelegate.invokeTask (zone.js:421:35)
    at Object.onInvokeTask (core.js:28289:33)
    at ZoneDelegate.invokeTask (zone.js:420:40)
    at Zone.runTask (zone.js:188:51)

 if (this.isNormeThermiqueChecked) {
            var newPiece = new src_app_model_piece__WEBPACK_IMPORTED_MODULE_4__["Piece"]();
            newPiece.typePiece = "Norme thermique";
            currentObject.piecesJustificatives.push(newPiece);
        }
