# Tapas API Server

An Express server that provides an API for interacting with the Gemini AI model, featuring advanced prompt processing capabilities.

## Getting Started

1. Install dependencies:
   ```
   npm install
   ```

2. Make sure your `.env` file is set up with the required API key:
   ```
   API_KEY=your_gemini_api_key
   PORT=3000
   ```

3. Start the server:
   ```
   npm run dev
   ```

## API Endpoints

### 1. Basic Prompt Generation

**Endpoint:** `POST /api/generate`

**Request body:**
```json
{
  "prompt": "Your prompt text here"
}
```

**Response:**
```json
{
  "success": true,
  "response": "Generated text from Gemini API",
  "originalPrompt": "Your prompt text here"
}
```

### 2. Advanced Prompt Generation with Processing Chain

**Endpoint:** `POST /api/generate/advanced`

**Request body:**
```json
{
  "prompt": "Your prompt text here",
  "processingSteps": [
    {
      "processor": "processorName",
      "options": {
        "optionKey": "optionValue"
      }
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "response": "Generated text from Gemini API",
  "originalPrompt": "Your prompt text here",
  "processedPrompt": "Modified prompt after processing"
}
```

### 3. Batch Prompt Processing

**Endpoint:** `POST /api/generate/batch`

**Request body:**
```json
{
  "prompts": [
    {
      "prompt": "First prompt",
      "processingSteps": [
        {
          "processor": "processorName",
          "options": {
            "optionKey": "optionValue"
          }
        }
      ]
    },
    {
      "prompt": "Second prompt"
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "results": [
    {
      "originalPrompt": "First prompt",
      "processedPrompt": "Modified first prompt",
      "response": "Generated response for first prompt"
    },
    {
      "originalPrompt": "Second prompt",
      "processedPrompt": "Second prompt",
      "response": "Generated response for second prompt"
    }
  ]
}
```

## Available Prompt Processors

The following processors can be used in the `processingSteps` array:

1. **addContext**
   - Adds context/role to the prompt
   - Options:
     - `context`: Text defining the assistant's context or role

2. **makeSpecific**
   - Makes the prompt more detailed and specific
   - Options:
     - `domain`: The specific domain to focus on

3. **formatForOutput**
   - Instructs the model to output in a specific format
   - Options:
     - `format`: One of 'markdown', 'json', 'bullet', or 'step'

4. **limitScope**
   - Adds constraints to the prompt
   - Options:
     - `wordLimit`: Approximate word limit for the response
     - `focusArea`: Specific area to focus on

5. **custom**
   - Allows for custom modifications to the prompt
   - Options:
     - `prefix`: Text to add before the prompt
     - `suffix`: Text to add after the prompt

## Example Usage

Check the `examples/api-client.js` file for complete examples of how to use the API.

## Health Check

**Endpoint:** `GET /api/health`

Returns status information about the API server.
