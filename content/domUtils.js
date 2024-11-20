// domUtils.js
const addHeaderToTable = (table, handleAllSelectCheckboxClick) => {
    const headerRow = table.querySelector("thead tr");
    if (headerRow && !headerRow.querySelector("#select-th")) {
        const th = document.createElement("th");
        th.id = "select-th";
        th.style.padding = "0";
        th.innerHTML = `
        <div style="display:flex;flex-direction:flex-row;padding:0;width:100%;justify-content:center">
            <input type="checkbox" id="select-all-checkbox" style="margin-bottom:0.2rem;">
            <div class="">
                Select all
            </div>
        </div>
        `;
        headerRow.prepend(th);

        const selectAllCheckbox = document.querySelector("#select-all-checkbox");
        selectAllCheckbox.addEventListener("change", handleAllSelectCheckboxClick);
    }
};

const addCheckboxesToRows = (rows) => {
    rows.forEach(row => {
        if (!row.querySelector(".cell-select")) {
            const nameCell = row.querySelector(".cell-name a");
            const appCell = row.querySelector(".cell-app");
            const nameValue = nameCell ? nameCell.textContent.trim() : "";
            const appValue = appCell ? appCell.textContent.trim() : "";

            const td = document.createElement("td");
            td.innerHTML = `
                <div class="cell-select" style="text-align:center;">
                    <input style="margin-top: 0.5rem" type="checkbox" class="schedulator-checkbox" name="entity-name" value="${nameValue}:${appValue}">
                </div>
            `;
            row.prepend(td);
        }
    });
};

const addButton = (parent, className, text, clickHandler) => {
    if (!document.querySelector(`.${className}`)) {
        const button = document.createElement("a");
        button.innerHTML = `<a href="#" class="btn ${className}" style="margin-right: 0.2rem">${text}</a>`;
        parent.prepend(button);
        document.querySelectorAll(`.${className}`).forEach(button => button.addEventListener('click', clickHandler));
    }
};

const createSchedulatorModal = (domain, user) => {
    if (!document.querySelector("#custom-modal")) {
        const modal = document.createElement("div");
        modal.id = "custom-modal";
        modal.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            display: flex; align-items: center; justify-content: center;
            background: rgba(0, 0, 0, 0.5); z-index: 1000;
        `;
        modal.innerHTML = `
            <div style="background: white; padding: 2rem; border-radius: 0.5rem; text-align: center; position: relative;">
                <h1 style="color: black">Schedulator</h1>
                <h3 style="color: black">Choose an action:</h3>
                <button class="close-modal" style="position: absolute; top: 0.5rem; right: 0.5rem;">×</button>
                <a id="schedulator-btn-schedule-selected" href="#" class="btn" style="margin: 0.5rem;">Schedule selected ⏰</a>
                <a id="schedulator-btn-deschedule-selected" href="#" class="btn" style="margin: 0.5rem;">Deschedule selected ❌</a>
                <a id="schedulator-btn-mass-csv-import" href="#" class="btn" style="margin: 0.5rem;">Mass CSV import 📋</a>
            </div>
        `;
        document.body.appendChild(modal);

        // get button schedule-selected
        const scheduleSelectedButton = document.querySelector("#schedulator-btn-schedule-selected");
        scheduleSelectedButton.addEventListener("click", () => handleCheckboxSchedulatorButtonClick(domain, user));
        const descheduleSelectedButton = document.querySelector("#schedulator-btn-deschedule-selected");
        descheduleSelectedButton.addEventListener("click", () => handleDescheduleButtonClick(domain, user));
        const massCSVImportButton = document.querySelector("#schedulator-btn-mass-csv-import");
        massCSVImportButton.addEventListener("click", () => handleCSVSchedulatorButtonClick(domain, user));

        modal.addEventListener("click", (e) => {
            if (e.target.id === "custom-modal" || e.target.classList.contains("close-modal")) {
                modal.remove();
            }
        });
    }
};
