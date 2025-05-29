
document.addEventListener("DOMContentLoaded", function() {
    const yojanaList = document.getElementById("yojana-list");
    fetch("https://opensheet.elk.sh/1gEZXoYcEK6dqhwxZGehPpcLgwsIjNVhRitDd0F_gafU/yojana")
        .then(res => res.json())
        .then(data => {
            yojanaList.innerHTML = "";
            data.forEach(item => {
                const div = document.createElement("div");
                div.innerHTML = `<h3>${item.योजना}</h3><p>${item.विवरण}</p>`;
                div.style.background = "#fff";
                div.style.margin = "10px 0";
                div.style.padding = "10px";
                div.style.borderRadius = "8px";
                yojanaList.appendChild(div);
            });
        })
        .catch(err => {
            yojanaList.innerHTML = "डेटा लोड नहीं हो पाया।";
        });
});
