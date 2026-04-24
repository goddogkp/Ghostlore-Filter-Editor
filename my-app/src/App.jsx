import { useState, useCallback, useRef, useEffect } from "react";

const RARITIES = ["Normal", "Magic", "Rare", "Legendary", "Mythic"];

const ATTRIBUTES = [
  "Amulets", "AutoPickup", "BothHands", "CanHaveSockets", "CanStack",
  "Chest", "CompoundGlyph", "Feet", "FoodBuff", "Gem", "Hair", "Head",
  "HellFragment", "HellNote", "HiddenItem","Implicit", "ItemShrine", "Legs",
  "MainHand", "Money", "Neck", "NoDrop", "OffHand", "Pet","Prefix", "QuestItem",
  "Ring", "ShowInFilter", "SimpleGlyph", "Skin","Suffix", "Waist", "Wings"
];

const BASE_TYPES = ["###Potions",
"Ointment",
"Remedy",
"Tonic",
"",
"###Misc/Quest",
"Chthonite",
"Astralite",
"Commodity Cube",
"Gem Pouch",
"Hell Note",
"Hell Ingot",
"Hell Fragment",
"Durian",
"",
"###Equipment Base Types",
"#Armours",
"Belt",
"Boots",
"Capris",
"Feather Boa",
"Gas Mask",
"Hat",
"Head Wrap",
"Headband",
"Hood",
"Jacket",
"Jeans",
"Necklace",
"Pants",
"Sandals",
"Scarf",
"Shirt",
"Spiked Collar",
"Sunglasses",
"Vest",
"Waist Coat",
"",
"#Weapons",
"Axe",
"Billhook",
"Bow",
"Gauntlets",
"Kris",
"Kukris",
"Parang",
"Pitchfork",
"Quiver",
"Ritual Knife",
"Shield",
"Sickle",
"Spear",
"Staff",
"Talismans",
"",
"###Mythic Amulets",
"Ashwathamas Gem",
"Dragons Blessing",
"Phoenixs Blessing",
"#Other Mythics are under ItemAffixes",
"",
"###Pets",
"Chicken",
"Fishing Net",
"Kumanthong",
"Otter",
"Pontianak",
"",
"###Glyphs",
"#Simple",
"Kasi",
"Pakala",
"Seli",
"Sona",
"Telo",
"Utala",
"#Compound",
"Alasa",
"Ilo",
"Kulupu",
"Moku",
"Nasin",
"Sijelo",
"Suli",
"Weka",



];

const STATS = [
  "Absorb", "Accuracy", "Additional Minions", "Armour Break",
  "Attack Damage", "Attack Damage Multiplier", "Avoidance",
  "Block", "Bonus Coins", "Bonus XP",
  "Class Passives Multiplier", "Cooldown Reduction", "Cooldown on Hit",
  "Crisis Absorb", "Crisis Damage", "Crisis Threshold",
  "Critical Hit Chance", "Critical Hit Multiplier",
  "Damage Reflection", "Elemental Chance", "Elemental Multiplier",
  "Elemental Resistance",
  "Fire Damage", "Fire Resistance", "Fire penetration",
  "HP Multiplier", "HP Per Hit", "HP Per Kill", "HP Regen", "HP Steal",
  "Ice Damage", "Ice Resistance", "Ice penetration",
  "Increased Projectile Radius", "Increased buff duration",
  "Increased buff effect", "Increased infliction duration",
  "Increased infliction effect", "Interrupt",
  "Item Find Chance",
  "Lightning Damage", "Lightning Resistance", "Lightning penetration",
  "MP Multiplier", "MP Per Hit", "MP Per Kill", "MP Regen", "MP Steal", "MP When Hit",
  "Magic Find Chance",
  "Map Awakened Spawn", "Map Boost", "Map Crafting", "Map Effect Multiplier",
  "Map Extra Affix", "Map Extra Option", "Map Food", "Map Hell Notes",
  "Map Keropok", "Map Loot Goblin", "Map Monster Level",
  "Map Orang Bunian", "Map Secret Shop", "Map Shrine of Balance",
  "Map Shrine of Spirits", "Map Size", "Map Tresure Chests",
  "Max HP", "Max MP", "Max Skill Uses",
  "Minion Avoidance", "Minion Damage", "Minion Max HP", "Minion Movement Speed",
  "Missile Reflect Chance", "Movement Speed",
  "Poise", "Poison Damage", "Poison Resistance", "Poison penetration",
  "Projectile Pierce", "Projectile Speed",
  "Skill Damage", "Skill Damage Multiplier",
  "Stealth"
];

const AFFIXES = ["###Items",
  "Absorb", "Accuracy", "Additional Minions", "Armour Break",
  "Avoidance", "Basic Damage", "Basic Damage Multiplier", "Block",
  "Bonus Coins", "Bonus XP",
  "Class Passives Multiplier", "Cooldown Reduction", "Cooldown on Hit",
  "Crisis Absorb", "Crisis Damage", "Crisis threshhold",
  "Critical Hit Chance", "Critical Hit Multiplier",
  "Damage Reflection", "Elemental Chance", "Elemental Multiplier",
  "Elemental Resistance",
  "Fire Damage", "Fire Resistance", "Fire penetration",
  "HP Multiplier", "HP Per Hit", "HP Per Kill", "HP Regen", "HP Steal",
  "Health",
  "Ice Damage", "Ice Resistance", "Ice penetration",
  "Increased Attack Speed", "Increased Movement Speed",
  "Increased Projectile Radius", "Increased Skill Speed",
  "Increased buff duration", "Increased buff effect",
  "Increased infliction duration", "Increased infliction effect",
  "Interrupt", "Item Find Chance",
  "Lightning Damage", "Lightning Resistance", "Lightning penetration",
  "MP Multiplier", "MP Per Hit", "MP Per Kill", "MP Regen", "MP Steal", "MP When Hit",
  "Magic Find Chance", "Max MP", "Max Skill Uses",
  "Minion Avoidance", "Minion Damage", "Minion Max HP", "Minion Movement Speed",
  "Missile Reflect Chance",
  "Poise", "Poison Damage", "Poison Resistance", "Poison penetration",
  "Projectile Pierce", "Projectile Speed",
  "Skill Damage", "Skill Damage Multiplier",
  "Slow on hit", "Stealth",
  "",
  "###Map Data",
  "Hell Fragment Boost",
"Hell Fragment Mission Extra Affix",
"Hell Fragment Mission Extra Option",
"Hell Fragment Crafting",
"Hell Fragment Food",
"Hell Fragment Hell Notes",
"Hell Fragment Map Effect Multiplier",
"Hell Fragment XP and Coins",
"Hell Fragment Monster Level",
"Hell Fragment Magic Find Chance",
"",
  "###Mythics",
  "Agnis Philosophy",
"Armilliary Sash",
"Aruval",
"Ashwathamas Gem",
"Badangs Earthshakers",
"Badangs Heavyweight Belt",
"Badangs Stonesplitter",
"Brahmastra",
"Chandrahasa",
"Damaru",
"Dragons Blessing",
"Duyis Grasp",
"Han Feizhis Immovable Object",
"Han Feizhis Unstoppable Force",
"Indrastra",
"Jaivardhan",
"Jayantha Vel ",
"Kharga",
"Khatvanga",
"Legionhide",
"Lord Shivas Tiger Skin",
"Mundamala",
"Nagapasha",
"Nimbus",
"Phoenixs Blessing",
"Phurba",
"Primordial Blade Asi",
"Rudraksha Mala",
"Ruyi Jingu Bang",
"Sudasharna Chakra",
"Teen Baan",
"Trishula",
"True Taming Sari",
"Universal Ring",
"Vajra",
"Vessel of Brahmari",
"Way of No Way",
"Windfire",
"Yamapasha"
];

const OPERATORS = [">=", ">", "<=", "<", "=", "!="];
const EFFECT_COLORS = [
  { name: "Red", value: "red" },
  { name: "Blue", value: "blue" },
  { name: "Green", value: "green" },
  { name: "Purple", value: "purple" },
  { name: "Yellow", value: "yellow" },
  { name: "Orange", value: "orange" },
  { name: "Cyan", value: "cyan" },
  { name: "White", value: "white" },
  { name: "Black", value: "black" },
  { name: "Custom Hex", value: "custom" },
];

function createEmptyRule() {
  return {
    id: Date.now() + Math.random(),
    type: "Show",
    conditions: [],
    playEffect: null,
    continue: false,
    comment: "",
  };
}

function createCondition(type) {
  switch (type) {
    case "rarity": return { type, operator: ">=", value: "Rare" };
    case "level": return { type, operator: ">=", value: "1" };
    case "basetype": return { type, values: [] };
    case "attributes": return { type, values: [] };
    case "hasaffix": return { type, count: 1, values: [] };
    case "stat": return { type, name: "", operator: ">=", value: "0" };
    default: return { type };
  }
}

function ruleToText(rule) {
  let lines = [];
  if (rule.comment) lines.push(`# ${rule.comment}`);
  lines.push(rule.type);
  for (const c of rule.conditions) {
    switch (c.type) {
      case "rarity":
        lines.push(`    Rarity ${c.operator} ${c.value}`);
        break;
      case "level":
        lines.push(`    Level ${c.operator} ${c.value}`);
        break;
      case "basetype":
        if (c.values.length > 0) lines.push(`    BaseType ${c.values.map(v => `"${v}"`).join(" ")}`);
        break;
      case "attributes":
        if (c.values.length > 0) lines.push(`    Attributes ${c.values.join(" ")}`);
        break;
      case "hasaffix":
        if (c.values.length > 0) {
          const countStr = c.count > 1 ? `${c.count} ` : "";
          lines.push(`    HasAffix ${countStr}${c.values.map(v => `"${v}"`).join(" ")}`);
        }
        break;
      case "stat":
        if (c.name) lines.push(`    Stat "${c.name}" ${c.operator} ${c.value}`);
        break;
    }
  }
  if (rule.playEffect) lines.push(`    PlayEffect ${rule.playEffect}`);
  if (rule.continue) lines.push(`    Continue`);
  return lines.join("\n");
}

function SearchableSelect({ options, value, onChange, placeholder, multi = false }) {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState({});
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  const filtered = options.filter(o =>
    o.toLowerCase().includes(search.toLowerCase())
  );

  // Click outside closes dropdown
  useEffect(() => {
    if (!open) return;
    const handleClick = (e) => {
      if (
        inputRef.current && !inputRef.current.contains(e.target) &&
        dropdownRef.current && !dropdownRef.current.contains(e.target)
      ) {
        setOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  // Calculate dropdown position relative to viewport so it escapes any overflow:hidden parents
  const handleOpen = () => {
    if (inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      setDropdownStyle({
        position: "fixed",
        top: rect.bottom + 2,
        left: rect.left,
        width: rect.width,
        maxHeight: "200px",
        overflow: "auto",
        background: "#1a1a2e",
        border: "1px solid #555",
        borderRadius: "4px",
        zIndex: 9999,
        boxShadow: "0 8px 24px rgba(0,0,0,0.6)",
      });
    }
    setOpen(true);
  };

  return (
    <div style={{ position: "relative" }}>
      <input
        ref={inputRef}
        type="text"
        value={search}
        onChange={e => { setSearch(e.target.value); handleOpen(); }}
        onFocus={handleOpen}
        placeholder={placeholder}
        style={{
          width: "100%", padding: "6px 10px", background: "#1a1a2e",
          border: "1px solid #333", color: "#e0e0e0", borderRadius: "4px",
          fontSize: "13px", boxSizing: "border-box"
        }}
      />
      {open && filtered.length > 0 && (
        <div ref={dropdownRef} style={dropdownStyle}>
          {filtered.map(o => (
            <div key={o} onMouseDown={e => {
              // Use mousedown so it fires before blur
              e.preventDefault();
              if (multi) {
                if (!value.includes(o)) onChange([...value, o]);
              } else {
                onChange(o);
              }
              setSearch("");
              setOpen(false);
            }} style={{
              padding: "5px 10px", cursor: "pointer", fontSize: "13px",
              color: "#ccc", borderBottom: "1px solid #222",
            }}
              onMouseEnter={e => e.currentTarget.style.background = "#2a2a4e"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              {o}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ConditionEditor({ condition, onChange, onRemove }) {
  const update = (key, val) => onChange({ ...condition, [key]: val });

  const labelStyle = {
    fontSize: "11px", color: "#888", textTransform: "uppercase",
    letterSpacing: "0.5px", marginBottom: "3px"
  };
  const rowStyle = {
    display: "flex", gap: "8px", alignItems: "flex-start", flexWrap: "wrap"
  };
  const selectStyle = {
    padding: "6px 8px", background: "#1a1a2e", border: "1px solid #333",
    color: "#e0e0e0", borderRadius: "4px", fontSize: "13px"
  };
  const inputStyle = {
    ...selectStyle, width: "80px"
  };
  const tagStyle = {
    display: "inline-flex", alignItems: "center", gap: "4px",
    background: "#2a2a4e", padding: "2px 8px", borderRadius: "3px",
    fontSize: "12px", color: "#b0b0d0", margin: "2px"
  };

  return (
    <div style={{
      display: "flex", gap: "10px", alignItems: "flex-start",
      padding: "8px 12px", background: "#12122a", borderRadius: "4px",
      borderLeft: "3px solid #4a4a8a"
    }}>
      <div style={{ flex: 1 }}>
        {condition.type === "rarity" && (
          <div>
            <div style={labelStyle}>Rarity</div>
            <div style={rowStyle}>
              <select value={condition.operator} onChange={e => update("operator", e.target.value)} style={selectStyle}>
                {OPERATORS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
              <select value={condition.value} onChange={e => update("value", e.target.value)} style={selectStyle}>
                {RARITIES.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
          </div>
        )}
        {condition.type === "level" && (
          <div>
            <div style={labelStyle}>Level</div>
            <div style={rowStyle}>
              <select value={condition.operator} onChange={e => update("operator", e.target.value)} style={selectStyle}>
                {OPERATORS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
              <input type="number" value={condition.value} onChange={e => update("value", e.target.value)} style={inputStyle} />
            </div>
          </div>
        )}
        {condition.type === "basetype" && (
          <div>
            <div style={labelStyle}>Base Type</div>
            <SearchableSelect
              options={BASE_TYPES}
              value={condition.values}
              onChange={vals => update("values", vals)}
              placeholder="Search base types..."
              multi
            />
            <div style={{ marginTop: "4px" }}>
              {condition.values.map(v => (
                <span key={v} style={tagStyle}>
                  {v}
                  <span style={{ cursor: "pointer", color: "#f66", fontSize: "14px" }}
                    onClick={() => update("values", condition.values.filter(x => x !== v))}>×</span>
                </span>
              ))}
            </div>
          </div>
        )}
        {condition.type === "attributes" && (
          <div>
            <div style={labelStyle}>Attributes</div>
            <SearchableSelect
              options={ATTRIBUTES}
              value={condition.values}
              onChange={vals => update("values", vals)}
              placeholder="Search attributes..."
              multi
            />
            <div style={{ marginTop: "4px" }}>
              {condition.values.map(v => (
                <span key={v} style={tagStyle}>
                  {v}
                  <span style={{ cursor: "pointer", color: "#f66", fontSize: "14px" }}
                    onClick={() => update("values", condition.values.filter(x => x !== v))}>×</span>
                </span>
              ))}
            </div>
          </div>
        )}
        {condition.type === "hasaffix" && (
          <div>
            <div style={labelStyle}>Has Affix (min {condition.count} matching)</div>
            <div style={rowStyle}>
              <input type="number" min="1" value={condition.count}
                onChange={e => update("count", parseInt(e.target.value) || 1)}
                style={{ ...inputStyle, width: "50px" }} />
              <div style={{ flex: 1 }}>
                <SearchableSelect
                  options={AFFIXES}
                  value={condition.values}
                  onChange={vals => update("values", vals)}
                  placeholder="Search affixes..."
                  multi
                />
              </div>
            </div>
            <div style={{ marginTop: "4px" }}>
              {condition.values.map(v => (
                <span key={v} style={tagStyle}>
                  {v}
                  <span style={{ cursor: "pointer", color: "#f66", fontSize: "14px" }}
                    onClick={() => update("values", condition.values.filter(x => x !== v))}>×</span>
                </span>
              ))}
            </div>
          </div>
        )}
        {condition.type === "stat" && (
          <div>
            <div style={labelStyle}>Stat (use decimal for %: 15% = 0.15)</div>
            <div style={rowStyle}>
              <div style={{ flex: 1 }}>
                <SearchableSelect
                  options={STATS}
                  value={condition.name}
                  onChange={val => update("name", val)}
                  placeholder="Search stats..."
                />
              </div>
              <select value={condition.operator} onChange={e => update("operator", e.target.value)} style={selectStyle}>
                {OPERATORS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
              <input type="text" value={condition.value} onChange={e => update("value", e.target.value)}
                style={inputStyle} placeholder="0.15" />
            </div>
          </div>
        )}
      </div>
      <button onClick={onRemove} style={{
        background: "none", border: "none", color: "#f44", cursor: "pointer",
        fontSize: "18px", padding: "0 4px", marginTop: "16px"
      }}>×</button>
    </div>
  );
}

function RuleEditor({ rule, onChange, onRemove, onDuplicate, onMoveUp, onMoveDown }) {
  const update = (key, val) => onChange({ ...rule, [key]: val });
  const updateCondition = (idx, cond) => {
    const newConds = [...rule.conditions];
    newConds[idx] = cond;
    update("conditions", newConds);
  };
  const removeCondition = (idx) => {
    update("conditions", rule.conditions.filter((_, i) => i !== idx));
  };
  const addCondition = (type) => {
    update("conditions", [...rule.conditions, createCondition(type)]);
  };

  const isShow = rule.type === "Show";
  const borderColor = isShow ? "#2d8a4e" : "#8a2d2d";
  const headerBg = isShow ? "#1a3a2a" : "#3a1a1a";

  return (
    <div style={{
      border: `1px solid ${borderColor}`,
      borderRadius: "6px", overflow: "hidden", background: "#0d0d1a",
    }}>
      <div style={{
        display: "flex", alignItems: "center", gap: "10px",
        padding: "10px 14px", background: headerBg,
      }}>
        <select value={rule.type} onChange={e => update("type", e.target.value)}
          style={{
            padding: "5px 10px", background: isShow ? "#2d8a4e" : "#8a2d2d",
            border: "none", color: "#fff", borderRadius: "4px",
            fontWeight: "bold", fontSize: "13px", cursor: "pointer"
          }}>
          <option value="Show">Show</option>
          <option value="Hide">Hide</option>
        </select>
        <input
          type="text" value={rule.comment} onChange={e => update("comment", e.target.value)}
          placeholder="Rule description (comment)..."
          style={{
            flex: 1, padding: "5px 10px", background: "#1a1a2e",
            border: "1px solid #333", color: "#999", borderRadius: "4px",
            fontSize: "12px", fontStyle: "italic"
          }}
        />
        <div style={{ display: "flex", gap: "4px" }}>
          <button onClick={onMoveUp} title="Move up" style={iconBtnStyle}>↑</button>
          <button onClick={onMoveDown} title="Move down" style={iconBtnStyle}>↓</button>
          <button onClick={onDuplicate} title="Duplicate" style={iconBtnStyle}>⧉</button>
          <button onClick={onRemove} title="Delete" style={{ ...iconBtnStyle, color: "#f44" }}>✕</button>
        </div>
      </div>

      <div style={{ padding: "12px 14px", display: "flex", flexDirection: "column", gap: "8px" }}>
        {rule.conditions.map((c, i) => (
          <ConditionEditor
            key={i} condition={c}
            onChange={cond => updateCondition(i, cond)}
            onRemove={() => removeCondition(i)}
          />
        ))}

        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginTop: "4px" }}>
          {[
            ["rarity", "Rarity"],
            ["level", "Level"],
            ["basetype", "Base Type"],
            ["attributes", "Attributes"],
            ["hasaffix", "Has Affix"],
            ["stat", "Stat"],
          ].map(([type, label]) => (
            <button key={type} onClick={() => addCondition(type)} style={addCondBtnStyle}>
              + {label}
            </button>
          ))}
        </div>

        <div style={{
          display: "flex", gap: "12px", alignItems: "center",
          marginTop: "4px", padding: "8px 0", borderTop: "1px solid #222"
        }}>
          <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "#aaa" }}>
            <span>Play Effect:</span>
            <select
              value={rule.playEffect && !EFFECT_COLORS.find(c => c.value === rule.playEffect && c.value !== "custom") ? "custom" : (rule.playEffect || "")}
              onChange={e => {
                const v = e.target.value;
                if (v === "custom") update("playEffect", "#FF0000");
                else if (v === "") update("playEffect", null);
                else update("playEffect", v);
              }}
              style={{
                padding: "4px 8px", background: "#1a1a2e",
                border: "1px solid #333", color: "#e0e0e0", borderRadius: "4px", fontSize: "13px"
              }}
            >
              <option value="">None</option>
              {EFFECT_COLORS.map(c => (
                <option key={c.value} value={c.value}>{c.name}</option>
              ))}
            </select>
          </label>
          {rule.playEffect && !EFFECT_COLORS.find(c => c.value === rule.playEffect) && (
            <input type="text" value={rule.playEffect}
              onChange={e => update("playEffect", e.target.value)}
              placeholder="#FF0000"
              style={{
                padding: "4px 8px", background: "#1a1a2e", width: "90px",
                border: "1px solid #333", color: "#e0e0e0", borderRadius: "4px", fontSize: "13px"
              }}
            />
          )}
          {rule.playEffect && (
            <div style={{
              width: "20px", height: "20px", borderRadius: "3px",
              background: rule.playEffect, border: "1px solid #555"
            }} />
          )}
          <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "#aaa", marginLeft: "auto" }}>
            <input type="checkbox" checked={rule.continue}
              onChange={e => update("continue", e.target.checked)} />
            Continue
          </label>
        </div>
      </div>
    </div>
  );
}

const iconBtnStyle = {
  background: "none", border: "1px solid #444", color: "#888",
  cursor: "pointer", borderRadius: "3px", padding: "2px 6px",
  fontSize: "14px", lineHeight: 1
};

const addCondBtnStyle = {
  padding: "4px 10px", background: "#1a1a2e", border: "1px solid #333",
  color: "#8888cc", borderRadius: "4px", cursor: "pointer", fontSize: "12px",
};

export default function GhostloreLootFilterBuilder() {
  const [rules, setRules] = useState([createEmptyRule()]);
  const [importText, setImportText] = useState("");
  const [showImport, setShowImport] = useState(false);

  const updateRule = (idx, rule) => {
    const newRules = [...rules];
    newRules[idx] = rule;
    setRules(newRules);
  };

  const addRule = () => setRules([...rules, createEmptyRule()]);
  const removeRule = (idx) => setRules(rules.filter((_, i) => i !== idx));
  const duplicateRule = (idx) => {
    const newRules = [...rules];
    newRules.splice(idx + 1, 0, { ...rules[idx], id: Date.now() + Math.random() });
    setRules(newRules);
  };
  const moveRule = (idx, dir) => {
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= rules.length) return;
    const newRules = [...rules];
    [newRules[idx], newRules[newIdx]] = [newRules[newIdx], newRules[idx]];
    setRules(newRules);
  };

  const exportFilter = useCallback(() => {
    return rules.map(r => ruleToText(r)).join("\n\n");
  }, [rules]);

  const downloadFilter = () => {
    const text = exportFilter();
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "custom.filter";
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(exportFilter());
  };

  const parseFilter = (text) => {
    const lines = text.split("\n");
    const parsed = [];
    let current = null;

    for (let line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;
      if (trimmed.startsWith("#")) {
        if (!current) {
          current = createEmptyRule();
          current.comment = trimmed.slice(1).trim();
        }
        continue;
      }
      const lower = trimmed.toLowerCase();
      if (lower === "show" || lower === "hide") {
        if (current && (current.conditions.length > 0 || current.type !== "Show")) {
          parsed.push(current);
        }
        const newRule = createEmptyRule();
        if (current && current.comment && current.conditions.length === 0) {
          newRule.comment = current.comment;
        }
        newRule.type = lower === "show" ? "Show" : "Hide";
        current = newRule;
        continue;
      }
      if (!current) continue;

      if (lower.startsWith("rarity")) {
        const match = trimmed.match(/Rarity\s*(>=|<=|!=|>|<|==?)\s*(\w+)/i);
        if (match) {
          current.conditions.push({ type: "rarity", operator: match[1] === "==" ? "=" : match[1], value: match[2] });
        }
      } else if (lower.startsWith("level")) {
        const match = trimmed.match(/Level\s*(>=|<=|!=|>|<|==?)\s*(\d+)/i);
        if (match) {
          current.conditions.push({ type: "level", operator: match[1] === "==" ? "=" : match[1], value: match[2] });
        }
      } else if (lower.startsWith("basetype")) {
        const values = [];
        const regex = /"([^"]+)"/g;
        let m;
        while ((m = regex.exec(trimmed))) values.push(m[1]);
        if (values.length === 0) {
          const parts = trimmed.replace(/basetype\s*/i, "").trim().split(/\s+/);
          values.push(...parts.filter(Boolean));
        }
        current.conditions.push({ type: "basetype", values });
      } else if (lower.startsWith("attributes")) {
        const values = trimmed.replace(/attributes\s*/i, "").trim().split(/\s+/).filter(Boolean);
        current.conditions.push({ type: "attributes", values });
      } else if (lower.startsWith("hasaffix")) {
        const rest = trimmed.replace(/hasaffix\s*/i, "").trim();
        const countMatch = rest.match(/^(\d+)\s+/);
        let count = 1;
        let remaining = rest;
        if (countMatch) {
          count = parseInt(countMatch[1]);
          remaining = rest.slice(countMatch[0].length);
        }
        const values = [];
        const regex = /"([^"]+)"/g;
        let m;
        while ((m = regex.exec(remaining))) values.push(m[1]);
        current.conditions.push({ type: "hasaffix", count, values });
      } else if (lower.startsWith("stat")) {
        const match = trimmed.match(/Stat\s+"([^"]+)"\s*(>=|<=|!=|>|<|==?)\s*([\d.]+)/i);
        if (match) {
          current.conditions.push({ type: "stat", name: match[1], operator: match[2] === "==" ? "=" : match[2], value: match[3] });
        }
      } else if (lower.startsWith("playeffect")) {
        const color = trimmed.replace(/playeffect\s*/i, "").trim();
        current.playEffect = color;
      } else if (lower === "continue") {
        current.continue = true;
      }
    }
    if (current) parsed.push(current);
    return parsed;
  };

  const handleImport = () => {
    const parsed = parseFilter(importText);
    if (parsed.length > 0) {
      setRules(parsed);
      setShowImport(false);
      setImportText("");
    }
  };

  return (
    <div style={{
      minHeight: "100vh", background: "#0a0a14",
      fontFamily: "'JetBrains Mono', 'Fira Code', 'Source Code Pro', monospace",
      color: "#e0e0e0",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&family=Cinzel:wght@400;700&display=swap" rel="stylesheet" />

      <div style={{
        background: "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1a0a2e 100%)",
        borderBottom: "1px solid #2a2a4a",
        padding: "24px 0",
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <h1 style={{
            fontFamily: "'Cinzel', serif", fontSize: "28px",
            fontWeight: 700, letterSpacing: "3px",
            background: "linear-gradient(90deg, #8b5cf6, #ec4899, #f59e0b)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            margin: 0,
          }}>
            GHOSTLORE
          </h1>
          <p style={{
            fontSize: "12px", color: "#666", letterSpacing: "4px",
            textTransform: "uppercase", margin: "4px 0 0 2px"
          }}>
            Loot Filter Builder
          </p>
        </div>
      </div>

      <div style={{
        maxWidth: "1200px", margin: "0 auto", padding: "24px",
        display: "grid", gridTemplateColumns: "1fr 380px", gap: "24px",
      }}>
        {/* Left: Rules */}
        <div>
          <div style={{
            display: "flex", justifyContent: "space-between",
            alignItems: "center", marginBottom: "16px"
          }}>
            <h2 style={{ fontSize: "14px", color: "#888", letterSpacing: "2px", textTransform: "uppercase", margin: 0 }}>
              Rules ({rules.length})
            </h2>
            <div style={{ display: "flex", gap: "8px" }}>
              <button onClick={() => setShowImport(!showImport)} style={{
                padding: "6px 14px", background: "#1a1a2e", border: "1px solid #444",
                color: "#aaa", borderRadius: "4px", cursor: "pointer", fontSize: "12px"
              }}>
                Import
              </button>
              <button onClick={addRule} style={{
                padding: "6px 14px", background: "#2d8a4e", border: "none",
                color: "#fff", borderRadius: "4px", cursor: "pointer", fontSize: "12px",
                fontWeight: "bold"
              }}>
                + Add Rule
              </button>
            </div>
          </div>

          {showImport && (
            <div style={{
              padding: "14px", background: "#12122a", border: "1px solid #333",
              borderRadius: "6px", marginBottom: "16px"
            }}>
              <textarea
                value={importText} onChange={e => setImportText(e.target.value)}
                placeholder="Paste your .filter file contents here..."
                style={{
                  width: "100%", minHeight: "120px", padding: "10px",
                  background: "#0a0a14", border: "1px solid #333", color: "#e0e0e0",
                  borderRadius: "4px", fontSize: "12px", fontFamily: "inherit",
                  resize: "vertical", boxSizing: "border-box"
                }}
              />
              <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                <button onClick={handleImport} style={{
                  padding: "6px 14px", background: "#2d8a4e", border: "none",
                  color: "#fff", borderRadius: "4px", cursor: "pointer", fontSize: "12px"
                }}>Parse & Load</button>
                <button onClick={() => { setShowImport(false); setImportText(""); }} style={{
                  padding: "6px 14px", background: "#333", border: "none",
                  color: "#aaa", borderRadius: "4px", cursor: "pointer", fontSize: "12px"
                }}>Cancel</button>
              </div>
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {rules.map((rule, i) => (
              <RuleEditor
                key={rule.id} rule={rule}
                onChange={r => updateRule(i, r)}
                onRemove={() => removeRule(i)}
                onDuplicate={() => duplicateRule(i)}
                onMoveUp={() => moveRule(i, -1)}
                onMoveDown={() => moveRule(i, 1)}
              />
            ))}
          </div>
        </div>

        {/* Right: Preview */}
        <div style={{ position: "sticky", top: "24px", alignSelf: "start" }}>
          <div style={{
            display: "flex", justifyContent: "space-between",
            alignItems: "center", marginBottom: "12px"
          }}>
            <h2 style={{ fontSize: "14px", color: "#888", letterSpacing: "2px", textTransform: "uppercase", margin: 0 }}>
              Output
            </h2>
            <div style={{ display: "flex", gap: "6px" }}>
              <button onClick={copyToClipboard} style={{
                padding: "5px 12px", background: "#1a1a2e", border: "1px solid #444",
                color: "#aaa", borderRadius: "4px", cursor: "pointer", fontSize: "11px"
              }}>Copy</button>
              <button onClick={downloadFilter} style={{
                padding: "5px 12px", background: "#4a3a8a", border: "none",
                color: "#fff", borderRadius: "4px", cursor: "pointer", fontSize: "11px",
                fontWeight: "bold"
              }}>Download .filter</button>
            </div>
          </div>
          <pre style={{
            background: "#0d0d1a", border: "1px solid #2a2a4a",
            borderRadius: "6px", padding: "14px", fontSize: "12px",
            color: "#a0a0c0", overflow: "auto", maxHeight: "calc(100vh - 160px)",
            lineHeight: "1.6", whiteSpace: "pre-wrap", margin: 0,
          }}>
            {exportFilter() || "# Add rules to generate your filter"}
          </pre>

          <div style={{
            marginTop: "16px", padding: "14px", background: "#12122a",
            border: "1px solid #2a2a4a", borderRadius: "6px",
            fontSize: "11px", color: "#666", lineHeight: "1.7"
          }}>
            <strong style={{ color: "#888" }}>Quick Reference</strong><br />
            • Place .filter files in <code style={{ color: "#8b8bbb" }}>%appdata%\..\LocalLow\ATATGames\Ghostlore\filters</code><br />
            • Stats use decimals: 15% = <code style={{ color: "#8b8bbb" }}>0.15</code><br />
            • Multiple conditions in a rule = AND logic<br />
            • Rules are processed top to bottom, first match wins<br />
            • Use <code style={{ color: "#8b8bbb" }}>Continue</code> to keep processing after a match
          </div>
        </div>
      </div>
    </div>
  );
}
