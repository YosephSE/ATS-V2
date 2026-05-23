import Link from "next/link";
import {
  Bot,
  BriefcaseBusiness,
  FileText,
  Gauge,
  LayoutDashboard,
  LockKeyhole,
  Network,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import Modal from "@/components/Modal";

const valueItems = [
  {
    icon: Gauge,
    label: "Faster review",
  },
  {
    icon: Network,
    label: "Centralized management",
  },
  {
    icon: Sparkles,
    label: "AI-assisted scoring",
  },
  {
    icon: ShieldCheck,
    label: "Secure accounts",
  },
];

const candidateFeatures = [
  "Create a candidate account",
  "Browse available jobs",
  "Upload resume and documents",
  "Apply and track submissions",
];

const adminFeatures = [
  "Post and edit job listings",
  "Review candidate applications",
  "Open uploaded files",
  "Track hiring statistics",
];

const workflow = [
  "Admin posts a job",
  "Candidates apply",
  "Applications are organized",
  "AI scoring supports review",
  "Admin makes the decision",
];

const heroApplications = [
  ["Frontend Engineer", "24 applicants", "Active"],
  ["Product Designer", "18 applicants", "Review"],
  ["QA Analyst", "12 applicants", "New"],
];

const heroPipeline = [
  ["Applied", "72%", "bg-[#0050cb]"],
  ["Reviewed", "54%", "bg-[#6834d2]"],
  ["Shortlisted", "31%", "bg-[#32a6a6]"],
  ["Hired", "12%", "bg-[#565e74]"],
];

const roleItems = [
  {
    title: "Candidate",
    description: "Find jobs, submit documents, and track applications.",
    href: "/candidate/jobs",
  },
  {
    title: "Admin",
    description: "Manage job posts, applications, and hiring statistics.",
    href: "/roles",
  },
  {
    title: "Super admin",
    description: "Approve admins and control elevated access.",
    href: "/superadmin/toapprove",
  },
];

const HomePage = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30]">
      <nav className="sticky top-0 z-50 border-b border-[#c2c6d8] bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-20 w-full max-w-[1440px] items-center justify-between px-6">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-2xl font-bold tracking-tight">
              ATS
            </Link>
            <div className="hidden items-center gap-3 md:flex">
              <Link
                className="rounded-lg px-4 py-2 text-sm font-semibold uppercase tracking-[0.05em] text-[#565e74] transition hover:bg-[#eff4ff] hover:text-[#0050cb]"
                href="/candidate/jobs"
              >
                Find Jobs
              </Link>
              <Link
                className="rounded-lg px-4 py-2 text-sm font-semibold uppercase tracking-[0.05em] text-[#565e74] transition hover:bg-[#eff4ff] hover:text-[#0050cb]"
                href="/roles"
              >
                For Employers
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              className="rounded-lg px-4 py-2 text-sm font-semibold uppercase tracking-[0.05em] text-[#0050cb] transition hover:bg-[#eff4ff]"
              href="/roles"
            >
              Login
            </Link>
            <Link
              className="rounded-lg bg-[#0050cb] px-4 py-2 text-sm font-semibold uppercase tracking-[0.05em] text-white shadow-sm transition hover:bg-[#003fa4]"
              href="/roles"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <main>
        <section className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-12 px-6 py-16 lg:grid-cols-2">
          <div className="z-10 flex flex-col gap-6">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#c2c6d8] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.05em] text-[#565e74] shadow-sm">
              <BriefcaseBusiness className="h-4 w-4 text-[#0050cb]" />
              Precision in hiring
            </div>
            <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-[#0b1c30] md:text-6xl">
              Manage hiring from job post to final decision.
            </h1>
            <p className="max-w-xl text-base leading-7 text-[#424656]">
              ATS gives candidates a simple way to apply and gives hiring teams
              one organized workspace for jobs, applications, profiles,
              statistics, and AI-assisted review.
            </p>
            <div className="mt-2 flex flex-wrap gap-4">
              <Link
                className="rounded-lg border-2 border-[#0050cb] px-6 py-3 text-sm font-semibold uppercase tracking-[0.05em] text-[#0050cb] transition hover:bg-[#eff4ff]"
                href="/candidate/jobs"
              >
                Find Jobs
              </Link>
              <Link
                className="rounded-lg bg-[#0050cb] px-6 py-3 text-sm font-semibold uppercase tracking-[0.05em] text-white shadow-sm transition hover:bg-[#003fa4]"
                href="/roles"
              >
                Admin Login
              </Link>
            </div>
          </div>

          <div className="relative z-10 flex aspect-[4/3] w-full flex-col overflow-hidden rounded-xl border border-[#c2c6d8] bg-[#f8f9ff] shadow-xl">
            <div className="flex h-12 items-center justify-between border-b border-[#c2c6d8] bg-white px-4">
              <div className="flex gap-2">
                <div className="h-3 w-3 rounded-full bg-[#c2c6d8]" />
                <div className="h-3 w-3 rounded-full bg-[#c2c6d8]" />
                <div className="h-3 w-3 rounded-full bg-[#c2c6d8]" />
              </div>
              <div className="h-6 w-32 rounded-full bg-[#eff4ff]" />
            </div>
            <div className="grid flex-grow gap-4 bg-[#f8f9ff] p-4 md:grid-cols-[1.05fr_1fr]">
              <div className="flex flex-col overflow-hidden rounded-lg border border-[#c2c6d8] bg-white">
                <div className="grid grid-cols-[1.2fr_0.8fr_0.65fr] border-b border-[#c2c6d8] bg-[#eff4ff] px-3 py-2 text-[11px] font-bold uppercase tracking-[0.05em] text-[#565e74]">
                  <span>Role</span>
                  <span>Volume</span>
                  <span>Status</span>
                </div>
                {heroApplications.map(([role, volume, status]) => (
                  <div
                    className="grid grid-cols-[1.2fr_0.8fr_0.65fr] items-center border-b border-[#d8deef] px-3 py-3 text-xs last:border-b-0"
                    key={role}
                  >
                    <span className="font-semibold text-[#0b1c30]">{role}</span>
                    <span className="text-[#565e74]">{volume}</span>
                    <span className="rounded-full bg-[#e8f2ff] px-2 py-1 text-center text-[10px] font-bold uppercase tracking-[0.05em] text-[#0050cb]">
                      {status}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col rounded-lg border border-[#c2c6d8] bg-white p-4">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-[0.05em] text-[#565e74]">
                    Pipeline
                  </span>
                  <span className="rounded-full bg-[#e8f2ff] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.05em] text-[#0050cb]">
                    Live data
                  </span>
                </div>
                <div className="grid flex-grow grid-cols-4 items-end gap-3 border-l border-b border-[#c2c6d8] px-3 pb-3">
                  {heroPipeline.map(([label, height, color]) => (
                    <div className="flex h-full min-h-40 flex-col justify-end gap-2" key={label}>
                      <div
                        className={`w-full rounded-t ${color}`}
                        style={{ height }}
                      />
                      <span className="text-center text-[10px] font-semibold text-[#565e74]">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-[#c2c6d8] bg-[#eff4ff] py-6">
          <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-6 px-6 md:grid-cols-4">
            {valueItems.map(({ icon: Icon, label }) => (
              <div className="flex items-center gap-3" key={label}>
                <Icon className="h-8 w-8 text-[#0050cb]" />
                <span className="text-base font-semibold text-[#0b1c30]">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto grid max-w-[1440px] grid-cols-1 gap-6 px-6 py-16 lg:grid-cols-2">
          <div className="rounded-xl border border-[#c2c6d8] bg-white p-8 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <Users className="h-8 w-8 text-[#0050cb]" />
              <h2 className="text-2xl font-bold">For candidates</h2>
            </div>
            <p className="mb-6 text-[#424656]">
              Give applicants a focused path to discover jobs, submit their
              information, and keep track of their applications.
            </p>
            <div className="grid gap-3">
              {candidateFeatures.map((feature) => (
                <div className="flex items-center gap-3" key={feature}>
                  <FileText className="h-5 w-5 text-[#0050cb]" />
                  <span className="text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-[#c2c6d8] bg-white p-8 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <LayoutDashboard className="h-8 w-8 text-[#6834d2]" />
              <h2 className="text-2xl font-bold">For hiring teams</h2>
            </div>
            <p className="mb-6 text-[#424656]">
              Keep job management, application review, uploaded documents, and
              hiring visibility in one operational workspace.
            </p>
            <div className="grid gap-3">
              {adminFeatures.map((feature) => (
                <div className="flex items-center gap-3" key={feature}>
                  <BriefcaseBusiness className="h-5 w-5 text-[#6834d2]" />
                  <span className="text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-10 px-6 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <Bot className="h-8 w-8 text-[#6834d2]" />
                <h2 className="text-3xl font-bold">AI-assisted application scoring</h2>
              </div>
              <p className="text-[#424656]">
                Gemini-powered scoring helps admins review applications faster
                with structured insight, while keeping final hiring decisions in
                human hands.
              </p>
            </div>
            <div className="rounded-xl border border-[#c2c6d8] bg-[#f8f9ff] p-6 shadow-sm">
              <div className="mb-5 flex items-center justify-between">
                <span className="text-sm font-semibold uppercase tracking-[0.05em] text-[#565e74]">
                  Application score
                </span>
                <span className="rounded-full bg-[#e9ddff] px-3 py-1 text-sm font-bold text-[#5516be]">
                  86%
                </span>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="mb-2 flex justify-between text-sm font-medium">
                    <span>Skill match</span>
                    <span>High</span>
                  </div>
                  <div className="h-3 rounded-full bg-[#dae2fd]">
                    <div className="h-3 w-[88%] rounded-full bg-[#0050cb]" />
                  </div>
                </div>
                <div>
                  <div className="mb-2 flex justify-between text-sm font-medium">
                    <span>Experience fit</span>
                    <span>Strong</span>
                  </div>
                  <div className="h-3 rounded-full bg-[#dae2fd]">
                    <div className="h-3 w-[80%] rounded-full bg-[#6834d2]" />
                  </div>
                </div>
                <div>
                  <div className="mb-2 flex justify-between text-sm font-medium">
                    <span>Resume completeness</span>
                    <span>Complete</span>
                  </div>
                  <div className="h-3 rounded-full bg-[#dae2fd]">
                    <div className="h-3 w-[92%] rounded-full bg-[#565e74]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1440px] px-6 py-16">
          <h2 className="mb-8 text-center text-3xl font-bold">A clear hiring workflow</h2>
          <div className="grid gap-4 md:grid-cols-5">
            {workflow.map((step, index) => (
              <div
                className="rounded-xl border border-[#c2c6d8] bg-white p-5 shadow-sm"
                key={step}
              >
                <span className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#0050cb] text-sm font-bold text-white">
                  {index + 1}
                </span>
                <p className="text-sm font-semibold leading-6">{step}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-y border-[#c2c6d8] bg-[#eff4ff] py-16">
          <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-8 px-6 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <h2 className="mb-4 text-3xl font-bold">Statistics and visibility</h2>
              <p className="text-[#424656]">
                Admin statistics make hiring activity easier to understand with
                job counts, application counts, and review progress.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ["Active jobs", "24"],
                ["Applications", "348"],
                ["Reviewed", "71%"],
              ].map(([label, value]) => (
                <div
                  className="rounded-xl border border-[#c2c6d8] bg-white p-6 shadow-sm"
                  key={label}
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.05em] text-[#565e74]">
                    {label}
                  </p>
                  <p className="mt-4 text-4xl font-bold">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-[#c2c6d8] bg-white py-8">
          <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-8 px-6 md:grid-cols-[0.75fr_1.25fr]">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-[#eff4ff]">
                <LockKeyhole className="h-8 w-8 text-[#0050cb]" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">Built around secure roles</h2>
                <p className="mt-3 max-w-2xl text-[#424656]">
                  ATS supports candidate, admin, and super admin access with
                  authenticated accounts and an admin approval flow.
                </p>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {roleItems.map((role) => (
                <Link
                  className="flex min-h-32 flex-col justify-between rounded-lg border border-[#c2c6d8] bg-[#f8f9ff] p-5 shadow-sm transition hover:border-[#0050cb] hover:bg-[#eff4ff]"
                  href={role.href}
                  key={role.title}
                >
                  <span className="text-lg font-bold text-[#0b1c30]">{role.title}</span>
                  <span className="mt-3 text-sm leading-6 text-[#565e74]">
                    {role.description}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto flex max-w-[1440px] flex-col items-center gap-6 px-6 py-16 text-center">
          <h2 className="text-3xl font-bold">Ready to elevate your hiring?</h2>
          <p className="max-w-2xl text-[#424656]">
            Use one platform for job seekers and hiring teams, from application
            submission to final review.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              className="rounded-lg border-2 border-[#0050cb] px-6 py-3 text-sm font-semibold uppercase tracking-[0.05em] text-[#0050cb] transition hover:bg-[#eff4ff]"
              href="/candidate/jobs"
            >
              Get Started as Candidate
            </Link>
            <Link
              className="rounded-lg bg-[#0050cb] px-6 py-3 text-sm font-semibold uppercase tracking-[0.05em] text-white shadow-sm transition hover:bg-[#003fa4]"
              href="/roles"
            >
              Continue as Admin
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#c2c6d8] bg-[#d3e4fe]">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-8 px-6 py-12 md:grid-cols-4">
          <div className="col-span-1 flex items-center justify-between border-b border-[#c2c6d8] pb-5 md:col-span-4">
            <span className="text-lg font-bold">ATS</span>
            <span className="text-sm text-[#565e74]">
              &copy; {currentYear} ATS. Precision in Hiring.
            </span>
          </div>
          <div className="flex flex-col gap-3 text-sm font-medium text-[#5c647a]">
            <Link href="/candidate/jobs">Find Jobs</Link>
            <Link href="/roles">For Employers</Link>
          </div>
          <div className="flex flex-col gap-3 text-sm font-medium text-[#5c647a]">
            <Link href="/roles">Login</Link>
            <Link href="/roles">Get Started</Link>
          </div>
          <div className="flex flex-col gap-3 text-sm font-medium text-[#5c647a]">
            <Link href="/roles">Candidate accounts</Link>
            <Link
              className="relative z-10 w-fit hover:text-[#0050cb] hover:underline"
              href="/roles?modal=contact"
            >
              Admin approval
            </Link>
          </div>
        </div>
      </footer>

      <Modal />
    </div>
  );
};

export default HomePage;
