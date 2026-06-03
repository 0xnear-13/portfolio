import { useState, useEffect } from "react";
import "./App.css";

import comptiaPdf from "./assets/comptia.pdf";
import googlePdf from "./assets/google.pdf";

const CERTS = [
  {
    id: 1,
    issuer: "CompTIA",
    name: "Security+",
    date: "March 24, 2025",
    code: "COMP001022731343",
    //verifyUrl: "http://verify.CompTIA.org",
    accent: "#c0392b",
    bg: "#1a0a09",
    pdf: comptiaPdf,
  },
  {
    id: 2,
    issuer: "Google / Coursera",
    name: "Google Cybersecurity",
    date: "April 8, 2025",
    code: "8 Courses Completed",
    //verifyUrl: "https://coursera.org/verify",
    accent: "#4285f4",
    bg: "#090f1a",
    pdf: googlePdf,
  },
];

const SKILLS = [
  { name: "Python", cat: "lang" },
  { name: "C++", cat: "lang" },
  { name: "Linux", cat: "os" },
  { name: "SQL", cat: "data" },
  { name: "Network Security", cat: "sec" },
  { name: "SIEM Tools", cat: "sec" },
  { name: "Threat Analysis", cat: "sec" },
  { name: "Penetration Testing", cat: "sec" },
  { name: "Incident Response", cat: "sec" },
];

const NAV_ITEMS = ["about", "certificates", "skills", "contact"];

function GlitchText({ text }) {
  const [glitch, setGlitch] = useState(false);
  useEffect(() => {
    const t = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 150);
    }, 4000);
    return () => clearInterval(t);
  }, []);
  return (
    <span className={`glitch${glitch ? " glitching" : ""}`} data-text={text}>
      {text}
    </span>
  );
}

function TerminalLine({ text, delay = 0 }) {
  const [visible, setVisible] = useState(false);
  const [typed, setTyped] = useState("");
  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(true);
      let i = 0;
      const iv = setInterval(() => {
        setTyped(text.slice(0, i + 1));
        i++;
        if (i >= text.length) clearInterval(iv);
      }, 30);
    }, delay);
    return () => clearTimeout(t);
  }, [text, delay]);
  if (!visible) return null;
  return (
    <div className="terminal-line">
      <span className="prompt">❯</span>
      <span className="cmd">{typed}</span>
      {typed.length < text.length && <span className="cursor" />}
    </div>
  );
}

export default function App() {
  const [active, setActive] = useState("about");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { threshold: 0.4 },
    );
    NAV_ITEMS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="app">
      {/* Scanlines overlay */}
      <div className="scanlines" />

      {/* Nav */}
      <nav className="nav">
        <div className="nav-logo" onClick={() => scrollTo("about")}>
          <span className="logo-bracket">[</span>
          Giorgi Jakeli
          <span className="logo-bracket">]</span>
        </div>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span />
          <span />
          <span />
        </button>
        <ul className={`nav-links${menuOpen ? " open" : ""}`}>
          {NAV_ITEMS.map((id) => (
            <li key={id}>
              <button
                className={active === id ? "active" : ""}
                onClick={() => scrollTo(id)}
              >
                {id}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* HERO */}
      <section id="about" className="hero">
        <div className="hero-bg-grid" />
        <div className="hero-content">
          <div className="hero-tag">
            <span className="status-dot" /> Available for hire
          </div>
          <h1 className="hero-name">
            <GlitchText text="GIORGI JAKELI" />
          </h1>
          <h2 className="hero-title"> Cybersecurity Analyst</h2>

          <div className="terminal">
            <div className="terminal-header">
              <span className="dot red" />
              <span className="dot yellow" />
              <span className="dot green" />
              <span className="terminal-label">whoami</span>
            </div>
            <div className="terminal-body">
              <TerminalLine
                text="Junior cybersecurity specialist"
                delay={400}
              />
              <TerminalLine
                text="Industry-recognized certifications"
                delay={1000}
              />
              <TerminalLine text="HTB Georgia Rank: #1 / Near13" delay={1600} />
              <TerminalLine text="Seeking real-world experience" delay={2200} />
            </div>
          </div>

          <div className="hero-stats">
            <div className="stat">
              <span className="stat-num">2</span>
              <span className="stat-label">Certs</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-num">#1</span>
              <span className="stat-label">Georgia HTB</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-num">400+</span>
              <span className="stat-label">HTB Global</span>
            </div>
          </div>

          <div className="hero-actions">
            <a
              href="https://github.com/0xnear-13"
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
            </a>
            <a
              href="https://app.hackthebox.com/users/2329511"
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
              >
                <title>Hackthebox SVG Icon</title>
                <path
                  fill="currentColor"
                  d="m22.51 6.457l.001-.013a.9.9 0 0 0-.271-.638l-.027-.024q-.028-.025-.057-.048q-.03-.022-.06-.04l-.029-.02l-9.61-5.547a.89.89 0 0 0-.922.004L1.933 5.674l-.03.02l-.023.014l-.02.015a1 1 0 0 0-.147.134l-.003.003a.9.9 0 0 0-.221.584v.014l-.001.027v11.07c0 .328.18.63.469.784l9.599 5.542l.023.011a1 1 0 0 0 .166.07l.04.01l.072.015l.035.006a.8.8 0 0 0 .216 0q.018-.002.035-.006l.072-.014l.04-.012l.064-.022a1 1 0 0 0 .102-.047l.023-.011l9.599-5.542a.89.89 0 0 0 .469-.784V6.478zM5.255 6.082l6.537-3.774a.42.42 0 0 1 .418 0l6.537 3.774a.418.418 0 0 1 0 .725l-6.537 3.774a.42.42 0 0 1-.418 0L5.254 6.807a.418.418 0 0 1 0-.725m5.614 14.345a.417.417 0 0 1-.626.361l-6.524-3.766a.42.42 0 0 1-.209-.361V9.127a.417.417 0 0 1 .626-.361l6.524 3.766a.42.42 0 0 1 .209.362zm9.623-3.766a.42.42 0 0 1-.209.36l-6.524 3.767a.417.417 0 0 1-.626-.36v-7.533c0-.15.08-.287.209-.362l6.524-3.766a.417.417 0 0 1 .626.36z"
                />
              </svg>
              HTB Profile
            </a>
            <a
              href="https://www.linkedin.com/in/giorgi-jakeli-5185a0226/"
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-linkedin"
                viewBox="0 0 16 16"
              >
                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
              </svg>
              Linkdin
            </a>
            <button
              className="btn btn-primary"
              onClick={() => scrollTo("contact")}
            >
              Contact Me
            </button>
          </div>
        </div>
      </section>

      {/* CERTIFICATES */}
      <section id="certificates" className="section">
        <div className="section-inner">
          <div className="section-header">
            <span className="section-tag">02</span>
            <h2 className="section-title">Certificates</h2>
          </div>
          <div className="certs-grid">
            {CERTS.map((c) => (
              <div
                key={c.id}
                className="cert-card"
                style={{ "--accent": c.accent, "--cert-bg": c.bg }}
              >
                <div className="cert-top">
                  <span className="cert-issuer">{c.issuer}</span>
                  <span className="cert-badge">verified</span>
                </div>
                <h3 className="cert-name">{c.name}</h3>
                <div className="cert-meta">
                  <span>{c.date}</span>
                  <span className="cert-code">{c.code}</span>
                </div>
                <div className="cert-bar" />
                <a
                  href={c.pdf}
                  target="_blank"
                  rel="noreferrer"
                  className="cert-link"
                >
                  Verify certificate →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="section section-alt">
        <div className="section-inner">
          <div className="section-header">
            <span className="section-tag">03</span>
            <h2 className="section-title">Skills</h2>
          </div>
          <div className="skills-grid">
            {SKILLS.map((s) => (
              <div key={s.name} className={`skill-pill skill-${s.cat}`}>
                <span className="skill-dot" />
                {s.name}
              </div>
            ))}
          </div>
          <div className="langs-row">
            <div className="lang-card">
              <span className="lang-flag">🇬🇪</span>
              <div>
                <div className="lang-name">Georgian</div>
                <div className="lang-level">Native</div>
              </div>
            </div>
            <div className="lang-card">
              <span className="lang-flag">🇬🇧</span>
              <div>
                <div className="lang-name">English</div>
                <div className="lang-level">B2 Upper-Intermediate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section">
        <div className="section-inner">
          <div className="section-header">
            <span className="section-tag">04</span>
            <h2 className="section-title">Contact</h2>
          </div>
          <p className="contact-intro">
            Looking to gain real-world experience in cybersecurity. Feel free to
            reach out.
          </p>
          <div className="contact-grid">
            <a href="mailto:Giorgijakeli7@gmail.com" className="contact-card">
              <div className="contact-icon">✉</div>
              <div>
                <div className="contact-label">Email</div>
                <div className="contact-value">Giorgijakeli7@gmail.com</div>
              </div>
            </a>
            <a href="tel:+995579872727" className="contact-card">
              <div className="contact-icon">✆</div>
              <div>
                <div className="contact-label">Phone</div>
                <div className="contact-value">+995 579 87 27 27</div>
              </div>
            </a>
            <a
              href="https://github.com/0xnear-13"
              target="_blank"
              rel="noreferrer"
              className="contact-card"
            >
              <div className="contact-icon">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </div>
              <div>
                <div className="contact-label">GitHub</div>
                <div className="contact-value">0xnear-13</div>
              </div>
            </a>
            <a
              href="https://github.com/0xnear-13"
              target="_blank"
              rel="noreferrer"
              className="contact-card"
            >
              <div className="contact-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  class="bi bi-linkedin"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                </svg>
              </div>
              <div>
                <div className="contact-label">Linkdin</div>
                <div className="contact-value">Giorgi Jakeli</div>
              </div>
            </a>
            <a
              href="https://app.hackthebox.com/users/2329511"
              target="_blank"
              rel="noreferrer"
              className="contact-card contact-card-htb"
            >
              <div className="contact-icon htb-icon">⬡</div>
              <div>
                <div className="contact-label">Hack The Box</div>
                <div className="contact-value">Near13 · #1 in Georgia</div>
              </div>
            </a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <span className="footer-text">
          © 2025 Giorgi Jakeli — Built with React
        </span>
        <span className="footer-loc">📍 Georgia, Tbilisi</span>
      </footer>
    </div>
  );
}
