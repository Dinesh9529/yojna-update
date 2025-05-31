fetch("https://opensheet.elk.sh/1ckP6GXewgRHTXinaR9Dz60SLxlLse45TF5nHpLeoZeA/Sheet1")
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById("scheme-container");
    container.innerHTML = "";
    data.forEach(row => {
      const title = row.title || "कोई शीर्षक नहीं";
      const description = row.description || "विवरण नहीं मिला";
      const link = row.link || "#";

      container.innerHTML += `
        <div class="scheme-card">
          <h2>${title}</h2>
          <p>${description}</p>
          <a href="${link}" target="_blank">Apply Now</a>
        </div>
      `;
    });
  })
  .catch(error => {
    document.getElementById("scheme-container").innerText = "डेटा लोड करने में त्रुटि: " + error;
  });
