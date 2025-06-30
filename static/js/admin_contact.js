function markAsResponded(contactId) {
    toggleResponse(contactId);
}

function markAsPending(contactId) {
    toggleResponse(contactId);
}

function toggleResponse(contactId) {
    fetch(`/admin/main/contact/toggle-response/${contactId}/`)
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                window.location.reload();
            }
        })
        .catch(error => console.error('Error:', error));
} 