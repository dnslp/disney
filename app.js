let manifest = null;
let currentFolder = null;
let currentPath = [];
let isMuted = false;

// Text-to-speech functionality
const speech = {
    speak: (text) => {
        if (isMuted || !window.speechSynthesis) return;
        
        // Cancel any ongoing speech
        window.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        utterance.pitch = 1.1;
        utterance.volume = 0.8;
        
        window.speechSynthesis.speak(utterance);
    },
    
    stop: () => {
        if (window.speechSynthesis) {
            window.speechSynthesis.cancel();
        }
    }
};

const elements = {
    loading: document.getElementById('loading'),
    foldersGrid: document.getElementById('foldersGrid'),
    imagesGrid: document.getElementById('imagesGrid'),
    backBtn: document.getElementById('backBtn'),
    breadcrumb: document.getElementById('breadcrumb'),
    searchInput: document.getElementById('searchInput'),
    muteBtn: document.getElementById('muteBtn'),
    lightbox: document.getElementById('lightbox'),
    lightboxImg: document.getElementById('lightboxImg'),
    lightboxCaption: document.getElementById('lightboxCaption')
};

// Initialize the app
async function init() {
    try {
        const response = await fetch('images-manifest.json');
        manifest = await response.json();
        elements.loading.style.display = 'none';
        showFolders();
        setupEventListeners();
    } catch (error) {
        console.error('Error loading manifest:', error);
        elements.loading.textContent = 'Error loading images. Please run: node generate-manifest.js';
    }
}

function showFolders(searchTerm = '') {
    focusedIndex = -1;
    elements.foldersGrid.style.display = 'grid';
    elements.imagesGrid.style.display = 'none';
    elements.backBtn.style.display = 'none';
    currentFolder = null;
    currentPath = [];
    updateBreadcrumb();
    
    let folders = manifest.folders;
    
    if (searchTerm) {
        folders = folders.filter(f => 
            f.displayName.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    
    elements.foldersGrid.innerHTML = folders.map(folder => {
        const previewHtml = createFolderPreview(folder);
        
        return `
            <div class="folder-card" data-folder="${folder.name}">
                ${previewHtml}
                <div class="folder-info">
                    <div class="folder-name">${folder.displayName}</div>
                    <div class="folder-count">${folder.count} image${folder.count !== 1 ? 's' : ''}</div>
                </div>
            </div>
        `;
    }).join('');
    
    // Add click handlers
    document.querySelectorAll('.folder-card').forEach(card => {
        card.addEventListener('click', () => {
            const folderName = card.dataset.folder;
            const folder = manifest.folders.find(f => f.name === folderName);
            if (folder) {
                speech.speak(folder.displayName);
            }
            openFolder(folderName);
        });
    });
}

function createFolderPreview(folder) {
    // Determine the image directory based on manifest format
    const imageDir = manifest.format === 'webp' ? 'downloads-webp' : 'downloads';
    
    if (folder.preview.length === 0) {
        return `
            <div class="folder-preview">
                <div class="folder-placeholder">${folder.displayName.charAt(0)}</div>
            </div>
        `;
    }
    
    if (folder.preview.length === 1) {
        return `
            <div class="folder-preview single">
                <img src="${imageDir}/${folder.name}/${folder.preview[0]}" alt="${folder.displayName}">
            </div>
        `;
    }
    
    // Create a 2x2 grid of preview images (no duplicates)
    const previewImages = folder.preview.slice(0, 4);
    
    let previewClass = 'folder-preview';
    if (previewImages.length === 2) {
        previewClass += ' two-images';
    } else if (previewImages.length === 3) {
        previewClass += ' three-images';
    }
    
    return `
        <div class="${previewClass}">
            ${previewImages.map(img => 
                `<img src="${imageDir}/${folder.name}/${img}" alt="${folder.displayName}">`
            ).join('')}
        </div>
    `;
}

function openFolder(folderName) {
    currentFolder = manifest.folders.find(f => f.name === folderName);
    if (!currentFolder) return;
    
    currentPath = [currentFolder.displayName];
    updateBreadcrumb();
    showImages();
}

function showImages(searchTerm = '') {
    if (!currentFolder) return;
    
    focusedIndex = -1;
    
    // Determine the image directory based on manifest format
    const imageDir = manifest.format === 'webp' ? 'downloads-webp' : 'downloads';
    
    elements.foldersGrid.style.display = 'none';
    elements.imagesGrid.style.display = 'grid';
    elements.backBtn.style.display = 'block';
    
    let images = currentFolder.images;
    
    if (searchTerm) {
        images = images.filter(img => 
            img.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    
    elements.imagesGrid.innerHTML = images.map(image => {
        const imageName = image.replace(/\.[^/.]+$/, '').replace(/_/g, ' ');
        
        return `
            <div class="image-card" data-image="${image}">
                <img src="${imageDir}/${currentFolder.name}/${image}" alt="${imageName}">
                <div class="image-name" title="${imageName}">${imageName}</div>
            </div>
        `;
    }).join('');
    
    // Add click handlers for lightbox
    document.querySelectorAll('.image-card').forEach(card => {
        card.addEventListener('click', () => {
            const imageName = card.dataset.image;
            const cleanName = imageName.replace(/\.[^/.]+$/, '').replace(/_/g, ' ');
            speech.speak(cleanName);
            openLightbox(`${imageDir}/${currentFolder.name}/${imageName}`, imageName);
        });
    });
}

function openLightbox(imageSrc, imageName) {
    elements.lightbox.style.display = 'block';
    elements.lightboxImg.src = imageSrc;
    elements.lightboxCaption.textContent = imageName.replace(/\.[^/.]+$/, '').replace(/_/g, ' ');
}

function closeLightbox() {
    elements.lightbox.style.display = 'none';
}

function updateBreadcrumb() {
    const breadcrumbHtml = ['Home', ...currentPath].map((item, index) => {
        const isLast = index === currentPath.length;
        return `<span class="breadcrumb-item" data-index="${index}">${item}</span>`;
    }).join('');
    
    elements.breadcrumb.innerHTML = breadcrumbHtml;
    
    // Add click handlers
    document.querySelectorAll('.breadcrumb-item').forEach(item => {
        item.addEventListener('click', () => {
            const index = parseInt(item.dataset.index);
            if (index === 0) {
                showFolders();
            }
        });
    });
}

function setupEventListeners() {
    // Mute button
    elements.muteBtn.addEventListener('click', () => {
        isMuted = !isMuted;
        elements.muteBtn.classList.toggle('muted', isMuted);
        elements.muteBtn.querySelector('.mute-icon').textContent = isMuted ? '🔇' : '🔊';
        if (isMuted) {
            speech.stop();
        } else {
            speech.speak('Sound enabled');
        }
    });
    
    // Back button
    elements.backBtn.addEventListener('click', () => {
        speech.speak('Back to folders');
        showFolders();
        elements.searchInput.value = '';
    });
    
    // Search
    elements.searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value;
        if (currentFolder) {
            showImages(searchTerm);
        } else {
            showFolders(searchTerm);
        }
    });
    
    // Lightbox close
    elements.lightbox.addEventListener('click', (e) => {
        if (e.target === elements.lightbox || e.target.classList.contains('lightbox-close')) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation
    let focusedIndex = -1;
    
    document.addEventListener('keydown', (e) => {
        // Help overlay
        if (e.key === '?' || (e.key === '/' && e.shiftKey)) {
            toggleHelpOverlay();
            return;
        }
        
        // Escape key handling
        if (e.key === 'Escape') {
            if (document.getElementById('helpOverlay')?.style.display === 'block') {
                toggleHelpOverlay();
            } else if (elements.lightbox.style.display === 'block') {
                closeLightbox();
            } else if (currentFolder) {
                showFolders();
                elements.searchInput.value = '';
            }
            return;
        }
        
        // Focus search with '/'
        if (e.key === '/' && !e.shiftKey && e.target !== elements.searchInput) {
            e.preventDefault();
            elements.searchInput.focus();
            return;
        }
        
        // Mute toggle with 'm'
        if (e.key === 'm' && e.target !== elements.searchInput) {
            elements.muteBtn.click();
            return;
        }
        
        // Grid navigation with arrow keys
        if (e.target !== elements.searchInput && elements.lightbox.style.display !== 'block') {
            const grid = currentFolder ? elements.imagesGrid : elements.foldersGrid;
            if (grid.style.display !== 'none') {
                const items = grid.querySelectorAll(currentFolder ? '.image-card' : '.folder-card');
                
                if (items.length > 0) {
                    const columns = Math.floor(grid.offsetWidth / items[0].offsetWidth);
                    
                    switch(e.key) {
                        case 'ArrowRight':
                            e.preventDefault();
                            focusedIndex = (focusedIndex + 1) % items.length;
                            focusItem(items[focusedIndex]);
                            break;
                        case 'ArrowLeft':
                            e.preventDefault();
                            focusedIndex = focusedIndex <= 0 ? items.length - 1 : focusedIndex - 1;
                            focusItem(items[focusedIndex]);
                            break;
                        case 'ArrowDown':
                            e.preventDefault();
                            focusedIndex = (focusedIndex + columns) % items.length;
                            focusItem(items[focusedIndex]);
                            break;
                        case 'ArrowUp':
                            e.preventDefault();
                            focusedIndex = focusedIndex - columns < 0 ? 
                                focusedIndex + items.length - (items.length % columns || columns) : 
                                focusedIndex - columns;
                            focusItem(items[focusedIndex]);
                            break;
                        case 'Enter':
                            if (focusedIndex >= 0 && focusedIndex < items.length) {
                                items[focusedIndex].click();
                            }
                            break;
                    }
                }
            }
        }
    });
    
    function focusItem(item) {
        document.querySelectorAll('.folder-card, .image-card').forEach(el => {
            el.classList.remove('keyboard-focus');
        });
        item.classList.add('keyboard-focus');
        item.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Speak the item name when focused via keyboard
        if (item.classList.contains('folder-card')) {
            const folderName = item.dataset.folder;
            const folder = manifest.folders.find(f => f.name === folderName);
            if (folder) {
                speech.speak(folder.displayName);
            }
        } else if (item.classList.contains('image-card')) {
            const imageName = item.dataset.image;
            const cleanName = imageName.replace(/\.[^/.]+$/, '').replace(/_/g, ' ');
            speech.speak(cleanName);
        }
    }
    
    function toggleHelpOverlay() {
        let overlay = document.getElementById('helpOverlay');
        
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'helpOverlay';
            overlay.className = 'help-overlay';
            overlay.innerHTML = `
                <div class="help-content">
                    <h2>Keyboard Shortcuts</h2>
                    <div class="shortcuts-grid">
                        <div class="shortcut"><kbd>?</kbd><span>Show this help</span></div>
                        <div class="shortcut"><kbd>/</kbd><span>Focus search</span></div>
                        <div class="shortcut"><kbd>Esc</kbd><span>Go back / Close</span></div>
                        <div class="shortcut"><kbd>m</kbd><span>Toggle mute</span></div>
                        <div class="shortcut"><kbd>←</kbd><kbd>→</kbd><span>Navigate items</span></div>
                        <div class="shortcut"><kbd>↑</kbd><kbd>↓</kbd><span>Navigate rows</span></div>
                        <div class="shortcut"><kbd>Enter</kbd><span>Open selected</span></div>
                    </div>
                    <div class="help-close">Press <kbd>Esc</kbd> or <kbd>?</kbd> to close</div>
                </div>
            `;
            document.body.appendChild(overlay);
        }
        
        if (overlay.style.display === 'block') {
            overlay.style.display = 'none';
            speech.speak('Help closed');
        } else {
            overlay.style.display = 'block';
            speech.speak('Keyboard shortcuts. Press escape to close');
        }
    }
}

// Start the app
init();