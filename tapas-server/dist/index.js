"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
const connection_1 = __importDefault(require("./database/connection"));
// Load environment variables
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
// Test database connection and start server
async function startServer() {
    try {
        // Authenticate database connection
        await connection_1.default.authenticate();
        console.log('Database connection established successfully');
        // Sync database models (only in development)
        if (process.env.NODE_ENV === 'development') {
            await connection_1.default.sync({ alter: true });
            console.log('Database models synchronized');
        }
        // Start Express server
        app_1.default.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    }
    catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}
startServer();
