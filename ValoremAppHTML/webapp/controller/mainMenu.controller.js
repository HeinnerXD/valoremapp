sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
], function (Controller, History) {
	"use strict";

	return Controller.extend("valoremapp.ValoremAppHTML.controller.mainMenu", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf valoremapp.ValoremAppHTML.view.mainMenu
		 */
		onInit: function () {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this.getView());
			this.oRouter.getRoute("mainMenu").attachPatternMatched(this._onObjectMatched, this);
		},
		handleUserItemPressed: function () {
			var that = this;
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();
			that.oRouter.navTo("login", true);
			// if (sPreviousHash !== undefined) {
			// 	// window.history.go(-1);
			// } else {
			// 	that.oRouter.navTo("login", true);
			// }
		},
		press_consolidacion: function () {
			this.oRouter.navTo("Proceso_Consolidacion", true);
		},
		press_notasFinancieros: function () {
			this.oRouter.navTo("NotasFinancieros", true);
		}

	});

});