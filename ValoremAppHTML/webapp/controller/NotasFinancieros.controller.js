sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/m/MessageBox"
], function (Controller, History, MessageBox) {
	"use strict";

	return Controller.extend("valoremapp.ValoremAppHTML.controller.NotasFinancieros", {

		onInit: function () {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this.getView());
			this.oRouter.getRoute("NotasFinancieros").attachPatternMatched(this._onObjectMatched, this);
		},
		handlePressConfiguration: function () {
			var that = this;
			that.oRouter.navTo("mainMenu", true);
		},

		handleUserItemPressed: function () {
			var that = this;
			that.oRouter.navTo("login", true);
		},
		goprueba: function () {
			alert("fdg");
		},
		onDowload: function (filename) {

			var oView = this.getView();
			var oResourceBundle = oView.getModel("i18n").getResourceBundle();
			var url = oResourceBundle.getText("urlServer").toString().trim();
			sap.ui.core.BusyIndicator.show();

			$.post("/destinations/ValoremSRVNodeJS/api/downloadFile", {
				name: "DMSShuttle",
				username: "lgarcia@valorem.com.co",
				url: "02. NOTAS EEFF/PRODUCCION/INDIVIDUALES",
				fileName: filename
			}).done(function (data) {
				console.log(data)
				window.open(url + '/' + filename);
				jQuery.sap.delayedCall(650, this, function () {
					$.post("/destinations/ValoremSRVNodeJS/api/cleanServer")
						.done(function (response) {
							console.log(response)
							sap.ui.core.BusyIndicator.hide();

						}).fail(function (xhr, ajaxOptions, thrownError) {

							sap.ui.core.BusyIndicator.hide();

						});
				});
			}).fail(function (xhr, ajaxOptions, thrownError) {

				sap.ui.core.BusyIndicator.hide();

				MessageBox.error("Error: " + xhr.responseText, {
					actions: [MessageBox.Action.OK],
					emphasizedAction: MessageBox.Action.OK,
					onClose: function (sAction) {}
				});

			});

		}

	});

});