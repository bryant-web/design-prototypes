import { useCallback, useEffect, useRef, useState } from "react";
import { DECK, DECK_TITLE, type Card } from "./deck";
import powerupIcon from "./assets/powerup-flashcards.svg";
import clearedIllustration from "./assets/deck-cleared-illustration.png";

/* ── Icons — exported from the SchoolAI library (1px stroke) ─────── */

const S = { fill: "none", stroke: "currentColor", strokeWidth: 1, strokeLinecap: "round", strokeLinejoin: "round" } as const;

const IconX = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" {...S}><path d="M12 4 4 12M4 4l8 8" /></svg>
);
const IconExpand = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" {...S}><path d="M9.5 2.5h4v4M6.5 13.5h-4v-4M13.5 2.5 9 7M2.5 13.5 7 9" /></svg>
);
const IconKebab = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><circle cx="8" cy="3.2" r="1.2" /><circle cx="8" cy="8" r="1.2" /><circle cx="8" cy="12.8" r="1.2" /></svg>
);
/* settings-04 */
const IconEdit = () => (
  <svg width="16" height="16" viewBox="0 0 20 20" {...S}>
    <path d="M2.5 6.66799L12.5001 6.66799M12.5001 6.66799C12.5001 8.04872 13.6194 9.16802 15.0001 9.16802C16.3808 9.16802 17.5001 8.04872 17.5001 6.66799C17.5001 5.28727 16.3808 4.16797 15.0001 4.16797C13.6194 4.16797 12.5001 5.28727 12.5001 6.66799ZM7.50005 13.3347L17.5001 13.3347M7.50005 13.3347C7.50005 14.7155 6.38075 15.8347 5.00002 15.8347C3.6193 15.8347 2.5 14.7155 2.5 13.3347C2.5 11.954 3.6193 10.8347 5.00002 10.8347C6.38075 10.8347 7.50005 11.954 7.50005 13.3347Z" />
  </svg>
);
/* volume-max */
const IconSpeaker = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" {...S}>
    <path d="M13.1659 3.33459C14.1108 4.64808 14.6673 6.25968 14.6673 8.00125C14.6673 9.74283 14.1108 11.3544 13.1659 12.6679M10.4975 5.33459C11.0248 6.09048 11.334 7.00975 11.334 8.00125C11.334 8.99275 11.0248 9.91203 10.4975 10.6679M6.42353 2.91171L4.31307 5.02217C4.19777 5.13747 4.14012 5.19512 4.07284 5.23635C4.01319 5.2729 3.94816 5.29984 3.88014 5.31617C3.80341 5.33459 3.72188 5.33459 3.55882 5.33459H2.40065C2.02728 5.33459 1.8406 5.33459 1.69799 5.40725C1.57255 5.47116 1.47056 5.57315 1.40665 5.69859C1.33398 5.8412 1.33398 6.02788 1.33398 6.40125V9.60125C1.33398 9.97462 1.33398 10.1613 1.40665 10.3039C1.47056 10.4294 1.57255 10.5313 1.69799 10.5953C1.8406 10.6679 2.02728 10.6679 2.40065 10.6679H3.55882C3.72188 10.6679 3.80341 10.6679 3.88014 10.6863C3.94816 10.7027 4.01319 10.7296 4.07284 10.7662C4.14012 10.8074 4.19777 10.865 4.31307 10.9803L6.42353 13.0908C6.70911 13.3764 6.8519 13.5192 6.9745 13.5288C7.08087 13.5372 7.18482 13.4941 7.25412 13.413C7.33398 13.3195 7.33398 13.1175 7.33398 12.7137V3.28883C7.33398 2.88496 7.33398 2.68302 7.25412 2.58951C7.18482 2.50837 7.08087 2.46531 6.9745 2.47369C6.8519 2.48333 6.70911 2.62613 6.42353 2.91171Z" />
  </svg>
);
/* refresh-ccw-01 */
const IconRestart = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" {...S}>
    <path d="M1.33398 6.66667C1.33398 6.66667 2.67064 4.84548 3.75654 3.75883C4.84244 2.67218 6.34305 2 8.00065 2C11.3144 2 14.0007 4.68629 14.0007 8C14.0007 11.3137 11.3144 14 8.00065 14C5.26526 14 2.95739 12.1695 2.23516 9.66667M5.33398 6.66667H1.33398V2.66667" />
  </svg>
);
/* edit-mode icons — exported from the Figma library */
const SQUARE = "M6.50004 17.5002H13.5001C14.9003 17.5002 15.6003 17.5002 16.1351 17.2277C16.6055 16.988 16.988 16.6055 17.2277 16.1351C17.5001 15.6003 17.5001 14.9003 17.5001 13.5001V6.50006C17.5001 5.09992 17.5001 4.39984 17.2277 3.86506C16.988 3.39465 16.6055 3.01219 16.1351 2.77251C15.6003 2.50002 14.9003 2.50002 13.5001 2.50002H6.50004C5.09989 2.50002 4.39982 2.50002 3.86504 2.77251C3.39463 3.01219 3.01217 3.39465 2.77249 3.86506C2.5 4.39984 2.5 5.09992 2.5 6.50006V13.5001C2.5 14.9003 2.5 15.6003 2.77249 16.1351C3.01217 16.6055 3.39463 16.988 3.86504 17.2277C4.39982 17.5002 5.09989 17.5002 6.50004 17.5002Z";
const IconSquareUp = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" {...S}><path d={`M6.66671 10.0001L10.0001 6.66673L13.3334 10.0001M10.0001 6.66673V13.3335M${SQUARE.slice(1)}`} /></svg>
);
const IconSquareDown = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" {...S}><path d={`M13.3334 10.0001L10.0001 13.3335L6.66671 10.0001M10.0001 13.3335V6.66673M${SQUARE.slice(1)}`} /></svg>
);
const IconSquarePlus = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" {...S}><path d={`M10.0001 6.66673V13.3335M6.66671 10.0001H13.3334M${SQUARE.slice(1)}`} /></svg>
);
const IconTrash = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" {...S}><path d="M13.3334 5.00005V4.33338C13.3334 3.39995 13.3334 2.93323 13.1518 2.57671C12.992 2.2631 12.737 2.00813 12.4234 1.84834C12.0669 1.66668 11.6002 1.66668 10.6667 1.66668H9.3334C8.39997 1.66668 7.93325 1.66668 7.57673 1.84834C7.26313 2.00813 7.00816 2.2631 6.84836 2.57671C6.66671 2.93323 6.66671 3.39995 6.66671 4.33338V5.00005M8.33339 9.58343V13.7501M11.6668 9.58343V13.7501M2.5 5.00005H17.5001M15.8335 5.00005V14.3335C15.8335 15.7336 15.8335 16.4337 15.561 16.9685C15.3213 17.4389 14.9388 17.8213 14.4684 18.061C13.9336 18.3335 13.2336 18.3335 11.8334 18.3335H8.16672C6.76658 18.3335 6.0665 18.3335 5.53172 18.061C5.06131 17.8213 4.67885 17.4389 4.43917 16.9685C4.16668 16.4337 4.16668 15.7336 4.16668 14.3335V5.00005" /></svg>
);
const IconSparkle = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" {...S}><path d="M1.33325 13H2.99992H4.66659M4.66659 13L2.99992 13.3333L1.33325 13L2.99992 12.6667L4.66659 13ZM2.99992 14.6667L3.33325 13L2.99992 11.3333L2.66659 13L2.99992 14.6667ZM2.99992 4.66667L2.66659 3L2.99992 1.33334L3.33325 3L2.99992 4.66667ZM1.33325 3L2.99992 3.33334L4.66659 3L2.99992 2.66667L1.33325 3ZM8.66658 2L7.51047 5.00591C7.32246 5.49473 7.22845 5.73914 7.08227 5.94473C6.95271 6.12693 6.79352 6.28613 6.61131 6.41569C6.40572 6.56187 6.16131 6.65588 5.67249 6.84388L2.66659 8L5.67249 9.15612C6.16131 9.34413 6.40572 9.43813 6.61131 9.58432C6.79352 9.71388 6.95271 9.87307 7.08227 10.0553C7.22845 10.2609 7.32246 10.5053 7.51047 10.9941L8.66659 14L9.8227 10.9941C10.0107 10.5053 10.1047 10.2609 10.2509 10.0553C10.3805 9.87307 10.5397 9.71388 10.7219 9.58432C10.9274 9.43813 11.1719 9.34413 11.6607 9.15612L14.6666 8L11.6607 6.84388C11.1719 6.65588 10.9274 6.56187 10.7219 6.41569C10.5397 6.28613 10.3805 6.12693 10.2509 5.94473C10.1047 5.73914 10.0107 5.49473 9.8227 5.00591L8.66658 2Z" /></svg>
);

/* ── Confetti — ported from Bryant's onboarding confetti artifact ──
   Canvas physics sim: 400 rects burst upward from a center column,
   gravity pulls them down, each spins and fades out over its life. */

const CONFETTI_CONFIG = {
  count: 400,
  gravity: 0.14,
  duration: 800, // ms — spawn window
  fieldWidthPct: 16,
  fieldHeightPct: 100,
  colors: ["#F9A090", "#FF7096", "#7EC8E3", "#3357A8", "#EDECEA", "#2DC4E0"],
};

function Confetti() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const parent = canvas.parentElement as HTMLElement;
    const dpr = window.devicePixelRatio || 1;
    const W = parent.clientWidth;
    const H = parent.clientHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);

    const C = CONFETTI_CONFIG;
    const rand = (a: number, b: number) => a + Math.random() * (b - a);
    const speedScale = 1;
    const cx = W / 2;
    const cy = H / 2;
    const halfW = (W * C.fieldWidthPct) / 100 / 2;
    const halfH = (H * C.fieldHeightPct) / 100 / 2;

    const particles = Array.from({ length: C.count }, () => ({
      birth: rand(0, C.duration),
      x: cx + rand(-halfW, halfW),
      y: cy + rand(-halfH, halfH),
      vx: rand(-7, 7) * speedScale,
      vy: rand(-14, -3) * speedScale,
      w: rand(10, 22),
      h: rand(7, 16),
      rot: rand(0, Math.PI * 2),
      rotV: rand(-0.07, 0.07),
      life: 0,
      maxLife: Math.floor(rand(120, 220)),
      color: C.colors[Math.floor(Math.random() * C.colors.length)],
    }));

    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      ctx.clearRect(0, 0, W, H);
      let alive = false;
      for (const p of particles) {
        if (elapsed < p.birth || p.life >= p.maxLife) continue;
        alive = true;
        p.vy += C.gravity * speedScale;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.rotV;
        p.life++;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = Math.max(0, 1 - p.life / p.maxLife);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }
      if (alive || elapsed < C.duration) raf = requestAnimationFrame(tick);
      else ctx.clearRect(0, 0, W, H);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return <canvas ref={ref} className="confetti-canvas" aria-hidden="true" />;
}

/* ── Speech (nice-to-have; silently no-ops if unsupported) ───────── */

function speak(text: string, lang: string) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang;
  window.speechSynthesis.speak(u);
}

/* ── Session state ────────────────────────────────────────────────
   One-session loop: rate every card, missed cards form the next
   round, repeat until the deck is cleared (in-session Leitner). */

type Phase = "study" | "summary" | "cleared" | "closed";
type Exit = "left" | "right" | null;

export default function App() {
  const [deck, setDeck] = useState<Card[]>(DECK);
  const [phase, setPhase] = useState<Phase>("study");
  const [round, setRound] = useState(1);
  const [queue, setQueue] = useState<Card[]>(DECK);
  const [pos, setPos] = useState(0);
  const [missed, setMissed] = useState<Card[]>([]);
  const [revealed, setRevealed] = useState(false);
  const [exit, setExit] = useState<Exit>(null);
  const exitTimer = useRef<number | undefined>(undefined);

  const card = queue[pos];
  const isReview = round > 1;
  const knewCount = queue.length - missed.length;

  const rate = useCallback(
    (gotIt: boolean) => {
      if (phase !== "study" || !revealed || exit) return;
      const nowMissed = gotIt ? missed : [...missed, card];
      setMissed(nowMissed);
      setExit(gotIt ? "right" : "left");
      exitTimer.current = window.setTimeout(() => {
        setExit(null);
        setRevealed(false);
        if (pos + 1 < queue.length) {
          setPos(pos + 1);
        } else if (nowMissed.length === 0) {
          setPhase("cleared");
        } else {
          setPhase("summary");
        }
      }, 430);
    },
    [phase, revealed, exit, missed, card, pos, queue.length]
  );

  const reviewMissed = () => {
    setQueue(missed);
    setMissed([]);
    setPos(0);
    setRound(round + 1);
    setRevealed(false);
    setPhase("study");
  };

  const restart = (d: Card[] = deck) => {
    window.clearTimeout(exitTimer.current);
    setQueue(d);
    setMissed([]);
    setPos(0);
    setRound(1);
    setRevealed(false);
    setExit(null);
    setPhase("study");
  };

  /* ── Edit mode ── */
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<Card[]>([]);
  const nextId = useRef(100);
  const openEdit = () => {
    setDraft(deck.map((c) => ({ ...c })));
    setEditing(true);
  };
  const cancelEdit = () => setEditing(false);
  const doneEdit = () => {
    const cleaned = draft
      .map((c) => ({ ...c, front: c.front.trim(), back: c.back.trim() }))
      .filter((c) => c.front || c.back);
    const next = cleaned.length ? cleaned : deck;
    setDeck(next);
    setEditing(false);
    restart(next);
  };
  const setSide = (i: number, side: "front" | "back", value: string) =>
    setDraft((d) => d.map((c, j) => (j === i ? { ...c, [side]: value } : c)));
  const move = (i: number, dir: -1 | 1) =>
    setDraft((d) => {
      const j = i + dir;
      if (j < 0 || j >= d.length) return d;
      const copy = [...d];
      [copy[i], copy[j]] = [copy[j], copy[i]];
      return copy;
    });
  const insertAt = (i: number) =>
    setDraft((d) => {
      const copy = [...d];
      copy.splice(i, 0, { id: ++nextId.current, front: "", back: "" });
      return copy;
    });
  const removeAt = (i: number) =>
    setDraft((d) => (d.length > 1 ? d.filter((_, j) => j !== i) : d));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (editing) return;
      if (e.key === " " || e.key === "Enter") {
        if (phase === "study" && !revealed) {
          e.preventDefault();
          setRevealed(true);
        }
      } else if (e.key === "1" && revealed) rate(false);
      else if (e.key === "2" && revealed) rate(true);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, revealed, rate, editing]);

  if (phase === "closed") {
    return (
      <div className="stage">
        <div className="closed-state">
          <p className="end-sub">Flashcards closed</p>
          <button className="btn btn-outline" onClick={() => restart()}>Reopen flashcards</button>
        </div>
      </div>
    );
  }

  return (
    <div className="stage">
      <main className="panel">
        <header className="nav">
          <button className="btn btn-icon" aria-label="Close" onClick={() => setPhase("closed")}><IconX /></button>
          <div className="nav-title">
            <img className="powerup-icon" src={powerupIcon} width={24} height={24} alt="" />
            <span>{DECK_TITLE}</span>
          </div>
          <div className="nav-spacer" />
          <button className="btn btn-primary btn-sm" disabled={editing}>Make it a Space</button>
          <button className="btn btn-icon" aria-label="Expand"><IconExpand /></button>
          <button className="btn btn-icon" aria-label="More options"><IconKebab /></button>
        </header>

        <div className="deck-head">
          {!editing && (
            <div className="deck-tools">
              <button className="btn btn-ghost btn-sm" onClick={openEdit}><IconEdit /> Edit Flashcards</button>
            </div>
          )}
          <h1 className="deck-title">{DECK_TITLE}</h1>
        </div>

        {editing && (
          <section className="edit" aria-label="Edit flashcards">
            <div className="edit-list">
              {draft.map((c, i) => (
                <div className="edit-row" key={c.id}>
                  <div className="edit-card">
                    <div className="edit-card-head">
                      <span className="edit-num">{i + 1}.</span>
                      <button className="btn btn-outline btn-sm"><IconSparkle /> Regenerate</button>
                    </div>
                    <label className="field">
                      <span>Front</span>
                      <input value={c.front} placeholder="Term or prompt" onChange={(e) => setSide(i, "front", e.target.value)} />
                    </label>
                    <label className="field">
                      <span>Back</span>
                      <input value={c.back} placeholder="Answer" onChange={(e) => setSide(i, "back", e.target.value)} />
                    </label>
                  </div>
                  <div className="edit-tools">
                    <button className="tool-btn" aria-label="Move up" disabled={i === 0} onClick={() => move(i, -1)}><IconSquareUp /></button>
                    <button className="tool-btn" aria-label="Move down" disabled={i === draft.length - 1} onClick={() => move(i, 1)}><IconSquareDown /></button>
                    <button className="tool-btn" aria-label="Add card below" onClick={() => insertAt(i + 1)}><IconSquarePlus /></button>
                    <button className="tool-btn" aria-label="Delete card" disabled={draft.length === 1} onClick={() => removeAt(i)}><IconTrash /></button>
                  </div>
                </div>
              ))}
              <button className="btn btn-outline add-card" onClick={() => insertAt(draft.length)}><IconSquarePlus /> Add Card</button>
            </div>
            <footer className="edit-footer">
              <button className="btn btn-outline" onClick={cancelEdit}>Cancel</button>
              <button className="btn btn-primary" onClick={doneEdit}>Done</button>
            </footer>
          </section>
        )}

        {!editing && phase === "study" && (
          <section className="study" aria-label="Study session">
            <div className="progress-row">
              <div />
              <div className="progress">
                <div className="progress-label">
                  {isReview && <span className="badge badge-amber">Reviewing missed</span>}
                  <span>{pos + 1} of {queue.length}</span>
                </div>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: `${((pos + 1) / queue.length) * 100}%` }} />
                </div>
              </div>
              <div className="progress-side">
                <button className="btn btn-ghost btn-sm btn-quiet" onClick={() => restart()}><IconRestart /> Restart</button>
              </div>
            </div>

            <div className="card-zone">
              <div key={`${round}-${card.id}`} className={`card-slot enter ${revealed ? "flipped" : ""} ${exit ? `exit-${exit}` : ""}`}>
                <div className={`card-inner ${revealed ? "revealed" : ""}`}>
                  {/* front — recall first */}
                  <div className="face face-front">
                    <div className="face-hint" />
                    <div className="face-body">
                      <span className={`term ${card.front.length > 16 ? "long" : ""}`}>{card.front}</span>
                      <button className="speak" aria-label="Listen" onClick={(e) => { e.stopPropagation(); speak(card.front, "es-ES"); }}>
                        <IconSpeaker />
                      </button>
                    </div>
                    <div className="face-foot">
                      <button className="btn btn-ghost" onClick={() => setRevealed(true)}>Show answer</button>
                    </div>
                  </div>
                  {/* back — self-assessment */}
                  <div className="face face-back">
                    <div className="face-hint">{card.front}</div>
                    <div className="face-body">
                      <span className={`term ${card.back.length > 16 ? "long" : ""}`}>{card.back}</span>
                      <button className="speak" aria-label="Listen" onClick={(e) => { e.stopPropagation(); speak(card.back, "en-US"); }}>
                        <IconSpeaker />
                      </button>
                    </div>
                    {revealed && (
                      <div className="face-foot">
                        <button className="btn btn-outline rating-in" onClick={() => rate(false)}>Still learning</button>
                        <button className="btn btn-primary rating-in" onClick={() => rate(true)}>Got it</button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="kbd-hints" aria-hidden="true">
              {!revealed ? (
                <span><kbd>Space</kbd>Show answer</span>
              ) : (
                <>
                  <span><kbd>1</kbd>Still learning</span>
                  <span><kbd>2</kbd>Got it</span>
                </>
              )}
            </div>
          </section>
        )}

        {!editing && phase === "summary" && (
          <section className="end-state" aria-label="Round summary">
            <div className="end-body">
              <h2 className="end-title">You knew {knewCount} of {queue.length}</h2>
              <div className="piles">
                <span className="badge badge-amber badge-md">{missed.length} still learning</span>
                <span className="badge badge-green badge-md">{knewCount} correct</span>
              </div>
            </div>
            <div className="end-actions-row">
              <button className="btn btn-outline" onClick={() => restart()}>Restart deck</button>
              <button className="btn btn-primary" onClick={reviewMissed}>Keep practicing</button>
            </div>
          </section>
        )}

        {!editing && phase === "cleared" && (
          <section className="end-state" aria-label="Deck cleared">
            <Confetti />
            <div className="end-body">
              <img className="cleared-illustration" src={clearedIllustration} width={128} height={128} alt="" />
              <h2 className="end-title">All {deck.length} down. Nice work.</h2>
              <p className="end-sub">You've got every card in this deck.</p>
            </div>
            <div className="end-actions-row">
              <button className="btn btn-outline" onClick={() => restart()}>Restart deck</button>
              <button className="btn btn-primary" onClick={() => setPhase("closed")}>Finished</button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
