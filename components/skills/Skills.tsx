import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import SkillNetwork from "@/components/skills/SkillNetwork";

export default function Skills() {
  return (
    <section
      id="skills"
      data-env="skills"
      aria-labelledby="skills-title"
      className="relative py-28 md:py-40"
    >
      <Container>
        <SectionHeading
          id="skills-title"
          index="03"
          eyebrow="System map"
          title={
            <>
              The stack, and <em className="text-mist">how it connects.</em>
            </>
          }
          description="No percentages, just the technologies I work with and how they relate. Hover or focus a node to follow its connections."
        />
        <div className="mt-16 md:mt-24">
          <SkillNetwork />
        </div>
      </Container>
    </section>
  );
}