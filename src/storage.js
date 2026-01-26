// namespace for storage 
const CmdkStorage = {
    get: async (key) => {
        try {
            return await chrome.storage.local.get(key);
        } catch (e) {
            CmdkStorage.handleError(e);
            return {};
        }
    },

    set: async (items) => {
        try {
            await chrome.storage.local.set(items);
        } catch (e) {
            CmdkStorage.handleError(e);
        }
    },

    handleError: (e) => {
        if (e.message && e.message.includes('Extension context invalidated')) {
            console.warn('[LeetCode CMDK] Extension updated. Reloading page...');
            alert("LeetCode CMDK has been updated. The page will now refresh.");
            location.reload();
        } else {
            console.error('[LeetCode CMDK] Storage Error:', e);
        }
    }
};

window.CmdkStorage = CmdkStorage;
