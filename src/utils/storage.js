const STORAGE_KEY = 'placement_prep_history';
const CURRENT_ANALYSIS_KEY = 'placement_prep_current';

// Get all history entries
export function getHistory() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading history:', error);
    return [];
  }
}

// Save a new analysis to history
export function saveAnalysis(analysis) {
  try {
    const history = getHistory();
    // Add to beginning of array (most recent first)
    history.unshift(analysis);
    // Keep only last 50 entries
    const trimmedHistory = history.slice(0, 50);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmedHistory));
    return true;
  } catch (error) {
    console.error('Error saving analysis:', error);
    return false;
  }
}

// Get a specific analysis by ID
export function getAnalysisById(id) {
  const history = getHistory();
  return history.find(entry => entry.id === id) || null;
}

// Update an existing analysis by ID
export function updateAnalysis(id, updates) {
  try {
    const history = getHistory();
    const index = history.findIndex(entry => entry.id === id);
    if (index === -1) return false;
    
    history[index] = { ...history[index], ...updates };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    return true;
  } catch (error) {
    console.error('Error updating analysis:', error);
    return false;
  }
}

// Delete an analysis by ID
export function deleteAnalysis(id) {
  try {
    const history = getHistory();
    const filtered = history.filter(entry => entry.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Error deleting analysis:', error);
    return false;
  }
}

// Clear all history
export function clearHistory() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing history:', error);
    return false;
  }
}

// Set current analysis (for viewing results)
export function setCurrentAnalysis(analysis) {
  try {
    localStorage.setItem(CURRENT_ANALYSIS_KEY, JSON.stringify(analysis));
    return true;
  } catch (error) {
    console.error('Error setting current analysis:', error);
    return false;
  }
}

// Get current analysis
export function getCurrentAnalysis() {
  try {
    const data = localStorage.getItem(CURRENT_ANALYSIS_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error getting current analysis:', error);
    return null;
  }
}

// Clear current analysis
export function clearCurrentAnalysis() {
  try {
    localStorage.removeItem(CURRENT_ANALYSIS_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing current analysis:', error);
    return false;
  }
}
