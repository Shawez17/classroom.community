const content = document.getElementById("content");

document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", async e => {
    e.preventDefault();
    const url = e.target.getAttribute("href");

    // slide out current content
    content.classList.add("slide-left");
    await new Promise(r => setTimeout(r, 300));

    // load new page content
    const res = await fetch(url);
    const html = await res.text();
    const temp = new DOMParser().parseFromString(html, "text/html");
    content.innerHTML = temp.querySelector("main").innerHTML;

    // slide in new content
    content.classList.remove("slide-left");
    content.classList.add("slide-right");
    setTimeout(() => content.classList.remove("slide-right"), 300);
  });
});
