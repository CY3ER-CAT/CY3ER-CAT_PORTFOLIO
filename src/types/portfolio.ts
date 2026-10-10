export interface NavLink {
  label: string;
  href: string;
  /** internal route instead of an on-page anchor */
  route?: string;
}

export interface ProjectMetric {
  value: string;
  label: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  /** the problem it addresses */
  problem: string;
  /** what the application does */
  summary: string;
  contribution: string;
  outcome?: string;
  technologies: string[];
  repoUrl: string;
  /** only set when the live URL was verified from the repository */
  liveUrl?: string;
  metrics?: ProjectMetric[];
  featured?: boolean;
  caseStudyRoute?: string;
  /** visual preview key — each maps to a bespoke SVG composition */
  visual: 'agri' | 'yuvaadir' | 'yuvaa3' | 'flower' | 'axiom';
  /** real screenshot of the live project, served from /projects/*.jpg */
  photo?: string;
  year: string;
}

export interface SkillGroup {
  category: string;
  blurb: string;
  skills: string[];
}

export interface TimelineEntry {
  date: string;
  title: string;
  detail: string;
  link?: string;
  kind: 'project' | 'education' | 'work';
}

export interface SocialLink {
  label: string;
  href: string;
  /** true while the URL is a placeholder that must be replaced */
  placeholder?: boolean;
}
