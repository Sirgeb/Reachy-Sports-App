"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _prismaClient = require("../../../../generated/prisma-client");

var _default = {
  Mutation: {
    createAccount: function () {
      var _createAccount = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(_, args) {
        var firstname, lastname, email, avatar, facebookID, googleID;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                firstname = args.firstname, lastname = args.lastname, email = args.email, avatar = args.avatar, facebookID = args.facebookID, googleID = args.googleID;
                _context.next = 3;
                return _prismaClient.prisma.createUser({
                  firstname: firstname,
                  lastname: lastname,
                  email: email,
                  avatar: avatar,
                  facebookID: facebookID,
                  googleID: googleID
                });

              case 3:
                return _context.abrupt("return", true);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function createAccount(_x, _x2) {
        return _createAccount.apply(this, arguments);
      }

      return createAccount;
    }()
  }
};
exports.default = _default;