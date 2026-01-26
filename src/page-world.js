// This script runs in the MAIN page context, so it can access window.monaco
window.addEventListener('message', (event) => {
    // Security check: only accept messages from same window (content script)
    if (event.source !== window) return;

    if (event.data.type === 'LEETCODE_CMDK_INSERT') {
        insertSnippet(event.data.code);
    }
});

function insertSnippet(text) {
    try {
        // Try to find the Monaco Editor instance
        // LeetCode usually exposes 'monaco' global
        if (!window.monaco || !window.monaco.editor) {
            console.error('[LeetCode CMDK] Monaco Snippet Controller not found.');
            return;
        }

        const editors = window.monaco.editor.getEditors();
        if (!editors || editors.length === 0) return;

        // Use the focused editor or the first one
        // On LeetCode, there's usually just one main editor.
        // We filter for the one that likely has focus or is the code editor.
        let editor = editors.find(e => e.hasTextFocus());
        if (!editor) editor = editors[0]; // Fallback

        if (editor) {
            // Use the SnippetController2 contribution to handle tabstops/placeholders
            const snippetController = editor.getContribution('snippetController2');
            
            if (snippetController) {
                editor.focus(); // Ensure focus
                snippetController.insert(text);
            } else {
                // Fallback to simple text insertion
                editor.trigger('keyboard', 'type', { text: text });
            }
        }
    } catch (e) {
        console.error('[LeetCode CMDK] Insert Failed:', e);
    }
}
