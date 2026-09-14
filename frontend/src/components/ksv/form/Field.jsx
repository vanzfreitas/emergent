export const inputCls =
    "w-full bg-ksv-gunmetal/50 border border-ksv-edge focus:border-ksv-orange outline-none px-4 py-3.5 text-sm text-ksv-silver placeholder:text-zinc-600 transition-colors duration-200";

export const Field = ({ label, error, children, testid, className = "" }) => (
    <div data-testid={testid} className={className}>
        <label className="block font-mono text-[11px] uppercase tracking-[0.2em] text-ksv-silvermid mb-2">{label}</label>
        {children}
        {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
);

export const SectionTitle = ({ children }) => (
    <div className="sm:col-span-2 flex items-center gap-3 pt-2">
        <span className="font-display font-semibold uppercase tracking-wide text-sm text-ksv-orange">{children}</span>
        <span className="flex-1 h-px bg-ksv-edge" />
    </div>
);

export const OptionGroup = ({ options, value, onChange, testid }) => (
    <div className="grid grid-cols-2 gap-3" data-testid={testid}>
        {options.map((o) => {
            const active = value === o.value;
            return (
                <button
                    key={o.value}
                    type="button"
                    data-testid={`${testid}-${o.value.toLowerCase().normalize("NFD").replace(/[^a-z]/g, "")}`}
                    onClick={() => onChange(o.value)}
                    className={`flex items-center gap-3 border px-4 py-3.5 text-left text-sm transition-colors duration-200 ${
                        active
                            ? "border-ksv-orange bg-ksv-orange/10 text-ksv-silver"
                            : "border-ksv-edge bg-ksv-gunmetal/50 text-zinc-400 hover:border-ksv-silverdark"
                    }`}
                >
                    {o.icon && <o.icon size={16} className={active ? "text-ksv-orange" : "text-ksv-silverdark"} />}
                    <span className="leading-tight">{o.label}</span>
                </button>
            );
        })}
    </div>
);
