document.addEventListener("DOMContentLoaded", function () {
    const table = document.createElement("table");
    table.style.borderCollapse = "collapse";
    table.style.fontFamily = "Times New Roman";
    table.style.width = "100%";
    table.style.tableLayout = "auto";

    let selectedCells = new Set();

    const headerRow = table.insertRow();
    const header = document.createElement("th");
    header.colSpan = 2;
    header.contentEditable = true;
    header.style.textAlign = "center";
    header.style.border = "1px solid black";
    headerRow.appendChild(header);

    for (let hour = 7; hour !== 2; hour = (hour % 12) + 1) {
        let row = table.insertRow();
        let cell1 = row.insertCell();
        let cell2 = row.insertCell();

        cell1.innerText = `${hour}${hour < 12 ? "am" : "pm"}`;
        cell1.style.textAlign = "right";
        cell2.contentEditable = true;
        cell2.style.textAlign = "left";

        [cell1, cell2].forEach(cell => {
            cell.style.border = "1px solid black";
            cell.style.wordWrap = "break-word";
            cell.style.overflow = "hidden";
            
            cell.addEventListener("click", function (e) {
                if (e.shiftKey) {
                    cell.style.border = "2px solid blue";
                    selectedCells.add(cell);
                } else {
                    selectedCells.forEach(c => c.style.border = "1px solid black");
                    selectedCells.clear();
                    cell.style.border = "2px solid red";
                    selectedCells.add(cell);
                }
            });
            
            cell.addEventListener("contextmenu", function (e) {
                e.preventDefault();
                showContextMenu(e, cell);
            });
        });
    }

    document.body.appendChild(table);

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
        mergeOption.innerText = "Merge";
        mergeOption.addEventListener("click", function () {
            alert("Merge option selected");
            menu.remove();
        });

        const unmergeOption = document.createElement("div");
        unmergeOption.innerText = "Unmerge";
        unmergeOption.addEventListener("click", function () {
            alert("Unmerge option selected");
            menu.remove();
        });

        const colorOption = document.createElement("div");
        colorOption.innerText = "Change Color";
        colorOption.addEventListener("click", function () {
            alert("Change Color option selected");
            menu.remove();
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
