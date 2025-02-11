// main.js
document.addEventListener("DOMContentLoaded", function() {
    fetchBonuses();
});

function fetchBonuses() {
    const year = document.getElementById("year").value || new Date().getFullYear();
    fetch(`http://localhost:3000/bonuses?year=${year}`)
        .then(response => response.json())
        .then(data => {
            let tableBody = "";
            data.forEach(row => {
                tableBody += `<tr>
                    <td>${row.staff_id}</td>
                    <td>${row.staff_name}</td>
                    <td>${row.salary}</td>
                    <td>${row.grade}</td>
                    <td>${row.entitled_bonus}</td>
                    <td>${row.bonus}</td>
                </tr>`;
            });
            document.getElementById("bonusTable").innerHTML = tableBody;
        })
        .catch(error => console.error("Error fetching bonuses:", error));
}