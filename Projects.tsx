import { Github, ExternalLink } from "lucide-react";
import { Reveal, Stagger, Item } from "./Reveal";
import { SectionHeading, Em } from "./ui";
import { cn } from "../utils/cn";

const PROJECTS = [
  {
    name: "DelQuroLabs",
    description: "Premium web experience lab. Engineered with precision, finished with care.",
    github: "https://github.com/PlanExServices/DelQuroLabs",
    live: "https://planexservices.github.io/DelQuroLabs/",
    featured: true,
  },
  {
    name: "delquro-site",
    description: "Main DelQuro product site with comprehensive features and information.",
    github: "https://github.com/PlanExServices/delquro-site",
    live: "https://planexservices.github.io/delquro-site/",
  },
  {
    name: "Bob_the_Builder",
    description: "Construction project planning and management application.",
    github: "https://github.com/PlanExServices/Bob_the_Builder",
    live: "https://planexservices.github.io/Bob_the_Builder/",
  },
  {
    name: "cats-journey",
    description: "Interactive narrative experience featuring our feline friends.",
    github: "https://github.com/PlanExServices/cats-journey",
    live: "https://planexservices.github.io/cats-journey/",
  },
  {
    name: "CLT_Academy",
    description: "Educational platform for CLT (Community Land Trust) learning.",
    github: "https://github.com/PlanExServices/CLT_Academy",
    live: "https://planexservices.github.io/CLT_Academy/",
  },
  {
    name: "Tai_Chi",
    description: "Tai Chi learning and practice guide with video tutorials.",
    github: "https://github.com/PlanExServices/Tai_Chi",
    live: "https://planexservices.github.io/Tai_Chi/",
  },
  {
    name: "TrackLine_AI",
    description: "AI-powered project tracking and management system.",
    github: "https://github.com/PlanExServices/TrackLine_AI",
    live: "https://planexservices.github.io/TrackLine_AI/",
  },
  {
    name: "What_List",
    description: "Intelligent task management and organization tool.",
    github: "https://github.com/PlanExServices/What_List",
    live: "https://planexservices.github.io/What_List/",
  },
  {
    name: "SOLAR",
    description: "Solar energy project tracking and analytics platform.",
    github: "https://github.com/PlanExServices/SOLAR",
    live: "https://planexservices.github.io/SOLAR/",
  },
  {
    name: "delquro-bravo",
    description: "Advanced variant of DelQuro with experimental features.",
    github: "https://github.com/PlanExServices/delquro-bravo",
    live: "https://planexservices.github.io/delquro-bravo/",
  },
  {
    name: "DelQuroLabs_Bravo",
    description: "Experimental version of DelQuroLabs with cutting-edge features.",
    github: "https://github.com/PlanExServices/DelQuroLabs_Bravo",
    live: "https://planexservices.github.io/DelQuroLabs_Bravo/",
  },
  {
    name: "Bob__the_Building_Pro",
    description: "Professional edition of Bob the Builder with advanced tools.",
    github: "https://github.com/PlanExServices/Bob__the_Building_Pro",
    live: "https://planexservices.github.io/Bob__the_Building_Pro/",
  },
  {
    name: "Tai-Chi_SandEd",
    description: "Tai Chi with Sand Eden meditation integration.",
    github: "https://github.com/PlanExServices/Tai-Chi_SandEd",
    live: "https://planexservices.github.io/Tai-Chi_SandEd/",
  },
];

function ProjectCard({
  project,
  featured,
}: {
  project: (typeof PROJECTS)[0];
  featured?: boolean;
}) {
  return (
    <a
      href={project.live}
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02] p-7 transition-all duration-500 hover:-translate-y-1 hover:border-white/15 hover:bg-white/[0.05] backdrop-blur-sm",
        featured && "lg:col-span-2 md:col-span-1"
      )}
      target="_blank"
      rel="noopener noreferrer"
    >
      {/* Gradient background on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-aurora-a/0 via-aurora-b/0 to-aurora-c/0 transition-all duration-500 group-hover:from-aurora-a/10 group-hover:via-aurora-b/10 group-hover:to-aurora-c/10" />

      <div className="relative z-10 flex h-full flex-col justify-between">
        {/* Header */}
        <div>
          <h3 className="font-display text-xl font-semibold tracking-tight text-mist-100 group-hover:text-white sm:text-2xl">
            {project.name}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-mist-400 group-hover:text-mist-300">
            {project.description}
          </p>
        </div>

        {/* Links */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-aurora/30 bg-aurora/10 px-3 py-1.5 text-[12px] font-medium text-aurora transition-colors duration-300 group-hover:border-aurora/50 group-hover:bg-aurora/20">
            <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            <span>Live Site</span>
          </div>

          <a
            href={project.github}
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-2 rounded-full border border-mist-500/30 bg-mist-500/10 px-3 py-1.5 text-[12px] font-medium text-mist-300 transition-colors duration-300 hover:border-mist-400/50 hover:bg-mist-500/20 hover:text-mist-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="h-3.5 w-3.5" aria-hidden />
            <span>Repository</span>
          </a>
        </div>
      </div>
    </a>
  );
}

export function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="relative scroll-mt-24 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="My Work"
          title={
            <span id="projects-title">
              Projects & Experiments.
              <br className="hidden sm:block" /> <Em>All Open Source.</Em>
            </span>
          }
          sub="Explore my portfolio of web applications, tools, and experiments. Everything is open source on GitHub."
        />

        <Stagger className="mt-14 grid grid-cols-1 gap-5 sm:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project) => (
            <Item key={project.name} className={cn(project.featured && "lg:col-span-2")}>
              <ProjectCard project={project} featured={project.featured} />
            </Item>
          ))}
        </Stagger>

        {/* Call to action */}
        <Reveal delay={0.3} className="mt-16 text-center">
          <p className="text-mist-400">
            Interested in collaborating or learning more?{" "}
            <a
              href="https://github.com/PlanExServices"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-aurora transition-colors duration-300 hover:text-aurora-b"
            >
              Visit my GitHub
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
