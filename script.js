
const sheetID = "1ckP6GXewgRHTXinaR9Dz60SLxlLse45TF5nHpLeoZeA";
const sheetName = "Sheet1";
const url = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?sheet=${sheetName}`;

fetch(url)
  .then(res => res.text())
  .then(rep => {
    const jsonData = JSON.parse(rep.substring(47).slice(0, -2));
    const table = document.getElementById("data-table");
    const headers = document.getElementById("table-headers");
    const body = document.getElementById("table-body");

    const cols = jsonData.table.cols;
    const rows = jsonData.table.rows;

    headers.innerHTML = "";
    cols.forEach(col => {
        if (col.label) {
            let th = document.createElement("th");
            th.innerText = col.label;
            headers.appendChild(th);
        }
    });

    body.innerHTML = "";
    rows.forEach(row => {
        let tr = document.createElement("tr");
        row.c.forEach(cell => {
            let td = document.createElement("td");
            td.innerText = (cell && cell.v) || "";
            tr.appendChild(td);
        });
        body.appendChild(tr);
    });
  })
  .catch(err => console.error("Error fetching data: ", err));
