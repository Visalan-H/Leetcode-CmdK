window.PREFERRED_LANG = null;

(async function init() {


    // Inject Page World Script
    const snippetsScript = document.createElement('script');
    snippetsScript.src = chrome.runtime.getURL('snippets.js');
    snippetsScript.onload = () => {
        snippetsScript.remove();
        // Only load page-world after snippets are loaded
        const script = document.createElement('script');
        script.src = chrome.runtime.getURL('src/page-world.js');
        script.onload = () => script.remove();
        (document.head || document.documentElement).appendChild(script);
    };
    (document.head || document.documentElement).appendChild(snippetsScript);

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
