const enhanceTable = (domain, user) => {
    const table = document.querySelector(".entities-grid");

    if (table) {
        addHeaderToTable(table);
        const rows = table.querySelectorAll("tbody tr");
        addCheckboxesToRows(rows);
    }

    const buttons = document.querySelectorAll(".savedsearches-newbuttons");
    if (buttons && buttons[0]) {
        addButton(buttons[0], "schedulator-button", "Schedulator", () => handleSchedulatorButtonClick(domain, user));
        addButton(buttons[0], "mass-schedulator-button", "Mass Schedulator", () => handleMassSchedulatorButtonClick(domain, user));
    }
};

const handleSchedulatorButtonClick = (domain, user) => {
    const cronValue = prompt('Enter cron expression:');
    if (cronValue !== null) {
        const checkedValues = Array.from(document.querySelectorAll('.schedulator-checkbox:checked'))
            .map(checkbox => checkbox.value);
        checkedValues.forEach(value => {
            postCronSchedule(value, cronValue, domain, user);
        });
        location.reload();
    }
};

const handleMassSchedulatorButtonClick = (domain, user) => {
    const cronValue = prompt('Enter CSV cron definition [id,cron-expression]:');
    if (cronValue !== null) {
        const rows = cronValue.split("\n");
        rows.forEach(row => {
            const [id, cron] = row.split(",");
            postCronSchedule(id, cron, domain, user);
        });
        location.reload();
    }
};

const postCronSchedule = (searchName, cronValue, domain, user) => {
    const url = buildPostURL(searchName, user, domain);
    const body = `cron_schedule=${cronValue.trim().replace(/\s/g, "+")}&is_scheduled=1`;
    const csrfToken = getCSRFToken();

    if (!csrfToken) {
        console.error("CSRF token missing. Aborting POST request.");
        return;
    }

    sendPostRequest(url, body, csrfToken)
        .then(response => {
            if (response.ok) {
                console.log("POST request successful.");
                return response.text();
            } else {
                console.error("POST request failed with status:", response.status);
            }
        })
        .then(data => {
            if (data) console.log("Response data:", data);
        })
        .catch(error => {
            console.error("Error during POST request:", error);
        });
};
