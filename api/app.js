"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var express_session_1 = __importDefault(require("express-session"));
var express_fileupload_1 = __importDefault(require("express-fileupload"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var path_1 = __importDefault(require("path"));
var cors_1 = __importDefault(require("cors"));
require("dotenv/config");
var routes_1 = __importDefault(require("./routes"));
var app = (0, express_1.default)();
var port = 3001;
var __dirname = path_1.default.resolve();
app.use((0, cors_1.default)());
app.use((0, express_fileupload_1.default)());
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({
    extended: true,
}));
var oneDay = 1000 * 60 * 60 * 24;
app.use((0, express_session_1.default)({
    name: process.env.SESSION_NAME,
    secret: process.env.SESSION_SECRET || 'somethingrandomhere',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
}));
var requestLogger = function (req, res, next) {
    console.log("".concat(req.method, " url:: ").concat(req.url));
    next();
};
app.use(requestLogger);
app.use(express_1.default.static(path_1.default.join(__dirname, 'frontend/build')));
app.use('/api', routes_1.default);
app.get('*', function (_req, res) {
    res.sendFile(path_1.default.join(__dirname, 'frontend/build', 'index.html'));
});
app.listen(process.env.PORT || port, function () {
    console.log("App is listening on port ".concat(process.env.PORT || port, " !"));
});
