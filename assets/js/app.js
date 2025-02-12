/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/assets/js/app.js":
/*!******************************!*\
  !*** ./src/assets/js/app.js ***!
  \******************************/
/***/ (() => {

function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
document.addEventListener('DOMContentLoaded', function () {
  var tableSystem = new Vue({
    el: '#vue-table-app',
    data: {
      showSplash: true,
      columns: [{
        key: 'test_code',
        label: 'Test Code'
      }, {
        key: 'test',
        label: 'Test'
      }, {
        key: 'language',
        label: 'Language'
      }, {
        key: 'order_num',
        label: 'Order #'
      }, {
        key: 'taker_name',
        label: 'Test Taker Name'
      }, {
        key: 'taker_email',
        label: 'Test Taker Email'
      }, {
        key: 'expires_at',
        label: 'Expires On'
      }, {
        key: 'redeemed_at',
        label: 'Used On'
      }, {
        key: 'results',
        label: 'Results'
      }],
      data: simpleTableData.tableData,
      // Comes from php localization
      filters: {
        testCode: '',
        expirationStart: '',
        expirationWithinDays: '',
        test: '',
        language: '',
        search: '',
        showSplash: true
      },
      sortKey: '',
      sortOrder: 'asc',
      currentPage: 1,
      itemsPerPage: 10
    },
    created: function created() {
      // Step 1: Parse the "test" parameter from the URL
      var urlParams = new URLSearchParams(window.location.search);
      var testFilter = urlParams.get('test');
      var expiryWithinFilter = urlParams.get('expiration_within_days');

      // Step 2: Set the value in the `filters.test` model
      if (testFilter) {
        this.filters.test = testFilter;
        this.showSplash = false;
      }
      if (expiryWithinFilter) {
        this.filters.expirationWithinDays = expiryWithinFilter;
        this.showSplash = false;
      }
    },
    methods: {
      toggleSplash: function toggleSplash() {
        var on = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        if (on === null) {
          this.showSplash = !this.showSplash;
        } else {
          this.showSplash = on;
        }
      },
      clearSearch: function clearSearch() {
        var searchInput = document.getElementById('search');
        searchInput.value = '';
        this.filters.search = '';
        this.filters.testCode = '';
        this.filters.test = '';
        this.filters.expirationWithinDays = '';
        this.filters.language = '';
        this.resetPage();
      },
      uniqueValues: function uniqueValues(key) {
        return _toConsumableArray(new Set(this.data.map(function (row) {
          return row[key];
        })));
      },
      sort: function sort(keyObject) {
        var key = keyObject.key;
        var date_keys = ['expires_at', 'redeemed_at'];
        this.sortOrder = this.sortKey === key && this.sortOrder === 'asc' ? 'desc' : 'asc';
        if (date_keys.includes(key)) {
          sortDates(this, key);
        } else if (key === 'order_num') {
          sortNumbers(this, key);
        } else {
          sortStrings(this, key);
        }
        this.sortKey = key;
      },
      paginatedData: function paginatedData(data) {
        var startIndex = Math.max(0, this.currentPage - 1) * this.itemsPerPage;
        var endIndex = startIndex + this.itemsPerPage;
        return data.slice(startIndex, endIndex); // Fetch only items for the current page
      },
      nextPage: function nextPage() {
        if (this.currentPage < Math.ceil(this.data.length / this.itemsPerPage)) {
          this.currentPage = this.currentPage + 1;
        }
      },
      resetPage: function resetPage() {
        this.currentPage = 1;
      },
      prevPage: function prevPage() {
        if (this.currentPage > 0) {
          this.currentPage = this.currentPage - 1;
        }
      },
      downloadCSV: function downloadCSV() {
        var _this = this;
        debugger;
        if (!this.filterData(this.data) || this.filterData(this.data).length === 0) {
          return;
        }
        var data = this.filterData(this.data);
        var rows = [this.columns.map(function (col) {
          return col.label;
        })]; // Add headers
        data.forEach(function (row) {
          rows.push(_this.columns.map(function (col) {
            return row[col.key] || '';
          }));
        });
        var csvContent = rows.map(function (e) {
          return e.join(",");
        }).join("\n");
        var blob = new Blob([csvContent], {
          type: 'text/csv;charset=utf-8;'
        });
        var link = document.createElement("a");
        var url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "table_data.csv");
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      },
      fetchResultsPdf: function fetchResultsPdf(id) {
        if (!Number.isInteger(id)) {
          console.error('Invalid test ID');
          return;
        }

        // Fetch the results pdf
        fetch('/wp-json/eira/v1/test-results?test_id=' + id, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(function (response) {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.blob();
        }).then(function (blob) {
          var url = window.URL.createObjectURL(blob);
          var a = document.createElement('a');
          a.style.display = 'none';
          a.href = url;
          a.download = 'test-results.pdf';
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
        })["catch"](function (error) {
          console.error('There has been a problem with your fetch operation:', error);
        });
      },
      goToPage: function goToPage(page) {
        var truePage = page - 1;
        if (truePage >= 0 && truePage <= 1 + Math.ceil(this.filteredData.length / this.itemsPerPage)) {
          this.currentPage = page;
        }
      },
      filterData: function filterData(data) {
        var _this2 = this;
        return data.filter(function (row) {
          if (_this2.filters.testCode) {
            switch (_this2.filters.testCode) {
              case 'unused':
                if (row.redeemed_at) {
                  return false;
                }
                break;
              case 'used':
                if (!row.redeemed_at) {
                  return false;
                }
                break;
              default:
                break;
            }
          }
          if (_this2.filters.test && row.test !== _this2.filters.test) return false;
          if (_this2.filters.language && row.language !== _this2.filters.language) return false;
          var expiration = new Date(row.expires_at);
          var today = new Date();
          if (_this2.filters.expirationWithinDays && expiration) {
            if (new Date(expiration) > new Date(new Date().setDate(new Date().getDate() + parseInt(_this2.filters.expirationWithinDays)))) {
              return false;
            }
            if (new Date(expiration) < today) {
              return false;
            }
          }
          if (_this2.filters.expirationStart && expiration < new Date(_this2.filters.expirationStart)) return false;
          if (_this2.filters.search) {
            var searchVal = Object.values(row).join(' ').toLowerCase();
            if (!searchVal.includes(_this2.filters.search.toLowerCase())) return false;
          }
          return true;
        }).sort(function (a, b) {
          if (!_this2.sortKey || !_this2.sortKey.hasOwnProperty('key')) return 0;
          var valA = a[_this2.sortKey.key];
          var valB = b[_this2.sortKey.key];
          if (_this2.sortOrder === 'asc') return valA > valB ? 1 : -1;
          return valA < valB ? 1 : -1;
        });
      }
    },
    computed: {
      filteredData: function filteredData() {
        var filtered = this.filterData(this.data);
        return this.paginatedData(filtered);
      }
    },
    watch: {
      'filters.search': function filtersSearch(oldValue, newValue) {
        this.resetPage();
      },
      'filters.testCode': function filtersTestCode() {
        this.resetPage();
      }
      // filters.expirationStart: '',
      // filters.expirationWithinDays: '',
      // filters.test: '',
      // filters.language: '',
      // filters.search: '',
      // showSplash: true,
    },
    template: "<div id=\"vue-table-app\" class=\"container\">\n    <a href=\"/special-shop-page\" class=\"order-tests btn btn-primary\">Order Tests</a>\n    <div class=\"row g-3 mb-3 table-filters\">\n        <!-- Search Filter -->\n        <div class=\"col-md-6\">\n            <div class=\"form-group\">\n                <div class=\"row\">\n                    <div class=\"col-12\">\n                        <label for=\"search\" class=\"form-label\" value=\"Search\">&nbsp;</label>\n                    </div>\n                </div>\n                <div class=\"row search-field-row\">\n                    <div class=\"col-12 input-group\">\n                        <input id=\"search\" type=\"text\" class=\"form-control\" v-model=\"filters.search\" placeholder=\"Search...\">\n                        <div class=\"input-group-append\">\n                            <span class=\"input-group-text\">\n                                <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-search\" viewBox=\"0 0 16 16\">\n                                   <path d=\"M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.415l-3.85-3.85a1.007 1.007 0 0 0-.115-.098zm-5.25-.34a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z\"/>\n                               </svg>\n                         &nbsp; Search</span>\n                        </div>\n                        <div class=\"clear-search\"><a href=\"javascript: void(0);\" @click=\"clearSearch\">Clear Search</a></div>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n        <!-- Test Code Filter -->\n        <div class=\"col-md-3\">\n            <div class=\"form-group\">\n                <div class=\"row\">\n                    <div class=\"col-12\">\n                        <label for=\"test-code\" class=\"form-label\">Test Codes</label>\n                    </div>\n                </div>\n                <div class=\"row\">\n                    <div class=\"col-12\">\n                        <select id=\"test-code\" class=\"form-select\" v-model=\"filters.testCode\">\n                            <option value=\"\">All</option>\n                            <option value=\"unused\">Unused Codes Only</option>\n                            <option value=\"used\">Used Codes Only</option>\n                        </select>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n        <!-- Test Filter -->\n        <div class=\"col-md-3\">\n            <div class=\"form-group\">\n                <div class=\"row\">\n                    <div class=\"col-12\">\n                        <label for=\"test\" class=\"form-label\">Tests</label>\n                    </div>\n                </div>\n                <div class=\"row\">\n                    <div class=\"col-12\">\n                        <select id=\"test\" class=\"form-select\" v-model=\"filters.test\">\n                            <option value=\"\">All</option>\n                            <option v-for=\"testVal in uniqueValues('test')\" :key=\"testVal\">\n                                {{ testVal }}\n                            </option>\n                        </select>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"row g-3 table-rows\">\n        <!-- Date Range Filter -->\n        <div class=\"col-md-6\"></div>\n        <div class=\"col-md-3\">\n            <div class=\"form-group\">\n                <div class=\"row\">\n                    <div class=\"col-12\">\n                        <label class=\"form-label\">Expiring</label>\n                    </div>\n                </div>\n                <div class=\"row\">\n                    <div class=\"col-12\">\n                        <select id=\"test\" class=\"form-select\" v-model=\"filters.expirationWithinDays\">\n                            <option value=\"\">All</option>\n                            <option value=\"60\">60 Days</option>\n                        </select>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n        <!-- Language Filter -->\n        <div class=\"col-md-3\">\n            <div class=\"form-group\">\n                <label for=\"language\" class=\"form-label\">Language</label>\n                <select id=\"language\" class=\"form-select\" v-model=\"filters.language\">\n                    <option value=\"\">All</option>\n                    <option v-for=\"lang in uniqueValues('language')\" :key=\"lang\">\n                        {{ lang }}\n                    </option>\n                </select>\n            </div>\n        </div>\n        <div class=\"row\">\n        <div class=\"table-filters mb-4 container\">\n            </div>\n        </div>\n\n        <!-- Table -->\n        <div class=\"table-responsive\">\n            <table class=\"table table-bordered table-striped\">\n                <thead class=\"table-light\">\n                <tr>\n                    <th v-for=\"col in columns\" @click=\"sort(col)\" class=\"text-center\">\n                         {{col.label}}\n                        <span v-if=\"sortKey.key === col.key\"> {{ sortOrder === 'asc' ? '\u25B2' : '\u25BC' }}</span>\n                    </th>\n                </tr>\n                </thead>\n                <tbody>\n                    <tr v-for=\"row in filteredData\" :key=\"row.test_code\">\n                        <td>{{ row.test_code }}</td>\n                        <td>{{ row.test }}</td>\n                        <td>{{ row.language }}</td>\n                        <td>{{ row.order_num }}</td>\n                        <td>{{ row.taker_name }}</td>\n                        <td>{{ row.taker_email }}</td>\n                        <td>{{ row.expires_at }}</td>\n                        <td>{{ row.redeemed_at }}</td>\n                        <td><button class=\"btn\" @click=\"fetchResultsPdf(row.id)\">Download Results</button></td>\n                    </tr>\n                </tbody>\n            </table>\n            <div class=\"pagination-controls\">\n                <button @click=\"prevPage\" :disabled=\"currentPage === 1\">Previous</button>\n                <button\n                        v-for=\"page in Math.ceil(filterData(data).length / itemsPerPage)\"\n                        :class=\"{ active: page === currentPage }\"\n                        @click=\"goToPage(page)\"\n                >\n                    {{ page }}\n                </button>\n                <button\n                        @click=\"nextPage\"\n                        :disabled=\"currentPage === Math.ceil(filterData(data).length / itemsPerPage)\"\n                >\n                    Next\n                </button>\n                <span>Page {{ currentPage }} of {{ Math.ceil(filterData(data).length / itemsPerPage) }}</span>\n            </div>\n            <button @click=\"downloadCSV\" class=\"btn btn-secondary\">Download CSV</button>\n        </div>\n    </div>\n</div>"
  });
  function sortDates(vue, key) {
    vue.data.sort(function (a, b) {
      var valA = a.hasOwnProperty(key) ? new Date(a[key]) : 0;
      var valB = b.hasOwnProperty(key) ? new Date(b[key]) : 0;
      if (vue.sortOrder === 'asc') return valA > valB ? 1 : -1;
      return valA < valB ? 1 : -1;
    });
  }
  function sortStrings(vue, key) {
    vue.data.sort(function (a, b) {
      var valA = a.hasOwnProperty(key) && a[key] ? a[key].toString().toLowerCase() : 0;
      var valB = b.hasOwnProperty(key) && b[key] ? b[key].toString().toLowerCase() : 0;
      if (vue.sortOrder === 'asc') return valA > valB ? 1 : -1;
      return valA < valB ? 1 : -1;
    });
  }
  function sortNumbers(vue, key) {
    vue.data.sort(function (a, b) {
      var valA = a.hasOwnProperty(key) ? a[key] : 0;
      var valB = b.hasOwnProperty(key) ? b[key] : 0;
      if (vue.sortOrder === 'asc') return valA > valB ? 1 : -1;
      return valA < valB ? 1 : -1;
    });
  }
});

/***/ }),

/***/ "./src/assets/sass/style.scss":
/*!************************************!*\
  !*** ./src/assets/sass/style.scss ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/assets/js/app": 0,
/******/ 			"assets/css/style": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk"] = self["webpackChunk"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["assets/css/style"], () => (__webpack_require__("./src/assets/js/app.js")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["assets/css/style"], () => (__webpack_require__("./src/assets/sass/style.scss")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;