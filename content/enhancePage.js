const enhancePage = (domain, user) => {
    const table = document.querySelector(".entities-grid");

    if (table) {
        addHeaderToTable(table, handleAllSelectCheckboxChange);
        const rows = table.querySelectorAll("tbody tr");
        addCheckboxesToRows(rows);
    }

    const buttons = document.querySelectorAll(".savedsearches-newbuttons");
    if (buttons && buttons[0]) {
        addButton(buttons[0], "schedulator-button", "Schedulator", () => handleCheckboxSchedulatorButtonClick(domain, user));
        addButton(buttons[0], "mass-schedulator-button", "Mass Schedulator 🚀", () => handleCSVSchedulatorButtonClick(domain, user));
    }
};

// Function to prompt for cron expression
const getCronExpression = (message) => {
    const cronValue = prompt(message);
    return cronValue !== null ? cronValue : null;
};

// Function to process cron schedule for a single value
const processCheckboxSchedule = (checkedValues, cronValue, domain, user, app) => {
    checkedValues.forEach(value => {
        const [id, app] = value.split(":");
        postCronSchedule(id, cronValue, domain, user, app);
    });
    location.reload();
};

// Function to process multiple schedules from CSV input
const processCSVSchedule = (csvCronDefinition, domain, user) => {
    const rows = csvCronDefinition.split("\n");
    rows.forEach(row => {
        const [app, id, cron] = row.split(",");
        try {
            postCronSchedule(id, cron, domain, user, app);
        } catch(e) {
            if (e instanceof TypeError) {
                alert("Invalid CSV schedule format. Please provide a valid CSV format.");
            } else {
                console.error(e);
            }
        }
        
    });
    location.reload();
};

const handleCheckboxSchedulatorButtonClick = (domain, user) => {
    const cronValue = getCronExpression('Enter cron expression:');
    if (cronValue) {
        const checkedValues = Array.from(document.querySelectorAll('.schedulator-checkbox:checked'))
            .map(checkbox => checkbox.value);
        processCheckboxSchedule(checkedValues, cronValue, domain, user);
    }
};

const handleAllSelectCheckboxChange = () => {
    const checkboxes = document.querySelectorAll('.schedulator-checkbox');
    const selectAllCheckbox = document.querySelector('#select-all-checkbox');
    checkboxes.forEach(checkbox => checkbox.checked = selectAllCheckbox.checked);
}

const handleCSVSchedulatorButtonClick = (domain, user) => {
    const cronValue = getCronExpression('Enter CSV cron definition [id,cron-expression]:');
    if (cronValue) {
        processCSVSchedule(cronValue, domain, user);
    }
};

const postCronSchedule = (searchName, cronValue, domain, user, app) => {
    const url = buildScheduleCallURL(searchName, user, domain, app);
    const body = `cron_schedule=${cronValue.trim().replace(/\s/g, "+")}&is_scheduled=1`;
    const csrfToken = getCSRFToken();

    if (!csrfToken) {
        console.error("CSRF token missing. Aborting POST request.");
        return;
    }

    sendServicesPostRequest(url, body, csrfToken)
        .then(response => {
            if (response.ok) {
                console.log("POST request successful.");
                return response.text();
            } else {
                console.error("POST request failed with status:", response.status);
            }
        })
        .then(data => {
            if (data) {
                //do nothing for now
            }
        })
        .catch(error => {
            // if error is TypeError then ignore it
            if (error instanceof TypeError) {
                return;
            }
            console.error("Error during POST request:", error);
        });
};
