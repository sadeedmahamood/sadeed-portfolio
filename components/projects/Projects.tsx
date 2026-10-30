// import Container from "@/components/ui/Container";
// import SectionHeading from "@/components/ui/SectionHeading";
// import ProjectCard from "@/components/projects/ProjectCard";
// import { projects } from "@/data/projects";

// export default function Projects() {
//   return (
//     <section
//       id="work"
//       data-env="projects"
//       aria-labelledby="work-title"
//       className="relative py-28 md:py-40"
//     >
//       <Container>
//         <SectionHeading
//           id="work-title"
//           index="02"
//           eyebrow="Selected work"
//           title={
//             <>
//               Things I&apos;ve built,
//               <br />
//               <em className="text-mist">and am building.</em>
//             </>
//           }
//           description="Backend-heavy, full-stack projects. Open a project for the architecture and what it covers."
//         />

//         <div className="mt-20 border-b border-white/[0.14] md:mt-28">
//           {projects.map((project) => (
//             <ProjectCard key={project.id} project={project} />
//           ))}
//         </div>
//       </Container>
//     </section>
//   );
// }

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "@/components/projects/ProjectCard";
import { projects } from "@/data/projects";

export default function Projects() {
  return (
    <section
      id="work"
      data-env="projects"
      aria-labelledby="work-title"
      className="relative py-28 md:py-40"
    >
      <Container>
        <SectionHeading
          id="work-title"
          index="02"
          eyebrow="Selected work"
          title={
            <>
              Things I&apos;ve built,
              <br />
              <em className="text-mist">and am building.</em>
            </>
          }
          description="Backend-heavy, full-stack projects. Each one shows what it is, what it's built with, and where it stands."
        />

        <div className="mt-16 border-b border-white/[0.14] md:mt-24">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}