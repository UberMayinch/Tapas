/**
 * Example client script demonstrating how to interact with the Tapas API
 * using direct POST requests and prompt processing chains
 */

// For Node.js environment
import fetch from 'node-fetch';
const fetchDefault = fetch.default || fetch;

// Base URL of the API
const API_BASE_URL = 'http://localhost:3000/api';

/**
 * Basic API call to generate content with a simple prompt
 */
async function basicPromptExample() {
  console.log('EXAMPLE 1: Basic Prompt');
  
  try {
    const response = await fetch(`${API_BASE_URL}/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: 'Explain the concept of prompt engineering in AI'
      })
    });
    
    const result = await response.json();
    
    if (result.success) {
      console.log('Response:', result.response);
    } else {
      console.error('Error:', result.error);
    }
  } catch (error) {
    console.error('Request failed:', error.message);
  }
  
  console.log('\n---\n');
}

/**
 * Advanced API call using prompt processing chains
 */
async function advancedPromptExample() {
  console.log('EXAMPLE 2: Advanced Prompt with Processing Chain');
  
  try {
    const response = await fetch(`${API_BASE_URL}/generate/advanced`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: 'Explain quantum computing',
        processingSteps: [
          {
            processor: 'addContext',
            options: {
              context: 'You are a quantum physics expert teaching undergraduate students'
            }
          },
          {
            processor: 'makeSpecific',
            options: {
              domain: 'quantum information theory'
            }
          },
          {
            processor: 'formatForOutput',
            options: {
              format: 'markdown'
            }
          },
          {
            processor: 'limitScope',
            options: {
              wordLimit: 300,
              focusArea: 'practical applications'
            }
          }
        ]
      })
    });
    
    const result = await response.json();
    
    if (result.success) {
      console.log('Original Prompt:', result.originalPrompt);
      console.log('Processed Prompt:', result.processedPrompt);
      console.log('Response:', result.response);
    } else {
      console.error('Error:', result.error);
    }
  } catch (error) {
    console.error('Request failed:', error.message);
  }
  
  console.log('\n---\n');
}

/**
 * Batch processing example with multiple prompts
 */
async function batchPromptExample() {
  console.log('EXAMPLE 3: Batch Processing Multiple Prompts');
  
  try {
    const response = await fetch(`${API_BASE_URL}/generate/batch`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompts: [
          {
            prompt: 'What is machine learning?',
            processingSteps: [
              {
                processor: 'makeSpecific',
                options: { domain: 'computer science' }
              }
            ]
          },
          {
            prompt: 'Explain blockchain technology',
            processingSteps: [
              { 
                processor: 'limitScope',
                options: { wordLimit: 150 }
              }
            ]
          },
          {
            prompt: 'How does a neural network work?',
            processingSteps: [
              {
                processor: 'formatForOutput',
                options: { format: 'step' }
              }
            ]
          }
        ]
      })
    });
    
    const result = await response.json();
    
    if (result.success) {
      result.results.forEach((item, index) => {
        console.log(`PROMPT ${index + 1}:`);
        console.log('Original:', item.originalPrompt);
        console.log('Processed:', item.processedPrompt);
        console.log('Response:', item.response.substring(0, 100) + '...');
        console.log();
      });
    } else {
      console.error('Error:', result.error);
    }
  } catch (error) {
    console.error('Request failed:', error.message);
  }
  
  console.log('\n---\n');
}

/**
 * Custom processor example with your own modification logic
 */
async function customProcessorExample() {
  console.log('EXAMPLE 4: Custom Processor');
  
  try {
    const response = await fetch(`${API_BASE_URL}/generate/advanced`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: 'Write a function to find prime numbers',
        processingSteps: [
          {
            processor: 'custom',
            options: {
              prefix: 'As a senior software engineer specializing in algorithm optimization:\n\n',
              suffix: '\n\nProvide the solution in both Python and JavaScript with time complexity analysis.'
            }
          }
        ]
      })
    });
    
    const result = await response.json();
    
    if (result.success) {
      console.log('Original Prompt:', result.originalPrompt);
      console.log('Processed Prompt:', result.processedPrompt);
      console.log('Response:', result.response);
    } else {
      console.error('Error:', result.error);
    }
  } catch (error) {
    console.error('Request failed:', error.message);
  }
}

// Run all examples
async function runAll() {
  await basicPromptExample();
  await advancedPromptExample();
  await batchPromptExample();
  await customProcessorExample();
  
  console.log('All examples completed!');
}

runAll();
