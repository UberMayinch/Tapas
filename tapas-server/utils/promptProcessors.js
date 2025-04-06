/**
 * Collection of prompt processors that can be chained together
 */

/**
 * Adds context to the prompt
 * @param {string} prompt - Original prompt
 * @param {object} options - Options for the processor
 * @returns {string} Modified prompt
 */
export const addContext = (prompt, options = {}) => {
  const context = options.context || "You are a helpful AI assistant";
  return `${context}\n\n${prompt}`;
};

/**
 * Makes the prompt more specific by adding details
 * @param {string} prompt - Original prompt
 * @param {object} options - Options for the processor
 * @returns {string} Modified prompt
 */
export const makeSpecific = (prompt, options = {}) => {
  const domainSpecificity = options.domain ? 
    `Focus on the ${options.domain} domain. ` : '';
  
  return `${prompt}\n\nPlease provide a comprehensive response. ${domainSpecificity}Include specific details, examples, and explanations where appropriate.`;
};

/**
 * Formats the prompt for a specific output format
 * @param {string} prompt - Original prompt
 * @param {object} options - Options for the processor
 * @returns {string} Modified prompt
 */
export const formatForOutput = (prompt, options = {}) => {
  const format = options.format || 'markdown';
  
  const formatInstructions = {
    markdown: 'Format your response in markdown with proper headings, lists, and code blocks.',
    json: 'Respond with a valid JSON object.',
    bullet: 'Format your response as a bulleted list of key points.',
    step: 'Format your response as a numbered list of steps.'
  };
  
  const instruction = formatInstructions[format] || formatInstructions.markdown;
  return `${prompt}\n\n${instruction}`;
};

/**
 * Limits the scope of the prompt
 * @param {string} prompt - Original prompt
 * @param {object} options - Options for the processor
 * @returns {string} Modified prompt
 */
export const limitScope = (prompt, options = {}) => {
  const wordLimit = options.wordLimit ? 
    `Limit your response to approximately ${options.wordLimit} words. ` : '';
  const focusArea = options.focusArea ? 
    `Focus specifically on ${options.focusArea}. ` : '';
    
  return `${prompt}\n\n${wordLimit}${focusArea}Be concise and to the point.`;
};

/**
 * Custom processor that allows you to define a custom modification
 * @param {string} prompt - Original prompt
 * @param {object} options - Options for the processor
 * @returns {string} Modified prompt
 */
export const custom = (prompt, options = {}) => {
  const prefix = options.prefix || '';
  const suffix = options.suffix || '';
  
  return `${prefix}${prompt}${suffix}`;
};

/**
 * Process a prompt through a series of processors
 * @param {string} originalPrompt - The original prompt
 * @param {Array} processingSteps - Array of processor objects {processor, options}
 * @returns {string} The final processed prompt
 */
export const processPromptChain = (originalPrompt, processingSteps = []) => {
  // Create a mapping of processor names to functions
  const processors = {
    addContext,
    makeSpecific,
    formatForOutput,
    limitScope,
    custom
  };
  
  return processingSteps.reduce((currentPrompt, step) => {
    const { processor, options = {} } = step;
    
    // If processor is a string, look it up in our processors object
    if (typeof processor === 'string' && processors[processor]) {
      return processors[processor](currentPrompt, options);
    }
    
    // If processor is a function, use it directly
    if (typeof processor === 'function') {
      return processor(currentPrompt, options);
    }
    
    // If processor doesn't exist, return the prompt unchanged
    return currentPrompt;
  }, originalPrompt);
};

// Export all processors
export default {
  addContext,
  makeSpecific,
  formatForOutput,
  limitScope,
  custom,
  processPromptChain
};
