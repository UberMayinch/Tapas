import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from "@google/generative-ai";
import path from 'path';
import { fileURLToPath } from 'url';
import * as promptProcessors from './utils/promptProcessors.js';

// Get directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(morgan('dev'));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Simple prompt endpoint (existing functionality)
app.post('/api/generate', async (req, res) => {
  try {
    const { prompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // Generate content using Gemini
    const result = await model.generateContent(prompt);
    const response = result.response.text();
    
    return res.status(200).json({ 
      success: true, 
      response,
      originalPrompt: prompt
    });
  } catch (error) {
    console.error('Error generating content:', error);
    return res.status(500).json({ 
      success: false, 
      error: error.message || 'Failed to generate content' 
    });
  }
});

// Advanced prompt endpoint with processing chain
app.post('/api/generate/advanced', async (req, res) => {
  try {
    const { prompt, processingSteps = [] } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }
    
    // Process the prompt through the chain of processors
    const processedPrompt = promptProcessors.processPromptChain(prompt, processingSteps);
    
    // Generate content using processed prompt
    const result = await model.generateContent(processedPrompt);
    const response = result.response.text();
    
    return res.status(200).json({ 
      success: true, 
      response,
      originalPrompt: prompt,
      processedPrompt
    });
  } catch (error) {
    console.error('Error processing prompt chain:', error);
    return res.status(500).json({ 
      success: false, 
      error: error.message || 'Failed to process prompt chain' 
    });
  }
});

// Batch processing of multiple prompts
app.post('/api/generate/batch', async (req, res) => {
  try {
    const { prompts } = req.body;
    
    if (!prompts || !Array.isArray(prompts) || prompts.length === 0) {
      return res.status(400).json({ error: 'Array of prompts is required' });
    }
    
    const results = [];
    
    for (const promptItem of prompts) {
      const { prompt, processingSteps = [] } = promptItem;
      
      // Process the prompt if processing steps are provided
      const processedPrompt = processingSteps.length > 0 ? 
        promptProcessors.processPromptChain(prompt, processingSteps) : prompt;
      
      // Generate content
      const result = await model.generateContent(processedPrompt);
      
      results.push({
        originalPrompt: prompt,
        processedPrompt,
        response: result.response.text()
      });
    }
    
    return res.status(200).json({ 
      success: true, 
      results
    });
  } catch (error) {
    console.error('Error processing batch prompts:', error);
    return res.status(500).json({ 
      success: false, 
      error: error.message || 'Failed to process batch prompts' 
    });
  }
});

// Basic health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API endpoints available at:`);
  console.log(`- http://localhost:${PORT}/api/generate`);
  console.log(`- http://localhost:${PORT}/api/generate/advanced`);
  console.log(`- http://localhost:${PORT}/api/generate/batch`);
});
