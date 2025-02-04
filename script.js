document.addEventListener("DOMContentLoaded", function () {
    const table = document.createElement("table");
    table.style.border = "1px solid black";
    table.style.borderCollapse = "collapse";
    table.style.fontFamily = "Times New Roman, serif";
    table.style.width = "100%";
    table.style.tableLayout = "fixed";

    const headerRow = document.createElement("tr");
    const headerCell = document.createElement("th");
    headerCell.colSpan = 2;
    headerCell.contentEditable = true;
    headerCell.innerText = "Time Blocking Schedule";
    headerCell.style.border = "1px solid black";
    headerRow.appendChild(headerCell);
    table.appendChild(headerRow);

    for (let hour = 7; hour <= 24 + 1; hour++) {
        const row = document.createElement("tr");
        row.style.border = "1px solid black";

        const timeCell = document.createElement("td");
        timeCell.innerText = hour <= 12 ? `${hour}am` : `${hour - 12}pm`;
        timeCell.style.textAlign = "right";
        timeCell.style.border = "1px solid black";
        timeCell.style.width = "20%";
        row.appendChild(timeCell);

        const taskCell = document.createElement("td");
        taskCell.contentEditable = true;
        taskCell.style.textAlign = "left";
        taskCell.style.border = "1px solid black";
        taskCell.style.width = "80%";
        row.appendChild(taskCell);

        table.appendChild(row);
    }

    document.body.appendChild(table);

    let selectedCells = new Set();

    table.addEventListener("click", function (event) {
        if (event.shiftKey && event.target.tagName === "TD") {
            selectedCells.add(event.target);
            event.target.style.border = "2px solid blue";
        } else {
            selectedCells.forEach(cell => cell.style.border = "1px solid black");
            selectedCells.clear();
        }
    });

    table.addEventListener("contextmenu", function (event) {
        event.preventDefault();
        if (event.target.tagName === "TD") {
            const menu = document.createElement("div");
            menu.style.position = "absolute";
            menu.style.top = `${event.clientY}px`;
            menu.style.left = `${event.clientX}px`;
            menu.style.background = "white";
            menu.style.border = "1px solid black";
            menu.style.padding = "5px";
            menu.innerHTML = `<button onclick='mergeCells()'>Merge</button> <button onclick='unmergeCells()'>Unmerge</button>`;
            document.body.appendChild(menu);

            document.addEventListener("click", function removeMenu() {
                menu.remove();
                document.removeEventListener("click", removeMenu);
            });
        }
    });

    function mergeCells() {
        if (selectedCells.size > 1) {
            let firstCell = [...selectedCells][0];
            let text = [...selectedCells].map(cell => cell.innerText).join(" ");
            firstCell.innerText = text;
            firstCell.rowSpan = selectedCells.size;
            selectedCells.forEach((cell, index) => {
                if (index !== 0) cell.remove();
            });
            selectedCells.clear();
        }
    }

    function unmergeCells() {
        // Implementation of unmerge logic
    }
});
