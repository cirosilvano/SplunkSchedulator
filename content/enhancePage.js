const enhancePage = (domain, user) => {
    const table = document.querySelector(".entities-grid");

    if (table) {
        addHeaderToTable(table, handleAllSelectCheckboxChange);
        const rows = table.querySelectorAll("tbody tr");
        addCheckboxesToRows(rows);
    }

    const buttons = document.querySelectorAll(".savedsearches-newbuttons");
    if (buttons && buttons[0]) {
        addButton(buttons[0], "schedulator-button-main", "Schedulator 🚀", () => handleSchedulatorButtonClick(domain, user));
    }
};

// Function to prompt for cron expression
const getCronExpression = (message) => {
    const cronValue = prompt(message);
    return cronValue !== null ? cronValue : null;
};

// Function to process cron schedule for a single value
const processCheckboxSchedule = (checkedValues, cronValue, domain, user) => {
    checkedValues.forEach(value => {
        const [id, app] = value.split(":");
        postCronSchedule(id, cronValue, domain, user, app);
    });
    location.reload();
};

// Function to process multiple schedules from CSV input
const processCSVSchedule = (csvCronDefinition, domain, user) => {
    const rows = csvCronDefinition.trim().split("\n");
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

const processDeschedule = (checkedValues, domain, user) => {
    checkedValues.forEach(value => {
        const [id, app] = value.split(":");
        postDeschedule(id, domain, user, app);
    });
    location.reload();
};

const processExport = async (checkedValues, domain, user) => {
    let csvContent = "";

    try {
        for (const value of checkedValues) {
            const [id, app] = value.split(":");
            const cronSchedule = await getExportCronSchedule(id, domain, user, app);
            csvContent += app + "," + id + "," + cronSchedule + "\n";
        }

        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "schedulator_output.csv";
        a.click();
        URL.revokeObjectURL(url);

    } catch (error) {
        console.error("Error processing export:", error);
        alert("Failed to process export. Please check console logs.");
    }
};

const handleCheckboxSchedulatorButtonClick = (domain, user) => {
    const checkedValues = Array.from(document.querySelectorAll('.schedulator-checkbox:checked'))
        .map(checkbox => checkbox.value);
    if(checkedValues.length === 0) {
        alert("Please select at least one search to schedule.");
        return;
    };
    const cronValue = getCronExpression('Enter cron expression:');
    if (cronValue) {
        processCheckboxSchedule(checkedValues, cronValue, domain, user);
    }
};

const handleAllSelectCheckboxChange = () => {
    const checkboxes = document.querySelectorAll('.schedulator-checkbox');
    const selectAllCheckbox = document.querySelector('#select-all-checkbox');
    checkboxes.forEach(checkbox => checkbox.checked = selectAllCheckbox.checked);
}

const handleCSVSchedulatorButtonClick = (domain, user, csvCron) => {
    if (csvCron) {
        processCSVSchedule(csvCron, domain, user);
    }
};

const handleDescheduleButtonClick = (domain, user) => {
    const checkedValues = Array.from(document.querySelectorAll('.schedulator-checkbox:checked'))
        .map(checkbox => checkbox.value);
    if(checkedValues.length === 0) {
        alert("Please select at least one search to deschedule.");
        return;
    };
    processDeschedule(checkedValues, domain, user);
};

const handleExportButtonClick = (domain, user) => {
    const checkedValues = Array.from(document.querySelectorAll('.schedulator-checkbox:checked'))
        .map(checkbox => checkbox.value);
    if(checkedValues.length === 0) {
        alert("Please select at least one search to export.");
        return;
    };
    processExport(checkedValues, domain, user);
}

const handleSchedulatorButtonClick = (domain, user) => {
    createSchedulatorModal(domain, user);
}

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

const postDeschedule = (searchName, domain, user, app) => {
    const url = buildScheduleCallURL(searchName, user, domain, app);
    const body = `is_scheduled=0`;
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

const getExportCronSchedule = async (searchName, domain, user, app) => {
    try {
        const url = buildScheduleCallURL(searchName, user, domain, app);
        const csrfToken = getCSRFToken();

        if (!csrfToken) {
            console.error("CSRF token missing. Aborting GET request.");
            return null;
        }

        const response = await sendServicesGetRequest(url, csrfToken);
        if (!response || !response.entry || !response.entry[0] || !response.entry[0].content) {
            console.error("Unexpected response structure:", response);
            return null;
        }

        const cronSchedule = response.entry[0].content.cron_schedule;
        return cronSchedule;
    } catch (error) {
        if (error instanceof TypeError) {
            console.warn("TypeError occurred but was ignored:", error);
            return null;
        }
        console.error("Error during GET request:", error);
        return null;
    }
};