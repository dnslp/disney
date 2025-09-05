let manifest = null;
let currentFolder = null;
let currentPath = [];

const elements = {
    loading: document.getElementById('loading'),
    foldersGrid: document.getElementById('foldersGrid'),
    imagesGrid: document.getElementById('imagesGrid'),
    backBtn: document.getElementById('backBtn'),
    breadcrumb: document.getElementById('breadcrumb'),
    searchInput: document.getElementById('searchInput'),
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
    // Back button
    elements.backBtn.addEventListener('click', () => {
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
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (elements.lightbox.style.display === 'block') {
                closeLightbox();
            } else if (currentFolder) {
                showFolders();
                elements.searchInput.value = '';
            }
        }
    });
}

// Start the app
init();