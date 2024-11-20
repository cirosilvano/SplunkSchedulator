const initializeObserver = () => {
    const observer = new MutationObserver(() => {
        if (window.location.href.includes("/saved/searches")) {
            const domain = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/${window.location.pathname.split('/')[1]}`;
            const user = getUserFromAttributes();
            enhanceTable(domain, user);
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
};
