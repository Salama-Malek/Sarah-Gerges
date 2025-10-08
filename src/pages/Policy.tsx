import { useLanguage } from "../hooks/useLanguage";
import { Button } from "../components/ui/Button";
import { RouterLink } from "../hooks/useRouter";

interface PolicySection {
  title: string;
  content: string[];
}

const Policy = () => {
  const { translate, direction, isRTL } = useLanguage();
  const sections = translate<PolicySection[]>("policy.sections");

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-10 px-6 pb-32 pt-32" dir={direction}>
      <div className="rounded-3xl border border-white/30 bg-white/70 p-10 shadow-xl backdrop-blur dark:border-slate-700/60 dark:bg-slate-900/70">
        <h1 className="text-4xl font-semibold text-slate-900 dark:text-white">{translate("policy.title")}</h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-300">{translate("policy.intro")}</p>
        <div className="mt-10 space-y-8">
          {sections.map((section) => (
            <div
              key={section.title}
              className="rounded-2xl border border-white/20 bg-white/60 p-6 shadow-inner dark:border-slate-700/50 dark:bg-slate-900/60"
            >
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">{section.title}</h2>
              <div className="mt-3 space-y-4 text-base leading-relaxed text-slate-600 dark:text-slate-300 text-start [dir='rtl']:text-end">
                {section.content.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
        <RouterLink to="/" className="mt-10 inline-flex">
          <Button variant="secondary">
            {isRTL ? `${translate("policy.back")} ←` : `← ${translate("policy.back")}`}
          </Button>
        </RouterLink>
      </div>
    </div>
  );
};

export default Policy;
