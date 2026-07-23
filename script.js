const excelInput = document.getElementById("excel");
const recordContainer = document.getElementById("record");
let data = [];

if (excelInput) {
  excelInput.addEventListener("change", loadExcel);
}

function loadExcel(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const workbook = XLSX.read(e.target.result, { type: "array" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    data = XLSX.utils.sheet_to_json(sheet, { defval: "" });
    showRecord();
  };
  reader.readAsArrayBuffer(file);
}

function showRecord() {
  if (data.length === 0) {
    recordContainer.innerHTML = "<p>No data loaded yet.</p>";
    return;
  }

  const record = data[0];
  let html = "<h2>First record</h2><table>";
  for (const key in record) {
    html += `<tr><th>${key}</th><td>${record[key] ?? ""}</td></tr>`;
  }
  html += "</table>";
  recordContainer.innerHTML = html;
}
