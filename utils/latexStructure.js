module.exports = `\\documentclass[letterpaper,11pt]{article}

%---------------------
% Packages
%---------------------
\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage[english]{babel}
\\usepackage{tabularx}
\\usepackage{fontspec}        % XeLaTeX Unicode support

%---------------------
% Page layout
%---------------------
\\pagestyle{fancy}
\\fancyhf{}
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}

\\addtolength{\\oddsidemargin}{-0.5in}
\\addtolength{\\evensidemargin}{-0.5in}
\\addtolength{\\textwidth}{1in}
\\addtolength{\\topmargin}{-.5in}
\\addtolength{\\textheight}{1.0in}

\\urlstyle{same}
\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}

%---------------------
% Section formatting
%---------------------
\\titleformat{\\section}{\\scshape\\raggedright\\large}{}{0em}{}[\\color{black}\\titlerule]
% Updated spacing: {left}{before-sep}{after-sep}
\\titlespacing*{\\section}{0pt}{2pt}{8pt}

%---------------------
% Custom commands
%---------------------
\\newcommand{\\resumeItem}[1]{\\item\\small{{\\textbf{#1} \\vspace{-2pt}}}}
\\newcommand{\\resumeSubheading}[4]{
  \\vspace{-2pt}\\item
    \\begin{tabular*}{0.97\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
      \\textbf{#1} & #2 \\\\
      \\textit{\\small#3} & \\textit{\\small #4} \\\\
    \\end{tabular*}\\vspace{-7pt}
}
\\newcommand{\\resumeProjectHeading}[2]{
    \\item
    \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
      \\small#1 & #2 \\\\
    \\end{tabular*}\\vspace{-7pt}
}
\\newcommand{\\resumeItemListStart}{\\begin{itemize}}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}
\\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=0.15in, label={}]}
\\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}

%---------------------
% Document start
%---------------------
\\begin{document}

%------ HEADER ------
\\begin{center}
    \\textbf{\\Huge \\scshape Wanewa Blessing Netshodwe} \\\\ \\vspace{1pt}
    \\small 083 979 5056 $|$ \\href{mailto:waneexw@gmail.com}{\\underline{waneexw@gmail.com}} $|$ 
    \\href{https://www.linkedin.com/in/wanewa-blessing-netshodwe/}{\\underline{linkedin.com/in/wanewa-blessing-netshodwe}} $|$ 
    \\href{https://blessing-portfolio-iota.vercel.app/}{\\underline{https://blessing-portfolio-iota.vercel.app/}} \\\\
\\end{center}

%------ SUMMARY ------
\\section{Summary}
\\resumeSubHeadingListStart
\\item Graduate Full-Stack Developer skilled in Python, Rust, React, and cloud technologies (AWS). Also experienced with Java, Spring Boot, and Node.js. Passionate about building secure, user-friendly applications and eager to contribute, learn, and grow in a professional software development environment.
\\resumeSubHeadingListEnd

%------ EDUCATION ------
\\section{Education}
\\resumeSubHeadingListStart
  \\resumeSubheading
    {Tshwane University of Technology}{Pretoria, South Africa}
    {Diploma in Computer Science}{Feb 2021 -- 2025}
\\resumeSubHeadingListEnd

%------ EXPERIENCE ------
\\section{Experience}
\\resumeSubHeadingListStart

  \\resumeSubheading
    {Full Stack Developer Intern}{May 2025 -- Present}
    {Informatics Community Engagement Programme}{Pretoria, Gauteng}
    \\resumeItemListStart
      \\resumeItem{Led a team to build a laptop donation and allocation platform for “missing middle” students not funded by NSFAS.}
      \\resumeItem{Engineered secure backend and frontend workflows for five stakeholders: Donors, Supervisors, Admins, Students, and Technicians.}
      \\resumeItem{Automated student eligibility checks, rejecting those with NSFAS funding or academic average below 60\\%.}
      \\resumeItem{Built admin dashboard to approve applications and assign laptops with audit trails.}
      \\resumeItem{Developed donor and supervisor portals for streamlined hardware donation and approval.}
      \\resumeItem{Technologies used: ReactJS, ASP.NET Core.}
    \\resumeItemListEnd

  \\resumeSubheading
    {Full Stack Developer Intern}{Mar 2025 -- May 2025}
    {Informatics Community Engagement Programme}{Pretoria, Gauteng}
    \\resumeItemListStart
      \\resumeItem{Building frontend and backend modules for attendance logs, hours worked, and real-time activity tracking using AWS, Node.js, React Native, and React.}
      \\resumeItem{Designing and developing a facial recognition attendance system used via mobile app for secure clock-ins.}
      \\resumeItem{Integrating facial recognition for employee authentication, reducing time fraud and manual errors.}
      \\resumeItem{Developing HR dashboard tools to auto-generate payslips based on attendance and working hours.}
      \\resumeItem{Improving payroll accuracy and streamlining time-tracking with automated processes.}
    \\resumeItemListEnd

\\resumeSubHeadingListEnd

%------ PROJECTS ------
\\section{Projects}
\\resumeSubHeadingListStart

  \\resumeProjectHeading
    {\\textbf{Terminal Puzzle Game} $|$ \\emph{Rust, CLI, File I/O}}{Jan 2025}
    \\resumeItemListStart
      \\resumeItem{Developed a command-line puzzle game in Rust with selectable difficulty levels and a creative penalty system.}
      \\resumeItem{Implemented file creation penalties (100MB or 500MB) for incorrect solutions to increase challenge and engagement.}
      \\resumeItem{Focused on safe file handling, efficient terminal interaction, and system resource management.}
    \\resumeItemListEnd

  \\resumeProjectHeading
    {\\textbf{Task Manager and Chat App} $|$ \\emph{React, Firebase, Tailwind} $|$ Visit Site}{Oct 2024 -- Nov 2024}
    \\resumeItemListStart
      \\resumeItem{Created a web app for task sharing with real-time chat features using Firestore.}
      \\resumeItem{Enabled users to create tasks, assign roles, and collaborate live.}
    \\resumeItemListEnd

  \\resumeProjectHeading
    {\\textbf{Clean Cut Barber} $|$ \\emph{Java, Spring Boot, MySQL, Maven}}{Jun 2024 -- Jul 2024}
    \\resumeItemListStart
      \\resumeItem{Built a full-stack booking system for a barbershop with client scheduling, stylist management, and admin reporting using MySQL.}
    \\resumeItemListEnd

\\resumeSubHeadingListEnd

%------ TECHNICAL SKILLS ------
\\section{Technical Skills}
\\begin{itemize}[leftmargin=0.15in, label={}]
  \\small{\\item{
    \\textbf{Languages:} Python, Rust, MySQL (SQL), Java, JavaScript, TypeScript, Kotlin, HTML/CSS \\\\
    \\textbf{Frameworks/Libraries:} React, React Native, Spring Boot, ASP.NET Core, Express.js, Jetpack Compose \\\\
    \\textbf{Developer Tools \\& Platforms:} Git, AWS, Firebase, VS Code, PyCharm, IntelliJ, NetBeans, Maven
  }}
\\end{itemize}


\\end{document}
`;
