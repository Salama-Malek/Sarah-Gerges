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
    <div
      className="mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-10 rounded-[3rem] bg-[#f8fafc] px-6 pb-32 pt-32 shadow-[0_50px_120px_-70px_rgba(15,23,42,0.45)] dark:bg-[#111c30]"
      dir={direction}
    >
      <div className="rounded-3xl border border-border-light bg-surface-light/95 p-10 shadow-xl shadow-slate-900/10 backdrop-blur dark:border-border-dark dark:bg-surface-dark/95">
        <h1 className="text-4xl font-semibold text-gray-900 dark:text-slate-100">{translate("policy.title")}</h1>
        <p className="mt-4 text-lg leading-relaxed text-gray-700 dark:text-slate-300">{translate("policy.intro")}</p>
        <div className="mt-10 space-y-8">
          {sections.map((section) => (
            <div
              key={section.title}
              className="rounded-2xl border border-border-light bg-surface-light p-6 shadow-inner dark:border-border-dark dark:bg-surface-dark"
            >
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-slate-100">{section.title}</h2>
              <div className="mt-3 space-y-4 text-base leading-relaxed text-gray-700 dark:text-slate-300 text-start [dir='rtl']:text-end">
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
