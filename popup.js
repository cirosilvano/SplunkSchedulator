document.addEventListener("DOMContentLoaded", () => {
    const subtitleSpan = document.querySelector(".subtitle span");

    // Get the current URL
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const currentUrl = tabs[0].url;

        // Check if the URL contains "saved/searches"
        if (currentUrl.includes("saved/searches")) {
            subtitleSpan.textContent = "active";
            // set class "title-active"
            subtitleSpan.classList.add("subtitle-active");
            document.getElementById("main-image").src = "assets/images/rocket.png";
        } else {
            subtitleSpan.classList.remove("subtitle-active");
            subtitleSpan.textContent = "inactive";
            document.getElementById("main-image").src = "assets/images/rocket-grey.png";
        }
    });
});
