const CmdkUI = {
    overlayId: 'leetcode-cmdk-overlay',
    
    // --- Helpers ---
    escapeHtml: (text) => {
        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    },

    copyToClipboard: (text) => {
        navigator.clipboard.writeText(text).catch(err => {
            console.error('Copy failed', err);
        });
    },

    // --- Core UI ---
    isVisible: () => {
        const overlay = document.getElementById(CmdkUI.overlayId);
        return overlay && overlay.classList.contains('visible');
    },

    toggle: (preferredLang) => {
        if (CmdkUI.isVisible()) {
            CmdkUI.close();
            return false;
        }
        CmdkUI.render(preferredLang);
        return true;
    },

    close: () => {
        const overlay = document.getElementById(CmdkUI.overlayId);
        if (overlay) {
            overlay.classList.remove('visible');
            document.body.style.overflow = '';
            setTimeout(() => overlay.remove(), 200);
        }
    },

    render: (preferredLang) => {
        // Create Container
        let container = document.getElementById('leetcode-cmdk-container');
        //reuse container if exists 
        if (!container) {
            container = document.createElement('div');
            container.id = 'leetcode-cmdk-container';
            document.body.appendChild(container);
        }

        container.innerHTML = `
            <div id="${CmdkUI.overlayId}" class="visible">
                <div class="cmdk-modal"></div>
            </div>
        `;
        document.body.style.overflow = 'hidden';

        const overlay = document.getElementById(CmdkUI.overlayId);
        const modal = overlay.querySelector('.cmdk-modal');

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) CmdkUI.close();
        });

        if (!preferredLang) {
            CmdkUI.renderLanguageSelector(modal);
        } else {
            CmdkUI.renderSnippets(modal, preferredLang);
        }
    },

    renderLanguageSelector: (modal) => {
        modal.innerHTML = `
            <div class="lang-select-content">
                <div class="lang-select-title">Select Language</div>
                <div class="lang-options">
                    <button class="lang-btn" data-lang="java">Java</button>
                    <button class="lang-btn" data-lang="cpp">C++</button>
                </div>
            </div>
        `;

        const btns = modal.querySelectorAll('.lang-btn');
        if (btns.length > 0) btns[0].focus();

        btns.forEach((btn, index) => {
            btn.addEventListener('click', () => CmdkUI.setLanguage(btn.dataset.lang, modal));
            btn.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowRight' && index < btns.length - 1) btns[index + 1].focus();
                if (e.key === 'ArrowLeft' && index > 0) btns[index - 1].focus();
            });
        });
    },

    setLanguage: (lang, modal) => {
        CmdkStorage.set({ 'preferred_language': lang });
        // Update global state in main.js is hard without callback/event.
        // Simplified: Just re-render. Main.js will pick it up next time or we update a global?
        // Let's use the window global for state to keep it simple across files.
        window.PREFERRED_LANG = lang; 
        CmdkUI.renderSnippets(modal, lang);
    },

    renderSnippets: (modal, lang) => {
        const snippets = window.LEETCODE_CMDK_SNIPPETS[lang] || [];
        const snippetsHtml = snippets.map((s, idx) => `
            <div class="snippet-item" data-index="${idx}">
                <div class="snippet-info">
                    <div class="snippet-label">${s.label}</div>
                    <div class="snippet-desc">${s.desc}</div>
                    <div class="snippet-code-preview">${CmdkUI.escapeHtml(s.code)}</div>
                </div>
                <div class="snippet-actions">
                    <button class="insert-btn" data-code="${CmdkUI.escapeHtml(s.code)}">Insert</button>
                    <button class="copy-btn" data-code="${CmdkUI.escapeHtml(s.code)}" title="Copy to Clipboard">Copy</button>
                </div>
            </div>
        `).join('');

        const label = lang === 'cpp' ? 'C++' : 'Java';
        const action = lang === 'cpp' ? 'Switch to Java' : 'Switch to C++';

        modal.innerHTML = `
            <div class="cmdk-header">
                <div class="header-top">
                    <input type="text" class="cmdk-input" placeholder="Search ${label} syntax..." autofocus>
                    <button class="lang-toggle-btn" tabindex="-1">${action}</button>
                </div>
            </div>
            <div class="cmdk-body">
                ${snippetsHtml}
            </div>
        `;

        const input = modal.querySelector('.cmdk-input');
        const body = modal.querySelector('.cmdk-body');

        // Navigation
        CmdkUI.setupNavigation(input, body);

        // Toggle
        modal.querySelector('.lang-toggle-btn').addEventListener('click', () => {
             const newLang = lang === 'cpp' ? 'java' : 'cpp';
             CmdkUI.setLanguage(newLang, modal);
        });

        // Click Delegation
        body.addEventListener('click', (e) => {
            const code = e.target.dataset.code; 
            
            // 1. Explicit Copy Button
            if (e.target.classList.contains('copy-btn')) {
                e.stopPropagation(); // Prevent row click
                CmdkUI.triggerCopy(code, e.target);
                return;
            }

            // 2. Explicit Insert Button
            if (e.target.classList.contains('insert-btn')) {
                e.stopPropagation();
                CmdkUI.triggerInsert(code, e.target);
                return;
            }
            
            // 3. Row Click (Default -> Insert)
            const item = e.target.closest('.snippet-item');
            if (item) {
                // Find code from the insert button inside this row to be safe
                const btn = item.querySelector('.insert-btn'); 
                if (btn) CmdkUI.triggerInsert(btn.dataset.code, btn);
            }
        });
    },

    setupNavigation: (input, body) => {
        let idx = 0;
        const items = () => Array.from(body.querySelectorAll('.snippet-item'))
                                 .filter(el => el.style.display !== 'none');

        const update = () => {
            const visible = items();
            visible.forEach(el => el.classList.remove('selected'));
            if (visible.length === 0) return;
            
            if (idx >= visible.length) idx = 0;
            if (idx < 0) idx = visible.length - 1;
            
            const sel = visible[idx];
            sel.classList.add('selected');
            CmdkUI.ensureVisible(sel, body);
        };

        update();
        input.focus();

        body.addEventListener('mousemove', () => body.classList.remove('no-hover-interaction'));

        input.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            body.querySelectorAll('.snippet-item').forEach(item => {
                const text = item.innerText.toLowerCase();
                item.style.display = text.includes(term) ? 'flex' : 'none';
            });
            idx = 0;
            update();
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                body.classList.add('no-hover-interaction');
                idx++;
                update();
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                body.classList.add('no-hover-interaction');
                idx--;
                update();
            } else if (e.key === 'Enter') {
                e.preventDefault();
                const visible = items();
                if (visible.length > 0) {
                    const btn = visible[idx].querySelector('.insert-btn'); // Default Action: Insert
                    if (btn) CmdkUI.triggerInsert(btn.dataset.code, btn);
                }
            }
        });
    },

    ensureVisible: (el, container) => {
        const padding = 60;
        const eTop = el.offsetTop;
        const eBot = eTop + el.offsetHeight;
        const cTop = container.scrollTop;
        const cBot = cTop + container.offsetHeight;

        if (eTop < cTop + padding) {
            container.scrollTop = Math.max(0, eTop - padding);
        } else if (eBot > cBot - padding) {
            container.scrollTop = eBot - container.offsetHeight + padding;
        }
    },

    triggerInsert: (code, btn) => {
        window.postMessage({ type: 'LEETCODE_CMDK_INSERT', code: code }, '*');
        
        // Also copy as backup
        CmdkUI.copyToClipboard(code);

        if (btn) {
            const originalText = btn.innerText;
            btn.innerText = "Inserted!";
            btn.style.color = "#4caf50";
            btn.style.borderColor = "#4caf50";
        }
        setTimeout(() => CmdkUI.close(), 200);
    },

    triggerCopy: (code, btn) => {
        CmdkUI.copyToClipboard(code);
        if (btn) {
            const originalText = btn.innerText;
            btn.innerText = "Copied!";
            btn.style.color = "#4caf50";
            btn.style.borderColor = "#4caf50";
            
            setTimeout(() => {
                 btn.innerText = originalText;
                 btn.style.color = "";
                 btn.style.borderColor = "";
            }, 1000);
        }
        // Do NOT close on copy, user might want to keep browsing or copy multiple? 
        // Or close? User said "copy if that button is pressed". Usually means separate action.
        // Let's close for consistency, or keep open. User didn't specify.
        // Let's close to be safe.
        setTimeout(() => CmdkUI.close(), 200);
    }
};

window.CmdkUI = CmdkUI;
