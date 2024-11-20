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
