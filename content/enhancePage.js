// main function for injecting logic into the page (UI, listeners etc.)
const enhancePage = (domain, user) => {
    const table = document.querySelector(".entities-grid"); // main table listing searches

    if (table) {
        addHeaderToTable(table, handleAllSelectCheckboxChange);
        const rows = table.querySelectorAll("tbody tr");
        addCheckboxesToRows(rows);
    }

    const buttons = document.querySelectorAll(".savedsearches-newbuttons"); // div containing "New Report" and "New Alarm" buttons
    if (buttons && buttons[0]) {
        addButton(buttons[0], "schedulator-button-main", "Schedulator 🚀", () => handleSchedulatorButtonClick(domain, user));
    }
};

// schedule all checked searches
const processCheckboxSchedule = async (checkedValues, cronValue, domain) => {
    for (const value of checkedValues) {
        const [id, app] = value.split(":");
        await updateCronSchedule(id, cronValue, domain, app);
    }
    location.reload();
};

// schedule searches from CSV import
const processCSVSchedule = async (csvCronDefinition, domain) => {
    const rows = csvCronDefinition.trim().split("\n");
    for (const row of rows) {
        const [app, id, cron] = row.split(",");
        try {
            await updateCronSchedule(id, cron, domain, app);
        } catch (e) {
            if (e instanceof TypeError) {
                alert("Invalid CSV schedule format. Please provide a valid CSV format.");
            } else {
                console.error(e);
            }
        }

    };
    location.reload();
};

// deschedule all checked searches
const processDeschedule = async (checkedValues, domain) => {
    for (const value of checkedValues) {
        const [id, app] = value.split(":");
        await postDeschedule(id, domain, app);
    }
    location.reload();
};


const processCSVExport = async (checkedValues, domain) => {
    let csvContent = "";

    try {
        for (const value of checkedValues) {
            const [id, app] = value.split(":");
            const cronSchedule = await getExportCronSchedule(id, domain, app);
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

const processMoveToApp = async (checkedValues, domain, user) => {
    const app = prompt("Enter the app name to move the searches to:");
    if (app) {
        for (const value of checkedValues) {
            const [id, oldApp] = value.split(":");
            await postMoveRequest(id, domain, user, oldApp, app);
        }
        location.reload();
    }
};

const handleCheckboxSchedulatorButtonClick = (domain, user) => {
    const checkedValues = Array.from(document.querySelectorAll('.schedulator-checkbox:checked'))
        .map(checkbox => checkbox.value);
    if (checkedValues.length === 0) {
        alert("Please select at least one search to schedule.");
        return;
    };
    const cronValue = prompt("Enter cron expression:");
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

const handleDescheduleButtonClick = (domain) => {
    const checkedValues = Array.from(document.querySelectorAll('.schedulator-checkbox:checked'))
        .map(checkbox => checkbox.value);
    if (checkedValues.length === 0) {
        alert("Please select at least one search to deschedule.");
        return;
    };

    // limit amount of searches to be listed in the confirmation prompt
    const maxListedValues = 5
    let values = checkedValues.slice(0, maxListedValues).map(value => `• ${value.split(":")[0]}`);
    if (checkedValues.length > maxListedValues) {
        values.push(`... and ${checkedValues.length - maxListedValues} more`);
    }

    const userConfirmed = confirm("Are you sure you want to deschedule the selected searches?\nThe following searches will be descheduled:\n" + values.join("\n"));
    if (userConfirmed) {
        processDeschedule(checkedValues, domain);
    }
};

const handleExportButtonClick = (domain) => {
    const checkedValues = Array.from(document.querySelectorAll('.schedulator-checkbox:checked'))
        .map(checkbox => checkbox.value);
    if (checkedValues.length === 0) {
        alert("Please select at least one search to export.");
        return;
    };
    processCSVExport(checkedValues, domain);
}

const handleSchedulatorButtonClick = (domain, user) => {
    createSchedulatorModal(domain, user);
}

const handleMoveToAppButtonClick = (domain, user) => {
    const checkedValues = Array.from(document.querySelectorAll('.schedulator-checkbox:checked'))
        .map(checkbox => checkbox.value);
    if (checkedValues.length === 0) {
        alert("Please select at least one search to move.");
        return;
    };
    processMoveToApp(checkedValues, domain, user);
}

const updateCronSchedule = async (searchName, cronValue, domain, app) => {
    const urlGet = buildScheduleCallURL(searchName, "-", domain, app);
    const csrfToken = getCSRFToken();

    if (!csrfToken) {
        console.error("CSRF token missing. Aborting POST request.");
        return;
    }

    const jsonBody = await sendServicesGetRequest(urlGet, csrfToken);
    jsonBody.entry[0].content.cron_schedule = cronValue.trim()
    jsonBody.entry[0].content.is_scheduled = 1
    const user = jsonBody.entry[0].id.match(/servicesNS\/([^\/]+)/)?.[1]; // user must be the one from the id of the search (is actually a URL)

    const url = buildScheduleCallURL(searchName, user, domain, app);
    const body = createOutputPayload(jsonBody);

    await sendServicesPostRequest(url, body, csrfToken)
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

const postDeschedule = async (searchName, domain, app) => {
    const csrfToken = getCSRFToken();
    const urlGet = buildScheduleCallURL(searchName, "-", domain, app);
    const jsonBody = await sendServicesGetRequest(urlGet, csrfToken);
    jsonBody.entry[0].content.is_scheduled = 0
    const body = createOutputPayload(jsonBody);
    const user = jsonBody.entry[0].id.match(/servicesNS\/([^\/]+)/)?.[1]; // user must be the one from the id of the search (is actually a URL)
    const url = buildScheduleCallURL(searchName, user, domain, app);

    if (!csrfToken) {
        console.error("CSRF token missing. Aborting POST request.");
        return;
    }

    await sendServicesPostRequest(url, body, csrfToken)
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
            if (error instanceof TypeError) {
                return;
            }
            console.error("Error during POST request:", error);
        });
};

const getExportCronSchedule = async (searchName, domain, app) => {
    try {
        const url = `${buildScheduleCallURL(searchName, "-", domain, app)}/`;
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

const postMoveRequest = async (searchName, domain, user, oldApp, app) => {
    const url = `${buildScheduleCallURL(searchName, user, domain, oldApp)}/move`;
    const body = `app=${app}&user=${user}&output_mode=json`;
    const csrfToken = getCSRFToken();

    if (!csrfToken) {
        console.error("CSRF token missing. Aborting POST request.");
        return;
    }

    await sendServicesPostRequest(url, body, csrfToken)
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
}

const createOutputPayload = (outputObject) => {
    let outputString = "output_mode=json";
    for (const field of FIELDS_TO_MONITOR) {
        if (outputObject.entry[0].content[field] !== undefined) {
            let value = outputObject.entry[0].content[field];
            if (typeof value === "boolean") {
                value = value ? 1 : 0;
            }
            if (typeof value === "string") {
                value = encodeURIComponent(value).replace(/%20/g, "+");
            }
            outputString += `&${field}=${value !== null ? value : ''}`;
        }
    }
    return outputString;
}