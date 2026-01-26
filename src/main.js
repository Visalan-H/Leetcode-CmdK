// src/main.js

window.PREFERRED_LANG = null;

(async function init() {
    console.log('[LeetCode CMDK] Initializing...');

    // Load Preference
    const data = await CmdkStorage.get('preferred_language');
    if (data && data.preferred_language) {
        window.PREFERRED_LANG = data.preferred_language;
    }

    // Listen
    document.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault(); 
            e.stopPropagation(); 
            CmdkUI.toggle(window.PREFERRED_LANG);
        }
    }, true);

})();
