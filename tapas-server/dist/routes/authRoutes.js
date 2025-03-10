"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = __importDefault(require("../controllers/authController"));
const firebaseAuthMiddleware_1 = require("../middleware/firebaseAuthMiddleware");
const router = (0, express_1.Router)();
// Get current user profile (authenticated)
router.get('/me', firebaseAuthMiddleware_1.authenticate, authController_1.default.getCurrentUser);
// Update user profile (authenticated)
router.patch('/profile', firebaseAuthMiddleware_1.authenticate, authController_1.default.updateProfile);
exports.default = router;
