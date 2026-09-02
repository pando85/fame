"use strict";
(self["webpackChunkrecetas"] = self["webpackChunkrecetas"] || []).push([["src_sw_js"],{

/***/ "./src/sw.js"
/*!*******************!*\
  !*** ./src/sw.js ***!
  \*******************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ swCustom)
/* harmony export */ });
// Docusaurus owns the production precache and fetch routing. Custom service
// worker code must only extend that worker; creating another precache controller
// here would compete with Docusaurus' revisioned snapshot.
function swCustom() {
  // When pull-to-refresh activates a waiting worker, claim the current WebView
  // immediately so controllerchange can be observed before the page reloads.
  self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
  });
}

/***/ }

}]);
//# sourceMappingURL=src_sw_js.sw.js.map