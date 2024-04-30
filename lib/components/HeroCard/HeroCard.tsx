export interface HeroCardProps {
  /** Title text shown on the card */
  title: string;
  /** Content text shown on the card */
  content?: string;
  /** Action content shown on the card */
  actionContent?: string;
  /** Background color of the card */
  backgroundColor?: string;
  /** Link to page */
  href: string;
}

export const HeroCard = ({ title, content, actionContent, backgroundColor = '#444BACF2', href }: HeroCardProps) => (
  <>
    {actionContent ? (
      <BaseCard
        title={title}
        content={content}
        actionContent={actionContent}
        backgroundColor={backgroundColor}
        href={href}
      />
    ) : (
      <a href={href} className="flex rounded-[28px] outline-none transition-transform hover:scale-105 focus:scale-105">
        <BaseCard title={title} content={content} backgroundColor={backgroundColor} href={href} />
      </a>
    )}
  </>
);

const BaseCard = ({ title, content, actionContent, backgroundColor, href }: HeroCardProps) => {
  const Heading = actionContent ? 'h1' : 'h2';
  return (
    <div
      className={`relative flex flex-col gap-6 rounded-[28px] px-7 pb-11 pt-7 text-white`}
      style={{ backgroundColor }}
    >
      <Heading className="overflow hyphens-auto text-pretty text-[28px] font-bold leading-[34px]">{title}</Heading>
      {content && <p>{content}</p>}
      {actionContent ? (
        <a
          href={href}
          className="absolute bottom-0 right-7 translate-y-2/4 rounded-[40px] outline-none transition-transform hover:scale-105 focus:scale-105"
        >
          <div
            className="flex select-none items-center gap-4 rounded-[40px] bg-white px-8 py-[20px] text-[28px] font-bold leading-[40px]"
            style={{ color: backgroundColor }}
          >
            {actionContent}
            <span className="material-symbols-outlined size-32 select-none font-bold" aria-hidden>
              arrow_forward
            </span>
          </div>
        </a>
      ) : (
        <span className="material-symbols-outlined size-32 absolute bottom-5 right-7 select-none font-bold" aria-hidden>
          arrow_forward
        </span>
      )}
    </div>
  );
};
