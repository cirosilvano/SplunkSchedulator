const initializeObserver = () => {
    const observer = new MutationObserver(() => {
        if (window.location.href.includes("/saved/searches")) {
            const port = window.location.port || 
                (window.location.protocol === "https:" ? "443" : 
                (window.location.protocol === "http:" ? "80" : ""));
            const domain = `${window.location.protocol}//${window.location.hostname}:${port}/${window.location.pathname.split('/')[1]}`;
			const user = extractSplunkUser();
            enhancePage(domain, user);
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
};
