// Sample course dataset (replace with real data or load from API)
const courses = [
  { code: "EC201", title: "Space Communication Technologies", semester: 7, thumb: "https://picsum.photos/seed/1/640/360" },
  { code: "EC202", title: "Digital Signal Processing", semester: 5, thumb: "https://picsum.photos/seed/2/640/360" },
  { code: "EC203", title: "Wireless Networks", semester: 7, thumb: "https://picsum.photos/seed/3/640/360" },
  { code: "EC204", title: "Antenna Theory", semester: 6, thumb: "https://picsum.photos/seed/4/640/360" },
  { code: "EC205", title: "Information Theory", semester: 7, thumb: "https://picsum.photos/seed/5/640/360" },
  { code: "EC206", title: "Satellite Systems", semester: 7, thumb: "https://picsum.photos/seed/6/640/360" },
];

// DOM Elements
const grid = document.getElementById("coursesGrid");
const search = document.getElementById("search");
const semester = document.getElementById("semester");
const clearBtn = document.getElementById("clear");

// Render cards into grid
function render(list){
  grid.innerHTML = "";
  if(list.length===0){
    grid.innerHTML = `<p style="color:#666">No courses match your search.</p>`;
    return;
  }
  list.forEach(c => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <div class="thumb" role="img" aria-label="${c.title}" style="background-image:url('${c.thumb}');"></div>
      <div class="meta">
        <span class="code">${c.code} [${c.title.split(" ")[0]}]</span>
        <span class="title">${c.title}</span>
        <span class="tag">Semester ${c.semester}</span>
      </div>
    `;
    grid.appendChild(card);
  });
}

// Filter logic
function applyFilters(){
  const q = search.value.trim().toLowerCase();
  const sem = semester.value;

  let list = courses.filter(c => {
    const matchesSem = sem === "" || String(c.semester) === sem;
    const matchesQuery = q === "" || (c.code + " " + c.title).toLowerCase().includes(q);
    return matchesSem && matchesQuery;
  });

  render(list);
}

// Events
search.addEventListener("input", debounce(applyFilters, 200));
semester.addEventListener("change", applyFilters);
clearBtn.addEventListener("click", () => {
  search.value = "";
  semester.value = "";
  applyFilters();
});

// Utility: simple debounce
function debounce(fn, ms){
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), ms);
  };
}

// first render
render(courses);
