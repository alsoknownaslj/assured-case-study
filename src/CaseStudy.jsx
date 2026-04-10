import { useState, useEffect, useRef } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

const C = {
  text: "#1A1A18",
  textMuted: "#6B6A65",
  textLight: "#9C9B95",
  accent: "#2D5A27",
  accentLight: "#E8F0E7",
  accentMid: "#4A8C42",
  coral: "#C4583A",
  coralLight: "#FAF0ED",
  blue: "#2B5B8A",
  border: "#D8D6CF",
  borderLight: "#E8E6DF",
  bg: "#FAFAF7",
};

const loansPerDay = [
  { day: "Day 1", loans: 38 }, { day: "Day 2", loans: 29 }, { day: "Day 3", loans: 18 },
  { day: "Day 4", loans: 12 }, { day: "Day 5", loans: 8 }, { day: "Day 6", loans: 5 },
  { day: "Day 7", loans: 4 }, { day: "Day 8", loans: 3 }, { day: "Day 9", loans: 3 }, { day: "Day 10", loans: 2 },
];

const prePostData = [
  { metric: "Completion rate", pre: 20, post: 35 },
  { metric: "Screen dropoff", pre: 70, post: 48 },
  { metric: "Back navigations", pre: 5, post: 2 },
  { metric: "Default rate", pre: 0.5, post: 0.5 },
];

const mono = "'JetBrains Mono', monospace";
const sans = "'Instrument Sans', sans-serif";

const SectionGrid = ({ num, children, id, refCb }) => (
  <div ref={refCb} id={id} style={{ borderTop: `2px solid ${C.text}`, marginBottom: 0 }}>
    <div style={{ display: "grid", gridTemplateColumns: "72px 1fr", gap: 0, maxWidth: 760, margin: "0 auto", padding: "0 24px" }}>
      <div style={{ paddingTop: 28, paddingBottom: 28 }}>
        <div style={{ fontFamily: mono, fontSize: 12, color: C.textLight }}>{num}</div>
      </div>
      <div style={{ paddingTop: 28, paddingBottom: 48, borderBottom: `0.5px solid ${C.borderLight}` }}>
        {children}
      </div>
    </div>
  </div>
);

const Title = ({ children }) => (
  <h2 style={{ fontFamily: sans, fontSize: "clamp(24px, 4vw, 32px)", fontWeight: 600, color: C.text, lineHeight: 1.2, letterSpacing: -0.5, marginBottom: 16 }}>{children}</h2>
);

const Body = ({ children, style = {} }) => (
  <p style={{ fontFamily: sans, fontSize: 14, lineHeight: 1.75, color: C.textMuted, marginBottom: 14, ...style }}>{children}</p>
);

const Label = ({ children }) => (
  <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: 2, color: C.textLight, textTransform: "uppercase", marginBottom: 12 }}>{children}</div>
);

const Metric = ({ label, value, sub, color = C.text }) => (
  <div style={{ flex: 1, minWidth: 100 }}>
    <div style={{ fontFamily: mono, fontSize: 28, fontWeight: 500, color, lineHeight: 1, whiteSpace: "nowrap" }}>{value}</div>
    <div style={{ fontFamily: sans, fontSize: 12, color: C.textLight, marginTop: 4 }}>{label}</div>
    {sub && <div style={{ fontFamily: mono, fontSize: 11, color: C.textLight, marginTop: 2 }}>{sub}</div>}
  </div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 4, padding: "8px 12px", fontFamily: sans, fontSize: 12 }}>
      <div style={{ fontWeight: 500, marginBottom: 3 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color || C.textMuted }}>{p.name}: {p.value}</div>
      ))}
    </div>
  );
};

const NavDot = ({ active, label, onClick }) => (
  <button onClick={onClick} title={label} style={{
    width: active ? 20 : 6, height: 6, borderRadius: 3, background: active ? C.accent : C.borderLight,
    border: "none", cursor: "pointer", transition: "all 0.3s ease", padding: 0,
  }} />
);

export default function CaseStudy() {
  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = useRef([]);
  const sections = ["intro", "context", "problem", "investigation", "fix", "results", "ideal", "discussion"];
  const sectionLabels = ["Intro", "Context", "Problem", "Investigation", "Fix", "Results", "Ideal", "Discussion"];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = sections.indexOf(entry.target.id);
            if (idx !== -1) setActiveSection(idx);
          }
        });
      },
      { threshold: 0.3 }
    );
    sectionRefs.current.forEach((ref) => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div style={{ background: C.bg, minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: ${C.bg}; }
        ::-webkit-scrollbar-thumb { background: ${C.border}; border-radius: 2px; }
      `}</style>

      {/* Nav dots */}
      <div style={{ position: "fixed", right: 16, top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", gap: 6, zIndex: 100 }}>
        {sections.map((s, i) => <NavDot key={s} active={activeSection === i} label={sectionLabels[i]} onClick={() => scrollTo(s)} />)}
      </div>

      {/* HERO */}
      <div id="intro" ref={(el) => (sectionRefs.current[0] = el)} style={{ minHeight: "80vh", display: "flex", alignItems: "flex-end", padding: "0 24px 80px", borderBottom: `2px solid ${C.text}` }}>
        <div style={{ maxWidth: 760, margin: "0 auto", width: "100%" }}>
          <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: 3, color: C.textLight, textTransform: "uppercase", marginBottom: 20 }}>Case study — Assured, April 2026</div>
          <h1 style={{ fontFamily: sans, fontSize: "clamp(36px, 6vw, 56px)", fontWeight: 600, color: C.text, lineHeight: 1.1, letterSpacing: -1.5, marginBottom: 20, maxWidth: 600 }}>
          MUSD Lending Platform
          </h1>
          <p style={{ fontFamily: sans, fontSize: 15, color: C.textMuted, lineHeight: 1.7, maxWidth: 520, marginBottom: 32 }}>
          How I diagnosed, fixed, and tested a problematic UX
          </p>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div style={{ fontFamily: sans, fontSize: 13, color: C.textLight }}>Lauren Jackson</div>
            <div style={{ fontFamily: mono, fontSize: 11, color: C.textLight, letterSpacing: 1 }}>Scroll ↓</div>
          </div>
        </div>
      </div>

      {/* 01 CONTEXT */}
      <SectionGrid num="01" id="context" refCb={(el) => (sectionRefs.current[1] = el)}>
        <Title>The product</Title>
        <Body>
          Mezo's flagship product was a lending platform where users could open a loan using their Bitcoin as collateral.
          A user received the loan in MUSD, a stablecoin pegged 1:1 to USD. They could only open one loan at a time,
          and loans were over-collateralized, meaning the minimum collateral percentage was 125%.
        </Body>
        <Body>
        The use case: giving crypto holders access to traditional finance tools without selling their digital assets. For example, 
        a user could take out an MUSD loan to fund a mortgage while avoiding capital gains taxes from selling their Bitcoin.
        </Body>
      </SectionGrid>

      {/* 02 PROBLEM */}
      <SectionGrid num="02" id="problem" refCb={(el) => (sectionRefs.current[2] = el)}>
        <Title>Discovering a problem</Title>
        <Body>
          After the launch day spike, loan completions dropped much more steeply than previous feature launches. I spotted this
          first on our financial transactions dashboard, which showed not just fewer loans, but dangerously low collateral percentages (~130%),
          putting users at risk of liquidation.
        </Body>
        <div style={{ marginTop: 24, borderTop: `0.5px solid ${C.borderLight}`, paddingTop: 20 }}>
          <Label>Loans opened per day (post-launch)</Label>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={loansPerDay} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <defs>
                <linearGradient id="loanGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={C.coral} stopOpacity={0.15} />
                  <stop offset="95%" stopColor={C.coral} stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={C.borderLight} />
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: C.textLight, fontFamily: mono }} axisLine={{ stroke: C.borderLight }} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: C.textLight, fontFamily: mono }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="loans" stroke={C.coral} strokeWidth={1.5} fill="url(#loanGrad)" dot={{ r: 2.5, fill: C.coral }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </SectionGrid>

      {/* 03 INVESTIGATION */}
      <SectionGrid num="03" id="investigation" refCb={(el) => (sectionRefs.current[3] = el)}>
        <Title>Investingating further</Title>
        <Body>
          I traced the issue from macro to micro. Using product event data piped into Mixpanel, I built a funnel visualization
          of the lending flow. The collateral percentage input screen was the clear bottleneck: 70% of users who reached
          it dropped off without completing a loan.
        </Body>

        {/* Funnel */}
        <div style={{ marginTop: 24, borderTop: `0.5px solid ${C.borderLight}`, paddingTop: 20, marginBottom: 24 }}>
          <Label>Conversion funnel presented to Product</Label>
          {[
            { step: "Loan open started", users: 100, color: C.accent, barPct: 100 },
            { step: "Input loan amount", users: 85, color: C.accentMid, barPct: 85 },
            { step: "Input collateral amount", users: 25, color: C.coral, barPct: 25, highlight: true, dropoff: "-71%" },
            { step: "Click confirm", users: 22, color: "#8B6B3A", barPct: 22 },
            { step: "Loan opened", users: 20, color: "#6B5A3A", barPct: 20 },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 0" }}>
              <div style={{ fontFamily: sans, fontSize: 12, fontWeight: item.highlight ? 600 : 400, color: item.highlight ? C.coral : C.textMuted, width: 170, flexShrink: 0 }}>{item.step}</div>
              <div style={{ flex: 1, position: "relative", height: 24 }}>
                <div style={{ height: "100%", width: `${item.barPct}%`, background: item.highlight ? C.coral : item.color, opacity: item.highlight ? 0.2 : 0.12 }} />
                <div style={{ position: "absolute", top: 0, left: 0, height: "100%", width: `${item.barPct}%`, border: `0.5px solid ${item.highlight ? C.coral : item.color}40`, display: "flex", alignItems: "center", paddingLeft: 8 }}>
                  <span style={{ fontFamily: mono, fontSize: 11, fontWeight: 500, color: item.highlight ? C.coral : C.text }}>{item.users} users</span>
                </div>
              </div>
              {item.dropoff && <div style={{ fontFamily: mono, fontSize: 10, fontWeight: 500, color: C.coral, background: C.coralLight, padding: "2px 6px", flexShrink: 0 }}>{item.dropoff}</div>}
            </div>
          ))}
          <div style={{ marginTop: 12, borderLeft: `3px solid ${C.coral}`, padding: "10px 14px", background: C.coralLight, borderRadius: 0 }}>
            <div style={{ fontFamily: sans, fontSize: 12, color: C.coral, lineHeight: 1.5 }}>
              The steepest dropoff occurs between "Input loan amount" and "Input collateral amount" — 71% of users who entered a loan amount never completed the collateral step.
            </div>
          </div>
        </div>

        <Body>
          When I dug deeper, I saw that users were entering a value, then either closing the flow or navigating back to
          the screen multiple times (~5 times on average). After watching some session recordings, I hypothesized
          that users were confused by the collateral percentage concept. The screen offered no information on what it was, 
          why users had to over-collateralize, or the equivalent BTC collateral amount.
        </Body>

        {/* Wireframe user flow */}
        <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 0, alignItems: "center" }}>
          <div style={{ width: "100%", maxWidth: 320, padding: "12px 20px", borderLeft: `3px solid ${C.accent}`, background: C.accentLight }}>
            <div style={{ fontFamily: mono, fontSize: 10, color: C.accent, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 2 }}>Started</div>
            <div style={{ fontFamily: sans, fontSize: 13, fontWeight: 500, color: C.accent }}>User clicks "Open loan"</div>
          </div>
          <div style={{ width: 1, height: 20, background: C.border }} />

          <div style={{ width: "100%", maxWidth: 320, border: `0.5px solid ${C.borderLight}`, background: "#fff" }}>
            <div style={{ padding: "8px 16px", borderBottom: `0.5px solid ${C.borderLight}`, background: C.bg }}>
              <div style={{ fontFamily: mono, fontSize: 10, color: C.textLight, letterSpacing: 1 }}>Screen 1</div>
            </div>
            <div style={{ padding: 16 }}>
              <div style={{ fontFamily: sans, fontSize: 13, fontWeight: 500, color: C.text, marginBottom: 10 }}>Enter loan amount</div>
              <div style={{ border: `0.5px solid ${C.border}`, padding: "8px 12px", fontFamily: mono, fontSize: 12, color: C.textLight, background: C.bg }}>5,000 MUSD</div>
              <div style={{ fontFamily: sans, fontSize: 11, color: C.textLight, marginTop: 6 }}>Min: 500 MUSD</div>
            </div>
          </div>
          <div style={{ width: 1, height: 20, background: C.border }} />

          <div style={{ width: "100%", maxWidth: 320, border: `2px solid ${C.coral}`, background: "#fff" }}>
            <div style={{ padding: "8px 16px", borderBottom: `1px solid ${C.coral}30`, background: C.coralLight, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontFamily: mono, fontSize: 10, color: C.coral, letterSpacing: 1 }}>Screen 2 — problem</div>
              <div style={{ fontFamily: mono, fontSize: 10, color: C.coral, fontWeight: 500 }}>70% dropoff</div>
            </div>
            <div style={{ padding: 16 }}>
              <div style={{ fontFamily: sans, fontSize: 13, fontWeight: 500, color: C.text, marginBottom: 10 }}>Enter collateral percentage</div>
              <div style={{ border: `1px solid ${C.coral}60`, padding: "8px 12px", fontFamily: mono, fontSize: 12, color: C.textMuted, background: C.coralLight, display: "flex", justifyContent: "space-between" }}>
                <span>130</span><span style={{ color: C.textLight }}>%</span>
              </div>
              <div style={{ marginTop: 10, padding: "8px 12px", border: `1px dashed ${C.coral}40`, fontFamily: sans, fontSize: 11, color: C.coral, lineHeight: 1.5 }}>
                Users don't know what a collateral percentage is. No equivalent BTC amount shown, or risk indicator.
              </div>
              <div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap" }}>
                <span style={{ fontFamily: mono, fontSize: 10, padding: "3px 8px", background: `${C.coral}12`, color: C.coral }}>~5 back-navigations avg</span>
                <span style={{ fontFamily: mono, fontSize: 10, padding: "3px 8px", background: `${C.coral}12`, color: C.coral }}>Input → close → return pattern</span>
              </div>
            </div>
          </div>
          <div style={{ width: 1, height: 20, background: C.border }} />

          <div style={{ width: "100%", maxWidth: 320, border: `0.5px solid ${C.borderLight}`, background: "#fff", opacity: 0.55 }}>
            <div style={{ padding: "8px 16px", borderBottom: `0.5px solid ${C.borderLight}`, background: C.bg }}>
              <div style={{ fontFamily: mono, fontSize: 10, color: C.textLight, letterSpacing: 1 }}>Screen 3</div>
            </div>
            <div style={{ padding: 16 }}>
              <div style={{ fontFamily: sans, fontSize: 13, fontWeight: 500, color: C.text, marginBottom: 10 }}>Review and confirm</div>
              {[["Wallet", "0x7a3b...f291"], ["Loan amount", "5,000 MUSD"], ["Collateral", "0.48 BTC"]].map(([l, v], i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", fontFamily: sans, fontSize: 12, padding: "3px 0" }}>
                  <span style={{ color: C.textLight }}>{l}</span>
                  <span style={{ fontFamily: mono, color: C.textMuted }}>{v}</span>
                </div>
              ))}
              <div style={{ marginTop: 10, padding: "7px 0", textAlign: "center", background: C.borderLight, fontFamily: sans, fontSize: 12, fontWeight: 500, color: C.textLight }}>Confirm</div>
            </div>
          </div>
          <div style={{ width: 1, height: 20, background: C.border }} />

          <div style={{ width: "100%", maxWidth: 320, padding: "12px 20px", borderLeft: `3px solid ${C.accent}`, background: C.accentLight, opacity: 0.55 }}>
            <div style={{ fontFamily: mono, fontSize: 10, color: C.accent, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 2 }}>Completed</div>
            <div style={{ fontFamily: sans, fontSize: 13, fontWeight: 500, color: C.accent }}>Loan opened</div>
          </div>
        </div>

        <div style={{ marginTop: 20, borderLeft: `3px solid ${C.coral}`, padding: "12px 16px", background: C.coralLight, borderRadius: 0 }}>
          <div style={{ fontFamily: sans, fontSize: 13, color: C.coral, lineHeight: 1.6 }}>
            70% of users dropped off at step 4. Average back-navigations to this screen: ~5 per user.
          </div>
        </div>

        {/* 5 Whys */}
        <div style={{ marginTop: 32 }}>
          <Label>Root cause analysis (5 Whys)</Label>
          <div style={{ borderTop: `0.5px solid ${C.borderLight}` }}>
            {[
              ["Why are fewer loans being opened?", "Users are starting but not completing the flow."],
              ["Why aren't they completing it?", "They're dropping off at the collateral percentage screen."],
              ["Why are they dropping off there?", "They enter a value, then close or navigate back repeatedly."],
              ["Why are they going back repeatedly?", "They don't understand what collateral percentage means."],
              ["Why don't they understand?", "The screen has no explanatory context, just a bare input field."],
            ].map(([q, a], i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "32px 1fr", gap: 0, borderBottom: `0.5px solid ${C.borderLight}`, padding: "12px 0" }}>
                <div style={{ fontFamily: mono, fontSize: 11, color: C.textLight }}>W{i + 1}</div>
                <div>
                  <div style={{ fontFamily: sans, fontSize: 13, fontWeight: 500, color: C.text, marginBottom: 2 }}>{q}</div>
                  <div style={{ fontFamily: sans, fontSize: 13, color: C.textMuted }}>{a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionGrid>

      {/* 04 THE FIX */}
      <SectionGrid num="04" id="fix" refCb={(el) => (sectionRefs.current[4] = el)}>
        <Title>Working together</Title>
        <Body>
          I presented my findings to the Product team using the Mixpanel funnels and session recordings to illustrate the user confusion.
          I proposed adding contextual components to the collateral screen to see if it would improve our conversion rate. 
          Working with Design, we landed on four additions:
        </Body>

        {/* Component cards — grid with 1px gap borders */}
        <div style={{ marginTop: 28, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: C.borderLight }}>
          {[
            { title: "Percentage slider", desc: "With presets (150%, 200%, 250%) so users could select common values without guessing" },
            { title: "Risk ranker", desc: "High / medium / low indicator tied to the collateral percentage, giving immediate feedback" },
            { title: "BTC calculator", desc: "Showed the collateral percentage as an actual BTC amount, making the abstract concrete" },
            { title: "Explanatory tooltip", desc: "Defined over-collateralization in plain language with a link to a longer blog post" },
          ].map((item, i) => (
            <div key={i} style={{ background: "#fff", padding: "16px 18px" }}>
              <div style={{ fontFamily: sans, fontSize: 13, fontWeight: 600, color: C.accent, marginBottom: 4 }}>{item.title}</div>
              <div style={{ fontFamily: sans, fontSize: 12, color: C.textMuted, lineHeight: 1.6 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </SectionGrid>

      {/* 05 RESULTS */}
      <SectionGrid num="05" id="results" refCb={(el) => (sectionRefs.current[5] = el)}>
        <Title>Measuring impact</Title>
        <Body>
          One of my main constraints was that my company didn't have a dedicated A/B testing platform. 
          Although I'd sacrifice rigor for speed, I chose to move forward and designed a pre-post analysis 
          framework.
        </Body>
          <Body>
          I compared 100 unique users from one week before the changes to 100 unique users one week after, 
          using a two-proportion z-test (one-tailed) to evaluate the primary metric. The results were statistically 
          significant, with a 15 percentage point improvement in completion rate.
        </Body>

        <div style={{ marginTop: 20, marginBottom: 28 }}>
          <Label>Constraints and mitigations</Label>
          <div style={{ borderTop: `0.5px solid ${C.borderLight}` }}>
            {[
              ["No A/B testing platform", "Designed a pre-post analysis framework as an alternative"],
              ["Marketing campaigns running", "Asked marketing to hold campaigns steady through both windows"],
              ["Limited time", "Compressed to 1-week observation windows (ideal: 2+ weeks each)"],
              ["Blockchain data quirks", "One wallet = one user assumption; BTC volatility as confounder"],
            ].map(([constraint, solution], i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "170px 1fr", gap: 12, padding: "10px 0", borderBottom: `0.5px solid ${C.borderLight}` }}>
                <div style={{ fontFamily: sans, fontSize: 12, fontWeight: 500, color: C.text }}>{constraint}</div>
                <div style={{ fontFamily: sans, fontSize: 12, color: C.textMuted }}>{solution}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", gap: 32, flexWrap: "wrap", marginTop: 28 }}>
          <Metric label="Completion rate" value="20→35%" sub="+15pp" color={C.accent} />
          <Metric label="Screen dropoff" value="70→48%" sub="-22pp" color={C.blue} />
          <Metric label="Back navs" value="5→2" sub="-60%" color={C.blue} />
          <Metric label="Default rate" value="0.5→0.5%" sub="Stable" color={C.textLight} />
        </div>

        <div style={{ marginTop: 32, borderTop: `0.5px solid ${C.borderLight}`, paddingTop: 20 }}>
          <Label>Pre vs. post comparison</Label>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={prePostData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }} barCategoryGap="25%">
              <CartesianGrid strokeDasharray="3 3" stroke={C.borderLight} />
              <XAxis dataKey="metric" tick={{ fontSize: 10, fill: C.textLight, fontFamily: mono }} axisLine={{ stroke: C.borderLight }} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: C.textLight, fontFamily: mono }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="pre" name="Pre-change" fill={C.borderLight} radius={[2, 2, 0, 0]} />
              <Bar dataKey="post" name="Post-change" fill={C.accent} radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={{ marginTop: 24, borderLeft: `3px solid ${C.accent}`, padding: "16px 20px", background: C.accentLight, borderRadius: 0 }}>
          <Label>Statistical result</Label>
          <div style={{ fontFamily: mono, fontSize: 14, color: C.text, lineHeight: 2 }}>
            z = 2.377 &nbsp;&nbsp;|&nbsp;&nbsp; p = 0.009 (one-tailed) &nbsp;&nbsp;|&nbsp;&nbsp; 95% CI: [5pp, 25pp]
          </div>
          <div style={{ fontFamily: sans, fontSize: 13, color: C.textMuted, marginTop: 8, lineHeight: 1.6 }}>
            The 15 percentage point improvement is statistically significant at α = 0.05. The confidence interval is wide
            due to the small sample, but the entire interval is above zero. Secondary metrics reinforce the primary finding.
          </div>
        </div>
      </SectionGrid>

      {/* 06 IDEAL */}
      <SectionGrid num="06" id="ideal" refCb={(el) => (sectionRefs.current[6] = el)}>
        <Title>With ideal circumstances</Title>
        <Body>
          The pre-post analysis was the right choice given the constraints, but with a proper A/B testing
          platform, more traffic, and more time, here's what I would have designed instead:
        </Body>

        <div style={{ borderTop: `0.5px solid ${C.borderLight}`, marginTop: 20 }}>
          {[
            { param: "Randomization", value: "Wallet-level, 50/50 split via feature flag. Persistent assignment, a user always sees the same variant." },
            { param: "Primary metric", value: "Lending flow completion rate (entered collateral screen → loan opened)" },
            { param: "Secondary", value: "Collateral screen dropoff rate, avg back-navigations per session" },
            { param: "Guardrail", value: "Loan default (liquidation) rate, ensure we're not making it too easy to open risky loans" },
            { param: "MDE", value: "Minimum detectable effect (MDE): 10 percentage points (20% → 30%). Smallest improvement worth shipping." },
            { param: "Power / Alpha", value: "80% power, α = 0.05 (one-tailed)" },
            { param: "Sample size", value: "~230 users per group (460 total), via power analysis" },
            { param: "Runtime", value: "~4.5 weeks at ~100 unique users/week entering the flow" },
          ].map((row, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "110px 1fr", gap: 12, padding: "10px 0", borderBottom: `0.5px solid ${C.borderLight}` }}>
              <div style={{ fontFamily: mono, fontSize: 11, color: C.textLight }}>{row.param}</div>
              <div style={{ fontFamily: sans, fontSize: 13, color: C.textMuted, lineHeight: 1.6 }}>{row.value}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 32 }}>
          <Label>Shortening the runtime: sequential testing</Label>
          <Body>
            A 5-week runtime is long for a startup. To address this, I'd use a sequential testing design with
            O'Brien-Fleming stopping boundaries, checking weekly with progressively relaxed thresholds while
            keeping the overall false positive rate at 5%.
          </Body>
          <div style={{ borderTop: `0.5px solid ${C.borderLight}`, marginTop: 16 }}>
            {[
              { week: "Week 2", users: "~115 total", threshold: "p < 0.003", note: "Very strict, only stop for overwhelming evidence" },
              { week: "Week 3", users: "~230 total", threshold: "p < 0.009", note: "Still conservative" },
              { week: "Week 4", users: "~345 total", threshold: "p < 0.025", note: "Approaching standard threshold" },
              { week: "Week 5", users: "~460 total", threshold: "p < 0.045", note: "Nearly identical to a fixed-horizon test" },
            ].map((row, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "60px 80px auto 1fr", gap: 12, alignItems: "center", padding: "10px 0", borderBottom: `0.5px solid ${C.borderLight}` }}>
                <div style={{ fontFamily: mono, fontSize: 12, fontWeight: 500, color: C.text }}>{row.week}</div>
                <div style={{ fontFamily: mono, fontSize: 11, color: C.textLight }}>{row.users}</div>
                <span style={{
                  fontFamily: mono, fontSize: 11, fontWeight: 500, padding: "3px 8px",
                  background: i === 0 ? `${C.coral}12` : i === 3 ? `${C.accent}12` : `${C.blue}12`,
                  color: i === 0 ? C.coral : i === 3 ? C.accent : C.blue,
                }}>{row.threshold}</span>
                <div style={{ fontFamily: sans, fontSize: 12, color: C.textLight }}>{row.note}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16, borderLeft: `3px solid ${C.accent}`, padding: "10px 14px", background: C.accentLight, borderRadius: 0 }}>
            <div style={{ fontFamily: sans, fontSize: 13, color: C.accent, lineHeight: 1.6 }}>
              Given the actual effect size of 15pp (much larger than our 10pp MDE), we'd likely cross the boundary
              at week 2 or 3, cutting the runtime roughly in half.
            </div>
          </div>
        </div>

        <div style={{ marginTop: 32 }}>
          <Label>Decision criteria</Label>
          <Body>
            If the primary metric shows a significant lift at p {"<"} 0.05 and the guardrail doesn't degrade, ship
            the treatment to all users. If the result is significant but the guardrail degrades, investigate before shipping.
          </Body>
        </div>
      </SectionGrid>

      {/* 07 DISCUSSION */}
      <SectionGrid num="07" id="discussion" refCb={(el) => (sectionRefs.current[7] = el)}>
        <Title>Let's talk</Title>
        <Body>
          This project was a complete product analytics loop: I spotted the signal in the data, investigated the root cause,
          partnered with Product and Design to ship a fix, and measured the outcome.
        </Body>

        <div style={{ display: "flex", flexDirection: "column", gap: 0, marginTop: 20, borderTop: `0.5px solid ${C.borderLight}` }}>
          {[
            { q: "What I'd do differently", a: "Push harder for a proper feature flagging system earlier. The pre-post analysis was defensible but a randomized test would have been more convincing to stakeholders." },
            { q: "What constraints shaped my decisions", a: "Solo data scientist at the org, no engineering support, startup speed requirements." },
            { q: "What I'm most proud of", a: "The full loop, from the scrappy experimentation that unblocked us, to the cross-functional collaboration that shipped the fix, to an honest statistical analysis that acknowledged its own limitations." },
          ].map((item, i) => (
            <div key={i} style={{ padding: "16px 0", borderBottom: `0.5px solid ${C.borderLight}` }}>
              <div style={{ fontFamily: sans, fontSize: 14, fontWeight: 600, color: C.text, marginBottom: 4 }}>{item.q}</div>
              <div style={{ fontFamily: sans, fontSize: 13, color: C.textMuted, lineHeight: 1.7 }}>{item.a}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 60, paddingTop: 32, borderTop: `2px solid ${C.text}` }}>
          <div style={{ fontFamily: sans, fontSize: 24, fontWeight: 600, color: C.text, marginBottom: 6 }}>Thank you</div>
          <div style={{ fontFamily: sans, fontSize: 13, color: C.textLight }}>Lauren Jackson — laurenjackson1028@gmail.com</div>
        </div>
      </SectionGrid>
    </div>
  );
}
