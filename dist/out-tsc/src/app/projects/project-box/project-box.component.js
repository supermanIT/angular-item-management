"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var ProjectBoxComponent = /** @class */ (function () {
    function ProjectBoxComponent(router) {
        this.router = router;
    }
    ProjectBoxComponent.prototype.ngOnInit = function () {
    };
    ProjectBoxComponent.prototype.openProject = function () {
        this.router.navigate(['/projects', this.id]);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ProjectBoxComponent.prototype, "id", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ProjectBoxComponent.prototype, "name", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ProjectBoxComponent.prototype, "type", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ProjectBoxComponent.prototype, "description", void 0);
    ProjectBoxComponent = __decorate([
        core_1.Component({
            selector: 'app-project-box',
            templateUrl: './project-box.component.html',
            styleUrls: ['./project-box.component.scss']
        }),
        __metadata("design:paramtypes", [router_1.Router])
    ], ProjectBoxComponent);
    return ProjectBoxComponent;
}());
exports.ProjectBoxComponent = ProjectBoxComponent;
//# sourceMappingURL=project-box.component.js.map