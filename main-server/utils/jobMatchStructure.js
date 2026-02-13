module.exports = job_match_analysis = {
  type: "OBJECT",
  description:
    "Comparative analysis of the Resume against the Job Description.",
  properties: {
    job_title_target: {
      type: "STRING",
      description: "The targeted job title from the JD.",
    },
    overall_match_score_percent: {
      type: "INTEGER",
      description: "Overall fit score from 0 to 100.",
    },
    match_breakdown: {
      type: "OBJECT",
      properties: {
        skill_match: {
          type: "OBJECT",
          properties: {
            analysis_summary: {
              type: "STRING",
              description: "A brief summary of the skill alignment.",
            },
            matching_skills: {
              type: "ARRAY",
              items: { type: "STRING" },
            },
          },
        },
        critical_missing_skills: {
          type: "ARRAY",
          items: {
            type: "OBJECT",
            properties: {
              skill_name: { type: "STRING" },
              reason_missing: {
                type: "STRING",
                description: "Why this skill is critical for the role.",
              },
              learning_resources: {
                type: "OBJECT",
                properties: {
                  online_course_link: { type: "STRING" },
                  youtube_starter_link: { type: "STRING" },
                  search_keyword_tip: { type: "STRING" },
                },
              },
            },
          },
        },
        experience_match: {
          type: "OBJECT",
          properties: {
            analysis_summary: {
              type: "STRING",
              description: "Summary of experience alignment.",
            },
            years_of_relevant_experience: {
              type: "STRING",
              description: "Estimated/Calculated relevant years.",
            },
          },
        },
      },
    },
    hiring_manager_recommendation: {
      type: "STRING",
      description: "1-2 sentence recommendation for the hiring manager.",
    },
  },
};
