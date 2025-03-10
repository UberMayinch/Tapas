"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
class AuthController {
    /**
     * Get current user profile
     */
    async getCurrentUser(req, res) {
        try {
            if (!req.user) {
                return res.status(401).json({ message: 'Not authenticated' });
            }
            const user = await User_1.default.findOne({
                where: { id: req.user.id },
                attributes: ['id', 'username', 'email', 'createdAt'] // Exclude sensitive info
            });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    /**
     * Update user profile
     */
    async updateProfile(req, res) {
        try {
            if (!req.user) {
                return res.status(401).json({ message: 'Not authenticated' });
            }
            const { username } = req.body;
            if (!username) {
                return res.status(400).json({ message: 'Username is required' });
            }
            const user = await User_1.default.findByPk(req.user.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            user.username = username;
            await user.save();
            res.status(200).json({
                id: user.id,
                username: user.username,
                email: user.email
            });
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}
exports.default = new AuthController();
