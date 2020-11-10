sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/ui/core/routing/History"
], function (Controller, MessageBox, History) {
	"use strict";
	var boolean = false;

	return Controller.extend("valoremapp.ValoremAppHTML.controller.login", {

		onInit: function () {
			if (boolean == false) {
				this.inicializar();
			}
			history.pushState(null, document.title, location.href);
			window.addEventListener('popstate', function (event) {
				history.pushState(null, document.title, location.href);
			});
			// var that=this;
			// var oHistory = History.getInstance();
			// var sPreviousHash = oHistory.getPreviousHash();
			// if (sPreviousHash !== undefined) {

			// }
		},
		_onObjectMatched: function (oEvent) {
			document.getElementById("txtusuario").value = "";
			document.getElementById("txtpass").value = "";
		},
		inicializar: function () {
			var page = this.byId("page");
			page.setShowHeader(false);
			var that = this;
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this.getView());
			this.oRouter.getRoute("login").attachPatternMatched(this._onObjectMatched, this);
			if (boolean)
				$.get("/destinations/ValoremSRVNodeJS/", function (data) {
					console.log('Entró a la petición');
					console.log(JSON.stringify(data));
				});
			$(document).on("click", "#btnRegistrar", function (event) {
				var usuario = document.getElementById("txtusuario").value;
				var pass = document.getElementById("txtpass").value;

				if (usuario == "" || pass == "") {
					MessageBox.warning("Debes llenar todos los campos", {
						actions: [MessageBox.Action.OK],
						emphasizedAction: MessageBox.Action.OK,
						onClose: function (sAction) {

						}
					});
				} else {
					console.log(boolean);
					sap.ui.core.BusyIndicator.show();
					$.post("/destinations/ValoremSRVNodeJS/api/connect", {
						user: usuario,
						password: pass

						// function (data, status) {
						// 	alert("Data: " + data + "\nStatus: " + status);
					}).done(function () {
						sap.ui.core.BusyIndicator.hide();
						that.oRouter.navTo("mainMenu", true);
				
					}).fail(function (xhr, ajaxOptions, thrownError) {
						sap.ui.core.BusyIndicator.hide();
						MessageBox.error("Error: " + xhr.responseText, {
							actions: [MessageBox.Action.OK],
							emphasizedAction: MessageBox.Action.OK,
							onClose: function (sAction) {}
						});

					})
				}

			});
			$(document).on("click", "#btnCambiarClave", function (event) {

				that.oRouter.navTo("CambiarClave", true);
			});

		}

	});
});