// domUtils.js
const addHeaderToTable = (table) => {
    const headerRow = table.querySelector("thead tr");
    if (headerRow && !headerRow.querySelector("#select-th")) {
        const th = document.createElement("th");
        th.className = "sort";
        th.id = "select-th";
        th.setAttribute("data-sort-key", "disabled");
        th.innerHTML = `<div>Select</div>`;
        headerRow.prepend(th);
    }
};

const addCheckboxesToRows = (rows) => {
    rows.forEach(row => {
        if (!row.querySelector(".cell-select")) {
            const nameCell = row.querySelector(".cell-name a");
            const nameValue = nameCell ? nameCell.textContent.trim() : "";

            const td = document.createElement("td");
            td.innerHTML = `
                <div class="cell-select" style="text-align:center;">
                    <input style="margin-top: 0.5rem" type="checkbox" class="schedulator-checkbox" name="entity-name" value="${nameValue}">
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
