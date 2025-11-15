// Gallery Admin Panel with Browser-Based Image Processing
(function() {
    'use strict';

    // === Embedded Minified JSZip v3.10.1 (Core Functionality) ===
    var JSZip=function(){function e(t){return t}function t(e,t){for(var n=0,r=e.length;n<r;++n)t(e[n],n)}function n(e){return String.fromCharCode.apply(null,new Uint8Array(e))}function r(e){if(65537<=e.length)for(var t="",n=0;n<e.length;n++)t+=String.fromCharCode(e[n]);else t=String.fromCharCode.apply(null,e);return t}function i(e,t){this.index=0,this.dataIndex=0,this.data=e,this.type=t}function s(){this.files=[],this.root=""}function a(e,t,n){return e.slice?e.slice(t,t+n):new e.constructor(Array.prototype.slice.call(e,t,t+n))}function o(e,t){var n,r;for(t||(t=e.length),n=new ArrayBuffer(t),r=new Uint8Array(n),t=0;t<e.length;t++)r[t]=e.charCodeAt(t);return n}function l(e){return new Blob([e])}function f(e){return e instanceof Blob}function u(e){var t,n,r,i,s=0;for(r=0,i=e.length;r<i;r++)n=e[r],s+=n.length;for(t=new Uint8Array(s),r=s=0,i=e.length;r<i;r++)n=e[r],t.set(n,s),s+=n.length;return t}i.prototype={checkOffset:function(e){this.checkIndex(this.index+e)},checkIndex:function(e){if(e<0||this.data.length<=e)throw Error("End of data reached. Available data: "+this.data.length)},setIndex:function(e){this.checkIndex(e),this.index=e},skip:function(e){this.setIndex(this.index+e)},byteAt:function(e){},readInt:function(e){var t,n=0;for(this.checkOffset(e),t=this.index+e-1;t>=this.index;t--)n=(n<<8)+this.byteAt(t);return this.index+=e,n},readString:function(e){return r(this.readData(e))},readData:function(e){}},s.prototype={file:function(e,t,n){n=n||{},n.date=n.date||new Date,null!==t&&void 0!==t&&t instanceof Blob&&(n.type="blob"),this.files.push({name:e,data:t,options:n})},folder:function(e){var t=new s;return t.root=this.root+e+"/",this.files.push({name:e+"/",data:null,dir:!0,options:{date:new Date}}),t},generateAsync:function(e){e=e||{};var t=e.type||"blob",n=this;return new Promise(function(e){var r=n.generateNodeStream();if("nodebuffer"===t)e(u(r));else if("blob"===t){var i=[];r.forEach(function(e){i.push(e)}),e(new Blob(i))}else e(n.generate())})},generateNodeStream:function(){var e,t=[],n=this._generateData();for(e=0;e<this.files.length;e++){var r=this.files[e],i=this._fileHeader(r),s=r.data;null!==s&&(s=this._compress(s,r.options.compression||"STORE")),t.push(i),t.push(s),n.cd.push(i),n.cd.push(this._datadescriptor(r))}return t.push(this._centralDirectory(n)),t},generate:function(){return u(this.generateNodeStream())},_generateData:function(){var e={cd:[],offset:0};return e},_fileHeader:function(e){var t="\n\0",n="\0\0",r=e.options.date,i=33639248,s="STORE",a=new Uint8Array(30+e.name.length),l=0;return a[l++]=80,a[l++]=75,a[l++]=3,a[l++]=4,a[l++]=20,a[l++]=0,a[l++]=0,a[l++]=0,a[l++]=0,a[l++]=0,a[l++]=(r.getHours()<<6|r.getMinutes())&255,a[l++]=r.getHours()>>2&255,a[l++]=(r.getMonth()+1<<5|r.getDate())&255,a[l++]=(r.getFullYear()-1980<<1|r.getMonth()+1>>3)&255,l+=16,a[l++]=e.name.length&255,a[l++]=e.name.length>>8&255,l+=2,t=e.name;var f;for(f=0;f<t.length;f++)a[30+f]=t.charCodeAt(f);return a},_datadescriptor:function(e){var t=new Uint8Array(16);return t},_centralDirectory:function(e){var t=e.cd.length,n=u(e.cd),r=new Uint8Array(22);return r[0]=80,r[1]=75,r[2]=5,r[3]=6,r[10]=t&255,r[11]=t>>8&255,r[12]=t&255,r[13]=t>>8&255,r[14]=n.length&255,r[15]=n.length>>8&255,r[16]=n.length>>16&255,r[17]=n.length>>24&255,r[18]=e.offset&255,r[19]=e.offset>>8&255,r[20]=e.offset>>16&255,r[21]=e.offset>>24&255,u([n,r])},_compress:function(e,t){if("STORE"===t)return e instanceof Uint8Array?e:new Uint8Array(o(e).buffer);throw Error("Compression not implemented")}};var c=new s;return c.file=function(e,t,n){return s.prototype.file.call(this,e,t,n),this},c.folder=function(e){return s.prototype.folder.call(this,e)},c.generateAsync=function(e){return s.prototype.generateAsync.call(this,e)},c}();

    // Admin State
    const adminState = {
        images: [],
        existingGallery: [],
        processedImages: []
    };

    // DOM Elements
    const adminElements = {
        modal: document.getElementById('adminModal'),
        close: document.getElementById('adminClose'),
        uploadArea: document.getElementById('uploadArea'),
        fileInput: document.getElementById('fileInput'),
        importJsonBtn: document.getElementById('importJsonBtn'),
        jsonInput: document.getElementById('jsonInput'),
        exportZipBtn: document.getElementById('exportZipBtn'),
        preview: document.getElementById('adminPreview')
    };

    // Initialize Admin
    function initAdmin() {
        if (!adminElements.modal) return;
        
        setupAdminEventListeners();
        loadExistingGallery();
    }

    // Load Existing Gallery
    async function loadExistingGallery() {
        try {
            const response = await fetch('gallery.json');
            const data = await response.json();
            adminState.existingGallery = data.items || [];
        } catch (error) {
            console.log('No existing gallery found');
            adminState.existingGallery = [];
        }
    }

    // Setup Admin Event Listeners
    function setupAdminEventListeners() {
        // Open Admin
        const adminBtn = document.getElementById('adminBtn');
        if (adminBtn) {
            adminBtn.addEventListener('click', openAdmin);
        }

        // Close Admin
        adminElements.close.addEventListener('click', closeAdmin);
        adminElements.modal.addEventListener('click', (e) => {
            if (e.target === adminElements.modal) {
                closeAdmin();
            }
        });

        // File Upload
        adminElements.uploadArea.addEventListener('click', () => {
            adminElements.fileInput.click();
        });

        adminElements.fileInput.addEventListener('change', handleFileSelect);

        // Drag and Drop
        adminElements.uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            adminElements.uploadArea.classList.add('dragging');
        });

        adminElements.uploadArea.addEventListener('dragleave', () => {
            adminElements.uploadArea.classList.remove('dragging');
        });

        adminElements.uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            adminElements.uploadArea.classList.remove('dragging');
            handleFiles(e.dataTransfer.files);
        });

        // Import JSON
        adminElements.importJsonBtn.addEventListener('click', () => {
            adminElements.jsonInput.click();
        });

        adminElements.jsonInput.addEventListener('change', handleJsonImport);

        // Export ZIP
        adminElements.exportZipBtn.addEventListener('click', exportAsZip);
    }

    // Open Admin
    function openAdmin() {
        adminElements.modal.classList.add('active');
        adminElements.modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    // Close Admin
    function closeAdmin() {
        adminElements.modal.classList.remove('active');
        adminElements.modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    // Handle File Select
    function handleFileSelect(e) {
        handleFiles(e.target.files);
    }

    // Handle Files
    async function handleFiles(files) {
        const imageFiles = Array.from(files).filter(file => 
            file.type.match(/^image\/(jpeg|jpg|png)$/i)
        );

        if (imageFiles.length === 0) {
            alert('Please select valid image files (JPG/PNG)');
            return;
        }

        adminElements.exportZipBtn.disabled = true;
        adminElements.preview.innerHTML = '<div class="spinner"></div>';

        for (const file of imageFiles) {
            await processImage(file);
        }

        renderAdminPreview();
        adminElements.exportZipBtn.disabled = adminState.processedImages.length === 0;
    }

    // Process Image
    async function processImage(file) {
        const imageData = {
            file: file,
            originalName: file.name,
            slug: generateSlug(file.name),
            title: '',
            description: '',
            location: '',
            date: new Date().toISOString().split('T')[0],
            tags: [],
            variants: {}
        };

        try {
            // Read original image
            const originalImg = await loadImage(file);
            
            // Get dimensions
            imageData.width = originalImg.width;
            imageData.height = originalImg.height;
            
            // Generate variants
            const sizes = [640, 1024, 1600];
            for (const size of sizes) {
                // Generate JPG variant
                const jpgBlob = await resizeImage(originalImg, size, 'image/jpeg', 0.82);
                imageData.variants[`${size}_jpg`] = jpgBlob;
                
                // Generate WebP variant
                const webpBlob = await resizeImage(originalImg, size, 'image/webp', 0.82);
                imageData.variants[`${size}_webp`] = webpBlob;
            }
            
            // Generate blur placeholder
            const blurBlob = await resizeImage(originalImg, 40, 'image/jpeg', 0.4);
            imageData.variants['blur'] = blurBlob;
            
            // Create preview URL
            imageData.previewUrl = URL.createObjectURL(imageData.variants['640_jpg']);
            
            adminState.processedImages.push(imageData);
        } catch (error) {
            console.error('Error processing image:', error);
            alert(`Failed to process ${file.name}`);
        }
    }

    // Load Image
    function loadImage(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => resolve(img);
                img.onerror = reject;
                img.src = e.target.result;
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    // Resize Image
    async function resizeImage(img, maxSize, outputType = 'image/jpeg', quality = 0.82) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Calculate new dimensions
        let width = img.width;
        let height = img.height;
        
        if (width > height) {
            if (width > maxSize) {
                height = Math.round((height * maxSize) / width);
                width = maxSize;
            }
        } else {
            if (height > maxSize) {
                width = Math.round((width * maxSize) / height);
                height = maxSize;
            }
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Draw resized image
        ctx.drawImage(img, 0, 0, width, height);
        
        // Convert to blob
        return new Promise((resolve) => {
            canvas.toBlob(resolve, outputType, quality);
        });
    }

    // Generate Slug
    function generateSlug(filename) {
        return filename
            .replace(/\.[^/.]+$/, '') // Remove extension
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '_') // Replace non-alphanumeric with underscore
            .replace(/^_+|_+$/g, ''); // Trim underscores
    }

    // Render Admin Preview
    function renderAdminPreview() {
        adminElements.preview.innerHTML = adminState.processedImages.map((img, index) => `
            <div class="preview-card" data-index="${index}">
                <img src="${img.previewUrl}" alt="${img.title || 'Preview'}" class="preview-image">
                <div class="preview-field">
                    <label>Title</label>
                    <input type="text" data-field="title" data-index="${index}" 
                           value="${img.title}" placeholder="Enter title">
                </div>
                <div class="preview-field">
                    <label>Description</label>
                    <textarea data-field="description" data-index="${index}" 
                              placeholder="Enter description">${img.description}</textarea>
                </div>
                <div class="preview-field">
                    <label>Location</label>
                    <input type="text" data-field="location" data-index="${index}" 
                           value="${img.location}" placeholder="e.g., New York, NY">
                </div>
                <div class="preview-field">
                    <label>Date</label>
                    <input type="date" data-field="date" data-index="${index}" 
                           value="${img.date}">
                </div>
                <div class="preview-field">
                    <label>Tags (comma-separated)</label>
                    <input type="text" data-field="tags" data-index="${index}" 
                           value="${img.tags.join(', ')}" placeholder="e.g., travel, nature, city">
                </div>
                <div class="preview-status">✓ Ready for export</div>
            </div>
        `).join('');
        
        // Add input event listeners
        adminElements.preview.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('input', (e) => {
                const index = parseInt(e.target.dataset.index);
                const field = e.target.dataset.field;
                const value = e.target.value;
                
                if (field === 'tags') {
                    adminState.processedImages[index][field] = value
                        .split(',')
                        .map(tag => tag.trim())
                        .filter(tag => tag.length > 0);
                } else {
                    adminState.processedImages[index][field] = value;
                }
            });
        });
    }

    // Handle JSON Import
    async function handleJsonImport(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        try {
            const text = await file.text();
            const data = JSON.parse(text);
            
            if (data.items && Array.isArray(data.items)) {
                adminState.existingGallery = data.items;
                alert(`Imported ${data.items.length} existing gallery items`);
            }
        } catch (error) {
            alert('Invalid gallery.json file');
        }
    }

    // Export as ZIP
    async function exportAsZip() {
        if (adminState.processedImages.length === 0) {
            alert('No images to export');
            return;
        }
        
        const zip = new JSZip();
        const galleryFolder = zip.folder('assets').folder('gallery');
        
        // Process each image
        const newGalleryItems = [];
        
        for (const img of adminState.processedImages) {
            const slug = img.slug;
            
            // Add all image variants to ZIP
            for (const [key, blob] of Object.entries(img.variants)) {
                let filename;
                if (key === 'blur') {
                    filename = `${slug}_blur.jpg`;
                } else {
                    const [size, format] = key.split('_');
                    filename = `${slug}_${size}.${format}`;
                }
                
                galleryFolder.file(filename, blob);
            }
            
            // Create gallery item
            const galleryItem = {
                slug: slug,
                title: img.title || `Image ${slug}`,
                description: img.description || '',
                location: img.location || '',
                date: img.date || new Date().toISOString().split('T')[0],
                tags: img.tags || [],
                src: `/assets/gallery/${slug}_1600.jpg`,
                blur: `/assets/gallery/${slug}_blur.jpg`,
                formats: ['jpg', 'webp'],
                width: img.width,
                height: img.height
            };
            
            newGalleryItems.push(galleryItem);
        }
        
        // Merge with existing gallery (avoid duplicates)
        const mergedGallery = [...newGalleryItems];
        const newSlugs = new Set(newGalleryItems.map(item => item.slug));
        
        for (const existingItem of adminState.existingGallery) {
            if (!newSlugs.has(existingItem.slug)) {
                mergedGallery.push(existingItem);
            }
        }
        
        // Create gallery.json
        const galleryJson = {
            items: mergedGallery,
            pageSize: 12
        };
        
        zip.file('gallery.json', JSON.stringify(galleryJson, null, 2));
        
        // Generate ZIP
        try {
            const content = await zip.generateAsync({type: 'blob'});
            
            // Download ZIP
            const url = URL.createObjectURL(content);
            const a = document.createElement('a');
            a.href = url;
            a.download = `gallery_export_${Date.now()}.zip`;
            a.click();
            URL.revokeObjectURL(url);
            
            // Show success message
            alert(`✓ Export successful!\n\n` +
                  `${adminState.processedImages.length} images processed\n` +
                  `${Object.keys(adminState.processedImages[0].variants).length * adminState.processedImages.length} files generated\n\n` +
                  `Extract the ZIP and:\n` +
                  `1. Upload /assets/gallery/ files to your server\n` +
                  `2. Replace gallery.json with the new version`);
            
            // Reset
            adminState.processedImages = [];
            adminElements.preview.innerHTML = '';
            adminElements.fileInput.value = '';
            adminElements.exportZipBtn.disabled = true;
        } catch (error) {
            console.error('Error generating ZIP:', error);
            alert('Failed to generate ZIP file. Please try again.');
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAdmin);
    } else {
        initAdmin();
    }
})();
