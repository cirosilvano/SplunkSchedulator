// apiUtils.js
const getCSRFToken = () => {
    const cookies = document.cookie.split('; ');
    return cookies.find(cookie => cookie.startsWith('splunkweb_csrf_token_'))?.split('=')[1] || null;
};

const extractSplunkUser = () => {
    let user = null;
    document.querySelectorAll('[data-icosrc]').forEach(el => {
        const match = el.getAttribute('data-icosrc').match(/\/splunkd\/__raw\/servicesNS\/([^/]+)\//);
        if (match) {
            user = match[1];
        }
    });
    return user;
};

const buildScheduleCallURL = (searchName, user, domain, app) => {
    // for calling servicesNS API as current user (as if it were called from frontend)
    return `${domain}/splunkd/__raw/servicesNS/${user}/${app}/saved/searches/${encodeURIComponent(searchName)}`;
};

const sendServicesPostRequest = (url, body, csrfToken) => {
    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "X-Splunk-Form-Key": csrfToken,
            "X-Requested-With": "XMLHttpRequest"
        },
        body
    });
};
