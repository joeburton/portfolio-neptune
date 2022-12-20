"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongodb_1 = require("mongodb");
var mongoUtilities_1 = require("./mongoUtilities");
var router = express_1.default.Router();
var projects_1 = __importDefault(require("./projects"));
var getCollection = function (collectionName) { return __awaiter(void 0, void 0, void 0, function () {
    var db, collection;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, mongoUtilities_1.connectToDatabase)()];
            case 1:
                db = (_a.sent()).db;
                return [4 /*yield*/, db.collection(collectionName)];
            case 2:
                collection = _a.sent();
                return [2 /*return*/, collection];
        }
    });
}); };
var sessionChecker = function (req, res, next) {
    var _a, _b;
    console.log("Session Checker: ".concat((_a = req.session) === null || _a === void 0 ? void 0 : _a.id));
    console.log(req.session);
    // @ts-ignore
    if ((_b = req.session) === null || _b === void 0 ? void 0 : _b.loggedin) {
        console.log("Found User Session");
        next();
    }
    else {
        console.log("No User Session Found");
        res
            .status(401)
            .send({ Error: 'You are not authorised to access here, please login.' });
    }
};
router.post('/auth', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var username, password, users, user, err_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                username = req.body.username;
                password = req.body.password;
                return [4 /*yield*/, getCollection('users')];
            case 1:
                users = _b.sent();
                return [4 /*yield*/, users.findOne({ username: username })];
            case 2:
                user = _b.sent();
                if (user && user.password === password) {
                    if (req.session) {
                        // @ts-ignore
                        req.session.loggedin = true;
                        // @ts-ignore
                        req.session.username = username;
                    }
                    res.send({
                        // @ts-ignore
                        username: (_a = req.session) === null || _a === void 0 ? void 0 : _a.username,
                        success: 'You are logged in',
                    });
                }
                else {
                    res
                        .status(401)
                        .send({ Error: 'Please enter a valid Username and Password!' });
                }
                return [3 /*break*/, 4];
            case 3:
                err_1 = _b.sent();
                res.status(500).send({ Error: err_1.toString() });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.post('/logout', function (req, res) {
    var _a;
    (_a = req === null || req === void 0 ? void 0 : req.session) === null || _a === void 0 ? void 0 : _a.destroy(function (_err) {
        console.log('Session Destroyed');
    });
    res.send({ success: 'You successfully logged out' });
});
router.get('/source', function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var collection, result, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, getCollection('items')];
            case 1:
                collection = _a.sent();
                return [4 /*yield*/, collection.find().sort({ _id: -1 }).toArray()];
            case 2:
                result = _a.sent();
                res.send(JSON.stringify(result));
                return [3 /*break*/, 4];
            case 3:
                err_2 = _a.sent();
                res.status(500).send({ Error: err_2.toString() });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.get('/populate-database', sessionChecker, function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var collection, result, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, getCollection('items')];
            case 1:
                collection = _a.sent();
                return [4 /*yield*/, collection.insertMany(projects_1.default, { ordered: true })];
            case 2:
                result = _a.sent();
                res.send(result);
                return [3 /*break*/, 4];
            case 3:
                err_3 = _a.sent();
                res.status(500).send({ Error: err_3.toString() });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.get('/delete-all-items', sessionChecker, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var collection, result, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, getCollection('items')];
            case 1:
                collection = _a.sent();
                return [4 /*yield*/, collection.drop()];
            case 2:
                result = _a.sent();
                res.send(result);
                return [3 /*break*/, 4];
            case 3:
                err_4 = _a.sent();
                res.status(500).send({ Error: err_4.toString() });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.post('/delete-item', sessionChecker, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var collection, id, result, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, getCollection('items')];
            case 1:
                collection = _a.sent();
                id = req.body.id;
                return [4 /*yield*/, collection.deleteOne({ _id: new mongodb_1.ObjectId(id) })];
            case 2:
                result = _a.sent();
                res.send(JSON.stringify(result));
                return [3 /*break*/, 4];
            case 3:
                err_5 = _a.sent();
                res.status(500).send({ Error: err_5.toString() });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.post('/update-item', sessionChecker, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var imageFile, item, collection;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.files || Object.keys(req.files).length === 0) {
                    return [2 /*return*/, res.status(500).send({ Error: 'No file provided' })];
                }
                imageFile = req.files.logo;
                item = req.body;
                return [4 /*yield*/, getCollection('items')];
            case 1:
                collection = _a.sent();
                imageFile.mv("../public/images/".concat(imageFile.name), function (err) {
                    if (err) {
                        return res.status(500).send({ Error: err.toString() });
                    }
                    try {
                        collection.updateOne({ _id: new mongodb_1.ObjectId(item._id) }, {
                            $set: {
                                logo: imageFile.name,
                                role: item.role,
                                company: item.company,
                                description: item.description,
                                skills: item.skills,
                                class: item.class,
                                links: item.links,
                            },
                        }, function () {
                            collection
                                .find()
                                .sort({ _id: -1 })
                                .toArray(function (_err, items) {
                                res.send(JSON.stringify(items));
                            });
                        });
                    }
                    catch (err) {
                        res.status(500).send({ Error: err.toString() });
                    }
                });
                return [2 /*return*/];
        }
    });
}); });
router.post('/add-item', sessionChecker, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var imageFile, collection;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.files || Object.keys(req.files).length === 0) {
                    return [2 /*return*/, res.status(500).send({ Error: 'No file provided' })];
                }
                imageFile = req.files.logo;
                return [4 /*yield*/, getCollection('items')];
            case 1:
                collection = _a.sent();
                imageFile.mv("../public/images/".concat(imageFile.name), function (err) {
                    if (err) {
                        return res.status(500).send({ Error: err.toString() });
                    }
                    try {
                        collection
                            .insertOne(__assign(__assign({}, req.body), { logo: imageFile.name }))
                            .then(function () {
                            collection
                                .find()
                                .sort({ _id: -1 })
                                .toArray(function (_err, items) {
                                res.send(JSON.stringify(items));
                            });
                        });
                    }
                    catch (err) {
                        res.status(500).send({ Error: err.toString() });
                    }
                });
                return [2 /*return*/];
        }
    });
}); });
router.get('/add-user', sessionChecker, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var collection, result, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, getCollection('users')];
            case 1:
                collection = _a.sent();
                return [4 /*yield*/, collection.insertOne(req.query)];
            case 2:
                result = _a.sent();
                res.send(JSON.stringify(result));
                return [3 /*break*/, 4];
            case 3:
                err_6 = _a.sent();
                res.status(500).send({ Error: err_6.toString() });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.get('/users', sessionChecker, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var collection, result, err_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, getCollection('users')];
            case 1:
                collection = _a.sent();
                return [4 /*yield*/, collection.find().toArray()];
            case 2:
                result = _a.sent();
                res.send(JSON.stringify(result));
                return [3 /*break*/, 4];
            case 3:
                err_7 = _a.sent();
                res.status(500).send({ Error: err_7.toString() });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
