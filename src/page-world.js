// This script runs in the main page context to access window.monaco and manipulate the editor

// 1. Listen for "Insert Snippet" commands from the popup (content scripts)
window.addEventListener('message', (event) => {
    if (event.source === window && event.data.type === 'LEETCODE_CMDK_INSERT') {
        insertSnippet(event.data.code);
    }
});

// Helper to safely insert text into the active editor
function insertSnippet(text) {
    try {
        const editor = getActiveEditor();
        if (!editor) return;

        // Use SnippetController for smart vscode-like insertion (handles tabstops)
        const contributor = editor.getContribution('snippetController2');
        if (contributor) {
            editor.focus();
            contributor.insert(text);
        } else {
            // Fallback: Simulate normal text insertion
            editor.trigger('keyboard', 'type', { text: text });
        }
    } catch (err) {
        console.error('[LeetCode CMDK] Insert failed', err);
    }
}

// Helper to find the currently focused or main editor
function getActiveEditor() {
    if (!window.monaco || !window.monaco.editor) return null;
    const editors = window.monaco.editor.getEditors();
    if (!editors.length) return null;
    return editors.find(e => e.hasTextFocus()) || editors[0];
}

// 2. Initialize Autocomplete (Snippets as you type)
const Autocomplete = {
    init(retries = 20) {
        // this exists because monaco might not be loaded yet when our script runs
        if (!window.monaco || !window.LEETCODE_CMDK_SNIPPETS) {
            if (retries > 0) setTimeout(() => this.init(retries - 1), 500);
            return;
        }
        
        this.registerProviders();
        this.enableSuggestions();

    },

    registerProviders() {
        const snippets = window.LEETCODE_CMDK_SNIPPETS;
        const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        const triggers = ['.', ...alphabet]; // Trigger on '.' or any letter

        Object.keys(snippets).forEach(lang => {
            monaco.languages.registerCompletionItemProvider(lang, {
                triggerCharacters: triggers,
                provideCompletionItems: (model, position) => {
                    // Calculate range to replace the current word
                    const word = model.getWordUntilPosition(position);
                    const range = {
                        startLineNumber: position.lineNumber,
                        endLineNumber: position.lineNumber,
                        startColumn: word.startColumn,
                        endColumn: word.endColumn
                    };

                    // Map our snippets to Monaco suggestions
                    const suggestions = snippets[lang].map((s, index) => ({
                        label: s.label,
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: s.code,
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: s.desc,
                        detail: 'LeetCode CMDK',
                        sortText: String(index).padStart(5, '0'), // 00000, 00001 (Priority Order)
                        range: range
                    }));

                    return { suggestions: suggestions };
                }
            });
        });
    },

    // LeetCode disables suggestions by default; we force them on
    enableSuggestions() {
        const forceEnable = () => {
            if (!window.monaco || !window.monaco.editor) return;
            window.monaco.editor.getEditors().forEach(editor => {
                editor.updateOptions({
                    quickSuggestions: { other: true, comments: true, strings: true },
                    suggestOnTriggerCharacters: true
                });
            });
        };

        // Run immediately and periodically (as editors load lazily)
        forceEnable();
        setInterval(forceEnable, 2000);
        window.monaco.editor.onDidCreateEditor(() => setTimeout(forceEnable, 500));
    }
};

Autocomplete.init();
