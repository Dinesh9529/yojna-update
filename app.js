
fetch("https://opensheet.elk.sh/1ckP6GXewgRHTXinaR9Dz60SLxlLse45TF5nHpLeoZeA/Sheet1")
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById("yojna-list");
    data.forEach((row, index) => {
      const item = document.createElement("div");
      item.innerHTML = `<h3>${index + 1}. ${row.Title}</h3><p>${row.Description}</p><a href="${row.Link}" target="_blank">लिंक खोलें</a><hr>`;
      container.appendChild(item);
    });
  })
  .catch(error => {
    document.getElementById("yojna-list").innerText = "डेटा लोड नहीं हो पाया।";
    console.error("Error fetching data:", error);
  });
