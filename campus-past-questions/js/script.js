(() => {
  "use strict";
  const data = window.CAMPUS_DATA || { departments: [], questions: [] };
  const $ = (selector) => document.querySelector(selector);
  const els = {
    departmentGrid: $("#departmentGrid"), questionGrid: $("#questionGrid"),
    search: $("#librarySearch"), department: $("#departmentFilter"),
    level: $("#levelFilter"), semester: $("#semesterFilter"),
    session: $("#sessionFilter"), sort: $("#sortFilter"),
    resultCount: $("#resultCount"), empty: $("#emptyState"),
    loadMore: $("#loadMore"), modal: $("#previewModal"),
    modalTitle: $("#modalTitle"), modalMeta: $("#modalMeta"),
    pdfFrame: $("#pdfFrame"), pdfFallback: $("#pdfFallback"),
    modalDownload: $("#modalDownload"), toast: $("#toast")
  };
  let visibleLimit = 6;
  let currentResults = [];
  let toastTimer;

  const escapeHTML = (value) => String(value ?? "").replace(/[&<>"']/g, char => ({
    "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;"
  })[char]);

  function init() {
    renderDepartments();
    populateFilters();
    renderStats();
    renderQuestions();
    $("#currentYear").textContent = new Date().getFullYear();
    $("#heroSearchForm").addEventListener("submit", event => {
      event.preventDefault();
      els.search.value = $("#heroSearch").value.trim();
      visibleLimit = 6;
      renderQuestions();
      $("#questions").scrollIntoView({ behavior: "smooth" });
    });
    $("#heroSearch").addEventListener("input", event => {
      if (!event.target.value) { els.search.value = ""; renderQuestions(); }
    });
    [els.search, els.department, els.level, els.semester, els.session, els.sort]
      .forEach(control => control.addEventListener("input", () => {
        visibleLimit = 6;
        renderQuestions();
      }));
    $("#resetFilters").addEventListener("click", resetFilters);
    $("#emptyReset").addEventListener("click", resetFilters);
    els.loadMore.addEventListener("click", () => {
      visibleLimit += 6;
      renderQuestions();
    });
    $("#closeModal").addEventListener("click", closePreview);
    $("#modalCloseBottom").addEventListener("click", closePreview);
    els.modal.addEventListener("click", event => {
      if (event.target === els.modal) closePreview();
    });
    document.addEventListener("keydown", event => {
      if (event.key === "Escape" && !els.modal.classList.contains("hidden")) closePreview();
    });
    $("#menuToggle").addEventListener("click", toggleMenu);
    document.querySelectorAll(".main-nav a").forEach(link => link.addEventListener("click", closeMenu));
    window.addEventListener("hashchange", closeMenu);
  }

  function renderDepartments() {
    els.departmentGrid.innerHTML = data.departments.map(dept => {
      const count = data.questions.filter(q => q.department === dept.name ||
        (dept.id === "other" && !["Computer Science","Statistics","Mathematics"].includes(q.department))).length;
      return `<button class="department-card" type="button" data-department="${escapeHTML(dept.name)}">
        <span class="dept-icon ${escapeHTML(dept.tone)}">${escapeHTML(dept.icon)}</span>
        <h3>${escapeHTML(dept.name)}</h3><p>${escapeHTML(dept.description)}</p>
        <span class="dept-bottom"><span>${count} sample ${count === 1 ? "paper" : "papers"}</span><span class="dept-arrow">→</span></span>
      </button>`;
    }).join("");
    els.departmentGrid.querySelectorAll(".department-card").forEach(card => {
      card.addEventListener("click", () => {
        const dept = card.dataset.department;
        els.department.value = dept === "Other Departments" ? "Other Departments" : dept;
        visibleLimit = 6;
        renderQuestions();
        $("#questions").scrollIntoView({ behavior: "smooth" });
      });
    });
  }

  function populateFilters() {
    const departments = [...new Set(data.questions.map(q => q.department))].sort();
    departments.forEach(name => {
      const option = document.createElement("option");
      option.value = name; option.textContent = name;
      els.department.appendChild(option);
    });
    const sessions = [...new Set(data.questions.map(q => q.session))].sort().reverse();
    sessions.forEach(session => {
      const option = document.createElement("option");
      option.value = session; option.textContent = session;
      els.session.appendChild(option);
    });
  }

  function renderStats() {
    const totalDownloads = data.questions.reduce((sum, q) => sum + (Number(q.downloads) || 0), 0);
    $("#statQuestions").textContent = data.questions.length;
    $("#statDepartments").textContent = new Set(data.questions.map(q => q.department)).size;
    $("#statCourses").textContent = new Set(data.questions.map(q => q.courseCode)).size;
    $("#statDownloads").textContent = totalDownloads.toLocaleString();
  }

  function getFilteredQuestions() {
    const term = els.search.value.trim().toLowerCase();
    let results = data.questions.filter(q => {
      const searchable = [q.courseCode, q.courseTitle, q.department, q.level, q.semester, q.session, q.description].join(" ").toLowerCase();
      return (!term || searchable.includes(term)) &&
        (!els.department.value || q.department === els.department.value) &&
        (!els.level.value || q.level === els.level.value) &&
        (!els.semester.value || q.semester === els.semester.value) &&
        (!els.session.value || q.session === els.session.value);
    });
    if (els.sort.value === "oldest") results.sort((a,b) => a.year - b.year);
    else if (els.sort.value === "course") results.sort((a,b) => a.courseCode.localeCompare(b.courseCode));
    else results.sort((a,b) => b.year - a.year);
    return results;
  }

  function renderQuestions() {
    currentResults = getFilteredQuestions();
    const shown = currentResults.slice(0, visibleLimit);
    els.resultCount.textContent = `${currentResults.length} ${currentResults.length === 1 ? "paper" : "papers"} available`;
    els.questionGrid.innerHTML = shown.map(q => `
      <article class="question-card">
        <div class="question-top"><span class="file-type">PDF DOCUMENT</span><span class="question-year">${escapeHTML(q.session)}</span></div>
        <h3>${escapeHTML(q.courseTitle)}</h3>
        <div class="course-code">${escapeHTML(q.courseCode)}</div>
        <div class="question-meta">
          <span class="meta-chip">${escapeHTML(q.department)}</span>
          <span class="meta-chip">${escapeHTML(q.level)}</span>
          <span class="meta-chip">${escapeHTML(q.semester)} semester</span>
        </div>
        <div class="question-footer">
          <span class="file-info">${escapeHTML(q.size)} · ${Number(q.downloads).toLocaleString()} downloads</span>
          <div class="card-actions">
            <button class="preview-btn" type="button" data-preview="${q.id}">Preview</button>
            <a class="card-download" href="${escapeHTML(q.file)}" download data-download="${q.id}">↓ Download</a>
          </div>
        </div>
      </article>`).join("");
    els.empty.classList.toggle("hidden", currentResults.length !== 0);
    els.questionGrid.classList.toggle("hidden", currentResults.length === 0);
    els.loadMore.classList.toggle("hidden", currentResults.length <= visibleLimit);
    els.questionGrid.querySelectorAll("[data-preview]").forEach(button => {
      button.addEventListener("click", () => openPreview(Number(button.dataset.preview)));
    });
    els.questionGrid.querySelectorAll("[data-download]").forEach(link => {
      link.addEventListener("click", event => {
        const q = data.questions.find(item => item.id === Number(link.dataset.download));
        if (q) showToast(`Downloading ${q.courseCode}…`);
      });
    });
  }

  function openPreview(id) {
    const q = data.questions.find(item => item.id === id);
    if (!q) return;
    els.modalTitle.textContent = `${q.courseCode} — ${q.courseTitle}`;
    els.modalMeta.innerHTML = [q.department, q.level, `${q.semester} semester`, q.session]
      .map(value => `<span class="meta-chip">${escapeHTML(value)}</span>`).join("");
    els.modalDownload.href = q.file;
    els.modalDownload.setAttribute("download", q.file.split("/").pop());
    els.pdfFallback.classList.add("hidden");
    els.pdfFrame.classList.remove("hidden");
    els.pdfFrame.src = `${q.file}#toolbar=1&navpanes=0`;
    els.pdfFrame.onerror = () => {
      els.pdfFrame.classList.add("hidden");
      els.pdfFallback.classList.remove("hidden");
    };
    els.modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  function closePreview() {
    els.modal.classList.add("hidden");
    els.pdfFrame.src = "about:blank";
    document.body.style.overflow = "";
  }

  function resetFilters() {
    els.search.value = "";
    $("#heroSearch").value = "";
    els.department.value = "";
    els.level.value = "";
    els.semester.value = "";
    els.session.value = "";
    els.sort.value = "newest";
    visibleLimit = 6;
    renderQuestions();
  }

  function showToast(message) {
    els.toast.textContent = message;
    els.toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => els.toast.classList.remove("show"), 2400);
  }

  function toggleMenu() {
    const menu = $("#mainNav"), button = $("#menuToggle");
    const open = menu.classList.toggle("open");
    button.setAttribute("aria-expanded", String(open));
  }
  function closeMenu() {
    $("#mainNav").classList.remove("open");
    $("#menuToggle").setAttribute("aria-expanded", "false");
  }

  document.addEventListener("DOMContentLoaded", init);
})();
