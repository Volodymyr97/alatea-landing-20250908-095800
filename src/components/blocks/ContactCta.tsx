'use client';
import * as React from 'react';

type Blok = {
  eyebrow?: string;
  title?: string;
  ctaLabel?: string;
  recipients?: string[];
  theme?: 'dark' | 'light' | 'custom';
  bg?: string;
  successTitle?: string;
  successBody?: string;
};

export default function ContactCta({ blok }: { blok: Blok }) {
  // UI
  const [open, setOpen] = React.useState(false);
  const [pulse, setPulse] = React.useState(false); // короткий «pop» після успіху
  const [pending, setPending] = React.useState(false);
  const [ok, setOk] = React.useState(false);
  const [err, setErr] = React.useState<string | null>(null);

  // form
  const [name, setName] = React.useState('');
  const [role, setRole] = React.useState('');
  const [topic, setTopic] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [honey, setHoney] = React.useState(''); // honeypot

  // ===== Tokens
  const BG = '#070A14';
  const FG = '#E8EDF7';
  const ACCENT_FROM = '#2B58D6';
  const ACCENT_TO = '#4A7BFF';
  const PANEL_FROM = '#3A1DE1';
  const PANEL_TO = '#2A137F';

  const sectionBg = blok?.theme === 'custom' && blok?.bg ? blok.bg : BG;

  // scroll lock
  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // ESC
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  // safe JSON
  async function safeJson(res: Response) {
    const ct = res.headers.get('content-type') || '';
    if (ct.includes('application/json')) return res.json();
    await res.text();
    throw new Error(res.ok ? 'Unexpected response from server' : `HTTP ${res.status}`);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return setErr('Please enter a valid email.');
    if (!Array.isArray(blok?.recipients) || !blok?.recipients?.length)
      return setErr('Recipients are not configured in CMS.');

    setPending(true);
    try {
      const res = await fetch('/api/contact/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, role, topic, email, recipients: blok?.recipients || [], honey }),
      });
      const data = await safeJson(res);
      if (!res.ok || !data?.ok) throw new Error(data?.error || 'Submit failed');
      setOk(true);
      setPulse(true);
      setTimeout(() => setPulse(false), 550);
    } catch (e: any) {
      setErr(e?.message || 'Server error. Try again later.');
    } finally {
      setPending(false);
    }
  }

  /* ===== inline input ===== */
  function InlineInput({
    value,
    set,
    ph,
    aria,
    type = 'text',
    minCh = 12,
  }: {
    value: string;
    set: (v: string) => void;
    ph: string;
    aria: string;
    type?: 'text' | 'email';
    minCh?: number;
  }) {
    return (
      <input
        type={type}
        value={value}
        onChange={(e) => set(e.target.value)}
        placeholder={ph}
        aria-label={aria}
        autoComplete={type === 'email' ? 'email' : 'off'}
        inputMode={type === 'email' ? 'email' : 'text'}
        className="cta-field"
        style={{ minWidth: `${minCh}ch` }}
      />
    );
  }

  // big button base
  const btnBase: React.CSSProperties = {
    height: 72,
    padding: '0 40px',
    fontSize: 20,
    fontWeight: 800,
    borderRadius: 20,
    border: 0,
    appearance: 'none',
    WebkitAppearance: 'none',
    cursor: 'pointer',
  };

  return (
    <section
      // фіксовані великі відступи + низ секції
      className="py-[60px] border-y"                       // ⬅️ рівно 60px зверху і знизу
      style={{ background: sectionBg, borderColor: 'rgba(43,88,214,.25)' }}
    >
      {/* ===== CTA header ===== */}
      <div className="mx-auto w-[min(1200px,92vw)] text-center">
        {/* відступ над бровкою */}
        {blok?.eyebrow && (
          <div
            className="mt-6 uppercase tracking-[.2em] opacity-60"
            style={{ color: FG, fontSize: 14, lineHeight: '20px' }}
          >
            {blok.eyebrow}
          </div>
        )}

        {/* заголовок рівно 44px */}
        {blok?.title && (
          <h2
            className="mt-5 font-semibold leading-[1.15] text-balance"
            style={{ color: FG, fontSize: '44px' }}
          >
            {blok.title}
          </h2>
        )}

        {/* кнопка з блиском + відступ знизу */}
        <button
          type="button"
          onClick={() => {
            setOpen(true);
            setOk(false);
            setErr(null);
          }}
          className="glossy-btn mt-8 md:mt-10 mb-10 md:mb-14 inline-flex items-center justify-center text-white shadow-[0_18px_50px_rgba(43,88,214,.55)] hover:shadow-[0_22px_60px_rgba(43,88,214,.65)] transition-transform active:scale-[.98]"
          style={{
            ...btnBase,
            backgroundImage: `linear-gradient(135deg, ${ACCENT_FROM}, ${ACCENT_TO})`,
          }}
        >
          {blok?.ctaLabel || 'Get in touch'}
        </button>
      </div>

      {/* ===== MODAL ===== */}
      <div
        aria-hidden={!open}
        style={{
          position: 'fixed',
          inset: 0 as any,
          display: open ? 'flex' : 'none',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 24,
          zIndex: 2147483646,
        }}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(1200px 600px at 15% 0%, rgba(67,123,255,.06), transparent), rgba(0,0,0,.86)',
            backdropFilter: 'blur(6px) brightness(0.75)',
            WebkitBackdropFilter: 'blur(6px) brightness(0.75)',
          }}
          onClick={() => setOpen(false)}
        />

        {/* Panel */}
        <div
          role="dialog"
          aria-modal="true"
          className={`relative text-white ring-1 ring-white/10 overflow-hidden modal-in ${
            pulse ? 'modal-pulse' : ''
          }`}
          style={{
            width: 'min(1080px, 96vw)',
            borderRadius: 40,
            padding: '56px 56px 44px',
            backgroundImage: `linear-gradient(160deg, ${PANEL_FROM}, ${PANEL_TO})`,
            boxShadow: '0 40px 110px rgba(0,0,0,.55)',
          }}
        >
          {/* subtle vignette */}
          <div
            className="pointer-events-none absolute inset-0 rounded-[40px]"
            style={{
              background:
                'radial-gradient(120% 90% at 50% 0%, rgba(255,255,255,.05), transparent),' +
                'radial-gradient(120% 120% at 0% 100%, rgba(0,0,0,.18), transparent),' +
                'radial-gradient(120% 120% at 100% 100%, rgba(0,0,0,.18), transparent)',
            }}
          />

          {/* Close */}
          <button
            type="button"
            onClick={() => setOpen(false)}
            title="Close"
            aria-label="Close"
            className="grid place-items-center"
            style={{
              position: 'absolute',
              top: 18,
              right: 18,
              height: 44,
              width: 44,
              borderRadius: 999,
              color: '#fff',
              background: 'rgba(255,255,255,.16)',
              border: 0,
              appearance: 'none',
              WebkitAppearance: 'none',
              fontSize: 24,
              lineHeight: 1,
            }}
          >
            ×
          </button>

          {!ok ? (
            <form onSubmit={onSubmit} className="relative">
              <div className="space-y-10 leading-tight relative z-10">
                <p className="text-white/95 text-[28px] md:text-[34px] lg:text-[38px]">
                  <span className="font-black tracking-tight">My name is</span>
                  <InlineInput
                    value={name}
                    set={setName}
                    ph="YOUR NAME"
                    aria="Your name"
                    minCh={14}
                  />
                  <span className="font-black">.</span>
                </p>

                <p className="text-white/95 text-[28px] md:text-[34px] lg:text-[38px]">
                  <span className="font-black">I am</span>
                  <InlineInput
                    value={role}
                    set={setRole}
                    ph="INVESTOR"
                    aria="Your role"
                    minCh={10}
                  />
                  <span className="font-black">
                    &nbsp;and I am interested in
                  </span>
                  <InlineInput
                    value={topic}
                    set={setTopic}
                    ph="PRIVACY"
                    aria="Topic"
                    minCh={10}
                  />
                  <span className="font-black">.</span>
                </p>

                <p className="text-white/95 text-[28px] md:text-[34px] lg:text-[38px]">
                  <span className="font-black">
                    I’d like to meet with your team, you can contact me at
                  </span>
                  <InlineInput
                    type="email"
                    value={email}
                    set={setEmail}
                    ph="YOUR EMAIL"
                    aria="Your email"
                    minCh={18}
                  />
                  <span className="font-black">.</span>
                </p>
              </div>

              {/* honeypot */}
              <input
                value={honey}
                onChange={(e) => setHoney(e.target.value)}
                name="company"
                autoComplete="off"
                className="hidden"
              />

              {/* error */}
              {err && (
                <div className="mt-8 rounded-xl bg-white/12 px-6 py-4 text-sm">
                  {err}
                </div>
              )}

              {/* actions */}
              <div className="mt-16 flex flex-wrap items-center">
                <button
                  type="submit"
                  disabled={pending}
                  className="text-white shadow-[0_16px_48px_rgba(43,88,214,.55)] disabled:opacity-60"
                  style={{
                    height: 64,
                    padding: '0 36px',
                    fontSize: 18,
                    fontWeight: 700,
                    borderRadius: 16,
                    border: 0,
                    appearance: 'none',
                    WebkitAppearance: 'none',
                    backgroundImage: `linear-gradient(135deg, ${ACCENT_FROM}, ${ACCENT_TO})`,
                    marginRight: 32,
                  }}
                >
                  {pending ? 'Sending…' : 'Submit'}
                </button>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="text-white"
                  style={{
                    height: 62,
                    padding: '0 32px',
                    fontSize: 18,
                    fontWeight: 700,
                    borderRadius: 16,
                    border: '1px solid rgba(255,255,255,.28)',
                    background: 'rgba(255,255,255,.10)',
                    appearance: 'none',
                    WebkitAppearance: 'none',
                    boxShadow: '0 2px 10px rgba(0,0,0,.15) inset',
                    marginLeft: 8,
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-black tracking-tight">
                {blok?.successTitle || 'Thank you!'}
              </h3>
              <p className="mt-3 text-white/95 text-lg max-w-prose">
                {blok?.successBody || 'We will get back to you shortly.'}
              </p>
              <div className="mt-10">
                <button
                  onClick={() => setOpen(false)}
                  className="text-[#2A137F]"
                  style={{ ...btnBase, height: 56, background: '#fff' }}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Global styles: inputs + animations + glossy button */}
      <style jsx global>{`
        .cta-field {
          appearance: none;
          -webkit-appearance: none;
          background: transparent;
          color: #fff;
          font: inherit;
          line-height: 1.1;
          border: 0;
          border-bottom: 3px solid rgba(255, 255, 255, 0.45);
          padding: 0 2.45rem 2.3rem;
          margin: 0 0.45rem;
          outline: none;
          caret-color: #fff;
          vertical-align: baseline;
          transform: translateY(2px);
        }
        .cta-field::placeholder {
          color: rgba(255, 255, 255, 0.62);
          text-transform: uppercase;
          letter-spacing: 0.18em;
        }
        .cta-field:focus {
          border-bottom-color: #fff;
          box-shadow: 0 10px 26px rgba(0, 0, 0, 0.14);
        }
        .cta-field:-webkit-autofill,
        .cta-field:-webkit-autofill:hover,
        .cta-field:-webkit-autofill:focus {
          -webkit-text-fill-color: #fff;
          transition: background-color 5000s ease-in-out 0s;
          box-shadow: 0 0 0px 1000px transparent inset;
        }

        /* zoom-in при відкритті */
        @keyframes modalIn {
          from {
            transform: scale(0.94);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .modal-in {
          animation: modalIn 0.35s cubic-bezier(0.2, 0.85, 0.25, 1);
        }

        /* короткий pulse після успіху */
        @keyframes popPulse {
          0% {
            transform: scale(1);
          }
          40% {
            transform: scale(1.03);
          }
          100% {
            transform: scale(1);
          }
        }
        .modal-pulse {
          animation: popPulse 0.5s cubic-bezier(0.2, 0.85, 0.25, 1) 1;
        }

        /* glossy shine на кнопці CTA */
        .glossy-btn {
          position: relative;
          overflow: hidden;
        }
        .glossy-btn::after {
          content: '';
          position: absolute;
          top: -120%;
          bottom: -120%;
          left: -160%;
          width: 120px;
          transform: skewX(-25deg);
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.55) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          filter: blur(2px);
          opacity: 0.65;
          animation: btnShine 5.5s ease-in-out infinite;
        }
        .glossy-btn:hover::after {
          animation-duration: 2.2s;
        }
        @keyframes btnShine {
          0% {
            left: -160%;
          }
          18% {
            left: 130%;
          }
          100% {
            left: 130%;
          }
        }
      `}</style>
    </section>
  );
}
