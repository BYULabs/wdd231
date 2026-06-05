export function initFormTimestamp() {
    const form = document.querySelector('form');
    const timestampInput = document.querySelector('#timestamp');
    if (form && timestampInput) {
        form.addEventListener('submit', () => {
            timestampInput.value = new Date().toLocaleString();
        });
    }
}

export function initThankYouResults() {
    const resultsContainer = document.querySelector('#results');
    if (!resultsContainer) return;

    const myInfo = new URLSearchParams(window.location.search);
    
    let submissionTime = '';
    if (myInfo.get('timestamp')) {
        submissionTime = `<p><strong>Submitted:</strong> ${myInfo.get('timestamp')}</p>`;
    }

    resultsContainer.innerHTML = `
        <section class="submission-details">
            <h2>Member Information</h2>
            <p><strong>Name:</strong> ${myInfo.get('firstname')} ${myInfo.get('lastname')}</p>
            <p><strong>Email:</strong> ${myInfo.get('email')}</p>
            <p><strong>Phone:</strong> ${myInfo.get('phone')}</p>
            <p><strong>Organizational Title:</strong> ${myInfo.get('org-title') || 'Not provided'}</p>
            
            <h2>Organization Information</h2>
            <p><strong>Business/Organization Name:</strong> ${myInfo.get('org-name')}</p>
            <p><strong>Membership Level:</strong> ${myInfo.get('membership-level')}</p>
            <p><strong>Description:</strong> ${myInfo.get('description') || 'Not provided'}</p>
            
            ${submissionTime}
            <p>Thank you for joining the Cumbayá Chamber of Commerce!</p>
        </section>
    `;
}