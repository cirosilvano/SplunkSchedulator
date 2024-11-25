const FIELDS_TO_MONITOR = ["action.logevent.command", "action.logevent.description", "action.logevent.forceCsvResults", "action.logevent.hostname", "action.logevent.icon_path", "action.logevent.is_custom", "action.logevent.label", "action.logevent.maxresults", "action.logevent.maxtime", "action.logevent.param.host", "action.logevent.param.index", "action.logevent.param.source", "action.logevent.param.sourcetype", "action.logevent.payload_format", "action.logevent.python.version", "action.logevent.track_alert", "action.logevent.ttl", "action.lookup.append", "action.lookup.command", "action.lookup.description", "action.lookup.filename", "action.lookup.forceCsvResults", "action.lookup.hostname", "action.lookup.icon_path", "action.lookup.label", "action.lookup.maxresults", "action.lookup.maxtime", "action.lookup.track_alert", "action.lookup.ttl", "action.outputtelemetry.command", "action.outputtelemetry.description", "action.outputtelemetry.forceCsvResults", "action.outputtelemetry.hostname", "action.outputtelemetry.icon_path", "action.outputtelemetry.is_custom", "action.outputtelemetry.label", "action.outputtelemetry.maxresults", "action.outputtelemetry.maxtime", "action.outputtelemetry.param.anonymous", "action.outputtelemetry.param.component", "action.outputtelemetry.param.input", "action.outputtelemetry.param.license", "action.outputtelemetry.param.optinrequired", "action.outputtelemetry.param.support", "action.outputtelemetry.param.type", "action.outputtelemetry.python.version", "action.outputtelemetry.track_alert", "action.outputtelemetry.ttl", "action.ssg_mobile_alert.command", "action.ssg_mobile_alert.description", "action.ssg_mobile_alert.disabled", "action.ssg_mobile_alert.forceCsvResults", "action.ssg_mobile_alert.hostname", "action.ssg_mobile_alert.icon_path", "action.ssg_mobile_alert.is_custom", "action.ssg_mobile_alert.label", "action.ssg_mobile_alert.maxresults", "action.ssg_mobile_alert.maxtime", "action.ssg_mobile_alert.param.alert_description", "action.ssg_mobile_alert.param.alert_id", "action.ssg_mobile_alert.param.alert_severity", "action.ssg_mobile_alert.param.alert_time", "action.ssg_mobile_alert.param.app_name", "action.ssg_mobile_alert.param.notification_type", "action.ssg_mobile_alert.param.owner", "action.ssg_mobile_alert.param.previous_subscribers", "action.ssg_mobile_alert.param.recipient_users", "action.ssg_mobile_alert.param.results_link", "action.ssg_mobile_alert.payload_format", "action.ssg_mobile_alert.python.version", "action.ssg_mobile_alert.track_alert", "action.ssg_mobile_alert.ttl", "action.summary_metric_index._name", "action.summary_metric_index.command", "action.summary_metric_index.forceCsvResults", "action.summary_metric_index.hostname", "action.summary_metric_index.inline", "action.summary_metric_index.maxresults", "action.summary_metric_index.maxtime", "action.summary_metric_index.track_alert", "action.summary_metric_index.ttl", "action.webhook.command", "action.webhook.description", "action.webhook.enable_allowlist", "action.webhook.forceCsvResults", "action.webhook.hostname", "action.webhook.icon_path", "action.webhook.is_custom", "action.webhook.label", "action.webhook.maxresults", "action.webhook.maxtime", "action.webhook.param.user_agent", "action.webhook.payload_format", "action.webhook.python.version", "action.webhook.track_alert", "action.webhook.ttl", "actions", "alert.digest_mode", "alert.expires", "alert.managedBy", "alert.severity", "alert.suppress", "alert.suppress.fields", "alert.suppress.group_name", "alert.suppress.period", "alert.track", "alert_comparator", "alert_condition", "alert_threshold", "alert_type", "allow_skew", "auto_summarize", "auto_summarize.command", "auto_summarize.cron_schedule", "auto_summarize.dispatch.earliest_time", "auto_summarize.dispatch.latest_time", "auto_summarize.dispatch.time_format", "auto_summarize.dispatch.ttl", "auto_summarize.max_concurrent", "auto_summarize.max_disabled_buckets", "auto_summarize.max_summary_ratio", "auto_summarize.max_summary_size", "auto_summarize.max_time", "auto_summarize.suspend_period", "auto_summarize.timespan", "auto_summarize.workload_pool", "cron_schedule", "defer_scheduled_searchable_idxc", "description", "disabled", "dispatch.allow_partial_results", "dispatch.auto_cancel", "dispatch.auto_pause", "dispatch.buckets", "dispatch.earliest_time", "dispatch.index_earliest", "dispatch.index_latest", "dispatch.indexedRealtime", "dispatch.indexedRealtimeMinSpan", "dispatch.indexedRealtimeOffset", "dispatch.latest_time", "dispatch.lookups", "dispatch.max_count", "dispatch.max_time", "dispatch.rate_limit_retry", "dispatch.reduce_freq", "dispatch.rt_backfill", "dispatch.rt_maximum_span", "dispatch.sample_ratio", "dispatch.spawn_process", "dispatch.time_format", "dispatch.ttl", "dispatchAs", "display.events.fields", "display.events.list.drilldown", "display.events.list.wrap", "display.events.maxLines", "display.events.raw.drilldown", "display.events.rowNumbers", "display.events.table.drilldown", "display.events.table.wrap", "display.events.type", "display.general.enablePreview", "display.general.migratedFromViewState", "display.general.timeRangePicker.show", "display.general.type", "display.page.search.mode", "display.page.search.patterns.sensitivity", "display.page.search.showFields", "display.page.search.tab", "display.page.search.timeline.format", "display.page.search.timeline.scale", "display.statistics.drilldown", "display.statistics.overlay", "display.statistics.percentagesRow", "display.statistics.rowNumbers", "display.statistics.show", "display.statistics.totalsRow", "display.statistics.wrap", "display.visualizations.chartHeight", "display.visualizations.charting.axisLabelsX.majorLabelStyle.overflowMode", "display.visualizations.charting.axisLabelsX.majorLabelStyle.rotation", "display.visualizations.charting.axisLabelsX.majorUnit", "display.visualizations.charting.axisLabelsY.majorUnit", "display.visualizations.charting.axisLabelsY2.majorUnit", "display.visualizations.charting.axisTitleX.text", "display.visualizations.charting.axisTitleX.visibility", "display.visualizations.charting.axisTitleY.text", "display.visualizations.charting.axisTitleY.visibility", "display.visualizations.charting.axisTitleY2.text", "display.visualizations.charting.axisTitleY2.visibility", "display.visualizations.charting.axisX.abbreviation", "display.visualizations.charting.axisX.maximumNumber", "display.visualizations.charting.axisX.minimumNumber", "display.visualizations.charting.axisX.scale", "display.visualizations.charting.axisY.abbreviation", "display.visualizations.charting.axisY.maximumNumber", "display.visualizations.charting.axisY.minimumNumber", "display.visualizations.charting.axisY.scale", "display.visualizations.charting.axisY2.abbreviation", "display.visualizations.charting.axisY2.enabled", "display.visualizations.charting.axisY2.maximumNumber", "display.visualizations.charting.axisY2.minimumNumber", "display.visualizations.charting.axisY2.scale", "display.visualizations.charting.chart", "display.visualizations.charting.chart.bubbleMaximumSize", "display.visualizations.charting.chart.bubbleMinimumSize", "display.visualizations.charting.chart.bubbleSizeBy", "display.visualizations.charting.chart.nullValueMode", "display.visualizations.charting.chart.overlayFields", "display.visualizations.charting.chart.rangeValues", "display.visualizations.charting.chart.showDataLabels", "display.visualizations.charting.chart.sliceCollapsingThreshold", "display.visualizations.charting.chart.stackMode", "display.visualizations.charting.chart.style", "display.visualizations.charting.drilldown", "display.visualizations.charting.fieldColors", "display.visualizations.charting.fieldDashStyles", "display.visualizations.charting.gaugeColors", "display.visualizations.charting.layout.splitSeries", "display.visualizations.charting.layout.splitSeries.allowIndependentYRanges", "display.visualizations.charting.legend.labelStyle.overflowMode", "display.visualizations.charting.legend.mode", "display.visualizations.charting.legend.placement", "display.visualizations.charting.lineWidth", "display.visualizations.custom.drilldown", "display.visualizations.custom.height", "display.visualizations.custom.type", "display.visualizations.mapHeight", "display.visualizations.mapping.choroplethLayer.colorBins", "display.visualizations.mapping.choroplethLayer.colorMode", "display.visualizations.mapping.choroplethLayer.maximumColor", "display.visualizations.mapping.choroplethLayer.minimumColor", "display.visualizations.mapping.choroplethLayer.neutralPoint", "display.visualizations.mapping.choroplethLayer.shapeOpacity", "display.visualizations.mapping.choroplethLayer.showBorder", "display.visualizations.mapping.data.maxClusters", "display.visualizations.mapping.drilldown", "display.visualizations.mapping.legend.placement", "display.visualizations.mapping.map.center", "display.visualizations.mapping.map.panning", "display.visualizations.mapping.map.scrollZoom", "display.visualizations.mapping.map.zoom", "display.visualizations.mapping.markerLayer.markerMaxSize", "display.visualizations.mapping.markerLayer.markerMinSize", "display.visualizations.mapping.markerLayer.markerOpacity", "display.visualizations.mapping.showTiles", "display.visualizations.mapping.tileLayer.maxZoom", "display.visualizations.mapping.tileLayer.minZoom", "display.visualizations.mapping.tileLayer.tileOpacity", "display.visualizations.mapping.tileLayer.url", "display.visualizations.mapping.type", "display.visualizations.show", "display.visualizations.singlevalue.afterLabel", "display.visualizations.singlevalue.beforeLabel", "display.visualizations.singlevalue.colorBy", "display.visualizations.singlevalue.colorMode", "display.visualizations.singlevalue.drilldown", "display.visualizations.singlevalue.numberPrecision", "display.visualizations.singlevalue.rangeColors", "display.visualizations.singlevalue.rangeValues", "display.visualizations.singlevalue.showSparkline", "display.visualizations.singlevalue.showTrendIndicator", "display.visualizations.singlevalue.trendColorInterpretation", "display.visualizations.singlevalue.trendDisplayMode", "display.visualizations.singlevalue.trendInterval", "display.visualizations.singlevalue.underLabel", "display.visualizations.singlevalue.unit", "display.visualizations.singlevalue.unitPosition", "display.visualizations.singlevalue.useColors", "display.visualizations.singlevalue.useThousandSeparators", "display.visualizations.singlevalueHeight", "display.visualizations.trellis.enabled", "display.visualizations.trellis.scales.shared", "display.visualizations.trellis.size", "display.visualizations.trellis.splitBy", "display.visualizations.type", "displayview", "durable.backfill_type", "durable.lag_time", "durable.max_backfill_intervals", "durable.track_time_type", "is_scheduled", "is_visible", "max_concurrent", "next_scheduled_time", "precalculate_required_fields_for_alerts", "qualifiedSearch", "realtime_schedule", "request.ui_dispatch_app", "request.ui_dispatch_view", "restart_on_searchpeer_add", "run_n_times", "run_on_startup", "schedule_as", "schedule_priority", "schedule_window", "search", "skip_scheduled_realtime_idxc", "vsid", "workload_pool", "action.email", "action.logevent", "action.lookup", "action.outputtelemetry", "action.populate_lookup", "action.rss", "action.script", "action.ssg_mobile_alert", "action.summary_index", "action.summary_metric_index", "action.webhook"]


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
const processCheckboxSchedule = async (checkedValues, cronValue, domain, user) => {
    for (const value of checkedValues) {
        const [id, app] = value.split(":");
        await updateCronSchedule(id, cronValue, domain, app);
    }
    location.reload();
};

// Function to process multiple schedules from CSV input
const processCSVSchedule = async (csvCronDefinition, domain, user) => {
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

const processDeschedule = async (checkedValues, domain, user) => {
    for (const value of checkedValues) {
        const [id, app] = value.split(":");
        await postDeschedule(id, domain, user, app);
    }
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
    if (checkedValues.length === 0) {
        alert("Please select at least one search to deschedule.");
        return;
    };
    const maxListedValues = 5
    let values = checkedValues.slice(0, maxListedValues).map(value => `• ${value.split(":")[0]}`);
    if (checkedValues.length > maxListedValues) {
        values.push(`... and ${checkedValues.length - maxListedValues} more`);
    }
    const userConfirmed = confirm("Are you sure you want to deschedule the selected searches?\nThe following searches will be descheduled:\n" + values.join("\n"));
    if (userConfirmed) {
        processDeschedule(checkedValues, domain, user);
    }
};

const handleExportButtonClick = (domain, user) => {
    const checkedValues = Array.from(document.querySelectorAll('.schedulator-checkbox:checked'))
        .map(checkbox => checkbox.value);
    if (checkedValues.length === 0) {
        alert("Please select at least one search to export.");
        return;
    };
    processExport(checkedValues, domain, user);
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

const postDeschedule = async (searchName, domain, user, app) => {
    const url = buildScheduleCallURL(searchName, user, domain, app);
    const csrfToken = getCSRFToken();

    const jsonBody = await sendServicesGetRequest(url, csrfToken);
    jsonBody.entry[0].content.is_scheduled = 0
    const body = createOutputPayload(jsonBody);

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
};

const getExportCronSchedule = async (searchName, domain, user, app) => {
    try {
        const url = `${buildScheduleCallURL(searchName, user, domain, app)}/`;
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