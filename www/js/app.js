angular.module("spartapp", ["ngCordova","ionic","ionMdInput","ionic-material","ion-datetime-picker","ionic.rating","utf8-base64","angular-md5","chart.js","pascalprecht.translate","tmh.dynamicLocale","ionicLazyLoad","spartapp.controllers", "spartapp.services"])
	.run(function($ionicPlatform,$window,$interval,$timeout,$ionicHistory,$ionicPopup,$state,$rootScope){

		$rootScope.appName = "Spartapp" ;
		$rootScope.appLogo = "data/images/avatar/logo_streema_180x180.fw.png" ;
		$rootScope.appVersion = "1.0" ;
		$rootScope.headerShrink = false ;

		$ionicPlatform.ready(function() {
			if(window.cordova){
				$rootScope.exist_cordova = true ;
			}else{
				$rootScope.exist_cordova = false ;
			}
			//required: cordova plugin add ionic-plugin-keyboard --save
			if(window.cordova && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
				cordova.plugins.Keyboard.disableScroll(true);
			}

			//required: cordova plugin add cordova-plugin-statusbar --save
			if(window.StatusBar) {
				StatusBar.styleDefault();
			}

			localforage.config({
				driver : [localforage.WEBSQL,localforage.INDEXEDDB,localforage.LOCALSTORAGE],
				name : "spartapp",
				storeName : "spartapp",
				description : "The offline datastore for Spartapp app"
			});



		});
		$ionicPlatform.registerBackButtonAction(function (e){
			if($ionicHistory.backView()){
				$ionicHistory.goBack();
			}else{
				var confirmPopup = $ionicPopup.confirm({
					title: "Confirm Exit",
					template: "Are you sure you want to exit?"
				});
				confirmPopup.then(function (close){
					if(close){
						ionic.Platform.exitApp();
					}
				});
			}
			e.preventDefault();
			return false;
		},101);
	})


	.filter("to_trusted", ["$sce", function($sce){
		return function(text) {
			return $sce.trustAsHtml(text);
		};
	}])

	.filter("trustUrl", function($sce) {
		return function(url) {
			return $sce.trustAsResourceUrl(url);
		};
	})

	.filter("trustJs", ["$sce", function($sce){
		return function(text) {
			return $sce.trustAsJs(text);
		};
	}])

	.filter("strExplode", function() {
		return function($string,$delimiter) {
			if(!$string.length ) return;
			var $_delimiter = $delimiter || "|";
			return $string.split($_delimiter);
		};
	})

	.filter("strDate", function(){
		return function (input) {
			return new Date(input);
		}
	})
	.filter("strHTML", ["$sce", function($sce){
		return function(text) {
			return $sce.trustAsHtml(text);
		};
	}])
	.filter("strEscape",function(){
		return window.encodeURIComponent;
	})
	.filter("strUnscape", ["$sce", function($sce) {
		var div = document.createElement("div");
		return function(text) {
			div.innerHTML = text;
			return $sce.trustAsHtml(div.textContent);
		};
	}])

	.filter("objLabel", function(){
		return function (obj) {
			var new_item = [];
			angular.forEach(obj, function(child) {
				new_item = [];
				var indeks = 0;
				angular.forEach(child, function(v,l) {
					if (indeks !== 0) {
					new_item.push(l);
				}
				indeks++;
				});
			});
			return new_item;
		}
	})
	.filter("objArray", function(){
		return function (obj) {
			var new_items = [];
			angular.forEach(obj, function(child) {
				var new_item = [];
				var indeks = 0;
				angular.forEach(child, function(v){
						if (indeks !== 0){
							new_item.push(v);
						}
						indeks++;
					});
					new_items.push(new_item);
				});
			return new_items;
		}
	})


.config(["$translateProvider", function ($translateProvider){
	$translateProvider.preferredLanguage("en-us");
	$translateProvider.useStaticFilesLoader({
		prefix: "translations/",
		suffix: ".json"
	});
}])


.config(function(tmhDynamicLocaleProvider){
	tmhDynamicLocaleProvider.localeLocationPattern("lib/ionic/js/i18n/angular-locale_{{locale}}.js");
	tmhDynamicLocaleProvider.defaultLocale("en-us");
})


.config(function($stateProvider, $urlRouterProvider,$sceDelegateProvider,$httpProvider,$ionicConfigProvider){
	try{
		// Domain Whitelist
		$sceDelegateProvider.resourceUrlWhitelist([
			"self",
			new RegExp('^(http[s]?):\/\/(w{3}.)?youtube\.com/.+$'),
			new RegExp('^(http[s]?):\/\/(w{3}.)?w3schools\.com/.+$'),
		]);
	}catch(err){
		console.log("%cerror: %cdomain whitelist","color:blue;font-size:16px;","color:red;font-size:16px;");
	}
	$stateProvider
	.state("spartapp",{
		url: "/spartapp",
			abstract: true,
			templateUrl: "templates/spartapp-side_menus.html",
			controller: "side_menusCtrl",
	})

	.state("spartapp.about_us", {
		url: "/about_us",
		views: {
			"spartapp-side_menus" : {
						templateUrl:"templates/spartapp-about_us.html",
						controller: "about_usCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("spartapp.dashboard", {
		url: "/dashboard",
		cache:false,
		views: {
			"spartapp-side_menus" : {
						templateUrl:"templates/spartapp-dashboard.html",
						controller: "dashboardCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("spartapp.faqs", {
		url: "/faqs",
		views: {
			"spartapp-side_menus" : {
						templateUrl:"templates/spartapp-faqs.html",
						controller: "faqsCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("spartapp.live", {
		url: "/live",
		cache:false,
		views: {
			"spartapp-side_menus" : {
						templateUrl:"templates/spartapp-live.html",
						controller: "liveCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("spartapp.menu_2", {
		url: "/menu_2",
		cache:false,
		views: {
			"spartapp-side_menus" : {
						templateUrl:"templates/spartapp-menu_2.html",
						controller: "menu_2Ctrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("spartapp.slide_tab_menu", {
		url: "/slide_tab_menu",
		views: {
			"spartapp-side_menus" : {
						templateUrl:"templates/spartapp-slide_tab_menu.html",
						controller: "slide_tab_menuCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("spartapp.sparta_player", {
		url: "/sparta_player",
		cache:false,
		views: {
			"spartapp-side_menus" : {
						templateUrl:"templates/spartapp-sparta_player.html",
						controller: "sparta_playerCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("spartapp.youtube", {
		url: "/youtube",
		cache:false,
		views: {
			"spartapp-side_menus" : {
						templateUrl:"templates/spartapp-youtube.html",
						controller: "youtubeCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("spartapp.youtube_singles", {
		url: "/youtube_singles/:snippetresourceIdvideoId",
		cache:false,
		views: {
			"spartapp-side_menus" : {
						templateUrl:"templates/spartapp-youtube_singles.html",
						controller: "youtube_singlesCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	$urlRouterProvider.otherwise("/spartapp/dashboard");
});
