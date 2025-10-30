module.exports = `


\\documentclass[letterpaper,11pt]{article}

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
    \\textbf{\\Huge \\scshape Your Name Here } \\\\[2pt] 
    
    \\small (Phone Number) $|$ \\href{mailto:your@email.com}{\\underline{your@email.com}} $|$ \\href{linkedin.com/in/your-link}{\\underline{linkedin.com/in/your-link}} $|$ \\href{https://your-portfolio-link.com}{\\underline{your-portfolio-link.com}} \\
\\end{center}
%------ SUMMARY ------
\\section{Summary}
\\resumeSubHeadingListStart
\\item Summary or objective statement here
\\resumeSubHeadingListEnd
%------ EDUCATION ------
\\section{Education}
\\resumeSubHeadingListStart
\\resumeSubheading
    {Institution Name}{Location}
    {Degree or Major}{Start - End Date}
\\resumeSubHeadingListEnd
%------ EXPERIENCE ------
\\section{Experience}
\\resumeSubHeadingListStart
\\resumeSubheading
    {Job Title}{Start - End Date}
    {Company/Organization}{Location}
    \\resumeItemListStart
      \\resumeItem{[Job responsibility or achievement]}
    \\resumeItemListEnd
\\resumeSubHeadingListEnd
%------ PROJECTS ------
\\section{Projects}
\\resumeSubHeadingListStart
\\resumeProjectHeading
    {\\textbf{Project Title} $|$ \\emph{Technologies}}{Date}
    \\resumeItemListStart
      \\resumeItem{[Description or accomplishment]}
    \\resumeItemListEnd
\\resumeSubHeadingListEnd
%------ TECHNICAL SKILLS ------
\\section{Technical Skills}
\\begin{itemize}[leftmargin=0.15in, label={}]
  \\small{\\item{
    \\textbf{Languages:} [Language 1, Language 2, ...] \\
    \\textbf{Frameworks/Libraries:} [Framework 1, ...] \\
    \\textbf{Developer Tools \\& Platforms:} [Tool 1, ...]
  }}
\\end{itemize}
\\end{document}
`;
