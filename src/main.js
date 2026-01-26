window.PREFERRED_LANG = null;

(async function init() {
    console.log('[LeetCode CMDK] Initializing...');

    // Inject Page World Script
    const script = document.createElement('script');
    script.src = chrome.runtime.getURL('src/page-world.js');
    script.onload = () => script.remove();
    (document.head || document.documentElement).appendChild(script);

    // Load language preference
    const data = await CmdkStorage.get('preferred_language');
    if (data && data.preferred_language) {
        window.PREFERRED_LANG = data.preferred_language;
    }

    // Listen to hotkey
    document.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault(); 
            e.stopPropagation(); 
            CmdkUI.toggle(window.PREFERRED_LANG);
        }
    }, true);

})();
