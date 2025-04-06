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


// Dedicated endpoint for Guru chat
app.post('/api/guru/chat', async (req, res) => {
    try {
        const { prompt, maxTokens = 300, temperature = 0.7, topP = 0.9 } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }

        // Add context for generating story descriptions
        const processedPrompt = promptProcessors.processPromptChain(prompt, [
            {
                processor: 'addContext',
                options: {
                    context: 'You are Guru Pal, a spiritual meditation guide. Generate four brief and unique descriptions (50-100 words each) of stories related to meditation and Hindu spirituality based on the user\'s prompt. Each description should provide a glimpse into the story and its spiritual significance.'
                }
            }
        ]);

        // Configure generation parameters
        const generationConfig = {
            maxOutputTokens: maxTokens,
            temperature: temperature,
            topP: topP,
        };

        // Generate content
        const result = await model.generateContent(processedPrompt, { generationConfig });
        const response = result.response.text();

        // Split the response into four descriptions (assuming the model generates them as separate paragraphs or sections)
        const descriptions = response.split('\n\n').slice(0, 4); // Adjust splitting logic if needed

        return res.status(200).json({
            success: true,
            descriptions,
            originalPrompt: prompt
        });
    } catch (error) {
        console.error('Error in guru chat:', error);
        return res.status(500).json({
            success: false,
            error: error.message || 'Failed to generate guru response'
        });
    }
});

app.post('/api/guru/story', async (req, res) => {
    try {
        const { storyChoice, maxTokens = 500, temperature = 0.7, topP = 0.9 } = req.body;

        if (!storyChoice) {
            return res.status(400).json({ error: 'Story choice is required' });
        }

        // Add context for generating a detailed story
        const processedPrompt = promptProcessors.processPromptChain(storyChoice, [
            {
                processor: 'addContext',
                options: {
                    context: 'You are Guru Pal, a spiritual meditation guide. Based on the selected story description, generate a detailed and insightful story related to meditation and Hindu spirituality. The story should be engaging and emphasize spiritual growth and mental wellness.'
                }
            }
        ]);

        // Configure generation parameters
        const generationConfig = {
            maxOutputTokens: maxTokens,
            temperature: temperature,
            topP: topP,
        };

        // Generate content
        const result = await model.generateContent(processedPrompt, { generationConfig });
        const detailedStory = result.response.text();

        return res.status(200).json({
            success: true,
            detailedStory,
            originalChoice: storyChoice
        });
    } catch (error) {
        console.error('Error in generating detailed story:', error);
        return res.status(500).json({
            success: false,
            error: error.message || 'Failed to generate detailed story'
        });
    }
});

// New endpoint for generating personalized journey exercises
app.post('/api/guru/personalized-journey', async (req, res) => {
    try {
        const { storyContent, maxTokens = 500, temperature = 0.7, topP = 0.9 } = req.body;

        if (!storyContent) {
            return res.status(400).json({ 
                success: false,
                error: 'Story content is required' 
            });
        }

        console.log('Generating personalized journey for story:', storyContent.substring(0, 100) + '...');

        // Create a prompt with context for generating personalized journey exercises
        const processedPrompt = promptProcessors.processPromptChain(storyContent, [
            {
                processor: 'addContext',
                options: {
                    context: `You are Guru Pal, a spiritual meditation guide. Based on the provided story, 
                    create 5 reflective exercises or questions that will help the user engage with the 
                    story's themes and apply its lessons to their life. Each exercise should encourage 
                    personal growth, mindfulness, or spiritual development. Format your response as 
                    structured data that can be parsed as JSON.`
                }
            },
            {
                processor: 'formatForOutput',
                options: {
                    format: 'Create a JSON array of 5 objects, where each object has a "question" field containing the exercise question and a "type" field indicating the type of reflection (e.g., "personal", "mindfulness", "application", "connection", "growth").'
                }
            }
        ]);

        // Configure generation parameters
        const generationConfig = {
            maxOutputTokens: maxTokens,
            temperature: temperature,
            topP: topP,
        };

        // Generate content
        const result = await model.generateContent(processedPrompt, { generationConfig });
        const response = result.response.text();
        
        console.log('AI response:', response.substring(0, 200) + '...');
        
        // Try to parse the response as JSON
        let journeyExercises = [];
        try {
            // Find JSON content (looking for array in square brackets)
            const jsonMatch = response.match(/\[[\s\S]*\]/);
            if (jsonMatch) {
                const jsonContent = jsonMatch[0];
                journeyExercises = JSON.parse(jsonContent);
            } else {
                // Fallback: Try to extract exercises using text parsing
                const exercises = response.split(/\d+\./).filter(item => item.trim().length > 0);
                journeyExercises = exercises.map(exercise => ({
                    question: exercise.trim(),
                    type: "reflection"
                }));
            }
            
            // Ensure we have valid exercises
            if (!Array.isArray(journeyExercises) || journeyExercises.length === 0) {
                throw new Error('Failed to extract exercises from response');
            }
            
            // Validate the structure of each exercise
            journeyExercises = journeyExercises.map(exercise => ({
                question: exercise.question || exercise.text || exercise.content || "Reflect on the story.",
                type: exercise.type || "reflection"
            }));
            
        } catch (parseError) {
            console.error('Error parsing journey exercises:', parseError);
            // Create default exercises as fallback
            journeyExercises = [
                { question: "What emotions did you feel while reading this story?", type: "emotional" },
                { question: "How does this story relate to your own life?", type: "personal" },
                { question: "What lesson or wisdom can you take from this story?", type: "learning" },
                { question: "How might you apply this wisdom in your daily life?", type: "application" },
                { question: "If you could change one aspect of the story, what would it be and why?", type: "creative" }
            ];
        }

        // Add journey metadata to the response
        return res.status(200).json({
            success: true,
            journeyTitle: "Your Personal Reflection Path",
            journeyDescription: "This journey will guide you through reflective exercises based on the story's wisdom.",
            journeyExercises,
            totalSteps: journeyExercises.length,
            originalStory: storyContent.substring(0, 100) + '...' // Return truncated story for reference
        });
    } catch (error) {
        console.error('Error generating personalized journey:', error);
        return res.status(500).json({
            success: false,
            error: error.message || 'Failed to generate personalized journey'
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
  console.log(`- http://localhost:${PORT}/api/guru/chat`);
});
