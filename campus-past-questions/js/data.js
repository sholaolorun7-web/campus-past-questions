// Demo data for Campus Past Questions.
// Replace the sample entries and PDF paths with your institution's real resources.
window.CAMPUS_DATA = {
  departments: [
    { id: "computer-science", name: "Computer Science", description: "Computing, software and technology", icon: "⌘", tone: "blue" },
    { id: "statistics", name: "Statistics", description: "Data, probability and analysis", icon: "▥", tone: "green" },
    { id: "mathematics", name: "Mathematics", description: "Pure and applied mathematics", icon: "∑", tone: "purple" },
    { id: "other", name: "Other Departments", description: "More academic programmes", icon: "▤", tone: "orange" }
  ],
  questions: [
    { id: 1, department: "Computer Science", level: "HND1", courseCode: "SWD 413", courseTitle: "Frontend Development II", semester: "First", session: "2024/2025", year: 2025, size: "184 KB", downloads: 128, file: "documents/computer-science/swd-413-frontend-development-ii.pdf", description: "HTML, CSS, JavaScript and DOM manipulation." },
    { id: 2, department: "Computer Science", level: "HND1", courseCode: "CIT 411", courseTitle: "Database Management Systems", semester: "First", session: "2024/2025", year: 2025, size: "176 KB", downloads: 96, file: "documents/computer-science/cit-411-database-management.pdf", description: "Database concepts, SQL and relational design." },
    { id: 3, department: "Computer Science", level: "ND2", courseCode: "COM 214", courseTitle: "Computer Networks", semester: "Second", session: "2023/2024", year: 2024, size: "162 KB", downloads: 83, file: "documents/computer-science/com-214-computer-networks.pdf", description: "Network architecture, protocols and communication." },
    { id: 4, department: "Computer Science", level: "HND2", courseCode: "SEN 421", courseTitle: "Software Engineering", semester: "First", session: "2023/2024", year: 2024, size: "193 KB", downloads: 74, file: "documents/computer-science/sen-421-software-engineering.pdf", description: "Software development processes and project methods." },
    { id: 5, department: "Statistics", level: "HND1", courseCode: "STA 315", courseTitle: "Probability Theory", semester: "First", session: "2024/2025", year: 2025, size: "155 KB", downloads: 67, file: "documents/statistics/sta-315-probability-theory.pdf", description: "Probability distributions and statistical reasoning." },
    { id: 6, department: "Statistics", level: "ND2", courseCode: "STA 212", courseTitle: "Statistical Inference", semester: "Second", session: "2023/2024", year: 2024, size: "169 KB", downloads: 59, file: "documents/statistics/sta-212-statistical-inference.pdf", description: "Estimation, hypothesis testing and inference." },
    { id: 7, department: "Statistics", level: "HND2", courseCode: "STA 422", courseTitle: "Time Series Analysis", semester: "First", session: "2022/2023", year: 2023, size: "148 KB", downloads: 45, file: "documents/statistics/sta-422-time-series.pdf", description: "Trend, seasonal variation and forecasting." },
    { id: 8, department: "Mathematics", level: "ND1", courseCode: "MTH 111", courseTitle: "General Mathematics I", semester: "First", session: "2024/2025", year: 2025, size: "141 KB", downloads: 52, file: "documents/other-departments/mth-111-general-mathematics.pdf", description: "Algebra, functions and introductory calculus." },
    { id: 9, department: "Other Departments", level: "ND2", courseCode: "GST 202", courseTitle: "Communication in English", semester: "Second", session: "2022/2023", year: 2023, size: "132 KB", downloads: 39, file: "documents/other-departments/gst-202-communication-in-english.pdf", description: "Written and oral communication skills." }
  ]
};
