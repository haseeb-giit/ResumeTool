(function () {
  "use strict";

  /* ============================================================
     STATE
  ============================================================ */
  const STORAGE_KEY = "dossier-resume-data-v1";

  const THEMES = [
    { id:"pine",     name:"Pine & Gold",     accent:"#0F3D33", accent2:"#C9A24B" },
    { id:"navy",     name:"Navy & Rust",     accent:"#1B2E4B", accent2:"#C2704A" },
    { id:"charcoal", name:"Charcoal & Teal", accent:"#26292E", accent2:"#4FA8A0" },
    { id:"maroon",   name:"Maroon & Sand",   accent:"#5C1F2E", accent2:"#D9B48A" },
    { id:"slate",    name:"Slate & Coral",   accent:"#33424F", accent2:"#E07A5F" },
    { id:"forest",   name:"Forest & Amber",  accent:"#1F3B2C", accent2:"#E0A94C" },
    { id:"plum",     name:"Plum & Blush",    accent:"#3D2143", accent2:"#E2A6A1" },
    { id:"ink",      name:"Ink & Sky",       accent:"#1C2331", accent2:"#7FB0D6" },
    { id:"burgundy", name:"Burgundy & Cream",accent:"#4A1223", accent2:"#EADFC5" },
    { id:"olive",    name:"Olive & Clay",    accent:"#3C3D22", accent2:"#C97F5A" },
    { id:"teal",     name:"Deep Teal & Peach",accent:"#0E3B3E", accent2:"#F0A98A" },
    { id:"espresso", name:"Espresso & Mint", accent:"#2E211A", accent2:"#8FC7B0" },
    { id:"indigo",   name:"Indigo & Rose",   accent:"#26254B", accent2:"#D98A9E" },
    { id:"graphite", name:"Graphite & Lime", accent:"#2B2E33", accent2:"#B7C95A" },
    { id:"wine",     name:"Wine & Champagne",accent:"#5A1E2E", accent2:"#E8C9A0" },
    { id:"midnight", name:"Midnight & Gold", accent:"#131C31", accent2:"#D4AF6A" },
    { id:"moss",     name:"Moss & Cream",    accent:"#33422B", accent2:"#EFE3C8" },
    { id:"clay",     name:"Terracotta & Sage",accent:"#8A3F2C", accent2:"#9AAE8D" },
    { id:"steel",    name:"Steel & Amber",   accent:"#3A4750", accent2:"#E3A857" },
    { id:"aubergine",name:"Aubergine & Gold",accent:"#3A1F3D", accent2:"#D8AE55" },
    { id:"forest2",  name:"Forest & Sky",    accent:"#1C3A2E", accent2:"#8EC5E0" },
    { id:"rust",     name:"Rust & Denim",    accent:"#7A3B24", accent2:"#5C7A9E" },
    { id:"black",    name:"Black & Copper",  accent:"#1A1A1A", accent2:"#C4703F" },
    { id:"emerald",  name:"Emerald & Blush", accent:"#0E4D3C", accent2:"#E7B0AC" },
    { id:"cobalt",   name:"Cobalt & Sand",   accent:"#1E3A66", accent2:"#E3C89A" },
    { id:"mocha",    name:"Mocha & Sky",     accent:"#4A342B", accent2:"#A6C6D9" },
    { id:"crimson",  name:"Crimson & Slate", accent:"#6B1E2A", accent2:"#7C8A99" },
    { id:"seafoam",  name:"Deep Sea & Foam", accent:"#0B3241", accent2:"#9FD8C9" },
    { id:"berry",    name:"Berry & Oat",     accent:"#4B1D3F", accent2:"#DCC9A3" },
    { id:"pewter",   name:"Pewter & Coral",  accent:"#3F4247", accent2:"#E8836B" }
  ];
  const DEFAULT_THEME = THEMES[0];

  const emptyState = () => ({
    template: "sidebar",
    theme: { id: DEFAULT_THEME.id },
    photo: null,
    basics: {
      name: "", title: "", email: "", phone: "",
      location: "", website: "", summary: ""
    },
    experience: [ blankExperience() ],
    education: [ blankEducation() ],
    skills: [ blankSkill(), blankSkill(), blankSkill() ],
    projects: [],
    certifications: [],
    languages: [ blankLanguage() ],
    interests: ""
  });

  function blankExperience(){ return { company:"", role:"", location:"", start:"", end:"", current:false, bullets:"" }; }
  function blankEducation(){ return { school:"", degree:"", start:"", end:"", grade:"" }; }
  function blankSkill(){ return { name:"", level:3 }; }
  function blankProject(){ return { name:"", link:"", description:"" }; }
  function blankCertification(){ return { name:"", issuer:"", year:"" }; }
  function blankLanguage(){ return { name:"", level:"Conversational" }; }

  let state = loadState() || emptyState();

  function loadState(){
    try{
      const raw = localStorage.getItem(STORAGE_KEY);
      if(!raw) return null;
      const parsed = JSON.parse(raw);
      // guard against missing keys if schema evolves
      return Object.assign(emptyState(), parsed);
    }catch(e){ return null; }
  }

  let saveTimer = null;
  function persist(){
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }catch(e){ /* storage unavailable */ }
    }, 250);
  }

  /* ============================================================
     ICONS
  ============================================================ */
  const ICONS = {
    mail: '<svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    phone: '<svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.4 2.1L8.1 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.8 2.1z"/></svg>',
    pin: '<svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0 1 18 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
    link: '<svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.5.5l2-2a5 5 0 0 0-7-7l-1.2 1.1"/><path d="M14 11a5 5 0 0 0-7.5-.5l-2 2a5 5 0 0 0 7 7l1.1-1.1"/></svg>'
  };

  /* ============================================================
     ELEMENTS
  ============================================================ */
  const el = (id) => document.getElementById(id);
  const form = el("resume-form");
  const resumePage = el("resume-page");
  const scaleWrapper = el("preview-scale-wrapper");
  const tabrail = el("tabrail");
  const app = el("app");
  const toastEl = el("toast");

  /* ============================================================
     BASICS BINDING
  ============================================================ */
  const basicFieldMap = {
    "f-name": "name", "f-title": "title", "f-email": "email",
    "f-phone": "phone", "f-location": "location", "f-website": "website",
    "f-summary": "summary"
  };
  Object.keys(basicFieldMap).forEach((id) => {
    const input = el(id);
    input.addEventListener("input", () => {
      state.basics[basicFieldMap[id]] = input.value;
      queueRenderPreview();
      persist();
    });
  });
  el("f-interests").addEventListener("input", (e) => {
    state.interests = e.target.value;
    queueRenderPreview();
    persist();
  });

  function fillBasicsFromState(){
    Object.keys(basicFieldMap).forEach((id) => {
      el(id).value = state.basics[basicFieldMap[id]] || "";
    });
    el("f-interests").value = state.interests || "";
  }

  /* ============================================================
     PHOTO UPLOAD
  ============================================================ */
  const photoDrop = el("photo-drop");
  const photoInput = el("photo-input");
  const photoPreview = el("photo-preview");
  const photoPlaceholder = el("photo-placeholder");

  photoDrop.addEventListener("click", () => photoInput.click());
  photoDrop.addEventListener("keydown", (e) => {
    if(e.key === "Enter" || e.key === " "){ e.preventDefault(); photoInput.click(); }
  });
  photoInput.addEventListener("change", () => {
    const file = photoInput.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      state.photo = e.target.result;
      applyPhotoToForm();
      queueRenderPreview();
      persist();
    };
    reader.readAsDataURL(file);
  });
  el("photo-remove").addEventListener("click", () => {
    state.photo = null;
    photoInput.value = "";
    applyPhotoToForm();
    queueRenderPreview();
    persist();
  });
  function applyPhotoToForm(){
    if(state.photo){
      photoPreview.src = state.photo;
      photoPreview.hidden = false;
      photoPlaceholder.hidden = true;
    }else{
      photoPreview.hidden = true;
      photoPlaceholder.hidden = false;
    }
  }

  /* ============================================================
     REPEATABLE SECTIONS — generic helpers
  ============================================================ */
  const REPEAT_CONFIG = {
    experience: { listEl: "experience-list", blank: blankExperience, render: renderExperienceItem },
    education:  { listEl: "education-list",  blank: blankEducation,  render: renderEducationItem },
    skill:      { listEl: "skills-list",      blank: blankSkill,      render: renderSkillItem, stateKey: "skills" },
    project:    { listEl: "projects-list",    blank: blankProject,    render: renderProjectItem, stateKey: "projects" },
    certification: { listEl: "certifications-list", blank: blankCertification, render: renderCertificationItem, stateKey: "certifications" },
    language:   { listEl: "languages-list",   blank: blankLanguage,   render: renderLanguageItem, stateKey: "languages" }
  };

  document.querySelectorAll("[data-add]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const type = btn.getAttribute("data-add");
      const key = REPEAT_CONFIG[type].stateKey || type;
      state[key].push(REPEAT_CONFIG[type].blank());
      renderRepeatList(type);
      queueRenderPreview();
      persist();
      // focus first input of the new card
      const list = el(REPEAT_CONFIG[type].listEl);
      const lastCard = list.lastElementChild;
      const firstInput = lastCard && lastCard.querySelector("input, textarea");
      if(firstInput) firstInput.focus();
    });
  });

  function renderRepeatList(type){
    const cfg = REPEAT_CONFIG[type];
    const key = cfg.stateKey || type;
    const list = el(cfg.listEl);
    list.innerHTML = state[key].map((item, i) => cfg.render(item, i)).join("");
    bindRepeatEvents(type);
  }

  function renderAllRepeatLists(){
    Object.keys(REPEAT_CONFIG).forEach(renderRepeatList);
  }

  function bindRepeatEvents(type){
    const cfg = REPEAT_CONFIG[type];
    const key = cfg.stateKey || type;
    const list = el(cfg.listEl);

    list.querySelectorAll("[data-field]").forEach((input) => {
      const evt = (input.tagName === "SELECT" || input.type === "checkbox") ? "change" : "input";
      input.addEventListener(evt, () => {
        const idx = Number(input.getAttribute("data-index"));
        const field = input.getAttribute("data-field");
        const value = input.type === "checkbox" ? input.checked : input.value;
        state[key][idx][field] = value;

        // "current" checkbox toggles end field
        if(type === "experience" && field === "current"){
          renderRepeatList(type); // re-render to reflect disabled state
        }
        queueRenderPreview();
        persist();
      });
    });

    list.querySelectorAll("[data-remove]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = Number(btn.getAttribute("data-remove"));
        state[key].splice(idx, 1);
        renderRepeatList(type);
        queueRenderPreview();
        persist();
      });
    });

    if(type === "skill"){
      list.querySelectorAll(".dot-rating").forEach((wrap) => {
        const idx = Number(wrap.getAttribute("data-index"));
        wrap.querySelectorAll("button").forEach((dot) => {
          dot.addEventListener("click", () => {
            const lvl = Number(dot.getAttribute("data-level"));
            state.skills[idx].level = lvl;
            renderRepeatList("skill");
            queueRenderPreview();
            persist();
          });
        });
      });
    }
  }

  /* ---------- item template renderers ---------- */
  function removeBtn(idx){
    return `<button type="button" class="item-remove" data-remove="${idx}" aria-label="Remove">
      <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M6 6l12 12M18 6 6 18"/></svg>
    </button>`;
  }

  function renderExperienceItem(item, i){
    return `
    <div class="item-card">
      <div class="item-card__top">
        <span class="item-card__label">EXPERIENCE ${String(i+1).padStart(2,"0")}</span>
        ${removeBtn(i)}
      </div>
      <div class="item-grid">
        <div>
          <label>Company</label>
          <input type="text" data-field="company" data-index="${i}" value="${esc(item.company)}" placeholder="Northwind Studio">
        </div>
        <div>
          <label>Role</label>
          <input type="text" data-field="role" data-index="${i}" value="${esc(item.role)}" placeholder="Product Designer">
        </div>
        <div class="span-2">
          <label>Location</label>
          <input type="text" data-field="location" data-index="${i}" value="${esc(item.location)}" placeholder="Remote · Lahore, PK">
        </div>
        <div class="span-2 date-row">
          <div>
            <label>Start</label>
            <input type="text" data-field="start" data-index="${i}" value="${esc(item.start)}" placeholder="Jan 2022">
          </div>
          <div>
            <label>End</label>
            <input type="text" data-field="end" data-index="${i}" value="${esc(item.current ? "Present" : item.end)}" placeholder="Mar 2024" ${item.current ? "disabled" : ""}>
          </div>
          <label class="current-check">
            <input type="checkbox" data-field="current" data-index="${i}" ${item.current ? "checked" : ""}>
            Current
          </label>
        </div>
        <div class="span-2">
          <label>Highlights <span class="hint-inline">(one per line)</span></label>
          <textarea data-field="bullets" data-index="${i}" rows="3" placeholder="Led a redesign that lifted activation by 18%">${esc(item.bullets)}</textarea>
        </div>
      </div>
    </div>`;
  }

  function renderEducationItem(item, i){
    return `
    <div class="item-card">
      <div class="item-card__top">
        <span class="item-card__label">EDUCATION ${String(i+1).padStart(2,"0")}</span>
        ${removeBtn(i)}
      </div>
      <div class="item-grid">
        <div class="span-2">
          <label>School / University</label>
          <input type="text" data-field="school" data-index="${i}" value="${esc(item.school)}" placeholder="Ibadat International University">
        </div>
        <div class="span-2">
          <label>Degree</label>
          <input type="text" data-field="degree" data-index="${i}" value="${esc(item.degree)}" placeholder="BS Software Engineering">
        </div>
        <div class="date-row" style="grid-column:1/-1;">
          <div>
            <label>Start</label>
            <input type="text" data-field="start" data-index="${i}" value="${esc(item.start)}" placeholder="2021">
          </div>
          <div>
            <label>End</label>
            <input type="text" data-field="end" data-index="${i}" value="${esc(item.end)}" placeholder="2025">
          </div>
          <div>
            <label>Grade <span class="hint-inline">(optional)</span></label>
            <input type="text" data-field="grade" data-index="${i}" value="${esc(item.grade)}" placeholder="3.8 CGPA">
          </div>
        </div>
      </div>
    </div>`;
  }

  function renderSkillItem(item, i){
    let dots = "";
    for(let d=1; d<=5; d++){
      dots += `<button type="button" data-level="${d}" class="${item.level >= d ? "is-filled" : ""}" aria-label="Level ${d}"></button>`;
    }
    return `
    <div class="item-card">
      <div class="tight-row">
        <input type="text" data-field="name" data-index="${i}" value="${esc(item.name)}" placeholder="Figma">
        <div class="dot-rating" data-index="${i}">${dots}</div>
        ${removeBtn(i)}
      </div>
    </div>`;
  }

  function renderProjectItem(item, i){
    return `
    <div class="item-card">
      <div class="item-card__top">
        <span class="item-card__label">PROJECT ${String(i+1).padStart(2,"0")}</span>
        ${removeBtn(i)}
      </div>
      <div class="item-grid">
        <div>
          <label>Name</label>
          <input type="text" data-field="name" data-index="${i}" value="${esc(item.name)}" placeholder="Dossier">
        </div>
        <div>
          <label>Link <span class="hint-inline">(optional)</span></label>
          <input type="text" data-field="link" data-index="${i}" value="${esc(item.link)}" placeholder="github.com/you/project">
        </div>
        <div class="span-2">
          <label>Description</label>
          <textarea data-field="description" data-index="${i}" rows="2" placeholder="What it does and the impact it had.">${esc(item.description)}</textarea>
        </div>
      </div>
    </div>`;
  }

  function renderCertificationItem(item, i){
    return `
    <div class="item-card">
      <div class="tight-row">
        <input type="text" data-field="name" data-index="${i}" value="${esc(item.name)}" placeholder="AWS Certified Developer" style="flex:2;">
        <input type="text" data-field="issuer" data-index="${i}" value="${esc(item.issuer)}" placeholder="Amazon" style="flex:1.4;">
        <input type="text" data-field="year" data-index="${i}" value="${esc(item.year)}" placeholder="2024" style="flex:0.7;">
        ${removeBtn(i)}
      </div>
    </div>`;
  }

  function renderLanguageItem(item, i){
    const levels = ["Basic","Conversational","Fluent","Native"];
    return `
    <div class="item-card">
      <div class="tight-row">
        <input type="text" data-field="name" data-index="${i}" value="${esc(item.name)}" placeholder="English">
        <select class="level-select" data-field="level" data-index="${i}">
          ${levels.map(l => `<option value="${l}" ${item.level===l?"selected":""}>${l}</option>`).join("")}
        </select>
        ${removeBtn(i)}
      </div>
    </div>`;
  }

  function esc(str){
    if(str === undefined || str === null) return "";
    return String(str)
      .replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;")
      .replaceAll('"',"&quot;");
  }

  /* ============================================================
     TAB RAIL (sections nav)
  ============================================================ */
  function buildTabrail(){
    const sections = Array.from(form.querySelectorAll(".fsection"));
    tabrail.innerHTML = sections.map((s, i) => {
      return `<button class="tabrail__btn ${i===0?"is-active":""}" data-target="${s.id}">${s.dataset.title}</button>`;
    }).join("");

    tabrail.querySelectorAll(".tabrail__btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = el(btn.getAttribute("data-target"));
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });

    const formScroll = el("form-scroll");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if(entry.isIntersecting){
          const id = entry.target.id;
          tabrail.querySelectorAll(".tabrail__btn").forEach((b) => {
            b.classList.toggle("is-active", b.getAttribute("data-target") === id);
          });
        }
      });
    }, { root: formScroll, threshold: 0.35 });
    sections.forEach((s) => observer.observe(s));
  }

  /* ============================================================
     TEMPLATE SWITCH
  ============================================================ */
  document.querySelectorAll(".tpl-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tpl-btn").forEach((b) => {
        b.classList.remove("is-active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("is-active");
      btn.setAttribute("aria-selected", "true");
      state.template = btn.getAttribute("data-template");
      resumePage.setAttribute("data-template", state.template);
      queueRenderPreview(true);
      persist();
    });
  });

  /* ============================================================
     PREVIEW RENDER
  ============================================================ */
  let previewTimer = null;
  function queueRenderPreview(immediate){
    clearTimeout(previewTimer);
    if(immediate){ renderPreview(); return; }
    previewTimer = setTimeout(renderPreview, 120);
  }

  function renderPreview(){
    resumePage.innerHTML = state.template === "classic" ? renderClassic() : renderSidebar();
    requestAnimationFrame(updateScale);
  }

  function contactBits(){
    const b = state.basics;
    const bits = [];
    if(b.email) bits.push({icon: ICONS.mail, text: b.email});
    if(b.phone) bits.push({icon: ICONS.phone, text: b.phone});
    if(b.location) bits.push({icon: ICONS.pin, text: b.location});
    if(b.website) bits.push({icon: ICONS.link, text: b.website});
    return bits;
  }

  function bulletsToList(text){
    const lines = (text || "").split("\n").map(l => l.trim()).filter(Boolean);
    if(!lines.length) return "";
    return `<ul>${lines.map(l => `<li>${esc(l)}</li>`).join("")}</ul>`;
  }

  function dateRange(item){
    const start = esc(item.start);
    const end = item.current ? "Present" : esc(item.end);
    if(!start && !end) return "";
    return `${start}${start && end ? " – " : ""}${end}`;
  }

  /* ---------- SIDEBAR TEMPLATE ---------- */
  function renderSidebar(){
    const b = state.basics;
    const skillsHtml = state.skills.filter(s => s.name).map(s => `
      <div class="rp-skill-row">
        <div class="rp-skill-row__top"><span>${esc(s.name)}</span></div>
        <div class="rp-dots">${[1,2,3,4,5].map(n => `<i class="${s.level>=n?"on":""}"></i>`).join("")}</div>
      </div>`).join("");

    const langHtml = state.languages.filter(l => l.name).map(l => `
      <div class="rp-lang-row"><span>${esc(l.name)}</span><span>${esc(l.level)}</span></div>`).join("");

    const interestChips = (state.interests||"").split(",").map(s=>s.trim()).filter(Boolean)
      .map(s => `<span class="rp-chip">${esc(s)}</span>`).join("");

    const expHtml = state.experience.filter(x => x.company || x.role).map(x => `
      <div class="rp-entry">
        <div class="rp-entry__row">
          <span class="rp-entry__title">${esc(x.role) || "Role"}${x.company ? " · " + esc(x.company) : ""}</span>
          <span class="rp-entry__date">${dateRange(x)}</span>
        </div>
        <div class="rp-entry__meta">${esc(x.location)}</div>
        ${bulletsToList(x.bullets)}
      </div>`).join("");

    const eduHtml = state.education.filter(x => x.school || x.degree).map(x => `
      <div class="rp-entry">
        <div class="rp-entry__row">
          <span class="rp-entry__title">${esc(x.degree) || "Degree"}</span>
          <span class="rp-entry__date">${dateRange(x)}</span>
        </div>
        <div class="rp-entry__meta">${esc(x.school)}${x.grade ? " · " + esc(x.grade) : ""}</div>
      </div>`).join("");

    const projHtml = state.projects.filter(x => x.name).map(x => `
      <div class="rp-entry">
        <div class="rp-entry__row">
          <span class="rp-entry__title">${esc(x.name)}</span>
        </div>
        ${x.link ? `<a href="#">${esc(x.link)}</a>` : ""}
        ${x.description ? `<p class="rp-desc">${esc(x.description)}</p>` : ""}
      </div>`).join("");

    const certHtml = state.certifications.filter(x => x.name).map(x => `
      <div class="rp-entry">
        <div class="rp-entry__row">
          <span class="rp-entry__title">${esc(x.name)}</span>
          <span class="rp-entry__date">${esc(x.year)}</span>
        </div>
        <div class="rp-entry__meta">${esc(x.issuer)}</div>
      </div>`).join("");

    return `
      <aside class="rp-side">
        ${state.photo ? `<div class="rp-side__photo"><img src="${state.photo}" alt=""></div>` : ""}
        <h1>${esc(b.name) || "Your Name"}</h1>
        <p class="rp-role">${esc(b.title) || "Professional Title"}</p>

        <div class="rp-side__block">
          <h3>Contact</h3>
          ${contactBits().map(c => `<div class="rp-contact-row">${c.icon}<span>${esc(c.text)}</span></div>`).join("") || `<p class="rp-empty">Add your contact details</p>`}
        </div>

        ${skillsHtml ? `<div class="rp-side__block"><h3>Skills</h3>${skillsHtml}</div>` : ""}
        ${langHtml ? `<div class="rp-side__block"><h3>Languages</h3>${langHtml}</div>` : ""}
        ${interestChips ? `<div class="rp-side__block"><h3>Interests</h3><div class="rp-chip-wrap">${interestChips}</div></div>` : ""}
      </aside>

      <div class="rp-main">
        ${b.summary ? `<div class="rp-main__section"><h3>Profile</h3><p class="rp-summary">${esc(b.summary)}</p></div>` : ""}
        ${expHtml ? `<div class="rp-main__section"><h3>Experience</h3>${expHtml}</div>` : ""}
        ${eduHtml ? `<div class="rp-main__section"><h3>Education</h3>${eduHtml}</div>` : ""}
        ${projHtml ? `<div class="rp-main__section"><h3>Projects</h3>${projHtml}</div>` : ""}
        ${certHtml ? `<div class="rp-main__section"><h3>Certifications</h3>${certHtml}</div>` : ""}
        ${(!b.summary && !expHtml && !eduHtml && !projHtml && !certHtml) ? `<p class="rp-empty">Fill in the form on the left — your resume builds itself here.</p>` : ""}
      </div>`;
  }

  /* ---------- CLASSIC TEMPLATE ---------- */
  function renderClassic(){
    const b = state.basics;

    const expHtml = state.experience.filter(x => x.company || x.role).map(x => `
      <div class="rc-entry">
        <div class="rc-entry__row">
          <span class="rc-entry__title">${esc(x.role) || "Role"}</span>
          <span class="rc-entry__date">${dateRange(x)}</span>
        </div>
        <div class="rc-entry__org">${esc(x.company)}${x.location ? " — " + esc(x.location) : ""}</div>
        ${bulletsToList(x.bullets)}
      </div>`).join("");

    const eduHtml = state.education.filter(x => x.school || x.degree).map(x => `
      <div class="rc-entry">
        <div class="rc-entry__row">
          <span class="rc-entry__title">${esc(x.degree) || "Degree"}</span>
          <span class="rc-entry__date">${dateRange(x)}</span>
        </div>
        <div class="rc-entry__org">${esc(x.school)}${x.grade ? " — " + esc(x.grade) : ""}</div>
      </div>`).join("");

    const skillsHtml = state.skills.filter(s => s.name).map(s => {
      const levels = ["","Basic","Intermediate","Proficient","Advanced","Expert"];
      return `<div class="rc-skill-row"><span>${esc(s.name)}</span><span>${levels[s.level]||""}</span></div>`;
    }).join("");

    const certHtml = state.certifications.filter(x => x.name).map(x => `
      <div class="rc-entry">
        <div class="rc-entry__row">
          <span class="rc-entry__title">${esc(x.name)}</span>
          <span class="rc-entry__date">${esc(x.year)}</span>
        </div>
        <div class="rc-entry__org">${esc(x.issuer)}</div>
      </div>`).join("");

    const projHtml = state.projects.filter(x => x.name).map(x => `
      <div class="rc-entry">
        <div class="rc-entry__row"><span class="rc-entry__title">${esc(x.name)}</span></div>
        ${x.link ? `<div class="rc-entry__org">${esc(x.link)}</div>` : ""}
        ${x.description ? `<p class="rp-desc">${esc(x.description)}</p>` : ""}
      </div>`).join("");

    const langInline = state.languages.filter(l=>l.name).map(l => `<span><strong>${esc(l.name)}</strong> · ${esc(l.level)}</span>`).join("  &nbsp;|&nbsp;  ");
    const interestsInline = (state.interests||"").split(",").map(s=>s.trim()).filter(Boolean).join(" · ");

    return `
      <div class="rc-header">
        <h1>${esc(b.name) || "Your Name"}</h1>
        <p class="rc-role">${esc(b.title) || "Professional Title"}</p>
        <div class="rc-contact">
          ${contactBits().map(c => `<span>${c.icon}${esc(c.text)}</span>`).join("")}
        </div>
        <div class="rc-rule"></div>
      </div>

      ${b.summary ? `<div class="rc-section"><h3>Profile</h3><p class="rc-summary">${esc(b.summary)}</p></div>` : ""}
      ${expHtml ? `<div class="rc-section"><h3>Experience</h3>${expHtml}</div>` : ""}
      ${eduHtml ? `<div class="rc-section"><h3>Education</h3>${eduHtml}</div>` : ""}
      ${skillsHtml ? `<div class="rc-section"><h3>Skills</h3><div class="rc-skills-grid">${skillsHtml}</div></div>` : ""}
      ${projHtml ? `<div class="rc-section"><h3>Projects</h3>${projHtml}</div>` : ""}
      ${certHtml ? `<div class="rc-section"><h3>Certifications</h3>${certHtml}</div>` : ""}
      ${(langInline || interestsInline) ? `<div class="rc-section"><h3>Additional</h3><p class="rc-inline-list">${langInline}${(langInline&&interestsInline)?"<br>":""}${interestsInline}</p></div>` : ""}
      ${(!b.summary && !expHtml && !eduHtml && !skillsHtml && !projHtml && !certHtml) ? `<p class="rp-empty" style="text-align:center;">Fill in the form on the left — your resume builds itself here.</p>` : ""}
    `;
  }

  /* ============================================================
     SCALE-TO-FIT PREVIEW
  ============================================================ */
  function updateScale(){
    const wrapperWidth = scaleWrapper.clientWidth;
    const nativeWidth = 794;
    const scale = Math.min(wrapperWidth / nativeWidth, 1);
    resumePage.style.transform = `scale(${scale})`;
    scaleWrapper.style.height = (resumePage.offsetHeight * scale) + "px";
  }
  window.addEventListener("resize", () => requestAnimationFrame(updateScale));

  /* ============================================================
     MOBILE VIEW TOGGLE
  ============================================================ */
  const mobileToggle = el("mobile-view-toggle");
  app.classList.add("is-editing");
  mobileToggle.addEventListener("click", () => {
    const nowPreviewing = !app.classList.contains("is-previewing");
    app.classList.toggle("is-editing", !nowPreviewing);
    app.classList.toggle("is-previewing", nowPreviewing);
    mobileToggle.setAttribute("aria-pressed", String(nowPreviewing));
    if(nowPreviewing) requestAnimationFrame(updateScale);
  });

  /* ============================================================
     TOAST
  ============================================================ */
  let toastTimer = null;
  function showToast(msg){
    toastEl.textContent = msg;
    toastEl.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("is-visible"), 2200);
  }

  /* ============================================================
     RESUME THEME
  ============================================================ */
  const themePicker = el("theme-picker");
  const themeToggle = el("theme-picker-toggle");
  const themePanel = el("theme-picker-panel");

  if(themePanel){
    themePanel.innerHTML = THEMES.map((t) => `
      <button type="button" class="theme-swatch" data-theme="${t.id}" title="${t.name}" role="menuitemradio">
        <span class="theme-swatch__inner" style="background:linear-gradient(135deg, ${t.accent} 50%, ${t.accent2} 50%);"></span>
      </button>
    `).join("");
  }

  function closeThemePanel(){
    themePanel.hidden = true;
    themeToggle.setAttribute("aria-expanded", "false");
  }

  if(themeToggle){
    themeToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const open = themePanel.hidden;
      themePanel.hidden = !open;
      themeToggle.setAttribute("aria-expanded", String(open));
    });

    themePanel.addEventListener("click", (e) => {
      const btn = e.target.closest(".theme-swatch");
      if(!btn) return;
      state.theme = { id: btn.getAttribute("data-theme") };
      hydrateFormFromState();
      persist();
      closeThemePanel();
    });

    document.addEventListener("click", (e) => {
      if(!themePicker.contains(e.target)) closeThemePanel();
    });
    document.addEventListener("keydown", (e) => {
      if(e.key === "Escape") closeThemePanel();
    });
  }

  /* ============================================================
     SAMPLE / RESET
  ============================================================ */
  el("sample-btn").addEventListener("click", () => {
    state = sampleState();
    hydrateFormFromState();
    queueRenderPreview(true);
    persist();
    showToast("Sample data loaded");
  });

  el("reset-btn").addEventListener("click", () => {
    if(!confirm("Clear all fields and start over?")) return;
    state = emptyState();
    hydrateFormFromState();
    queueRenderPreview(true);
    persist();
    showToast("Cleared");
  });

  function sampleState(){
    return {
      template: state.template,
      theme: state.theme,
      photo: null,
      basics: {
        name: "Jordan Blake",
        title: "Senior Product Designer",
        email: "jordan.blake@email.com",
        phone: "+1 415 555 0192",
        location: "Austin, TX",
        website: "linkedin.com/in/jordanblake",
        summary: "Product designer with 7+ years shaping B2B and consumer software, from early discovery through shipped detail. I lead cross-functional teams to outcomes that move real metrics, and I care as much about the design system as the pixel."
      },
      experience: [
        { company:"Northwind Labs", role:"Senior Product Designer", location:"Remote", start:"Jun 2021", end:"", current:true,
          bullets:"Led redesign of the core dashboard, lifting weekly active usage by 23%\nBuilt and shipped a company-wide design system adopted by 4 product teams\nMentored two mid-level designers into senior roles" },
        { company:"Fieldstone", role:"Product Designer", location:"Austin, TX", start:"Aug 2018", end:"May 2021", current:false,
          bullets:"Owned end-to-end design for the onboarding funnel, cutting drop-off by 31%\nPartnered with PM and eng to launch 12 features across two years" }
      ],
      education: [
        { school:"University of Texas at Austin", degree:"BFA, Design", start:"2014", end:"2018", grade:"3.7 GPA" }
      ],
      skills: [
        {name:"Product Strategy", level:5}, {name:"Figma", level:5}, {name:"Design Systems", level:4},
        {name:"User Research", level:4}, {name:"Prototyping", level:4}, {name:"HTML / CSS", level:3}
      ],
      projects: [
        { name:"Compass", link:"compass.design", description:"A side-project component library used by 300+ indie makers." }
      ],
      certifications: [
        { name:"Certified Usability Analyst", issuer:"Human Factors International", year:"2022" }
      ],
      languages: [
        { name:"English", level:"Native" }, { name:"Spanish", level:"Conversational" }
      ],
      interests: "Ceramics, Trail running, Type design, Coffee"
    };
  }

  /* ============================================================
     PDF EXPORT
  ============================================================ */
  el("download-btn").addEventListener("click", () => {
    const prevTransform = resumePage.style.transform;
    const prevWrapperHeight = scaleWrapper.style.height;
    resumePage.style.transform = "none";

    // The preview panel is a scroll container now (independent scrolling), and the
    // sidebar template's colored panel gets its height from flexbox "stretch" — neither
    // is captured reliably by html2canvas, so both are neutralized just for the export.
    const panelPreview = el("panel-preview");
    const prevPanelOverflow = panelPreview.style.overflow;
    const prevPanelHeight = panelPreview.style.height;
    panelPreview.style.overflow = "visible";
    panelPreview.style.height = "auto";

    const sideEl = resumePage.querySelector(".rp-side");
    const mainEl = resumePage.querySelector(".rp-main");
    let prevSideHeight = "";
    if(sideEl && mainEl){
      prevSideHeight = sideEl.style.height;
      sideEl.style.height = Math.max(sideEl.offsetHeight, mainEl.offsetHeight) + "px";
    }

    const restore = () => {
      resumePage.style.transform = prevTransform;
      scaleWrapper.style.height = prevWrapperHeight;
      panelPreview.style.overflow = prevPanelOverflow;
      panelPreview.style.height = prevPanelHeight;
      if(sideEl) sideEl.style.height = prevSideHeight;
      requestAnimationFrame(updateScale);
    };

    const filename = (state.basics.name ? state.basics.name.replace(/\s+/g,"_") : "Resume") + ".pdf";
    const opts = {
      margin: 0,
      filename,
      image: { type: "png" },
      html2canvas: { scale: 2, useCORS: true, backgroundColor: "#ffffff" },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["css", "avoid-all"] }
    };

    showToast("Preparing your PDF…");
    window.html2pdf().set(opts).from(resumePage).save().then(restore).catch(restore);
  });

  /* ============================================================
     INIT
  ============================================================ */
  function hydrateFormFromState(){
    fillBasicsFromState();
    applyPhotoToForm();
    renderAllRepeatLists();

    document.querySelectorAll(".tpl-btn").forEach((b) => {
      const active = b.getAttribute("data-template") === state.template;
      b.classList.toggle("is-active", active);
      b.setAttribute("aria-selected", String(active));
    });
    resumePage.setAttribute("data-template", state.template);

    const theme = THEMES.find((t) => t.id === (state.theme && state.theme.id)) || DEFAULT_THEME;
    resumePage.style.setProperty("--resume-accent", theme.accent);
    resumePage.style.setProperty("--resume-accent-2", theme.accent2);
    const swatchEl = el("theme-picker-swatch");
    if(swatchEl){
      swatchEl.style.background = `linear-gradient(135deg, ${theme.accent} 50%, ${theme.accent2} 50%)`;
    }
    document.querySelectorAll(".theme-swatch").forEach((s) => {
      s.classList.toggle("is-active", s.getAttribute("data-theme") === theme.id);
    });
  }

  buildTabrail();
  hydrateFormFromState();
  renderPreview();

})();
