"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var react_1 = require("react");
var semantic_ui_react_1 = require("semantic-ui-react");
require("./App.css");
var react_2 = require("react");
var axios_1 = require("axios");
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            values: []
        };
        return _this;
    }
    App.prototype.componentDidMount = function () {
        var _this = this;
        axios_1["default"].get("http://localhost:5000/api/values").then(function (response) {
            _this.setState({
                values: response.data
            });
        });
    };
    App.prototype.render = function () {
        return (react_1["default"].createElement("div", null,
            react_1["default"].createElement(semantic_ui_react_1.Header, null,
                react_1["default"].createElement(semantic_ui_react_1.Icon, { name: 'users' }),
                react_1["default"].createElement(semantic_ui_react_1.Header.Content, null, "Family Portal")),
            react_1["default"].createElement("ul", null, this.state.values.map(function (value) {
                return react_1["default"].createElement("li", { key: value.Id }, value.name);
            }))));
    };
    return App;
}(react_2.Component));
exports["default"] = App;
