"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var socket_io_1 = __importDefault(require("socket.io"));
var http_1 = __importDefault(require("http"));
require("reflect-metadata");
var port = process.env.PORT == undefined ? 3000 : process.env.PORT;
var app = express_1.default();
var httpServer = new http_1.default.Server(app);
var io = socket_io_1.default(httpServer);
var password = 'love';
app.get('/', function (req, res) {
    res.send('hello world');
});
io.on('connection', function (socket) {
    console.log('user connected!');
    socket.on('buttonPress', function (message) {
        if (message.password != password) {
            return;
        }
        io.emit('message', message);
    });
});
httpServer.listen(port, function () {
    console.log("listening on port " + port);
});
