export const globalStyles = `
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600&family=Syne:wght@600;700;800&display=swap');

:root {
  --bg: #0b0f17;
  --s1: #111722;
  --s2: #18202e;
  --s3: #1e2a3c;
  --bd: rgba(255,255,255,0.07);
  --bd2: rgba(255,255,255,0.13);
  --t: #dde4f0;
  --t2: #7d8fa8;
  --t3: #46566a;
  --a: #e8921a;
  --ag: rgba(232,146,26,0.14);
  --abd: rgba(232,146,26,0.35);
  --gr: #2ab86e;
  --grg: rgba(42,184,110,0.12);
  --bl: #3d8fe0;
  --blg: rgba(61,143,224,0.1);
  --rd: #e05050;
  --rdg: rgba(224,80,80,0.1);
  --mono: 'JetBrains Mono', monospace;
  --sans: 'Syne', sans-serif;
  --r6: 6px;
  --r8: 8px;
  --r10: 10px;
}

/* Layout */
.shell { display: grid; grid-template-columns: 235px 1fr 210px; height: 100vh; width: 100vw; background: var(--bg); font-family: var(--mono); color: var(--t); }
.col { display: flex; flex-direction: column; overflow: hidden; }
.bdr { border-right: 1px solid var(--bd); }
.bdl { border-left: 1px solid var(--bd); }

/* Sidebar top */
.sbar-top { padding: 14px 13px 12px; border-bottom: 1px solid var(--bd); }
.logo { display: flex; align-items: center; gap: 9px; margin-bottom: 12px; }
.logo-sq { width: 27px; height: 27px; border-radius: var(--r6); background: var(--ag); border: 1px solid var(--abd); display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; color: var(--a); font-family: var(--sans); box-shadow: 0 0 14px rgba(232,146,26,0.18); flex-shrink: 0; }
.logo-name { font-family: var(--sans); font-size: 13px; font-weight: 700; line-height: 1.2; }
.logo-sub { font-size: 8.5px; color: var(--t3); font-family: var(--mono); margin-top: 1px; }
.nbtn { width: 100%; padding: 7px 11px; border: 1px solid var(--bd2); border-radius: var(--r8); background: transparent; font-family: var(--mono); font-size: 10px; color: var(--t2); cursor: pointer; display: flex; align-items: center; gap: 7px; transition: all .12s; }
.nbtn:hover { background: var(--s2); color: var(--t); border-color: var(--bd2); }

/* Session list */
.slbl { font-size: 8.5px; letter-spacing: 1.1px; color: var(--t3); padding: 10px 13px 5px; text-transform: uppercase; }
.slist { flex: 1; overflow-y: auto; padding: 0 6px 6px; }
.si { padding: 8px 9px; border-radius: var(--r8); cursor: pointer; margin-bottom: 2px; border: 1px solid transparent; transition: all .11s; }
.si:hover { background: var(--s2); border-color: var(--bd); }
.si.act { background: var(--s3); border-color: var(--abd); }
.si-t { font-size: 10.5px; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: flex; align-items: center; gap: 5px; color: var(--t); }
.sdot { width: 5px; height: 5px; border-radius: 50%; background: var(--gr); flex-shrink: 0; box-shadow: 0 0 5px var(--gr); }
.si-m { font-size: 9px; color: var(--t3); margin-top: 2px; padding-left: 10px; }

/* Rate limit panel */
.rlp { padding: 11px 13px; border-top: 1px solid var(--bd); }
.rlt { font-size: 8.5px; letter-spacing: 1px; color: var(--t3); text-transform: uppercase; margin-bottom: 7px; }
.rlr { display: flex; align-items: center; gap: 6px; margin-bottom: 4px; }
.rll { font-size: 9px; color: var(--t3); width: 28px; }
.rltr { flex: 1; height: 3px; background: var(--s3); border-radius: 2px; overflow: hidden; }
.rlf { height: 100%; border-radius: 2px; transition: width .4s; }
.rln { font-size: 9px; color: var(--t3); width: 36px; text-align: right; }

/* Topbar */
.topbar { height: 48px; min-height: 48px; background: var(--s1); border-bottom: 1px solid var(--bd); display: flex; align-items: center; justify-content: space-between; padding: 0 16px; }
.tb-l { display: flex; align-items: center; gap: 9px; min-width: 0; }
.tb-title { font-family: var(--sans); font-size: 13px; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 240px; }
.badge { font-size: 8.5px; padding: 2px 7px; border-radius: 4px; font-family: var(--mono); font-weight: 500; white-space: nowrap; }
.b-act { background: var(--grg); color: var(--gr); border: 1px solid rgba(42,184,110,0.25); }
.b-mod { background: var(--blg); color: var(--bl); border: 1px solid rgba(61,143,224,0.2); }
.tb-r { display: flex; gap: 6px; flex-shrink: 0; }
.ibtn { width: 28px; height: 28px; border-radius: var(--r6); background: transparent; border: 1px solid var(--bd); color: var(--t2); font-size: 12px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all .11s; font-family: var(--mono); }
.ibtn:hover { background: var(--s2); border-color: var(--bd2); color: var(--t); }

/* Messages */
.msgs { flex: 1; overflow-y: auto; padding: 14px; display: flex; flex-direction: column; gap: 8px; }
.mw { display: flex; gap: 9px; animation: fi .2s ease; }
.mw.user { flex-direction: row-reverse; }
@keyframes fi { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }
.av { width: 28px; height: 28px; min-width: 28px; border-radius: var(--r6); display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 700; font-family: var(--sans); margin-top: 2px; border: 1px solid var(--bd); flex-shrink: 0; }
.av-ai { background: linear-gradient(135deg, var(--s3), var(--s1)); border-color: var(--abd); color: var(--a); }
.av-u { background: linear-gradient(135deg, #1a3258, #0e1f3a); border-color: rgba(61,143,224,0.3); color: var(--bl); }
.bc { max-width: 74%; display: flex; flex-direction: column; gap: 3px; }
.mw.user .bc { align-items: flex-end; }
.bub { background: var(--s2); border: 1px solid var(--bd); border-radius: var(--r10); padding: 9px 13px; font-size: 12px; line-height: 1.72; color: var(--t); white-space: pre-wrap; word-break: break-word; }
.bub.ub { background: rgba(61,143,224,0.07); border-color: rgba(61,143,224,0.18); }
.bub.err { background: var(--rdg); border-color: rgba(224,80,80,0.22); color: #f09090; }
.bmeta { display: flex; align-items: center; gap: 7px; font-size: 9px; color: var(--t3); padding: 0 3px; flex-wrap: wrap; }
.mw.user .bmeta { flex-direction: row-reverse; }
.tbadge { background: var(--ag); color: var(--a); border: 1px solid var(--abd); padding: 1px 6px; border-radius: 3px; font-size: 8.5px; }
.tpill { background: var(--s2); border: 1px solid var(--bd); padding: 1px 7px; border-radius: 3px; font-size: 8.5px; color: var(--t3); display: inline-flex; align-items: center; gap: 4px; }
.tpd { width: 4px; height: 4px; border-radius: 50%; background: var(--gr); }
.model-pill { background: var(--blg); border: 1px solid rgba(61,143,224,0.2); color: var(--bl); padding: 1px 6px; border-radius: 3px; font-size: 8.5px; }

/* Pending dots */
.dots { display: flex; gap: 4px; padding: 3px 0; }
.d { width: 6px; height: 6px; border-radius: 50%; background: var(--ag); border: 1px solid var(--abd); animation: dp 1.1s ease-in-out infinite; }
.d:nth-child(2) { animation-delay: .18s; }
.d:nth-child(3) { animation-delay: .36s; }
@keyframes dp { 0%,80%,100% { transform: scale(.8); opacity: .4; } 40% { transform: scale(1.2); opacity: 1; background: var(--a); } }
.pline { font-size: 9.5px; color: var(--a); display: flex; align-items: center; gap: 5px; margin-top: 3px; }
.pdot { width: 4px; height: 4px; border-radius: 50%; background: var(--a); animation: bk 1s infinite; }
@keyframes bk { 0%,100% { opacity: 1; } 50% { opacity: .2; } }

/* Empty state */
.empty { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px; padding: 40px; text-align: center; }
.ei { font-size: 36px; opacity: .2; }
.eh { font-family: var(--sans); font-size: 15px; font-weight: 700; color: var(--t2); }
.ep { font-size: 10px; color: var(--t3); line-height: 1.9; }
.chip { display: inline-block; background: var(--s2); border: 1px solid var(--bd2); padding: 2px 9px; border-radius: 4px; font-size: 9.5px; color: var(--a); margin: 2px; }

/* Input area */
.ia { padding: 11px 13px 14px; background: var(--s1); border-top: 1px solid var(--bd); }
.iw { display: flex; gap: 8px; align-items: flex-end; background: var(--s2); border: 1px solid var(--bd2); border-radius: var(--r10); padding: 9px 8px 9px 13px; transition: border-color .12s; }
.iw:focus-within { border-color: var(--abd); }
.mta { flex: 1; background: transparent; border: none; outline: none; color: var(--t); font-family: var(--mono); font-size: 12px; resize: none; min-height: 20px; max-height: 90px; line-height: 1.55; }
.mta::placeholder { color: var(--t3); }
.sbtn { width: 32px; height: 32px; border-radius: 7px; background: var(--ag); border: 1px solid var(--abd); cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 15px; color: var(--a); flex-shrink: 0; transition: all .12s; font-weight: 600; }
.sbtn:hover:not(:disabled) { background: rgba(232,146,26,0.25); transform: scale(1.05); }
.sbtn:disabled { opacity: .3; cursor: not-allowed; transform: none; }
.imeta { display: flex; justify-content: space-between; margin-top: 5px; padding: 0 2px; }
.imt { font-size: 9px; color: var(--t3); }

/* Analytics panel */
.ap { overflow-y: auto; }
.asec { padding: 11px 13px; border-bottom: 1px solid var(--bd); }
.ah { font-size: 8.5px; letter-spacing: 1.1px; color: var(--t3); text-transform: uppercase; margin-bottom: 8px; }
.sv { font-family: var(--sans); font-size: 20px; font-weight: 700; color: var(--t); }
.sl { font-size: 9px; color: var(--t3); margin-bottom: 2px; }
.ss { font-size: 9px; color: var(--gr); margin-top: 1px; }
.arow { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; }
.arl { font-size: 9.5px; color: var(--t2); }
.sb-ok { background: var(--grg); color: var(--gr); border: 1px solid rgba(42,184,110,0.25); padding: 1px 6px; border-radius: 3px; font-size: 8.5px; }
.sb-err { background: var(--rdg); color: var(--rd); border: 1px solid rgba(224,80,80,0.25); padding: 1px 6px; border-radius: 3px; font-size: 8.5px; }

/* Log area */
.lga { flex: 1; padding: 10px 13px; overflow-y: auto; }
.le { display: flex; gap: 5px; margin-bottom: 5px; font-size: 8.5px; animation: fi .2s ease; }
.lm { font-weight: 600; width: 30px; flex-shrink: 0; }
.m-post { color: var(--a); }
.m-get { color: var(--gr); }
.m-del { color: var(--rd); }
.lp { flex: 1; color: var(--t3); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.lc2 { color: var(--gr); }
.lc4 { color: var(--rd); }
.lc5 { color: var(--rd); }

/* System prompt */
.systa { width: 100%; background: var(--s2); border: 1px solid var(--bd); border-radius: var(--r6); color: var(--t2); font-family: var(--mono); font-size: 9.5px; padding: 7px 9px; resize: none; outline: none; line-height: 1.55; transition: border-color .12s; }
.systa:focus { border-color: var(--abd); color: var(--t); }

/* Setup banner */
.setup-banner { background: rgba(232,146,26,0.07); border: 1px solid var(--abd); border-radius: var(--r8); padding: 10px 14px; margin-bottom: 12px; font-size: 10.5px; color: var(--a); line-height: 1.6; }
.setup-banner code { background: var(--s3); padding: 1px 5px; border-radius: 3px; font-size: 10px; color: var(--t); }

/* Responsive — hide analytics on small screens */
@media (max-width: 900px) {
  .shell { grid-template-columns: 200px 1fr; }
  .an-col { display: none; }
}
@media (max-width: 600px) {
  .shell { grid-template-columns: 1fr; }
  .sb-col { display: none; }
}
`
