/**
 * Minimal sign-up / log-in modal. Two segmented toggles: Email | Phone and Password | OTP.
 * Front-end only for now: it validates input and shows a demo confirmation.
 */
import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useId, useState, type FormEvent } from "react";
import { cn } from "@/lib/utils";
import { useLang } from "@/lib/i18n";
import { isValidEmail, isValidPhone } from "@/lib/onboarding";
import { Sparkle } from "./Doodles";
import { Logo, YButton } from "./primitives";
import type { AuthMode } from "./Header";

function Segmented<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <div role="radiogroup" aria-label={label} className="grid grid-cols-2 gap-1 rounded-[12px] border border-sage bg-straw p-1">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={value === o.value}
          onClick={() => onChange(o.value)}
          className={cn(
            "h-9 cursor-pointer rounded-[9px] text-[14px] font-medium transition-colors duration-300",
            value === o.value ? "bg-plaster text-ink shadow-paper" : "text-olive hover:text-ink",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export const fieldClass =
  "h-12 w-full rounded-[12px] border border-sage bg-straw px-4 text-ink placeholder:text-olive/70 transition-shadow duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-seed aria-[invalid=true]:border-seed";

export function AuthModal({
  mode,
  onModeChange,
  onClose,
}: {
  mode: AuthMode | null;
  onModeChange: (m: AuthMode) => void;
  onClose: () => void;
}) {
  const { t, dir } = useLang();
  const a = t.auth;
  const [method, setMethod] = useState<"email" | "phone">("email");
  const [cred, setCred] = useState<"password" | "otp">("password");
  const [id, setId] = useState("");
  const [secret, setSecret] = useState("");
  const [errors, setErrors] = useState<{ id?: string; secret?: string }>({});
  const [notice, setNotice] = useState<string | null>(null);
  const uid = useId();

  // Reset messages whenever the form shape changes.
  useEffect(() => {
    setErrors({});
    setNotice(null);
  }, [mode, method, cred]);

  const validateId = () => (method === "email" ? isValidEmail(id) : isValidPhone(id));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!validateId()) next.id = method === "email" ? a.errEmail : a.errPhone;
    if (cred === "password" && secret.length < 8) next.secret = a.errPassword;
    setErrors(next);
    setNotice(Object.keys(next).length ? null : cred === "otp" ? a.sent : a.done);
  };

  const isSignup = mode === "signup";

  return (
    <Dialog.Root open={mode !== null} onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/35 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <Dialog.Content
          dir={dir}
          className="paper-card fixed top-1/2 left-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 p-6 duration-300 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 md:p-8"
        >
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <Logo className="mb-5" />
              <Dialog.Title className="text-2xl font-extrabold text-ink">
                {isSignup ? a.signupTitle : a.loginTitle}
              </Dialog.Title>
              <Dialog.Description className="mt-1 text-[15px] text-olive">
                {isSignup ? a.signupSub : a.loginSub}
              </Dialog.Description>
            </div>
            <Dialog.Close
              aria-label={a.close}
              className="inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-[10px] text-ink hover:bg-straw"
            >
              <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round">
                <path d="M6 6.5 C10 10 14 14 18 17.5" />
                <path d="M18 6 C14 10 10 14 6.5 18" />
              </svg>
            </Dialog.Close>
          </div>

          <form noValidate onSubmit={submit} className="space-y-4">
            <Segmented
              label={a.methodLabel}
              value={method}
              onChange={(v) => {
                setMethod(v);
                setId("");
              }}
              options={[
                { value: "email", label: a.email },
                { value: "phone", label: a.phone },
              ]}
            />
            <Segmented
              label={a.credLabel}
              value={cred}
              onChange={setCred}
              options={[
                { value: "password", label: a.password },
                { value: "otp", label: a.otp },
              ]}
            />

            <div>
              <label htmlFor={`${uid}-id`} className="mb-1.5 block text-[14px] font-medium text-olive">
                {method === "email" ? a.email : a.phone}
              </label>
              <input
                id={`${uid}-id`}
                type={method === "email" ? "email" : "tel"}
                inputMode={method === "email" ? "email" : "tel"}
                dir="ltr"
                autoComplete={method === "email" ? "email" : "tel"}
                placeholder={method === "email" ? a.emailPh : a.phonePh}
                value={id}
                onChange={(e) => setId(e.target.value)}
                aria-invalid={!!errors.id}
                aria-describedby={errors.id ? `${uid}-id-err` : undefined}
                className={cn(fieldClass, "text-start")}
              />
              {errors.id ? (
                <p id={`${uid}-id-err`} role="alert" className="mt-1.5 text-[14px] text-seed">
                  {errors.id}
                </p>
              ) : null}
            </div>

            {cred === "password" ? (
              <div>
                <label htmlFor={`${uid}-pw`} className="mb-1.5 block text-[14px] font-medium text-olive">
                  {a.password}
                </label>
                <input
                  id={`${uid}-pw`}
                  type="password"
                  dir="ltr"
                  autoComplete={isSignup ? "new-password" : "current-password"}
                  placeholder={a.passwordPh}
                  value={secret}
                  onChange={(e) => setSecret(e.target.value)}
                  aria-invalid={!!errors.secret}
                  aria-describedby={errors.secret ? `${uid}-pw-err` : undefined}
                  className={fieldClass}
                />
                {errors.secret ? (
                  <p id={`${uid}-pw-err`} role="alert" className="mt-1.5 text-[14px] text-seed">
                    {errors.secret}
                  </p>
                ) : null}
              </div>
            ) : (
              <p className="text-[14px] text-olive">{a.otpHint}</p>
            )}

            <YButton type="submit" size="lg" className="w-full">
              {cred === "otp" ? a.sendCode : isSignup ? a.signupCta : a.loginCta}
            </YButton>

            {notice ? (
              <p role="status" className="flex items-center justify-center gap-2 text-[14px] text-olive">
                <Sparkle filled className="h-3.5 w-3.5 text-leaf" />
                {notice}
              </p>
            ) : null}

            <p className="text-center text-[15px]">
              <button
                type="button"
                className="ink-link cursor-pointer"
                onClick={() => onModeChange(isSignup ? "login" : "signup")}
              >
                {isSignup ? a.switchToLogin : a.switchToSignup}
              </button>
            </p>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
