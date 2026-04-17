import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "concept-sheet-projects";

const today = () => new Date().toISOString().split("T")[0];

const defaultProject = () => ({
  id: Date.now().toString(),
  name: "新規プロジェクト",
  createdAt: today(),
  updatedAt: today(),
  data: {
    projectName: "",
    clientName: "",
    personInCharge: "",
    currentUrl: "",
    projectType: [],
    purpose: "",
    kgi: "",
    kpi: "",
    mainTarget: "",
    subTarget: "",
    inflow: [],
    conceptWords: "",
    tone: [],
    referenceUrls: "",
    mainColor: "",
    subColor: "",
    fontImage: "",
    mediaType: [],
    ngItems: "",
    siteStructure: "",
    functions: [],
    devices: [],
    cms: [],
    dateRequirements: "",
    dateDesign: "",
    dateLaunch: "",
    budget: "",
    paymentTerms: "",
    notes: "",
  },
});

const CHECKBOX_OPTIONS = {
  projectType: ["新規制作", "リニューアル", "LP制作", "ECサイト", "コーポレート", "メディア", "その他"],
  inflow: ["検索（SEO）", "SNS", "広告", "口コミ・紹介", "メルマガ", "直接アクセス", "他媒体"],
  tone: ["プロフェッショナル", "フレンドリー", "クール・スタイリッシュ", "ナチュラル・温かい", "ポップ・カジュアル", "高級感・上品"],
  mediaType: ["写真", "イラスト", "アイコン", "動画"],
  functions: ["お問い合わせフォーム", "ブログ／CMS", "多言語対応", "EC・決済", "会員登録・ログイン", "予約システム", "SNS連携", "アクセス解析", "チャット", "地図埋め込み"],
  devices: ["PC", "スマートフォン", "タブレット", "レスポンシブ対応必須"],
  cms: ["WordPress", "Shopify", "Wix", "Next.js等", "静的HTML", "未定"],
};

function CheckboxGroup({ field, options, value = [], onChange }) {
  const toggle = (opt) => {
    const next = value.includes(opt) ? value.filter((v) => v !== opt) : [...value, opt];
    onChange(field, next);
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 14px", padding: "4px 0" }}>
      {options.map((opt) => (
        <label
          key={opt}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: 12,
            cursor: "pointer",
            userSelect: "none",
            lineHeight: 1.4,
          }}
        >
          <input
            type="checkbox"
            checked={value.includes(opt)}
            onChange={() => toggle(opt)}
            style={{ width: 15, height: 15, accentColor: "#1a1a1a", cursor: "pointer", flexShrink: 0 }}
          />
          <span>{opt}</span>
        </label>
      ))}
    </div>
  );
}

function Field({ label, children, span = 1 }) {
  return (
    <tr>
      <th
        style={{
          background: "#f5f5f3",
          fontWeight: 500,
          fontSize: 11,
          color: "#666",
          padding: "8px 10px",
          whiteSpace: "nowrap",
          width: 1,
          border: "0.5px solid #ddd",
          verticalAlign: "top",
          lineHeight: 1.5,
        }}
      >
        {label}
      </th>
      <td colSpan={span} style={{ border: "0.5px solid #ddd", padding: "7px 8px", verticalAlign: "top" }}>
        {children}
      </td>
    </tr>
  );
}

function SectionHeader({ number, title }) {
  return (
    <tr>
      <td
        colSpan={4}
        style={{
          background: "#1a1a1a",
          color: "#fff",
          fontSize: 11,
          fontWeight: 500,
          padding: "7px 10px",
          letterSpacing: "0.06em",
          border: "0.5px solid #1a1a1a",
        }}
      >
        <span style={{ opacity: 0.4, marginRight: 8, fontFamily: "monospace" }}>{number}</span>
        {title}
      </td>
    </tr>
  );
}

function TextInput({ value, onChange, placeholder, multiline = false, rows = 1 }) {
  const style = {
    width: "100%",
    border: "none",
    outline: "none",
    background: "transparent",
    fontSize: 12,
    fontFamily: "inherit",
    color: "#1a1a1a",
    resize: "vertical",
    lineHeight: 1.6,
    padding: 0,
    minHeight: rows > 1 ? rows * 20 : "auto",
  };

  if (multiline) {
    return <textarea value={value} onChange={onChange} placeholder={placeholder} style={style} rows={rows} />;
  }

  return <input type="text" value={value} onChange={onChange} placeholder={placeholder} style={{ ...style, display: "block" }} />;
}

function ConceptSheetForm({ data, onChange }) {
  const set = (field) => (e) => onChange(field, e.target.value);
  const setCheck = (field, val) => onChange(field, val);

  return (
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
      <SectionHeader number="01" title="プロジェクト基本情報" />
      <Field label="プロジェクト名">
        <TextInput value={data.projectName} onChange={set("projectName")} placeholder="例：コーポレートサイトリニューアル" />
      </Field>
      <tr>
        <th style={{ background: "#f5f5f3", fontWeight: 500, fontSize: 11, color: "#666", padding: "8px 10px", whiteSpace: "nowrap", width: 1, border: "0.5px solid #ddd", verticalAlign: "top" }}>クライアント名</th>
        <td style={{ border: "0.5px solid #ddd", padding: "7px 8px", verticalAlign: "top", width: "35%" }}>
          <TextInput value={data.clientName} onChange={set("clientName")} placeholder="会社名・個人名" />
        </td>
        <th style={{ background: "#f5f5f3", fontWeight: 500, fontSize: 11, color: "#666", padding: "8px 10px", whiteSpace: "nowrap", border: "0.5px solid #ddd", verticalAlign: "top" }}>担当者</th>
        <td style={{ border: "0.5px solid #ddd", padding: "7px 8px", verticalAlign: "top" }}>
          <TextInput value={data.personInCharge} onChange={set("personInCharge")} placeholder="氏名" />
        </td>
      </tr>
      <Field label="現行URL">
        <TextInput value={data.currentUrl} onChange={set("currentUrl")} placeholder="https://" />
      </Field>
      <Field label="案件種別">
        <CheckboxGroup field="projectType" options={CHECKBOX_OPTIONS.projectType} value={data.projectType} onChange={setCheck} />
      </Field>

      <SectionHeader number="02" title="目的・ゴール設定" />
      <Field label="サイトの目的">
        <TextInput value={data.purpose} onChange={set("purpose")} placeholder="このサイトを作る目的・解決したい課題を記述してください" multiline rows={3} />
      </Field>
      <Field label="KGI（最終目標）">
        <TextInput value={data.kgi} onChange={set("kgi")} placeholder="例：問い合わせ数を月30件に増やす" />
      </Field>
      <Field label="KPI（指標）">
        <TextInput value={data.kpi} onChange={set("kpi")} placeholder="例：月間PV 10,000　直帰率 60%以下　CVR 3%" />
      </Field>

      <SectionHeader number="03" title="ターゲットユーザー" />
      <Field label={<>メイン<br />ターゲット</>}>
        <TextInput value={data.mainTarget} onChange={set("mainTarget")} placeholder="年齢・性別・職業・ライフスタイル・課題感など具体的なペルソナを記述" multiline rows={2} />
      </Field>
      <Field label="サブターゲット">
        <TextInput value={data.subTarget} onChange={set("subTarget")} placeholder="補助的なターゲット層（任意）" />
      </Field>
      <Field label="主な流入経路">
        <CheckboxGroup field="inflow" options={CHECKBOX_OPTIONS.inflow} value={data.inflow} onChange={setCheck} />
      </Field>

      <SectionHeader number="04" title="コンセプト・世界観" />
      <Field label={<>コンセプト<br />ワード</>}>
        <TextInput value={data.conceptWords} onChange={set("conceptWords")} placeholder="例：信頼・革新・温かみ（3〜5語）" />
      </Field>
      <Field label={<>トーン＆<br />マナー</>}>
        <CheckboxGroup field="tone" options={CHECKBOX_OPTIONS.tone} value={data.tone} onChange={setCheck} />
      </Field>
      <Field label="参考サイト">
        <TextInput value={data.referenceUrls} onChange={set("referenceUrls")} placeholder="URL1　URL2　URL3（良いと思う点も記載）" />
      </Field>

      <SectionHeader number="05" title="デザイン方針" />
      <tr>
        <th style={{ background: "#f5f5f3", fontWeight: 500, fontSize: 11, color: "#666", padding: "8px 10px", whiteSpace: "nowrap", width: 1, border: "0.5px solid #ddd", verticalAlign: "top" }}>メインカラー</th>
        <td style={{ border: "0.5px solid #ddd", padding: "7px 8px", verticalAlign: "top" }}>
          <TextInput value={data.mainColor} onChange={set("mainColor")} placeholder="#000000 や「ネイビー系」など" />
        </td>
        <th style={{ background: "#f5f5f3", fontWeight: 500, fontSize: 11, color: "#666", padding: "8px 10px", whiteSpace: "nowrap", border: "0.5px solid #ddd", verticalAlign: "top" }}>サブカラー</th>
        <td style={{ border: "0.5px solid #ddd", padding: "7px 8px", verticalAlign: "top" }}>
          <TextInput value={data.subColor} onChange={set("subColor")} placeholder="アクセントカラーも可" />
        </td>
      </tr>
      <tr>
        <th style={{ background: "#f5f5f3", fontWeight: 500, fontSize: 11, color: "#666", padding: "8px 10px", whiteSpace: "nowrap", width: 1, border: "0.5px solid #ddd", verticalAlign: "top" }}>フォントイメージ</th>
        <td style={{ border: "0.5px solid #ddd", padding: "7px 8px", verticalAlign: "top" }}>
          <TextInput value={data.fontImage} onChange={set("fontImage")} placeholder="明朝・ゴシック・英字など" />
        </td>
        <th style={{ background: "#f5f5f3", fontWeight: 500, fontSize: 11, color: "#666", padding: "8px 10px", whiteSpace: "nowrap", border: "0.5px solid #ddd", verticalAlign: "top" }}>イメージ素材</th>
        <td style={{ border: "0.5px solid #ddd", padding: "7px 8px", verticalAlign: "top" }}>
          <CheckboxGroup field="mediaType" options={CHECKBOX_OPTIONS.mediaType} value={data.mediaType} onChange={setCheck} />
        </td>
      </tr>
      <Field label="NG事項">
        <TextInput value={data.ngItems} onChange={set("ngItems")} placeholder="使用してはいけない色・表現・競合他社サービス名など" />
      </Field>

      <SectionHeader number="06" title="サイト構成・主要ページ" />
      <Field label={<>主要<br />ページ</>}>
        <TextInput value={data.siteStructure} onChange={set("siteStructure")} placeholder={"例：TOP / 会社概要 / サービス一覧 / 実績 / ブログ / お問い合わせ\n各ページの役割・優先度も記載すると◎"} multiline rows={3} />
      </Field>

      <SectionHeader number="07" title="機能要件" />
      <Field label="必須機能">
        <CheckboxGroup field="functions" options={CHECKBOX_OPTIONS.functions} value={data.functions} onChange={setCheck} />
      </Field>
      <Field label="対応デバイス">
        <CheckboxGroup field="devices" options={CHECKBOX_OPTIONS.devices} value={data.devices} onChange={setCheck} />
      </Field>
      <Field label="技術・CMS">
        <CheckboxGroup field="cms" options={CHECKBOX_OPTIONS.cms} value={data.cms} onChange={setCheck} />
      </Field>

      <SectionHeader number="08" title="スケジュール・予算" />
      <tr>
        <th style={{ background: "#f5f5f3", fontWeight: 500, fontSize: 11, color: "#666", padding: "8px 10px", whiteSpace: "nowrap", width: 1, border: "0.5px solid #ddd", verticalAlign: "top" }}>要件定義</th>
        <td style={{ border: "0.5px solid #ddd", padding: "7px 8px", verticalAlign: "top" }}>
          <input type="date" value={data.dateRequirements} onChange={set("dateRequirements")} style={{ border: "none", outline: "none", background: "transparent", fontSize: 12, fontFamily: "inherit", color: "#1a1a1a", width: "100%" }} />
        </td>
        <th style={{ background: "#f5f5f3", fontWeight: 500, fontSize: 11, color: "#666", padding: "8px 10px", whiteSpace: "nowrap", border: "0.5px solid #ddd", verticalAlign: "top" }}>デザイン納品</th>
        <td style={{ border: "0.5px solid #ddd", padding: "7px 8px", verticalAlign: "top" }}>
          <input type="date" value={data.dateDesign} onChange={set("dateDesign")} style={{ border: "none", outline: "none", background: "transparent", fontSize: 12, fontFamily: "inherit", color: "#1a1a1a", width: "100%" }} />
        </td>
      </tr>
      <tr>
        <th style={{ background: "#f5f5f3", fontWeight: 500, fontSize: 11, color: "#666", padding: "8px 10px", whiteSpace: "nowrap", width: 1, border: "0.5px solid #ddd", verticalAlign: "top" }}>公開予定日</th>
        <td style={{ border: "0.5px solid #ddd", padding: "7px 8px", verticalAlign: "top" }}>
          <input type="date" value={data.dateLaunch} onChange={set("dateLaunch")} style={{ border: "none", outline: "none", background: "transparent", fontSize: 12, fontFamily: "inherit", color: "#1a1a1a", width: "100%" }} />
        </td>
        <th style={{ background: "#f5f5f3", fontWeight: 500, fontSize: 11, color: "#666", padding: "8px 10px", whiteSpace: "nowrap", border: "0.5px solid #ddd", verticalAlign: "top" }}>概算予算</th>
        <td style={{ border: "0.5px solid #ddd", padding: "7px 8px", verticalAlign: "top" }}>
          <TextInput value={data.budget} onChange={set("budget")} placeholder="例：50〜80万円" />
        </td>
      </tr>
      <Field label="支払条件">
        <TextInput value={data.paymentTerms} onChange={set("paymentTerms")} placeholder="例：着手金50%、納品時50%" />
      </Field>

      <SectionHeader number="09" title="その他・備考" />
      <Field label="備考">
        <TextInput value={data.notes} onChange={set("notes")} placeholder="競合情報、禁止事項、社内承認フロー、運用体制、SEO要件、アクセシビリティ要件など" multiline rows={4} />
      </Field>
    </table>
  );
}

function getStoredProjects() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function setStoredProjects(projects) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    return true;
  } catch {
    return false;
  }
}

export default function App() {
  const [projects, setProjects] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(typeof window !== "undefined" ? window.innerWidth >= 900 : true);
  const [saved, setSaved] = useState(false);
  const [renaming, setRenaming] = useState(null);
  const [renameVal, setRenameVal] = useState("");

  useEffect(() => {
    const loaded = getStoredProjects();
    if (loaded && loaded.length > 0) {
      setProjects(loaded);
      setActiveId(loaded[0].id);
      return;
    }
    const initial = defaultProject();
    setProjects([initial]);
    setActiveId(initial.id);
    setStoredProjects([initial]);
  }, []);

  const save = useCallback((ps) => {
    const ok = setStoredProjects(ps);
    if (ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  }, []);

  const updateField = useCallback(
    (field, value) => {
      setProjects((prev) => {
        const next = prev.map((p) =>
          p.id === activeId
            ? { ...p, data: { ...p.data, [field]: value }, updatedAt: today() }
            : p
        );
        save(next);
        return next;
      });
    },
    [activeId, save]
  );

  const addProject = () => {
    const p = defaultProject();
    setProjects((prev) => {
      const next = [p, ...prev];
      save(next);
      return next;
    });
    setActiveId(p.id);
    if (typeof window !== "undefined" && window.innerWidth < 900) {
      setSidebarOpen(false);
    }
  };

  const deleteProject = (id) => {
    setProjects((prev) => {
      const next = prev.filter((p) => p.id !== id);
      if (next.length === 0) {
        const p = defaultProject();
        setActiveId(p.id);
        save([p]);
        return [p];
      }
      if (activeId === id) setActiveId(next[0].id);
      save(next);
      return next;
    });
  };

  const startRename = (p) => {
    setRenaming(p.id);
    setRenameVal(p.name);
  };

  const commitRename = () => {
    if (!renameVal.trim()) {
      setRenaming(null);
      return;
    }
    setProjects((prev) => {
      const next = prev.map((p) => (p.id === renaming ? { ...p, name: renameVal.trim(), updatedAt: today() } : p));
      save(next);
      return next;
    });
    setRenaming(null);
  };

  const active = projects.find((p) => p.id === activeId);

  return (
    <div style={{ display: "flex", minHeight: "100dvh", fontFamily: "'Noto Sans JP', sans-serif", background: "#f8f8f6", overflow: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500&display=swap" rel="stylesheet" />

      <div
        style={{
          width: sidebarOpen ? 240 : 0,
          minWidth: sidebarOpen ? 240 : 0,
          background: "#1a1a1a",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          transition: "width 0.2s, min-width 0.2s",
          overflow: "hidden",
          flexShrink: 0,
          borderRight: sidebarOpen ? "1px solid #2d2d2d" : "none",
        }}
      >
        <div style={{ padding: "16px 14px 8px", borderBottom: "0.5px solid #333" }}>
          <div style={{ fontSize: 10, letterSpacing: "0.12em", color: "#888", marginBottom: 10 }}>CONCEPT SHEET</div>
          <button
            onClick={addProject}
            style={{
              width: "100%",
              padding: "10px 0",
              background: "#fff",
              color: "#1a1a1a",
              border: "none",
              borderRadius: 6,
              fontSize: 12,
              fontWeight: 500,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            + 新規プロジェクト
          </button>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "8px 0" }}>
          {projects.map((p) => (
            <div
              key={p.id}
              onClick={() => {
                setActiveId(p.id);
                if (typeof window !== "undefined" && window.innerWidth < 900) {
                  setSidebarOpen(false);
                }
              }}
              style={{
                padding: "10px 14px",
                cursor: "pointer",
                background: p.id === activeId ? "#2e2e2e" : "transparent",
                borderLeft: p.id === activeId ? "2px solid #fff" : "2px solid transparent",
                transition: "background 0.1s",
              }}
            >
              {renaming === p.id ? (
                <input
                  autoFocus
                  value={renameVal}
                  onChange={(e) => setRenameVal(e.target.value)}
                  onBlur={commitRename}
                  onKeyDown={(e) => e.key === "Enter" && commitRename()}
                  onClick={(e) => e.stopPropagation()}
                  style={{ background: "#333", border: "0.5px solid #555", color: "#fff", fontSize: 12, padding: "4px 6px", borderRadius: 3, width: "100%", outline: "none", fontFamily: "inherit" }}
                />
              ) : (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 4 }}>
                  <span style={{ fontSize: 12, color: p.id === activeId ? "#fff" : "#aaa", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {p.name}
                  </span>
                  <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
                    <button onClick={(e) => { e.stopPropagation(); startRename(p); }} style={{ background: "none", border: "none", color: "#777", cursor: "pointer", fontSize: 13, padding: "0 2px", lineHeight: 1 }} title="名前を変更">✎</button>
                    {projects.length > 1 && (
                      <button onClick={(e) => { e.stopPropagation(); deleteProject(p.id); }} style={{ background: "none", border: "none", color: "#777", cursor: "pointer", fontSize: 13, padding: "0 2px", lineHeight: 1 }} title="削除">✕</button>
                    )}
                  </div>
                </div>
              )}
              <div style={{ fontSize: 10, color: "#666", marginTop: 3 }}>{p.updatedAt}</div>
            </div>
          ))}
        </div>
        <div style={{ padding: "10px 14px", borderTop: "0.5px solid #2a2a2a", fontSize: 10, color: "#555" }}>{projects.length}件のプロジェクト</div>
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
        <div
          style={{
            minHeight: 56,
            background: "#fff",
            borderBottom: "0.5px solid #e0e0e0",
            display: "flex",
            alignItems: "center",
            padding: "0 14px",
            gap: 10,
            flexShrink: 0,
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: 18,
              color: "#666",
              padding: "6px 8px",
              lineHeight: 1,
              borderRadius: 4,
            }}
          >
            ☰
          </button>
          <div style={{ flex: 1, fontSize: 13, fontWeight: 500, color: "#1a1a1a", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", minWidth: 120 }}>
            {active?.name || ""}
          </div>
          {saved && <span style={{ fontSize: 11, color: "#888", background: "#f0f0ee", padding: "4px 10px", borderRadius: 20 }}>保存済み ✓</span>}
          <button
            onClick={() => window.print()}
            style={{
              padding: "8px 14px",
              background: "#1a1a1a",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              fontSize: 12,
              fontWeight: 500,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            印刷 / PDF
          </button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "16px 12px 28px" }}>
          {active && (
            <div
              style={{
                maxWidth: 900,
                margin: "0 auto",
                background: "#fff",
                border: "0.5px solid #ddd",
                borderRadius: 10,
                padding: "18px 14px",
                overflowX: "auto",
              }}
            >
              <div style={{ marginBottom: 20, paddingBottom: 14, borderBottom: "2px solid #1a1a1a" }}>
                <div style={{ fontSize: 18, fontWeight: 500, letterSpacing: "0.1em", color: "#1a1a1a" }}>WEB SITE CONCEPT SHEET</div>
                <div style={{ fontSize: 11, color: "#888", marginTop: 4 }}>Webサイト制作コンセプトシート — 更新日: {active.updatedAt}</div>
              </div>
              <ConceptSheetForm data={active.data} onChange={updateField} />
            </div>
          )}
        </div>
      </div>

      <style>{`
        * { box-sizing: border-box; }
        html, body, #root { margin: 0; min-height: 100%; }
        body { -webkit-text-size-adjust: 100%; }
        input, textarea, button, select { font: inherit; }
        textarea { resize: vertical; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #ddd; border-radius: 3px; }

        @media (max-width: 899px) {
          table, tbody, tr, th, td { display: block; width: 100% !important; }
          tr { border-bottom: 1px solid #ddd; }
          th { border-bottom: none !important; }
          td { border-top: none !important; }
        }

        @media print {
          button { display: none !important; }
          body { background: #fff; }
        }
      `}</style>
    </div>
  );
}
