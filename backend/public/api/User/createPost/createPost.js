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
    createPost: function () {
      var _createPost = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(_, args) {
        var image, caption, description, category;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                image = args.image, caption = args.caption, description = args.description, category = args.category;
                _context.next = 3;
                return _prismaClient.prisma.createPost({
                  image: image,
                  caption: caption,
                  description: description,
                  category: category,
                  user: {
                    connect: {
                      id: "ckaburcwg28640941zs77r9c8"
                    }
                  }
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

      function createPost(_x, _x2) {
        return _createPost.apply(this, arguments);
      }

      return createPost;
    }()
  }
};
exports.default = _default;