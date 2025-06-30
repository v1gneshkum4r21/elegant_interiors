document.addEventListener('DOMContentLoaded', function() {
    const titleInput = document.querySelector('#id_title');
    const slugInput = document.querySelector('#id_slug');
    
    if (titleInput && slugInput) {
        titleInput.addEventListener('keyup', function(e) {
            slugInput.value = titleInput.value
                .toLowerCase()
                .replace(/[^\w\s-]/g, '')
                .replace(/\s+/g, '-');
        });
    }
}); 