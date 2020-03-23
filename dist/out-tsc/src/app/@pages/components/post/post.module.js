"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var post_component_1 = require("./post.component");
var pgPostModule = /** @class */ (function () {
    function pgPostModule() {
    }
    pgPostModule_1 = pgPostModule;
    pgPostModule.forRoot = function () {
        return {
            ngModule: pgPostModule_1
        };
    };
    var pgPostModule_1;
    pgPostModule = pgPostModule_1 = __decorate([
        core_1.NgModule({
            declarations: [post_component_1.pgPost],
            exports: [post_component_1.pgPost],
            imports: [common_1.CommonModule]
        })
    ], pgPostModule);
    return pgPostModule;
}());
exports.pgPostModule = pgPostModule;
//# sourceMappingURL=post.module.js.map