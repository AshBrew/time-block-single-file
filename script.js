document.addEventListener("DOMContentLoaded", function () {
    const table = document.createElement("table");
    table.style.borderCollapse = "collapse";
    table.style.fontFamily = "Times New Roman";
    table.style.width = "auto";
    table.style.tableLayout = "auto";

    let selectedCells = new Set();

    const headerRow = table.insertRow();
    const header = document.createElement("th");
    header.colSpan = 2;
    header.contentEditable = true;
    header.style.textAlign = "center";
    header.style.border = "1px #476232";
    headerRow.appendChild(header);

    for {let row = table.insertRow();
        let cell1 = row.insertCell();
        cell1.rowSpan = 4;
        cell1.contentEditable = true;
        cell1.style.textAlign = "right";
        cell1.style.border = "1px #476232";
        cell1.style.wordWrap = "break-word";
        cell1.style.overflow = "hidden";
        cell1.style.resize = "both";
        cell1.style.minWidth = "50px";
        cell1.style.minHeight = "20px";
        
        for (let i = 0; i < 4; i++) {
            if (i > 0) row = table.insertRow();
            let cell2 = row.insertCell();
            cell2.contentEditable = true;
            cell2.style.textAlign = "left";
            cell2.style.border = "1px #476232";
            cell2.style.wordWrap = "break-word";
            cell2.style.overflow = "hidden";
            cell2.style.resize = "both";
            cell2.style.minWidth = "50px";
            cell2.style.minHeight = "20px";

            cell2.addEventListener("click", function (e) {
                if (e.shiftKey) {
                    selectedCells.add(cell2);
                } else {
                    selectedCells.forEach(c => c.style.border = "1px solid black");
                    selectedCells.clear();
                    selectedCells.add(cell2);
                }
            });
            
            cell2.addEventListener("contextmenu", function (e) {
                e.preventDefault();
                showContextMenu(e, cell2);
            });
        }
    }

    document.body.appendChild(table);

    function mergeSelectedCells() {
        if (selectedCells.size < 2) return;
        let minRow = Infinity, maxRow = -1, minCol = Infinity, maxCol = -1;
        selectedCells.forEach(cell => {
            const rowIndex = cell.parentElement.rowIndex;
            const cellIndex = Array.from(cell.parentElement.cells).indexOf(cell);
            minRow = Math.min(minRow, rowIndex);
            maxRow = Math.max(maxRow, rowIndex);
            minCol = Math.min(minCol, cellIndex);
            maxCol = Math.max(maxCol, cellIndex);
        });
        let firstCell = table.rows[minRow].cells[minCol];
        firstCell.rowSpan = maxRow - minRow + 1;
        firstCell.colSpan = maxCol - minCol + 1;
        selectedCells.forEach(cell => {
            if (cell !== firstCell) cell.remove();
        });
        selectedCells.clear();
    }

    function unmergeSelectedCells() {
        alert("Unmerge function will be implemented.");
    }

    function showColorPicker(cell) {
        let color = prompt("Enter a color or hex code:", "#ffffff");
        if (color) cell.style.backgroundColor = color;
    }

    function showContextMenu(event, cell) {
        const existingMenu = document.getElementById("context-menu");
        if (existingMenu) {
            existingMenu.remove();
        }

        const menu = document.createElement("div");
        menu.id = "context-menu";
        menu.style.position = "absolute";
        menu.style.top = `${event.clientY}px`;
        menu.style.left = `${event.clientX}px`;
        menu.style.background = "white";
        menu.style.border = "1px solid black";
        menu.style.padding = "5px";
        menu.style.boxShadow = "2px 2px 5px rgba(0,0,0,0.5)";

        const mergeOption = document.createElement("div");
        mergeOption.innerText = "Merge Cells";
        mergeOption.addEventListener("click", function () {
            mergeSelectedCells();
            menu.remove();
        });

        const unmergeOption = document.createElement("div");
        unmergeOption.innerText = "Unmerge Cells";
        unmergeOption.addEventListener("click", function () {
            unmergeSelectedCells();
            menu.remove();
        });

        const colorOption = document.createElement("div");
        colorOption.innerText = "Change Color";
        colorOption.addEventListener("click", function () {
            menu.remove();
            showColorPicker(cell);
        });

        [mergeOption, unmergeOption, colorOption].forEach(option => {
            option.style.padding = "5px";
            option.style.cursor = "pointer";
            option.addEventListener("mouseover", () => option.style.background = "lightgrey");
            option.addEventListener("mouseout", () => option.style.background = "white");
            menu.appendChild(option);
        });

        document.body.appendChild(menu);

        document.addEventListener("click", function removeMenu() {
            menu.remove();
            document.removeEventListener("click", removeMenu);
        });
    }
});
