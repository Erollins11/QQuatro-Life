type SectionIntroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export default function SectionIntro({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionIntroProps) {
  const alignment = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <div className={`mb-8 flex max-w-3xl flex-col gap-3 ${alignment}`}>
      {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-sand">{eyebrow}</p> : null}
      <h1 className="text-4xl leading-tight text-brand-paper md:text-5xl">{title}</h1>
      {description ? <p className="text-base leading-relaxed text-brand-muted md:text-lg">{description}</p> : null}
    </div>
  );
}
