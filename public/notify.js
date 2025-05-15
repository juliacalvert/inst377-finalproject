const url = "http://localhost:4000/api/suspectInfo";

async function createSuspectTip() {
  await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      suspect_name: document.getElementById("suspect_name").value,
      tip: document.getElementById("tip").value,
      date: document.getElementById("date").value,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((result) => result.json());;

  await loadSuspectTips();
}
    
async function loadSuspectTips(searchTerm = "") {
  await fetch(url)
    .then((result) => result.json())
    .then((resultJson) => {
      const filtered = resultJson.filter((suspect) =>
        suspect.suspect_name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      const table = document.createElement('table');
      table.setAttribute('id', 'suspectTable');

      const tableRow = document.createElement('tr');

      const tableHeadingSuspectName = document.createElement('th');
      tableHeadingSuspectName.innerHTML = 'Suspect Name';
      tableRow.appendChild(tableHeadingSuspectName);

      const tableHeadingTip = document.createElement('th');
      tableHeadingTip.innerHTML = 'Tip';
      tableRow.appendChild(tableHeadingTip);

      const tableHeadingDate = document.createElement('th');
      tableHeadingDate.innerHTML = 'Date';
      tableRow.appendChild(tableHeadingDate);

      table.appendChild(tableRow);

      filtered.forEach((suspect) => {
        const suspectTableRow = document.createElement('tr');
        const suspectTableName = document.createElement('td');
        const suspectTableTip = document.createElement('td');
        const suspectTableDate = document.createElement('td');

        suspectTableName.innerHTML = suspect.suspect_name;
        suspectTableTip.innerHTML = suspect.tip;
        suspectTableDate.innerHTML = suspect.date;

        suspectTableRow.appendChild(suspectTableName);
        suspectTableRow.appendChild(suspectTableTip);
        suspectTableRow.appendChild(suspectTableDate);

        table.appendChild(suspectTableRow);
      });

      const preExistingTable = document.getElementById('suspectTable');
      if (preExistingTable) {
        preExistingTable.remove();
      }

      document.body.appendChild(table);
    });
}

document.getElementById("search").addEventListener("input", (e) => {
  loadSuspectTips(e.target.value);
});


window.onload = () => loadSuspectTips();