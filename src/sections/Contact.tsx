import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Github, Linkedin, Loader2, Mail, Send, ExternalLink } from 'lucide-react';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Reveal } from '../components/ui/Reveal';
import { profile, socials } from '../data/portfolio';
import { contactSchema, type ContactFormValues } from '../utils/validation';

type Status = 'idle' | 'opening' | 'opened';

/**
 * No backend is configured, so submission builds a real mailto: link and
 * tells the visitor exactly that — the message opens pre-filled in their
 * own email app. See README for wiring a real email service.
 */
export function Contact() {
  const [status, setStatus] = useState<Status>('idle');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({ resolver: zodResolver(contactSchema), mode: 'onBlur' });

  const onSubmit = async (values: ContactFormValues) => {
    setStatus('opening');
    const subject = encodeURIComponent(`Portfolio contact — ${values.name}`);
    const body = encodeURIComponent(`${values.message}\n\n— ${values.name} (${values.email})`);
    // brief loading beat so the state change is legible, then hand off
    await new Promise((r) => setTimeout(r, 500));
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setStatus('opened');
  };

  const fieldClass = (invalid: boolean) =>
    `w-full rounded-xl border bg-[var(--c-bg-elevated-2)] px-4 py-3 text-sm text-ink placeholder:text-muted/60 transition-colors focus:border-cyan ${
      invalid ? 'border-[var(--c-danger)]' : 'border-[var(--c-border-strong)]'
    }`;

  return (
    <section id="contact" className="section" aria-label="Contact">
      <div className="shell relative read-scrim read-scrim--center">
        <div className="aura" aria-hidden style={{ width: 440, height: 440, bottom: '-5%', left: '20%', background: 'var(--c-glow-cyan)' }} />

        <SectionHeading
          index="05"
          eyebrow="Contact"
          title={<>Let's build something <span className="text-cyan">worth remembering</span>.</>}
          lead="Tell me what you are working on. The form opens your email app with everything pre-filled — no message disappears into a void."
        />

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12">
          <Reveal>
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="card p-6 sm:p-8">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-display mb-2">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your name"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'contact-name-error' : undefined}
                    className={fieldClass(!!errors.name)}
                    {...register('name')}
                  />
                  {errors.name && (
                    <p id="contact-name-error" role="alert" className="text-xs mt-2" style={{ color: 'var(--c-danger)' }}>
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-sm font-display mb-2">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'contact-email-error' : undefined}
                    className={fieldClass(!!errors.email)}
                    {...register('email')}
                  />
                  {errors.email && (
                    <p id="contact-email-error" role="alert" className="text-xs mt-2" style={{ color: 'var(--c-danger)' }}>
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-5">
                <label htmlFor="contact-message" className="block text-sm font-display mb-2">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={6}
                  placeholder="What are you building? What do you need?"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'contact-message-error' : undefined}
                  className={`${fieldClass(!!errors.message)} resize-y min-h-[120px]`}
                  {...register('message')}
                />
                {errors.message && (
                  <p id="contact-message-error" role="alert" className="text-xs mt-2" style={{ color: 'var(--c-danger)' }}>
                    {errors.message.message}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-4 mt-7">
                <button
                  type="submit"
                  disabled={status === 'opening'}
                  className="group inline-flex items-center gap-2 rounded-full bg-cyan text-[#0a0d05] px-7 py-3 font-display font-medium text-sm transition-all duration-300 hover:shadow-[0_0_30px_var(--c-glow-cyan)] hover:-translate-y-0.5 disabled:opacity-60 disabled:pointer-events-none"
                >
                  {status === 'opening' ? (
                    <>
                      <Loader2 size={16} className="animate-spin" aria-hidden /> Preparing…
                    </>
                  ) : (
                    <>
                      Send message <Send size={15} aria-hidden />
                    </>
                  )}
                </button>
                {status === 'opened' && (
                  <p className="text-sm" role="status" style={{ color: 'var(--c-success)' }}>
                    Your email app should be open with the message pre-filled — just hit send there.
                  </p>
                )}
              </div>

              <p className="text-muted text-xs mt-5 leading-relaxed">
                This form has no server behind it yet: submitting opens your email application via a
                pre-filled mail message. Nothing is sent silently, and nothing is stored.
              </p>
            </form>
          </Reveal>

          {/* direct channels */}
          <Reveal delay={0.12}>
            <div className="flex flex-col gap-5 h-full">
              <a
                href={`mailto:${profile.email}`}
                className="card p-6 flex items-center gap-4 group"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-[var(--c-border)] text-cyan shrink-0">
                  <Mail size={18} aria-hidden />
                </span>
                <span>
                  <span className="block font-display font-semibold text-sm">Email directly</span>
                  <span className="block text-muted text-sm mt-0.5 break-all">{profile.email}</span>
                </span>
                <ExternalLink size={15} className="ml-auto text-muted group-hover:text-cyan transition-colors" aria-hidden />
              </a>

              <ul className="grid gap-5" style={{ listStyle: 'none' }}>
                {socials.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noreferrer noopener" className="card p-6 flex items-center gap-4 group">
                      <span className="grid h-11 w-11 place-items-center rounded-xl border border-[var(--c-border)] text-cyan shrink-0">
                        {s.label === 'GitHub' ? <Github size={18} aria-hidden /> : <Linkedin size={18} aria-hidden />}
                      </span>
                      <span>
                        <span className="block font-display font-semibold text-sm">{s.label}</span>
                        <span className="block text-muted text-sm mt-0.5 break-all">
                          {s.placeholder ? 'Profile link coming soon' : s.label === 'GitHub' ? 'github.com/CY3ER-CAT' : s.href}
                        </span>
                      </span>
                      <ExternalLink size={15} className="ml-auto text-muted group-hover:text-cyan transition-colors" aria-hidden />
                    </a>
                  </li>
                ))}
              </ul>

              <div className="card p-6 mt-auto">
                <p className="font-display font-semibold text-sm">Response time</p>
                <p className="text-muted text-sm mt-2 leading-relaxed">
                  Usually within a couple of days. GitHub is the fastest channel — issues and discussions are open.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
