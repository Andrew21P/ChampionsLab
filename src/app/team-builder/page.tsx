"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import Image from "next/image";
import { LastUpdated } from "@/components/last-updated";
import {
  Plus, X, Download, Upload, Copy, Trash2, Shield, Zap,
  ChevronDown, Check, AlertTriangle, Sparkles, Star,
  TrendingUp, Users, Brain, Target, Award, Minus, Settings2,
  Save, FolderOpen, Share2,
} from "lucide-react";
import { POKEMON_SEED, STAT_PRESETS } from "@/lib/pokemon-data";
import {
  ChampionsPokemon, TeamSlot, PokemonType, TYPE_COLORS, StatPoints,
} from "@/lib/types";
import { PokemonDetailModal } from "@/components/pokemon-detail-modal";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";
import { USAGE_DATA } from "@/lib/usage-data";
import { SearchSelect, type SearchSelectOption } from "@/components/search-select";
import {
  analyzePartialTeam,
  suggestTeammates,
  getSlotSuggestions,
  suggestSets,
  PREBUILT_TEAMS,
  NATURES,
  ITEMS,
  getAllNatures,
  getAllItems,
  predictMetaTeams,
  TOURNAMENT_TEAMS,
  TOURNAMENT_USAGE,
  CORE_PAIRS,
  type NatureName,
  type PrebuiltTeam,
  type TeammateSuggestion,
  type TeamAnalysis,
  type SlotSuggestion,
  type MetaTeamPrediction,
} from "@/lib/engine";
import {
  getSavedTeams, saveTeam, deleteTeam, deserializeTeam, saveLastTeam, getLastTeam,
  serializeTeam,
  type SavedTeam, type SavedTeamSlot,
} from "@/lib/storage";
import { deflateRaw, inflateRaw } from "pako";

const EMPTY_STAT_POINTS: StatPoints = { hp: 0, attack: 0, defense: 0, spAtk: 0, spDef: 0, speed: 0 };
const MAX_TOTAL_POINTS = 66;
const MAX_PER_STAT = 32;
const STAT_KEYS: (keyof StatPoints)[] = ["hp", "attack", "defense", "spAtk", "spDef", "speed"];
const STAT_LABELS: Record<string, string> = { hp: "HP", attack: "Atk", defense: "Def", spAtk: "SpA", spDef: "SpD", speed: "Spe" };

// ── Showdown EV ↔ SP conversion ─────────────────────────────────────────
// Showdown: 0-252 per stat (multiples of 4), 510 total
// Champions Lab: 0-32 per stat, 66 total
function evsToStatPoints(evs: StatPoints): StatPoints {
  const raw = STAT_KEYS.map(k => (evs[k] / 252) * MAX_PER_STAT);
  const result = raw.map(v => Math.floor(v));
  let total = result.reduce((a, b) => a + b, 0);
  // distribute remaining budget by highest fractional part
  const fracs = raw.map((v, i) => ({ i, f: v - result[i] }))
    .filter(x => x.f > 0)
    .sort((a, b) => b.f - a.f);
  for (const { i } of fracs) {
    if (total >= MAX_TOTAL_POINTS) break;
    if (result[i] < MAX_PER_STAT) { result[i]++; total++; }
  }
  const sp: StatPoints = { ...EMPTY_STAT_POINTS };
  STAT_KEYS.forEach((k, i) => { sp[k] = result[i]; });
  return sp;
}

function statPointsToEVs(sp: StatPoints): StatPoints {
  const result = STAT_KEYS.map(k => {
    const ev = Math.round((sp[k] / MAX_PER_STAT) * 252);
    return Math.min(252, Math.round(ev / 4) * 4);
  });
  let total = result.reduce((a, b) => a + b, 0);
  while (total > 510) {
    let minIdx = -1, minVal = Infinity;
    for (let i = 0; i < result.length; i++) {
      if (result[i] > 0 && result[i] < minVal) { minVal = result[i]; minIdx = i; }
    }
    if (minIdx === -1) break;
    result[minIdx] = Math.max(0, result[minIdx] - 4);
    total = result.reduce((a, b) => a + b, 0);
  }
  const evs: StatPoints = { ...EMPTY_STAT_POINTS };
  STAT_KEYS.forEach((k, i) => { evs[k] = result[i]; });
  return evs;
}

function createEmptySlot(): TeamSlot {
  return { pokemon: null, moves: [], statPoints: { ...EMPTY_STAT_POINTS } };
}

// Type effectiveness for coverage chart
const TYPE_CHART: Record<PokemonType, Record<string, number>> = {
  normal: { rock: 0.5, ghost: 0, steel: 0.5 },
  fire: { fire: 0.5, water: 0.5, grass: 2, ice: 2, bug: 2, rock: 0.5, dragon: 0.5, steel: 2 },
  water: { fire: 2, water: 0.5, grass: 0.5, ground: 2, rock: 2, dragon: 0.5 },
  electric: { water: 2, electric: 0.5, grass: 0.5, ground: 0, flying: 2, dragon: 0.5 },
  grass: { fire: 0.5, water: 2, grass: 0.5, poison: 0.5, ground: 2, flying: 0.5, bug: 0.5, rock: 2, dragon: 0.5, steel: 0.5 },
  ice: { fire: 0.5, water: 0.5, grass: 2, ice: 0.5, ground: 2, flying: 2, dragon: 2, steel: 0.5 },
  fighting: { normal: 2, ice: 2, poison: 0.5, flying: 0.5, psychic: 0.5, bug: 0.5, rock: 2, ghost: 0, dark: 2, steel: 2, fairy: 0.5 },
  poison: { grass: 2, poison: 0.5, ground: 0.5, rock: 0.5, ghost: 0.5, steel: 0, fairy: 2 },
  ground: { fire: 2, electric: 2, grass: 0.5, poison: 2, flying: 0, bug: 0.5, rock: 2, steel: 2 },
  flying: { electric: 0.5, grass: 2, fighting: 2, bug: 2, rock: 0.5, steel: 0.5 },
  psychic: { fighting: 2, poison: 2, psychic: 0.5, dark: 0, steel: 0.5 },
  bug: { fire: 0.5, grass: 2, fighting: 0.5, poison: 0.5, flying: 0.5, psychic: 2, ghost: 0.5, dark: 2, steel: 0.5, fairy: 0.5 },
  rock: { fire: 2, ice: 2, fighting: 0.5, ground: 0.5, flying: 2, bug: 2, steel: 0.5 },
  ghost: { normal: 0, psychic: 2, ghost: 2, dark: 0.5 },
  dragon: { dragon: 2, steel: 0.5, fairy: 0 },
  dark: { fighting: 0.5, psychic: 2, ghost: 2, dark: 0.5, fairy: 0.5 },
  steel: { fire: 0.5, water: 0.5, electric: 0.5, ice: 2, rock: 2, steel: 0.5, fairy: 2 },
  fairy: { fire: 0.5, fighting: 2, poison: 0.5, dragon: 2, dark: 2, steel: 0.5 },
};

const ALL_TYPES: PokemonType[] = [
  "normal", "fire", "water", "electric", "grass", "ice",
  "fighting", "poison", "ground", "flying", "psychic", "bug",
  "rock", "ghost", "dragon", "dark", "steel", "fairy",
];

export default function TeamBuilderPage() {
  const [slots, setSlots] = useState<TeamSlot[]>(
    Array.from({ length: 6 }, createEmptySlot)
  );
  const [teamName, setTeamName] = useState("My Team");
  const [activeSlot, setActiveSlot] = useState<number | null>(null);
  const [showPokemonPicker, setShowPokemonPicker] = useState(false);
  const [pickerSearch, setPickerSearch] = useState("");
  const [showExport, setShowExport] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [importText, setImportText] = useState("");
  const [importError, setImportError] = useState("");
  const [selectedPokemonDetail, setSelectedPokemonDetail] = useState<ChampionsPokemon | null>(null);
  const [selectedSlotIndex, setSelectedSlotIndex] = useState<number | null>(null);
  const [savedTeams, setSavedTeams] = useState<SavedTeam[]>([]);
  const [currentTeamId, setCurrentTeamId] = useState<string | undefined>();
  const [showSavedTeams, setShowSavedTeams] = useState(false);
  const [saveConfirm, setSaveConfirm] = useState(false);
  const [shuffledTeams, setShuffledTeams] = useState<PrebuiltTeam[]>([]);
  const [showShare, setShowShare] = useState(false);
  const [shareImageUrl, setShareImageUrl] = useState<string | null>(null);

  // Engine-predicted meta teams (computed once)
  const metaTeams = useMemo(() => predictMetaTeams(), []);

  // Shuffle suggested teams on mount
  useEffect(() => {
    const shuffled = [...PREBUILT_TEAMS].sort(() => Math.random() - 0.5);
    setShuffledTeams(shuffled);
  }, []);

  // Build shareable URL - store team on server, return short link
  const buildShareUrl = useCallback(async () => {
    const filled = slots.filter(s => s.pokemon);
    if (filled.length === 0) return "";
    const data = {
      n: teamName,
      s: serializeTeam(slots).map(s => ({
        p: s.pokemonId,
        a: s.ability,
        t: s.nature,
        m: s.moves,
        sp: [s.statPoints.hp, s.statPoints.attack, s.statPoints.defense, s.statPoints.spAtk, s.statPoints.spDef, s.statPoints.speed],
        te: s.teraType,
        i: s.item,
        mg: s.isMega,
      })),
    };
    try {
      const res = await fetch("/api/share", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        const { id } = await res.json();
        return `${window.location.origin}/team-builder?s=${id}`;
      }
    } catch { /* fall through to compressed fallback */ }
    // Fallback: compressed URL
    const compressed = deflateRaw(JSON.stringify(data));
    const b64 = btoa(String.fromCharCode(...compressed))
      .replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    return `${window.location.origin}/team-builder?t=${b64}`;
  }, [slots, teamName]);

  // Load saved teams on mount + restore last team if available OR load from share URL
  useEffect(() => {
    setSavedTeams(getSavedTeams());

    // Check for shared team URL first
    const params = new URLSearchParams(window.location.search);
    const shortId = params.get("s");
    const teamParam = params.get("t") || params.get("team"); // "t" = compressed, "team" = legacy

    const restoreTeam = (data: { n?: string; s: Array<{ p: number; a?: string; t?: string; m: string[]; sp: number[]; te?: string; i?: string; mg?: boolean; mgi?: number }> }) => {
      const restored: SavedTeamSlot[] = data.s.map(s => ({
        pokemonId: s.p,
        ability: s.a,
        nature: s.t,
        moves: s.m || [],
        statPoints: { hp: s.sp?.[0] || 0, attack: s.sp?.[1] || 0, defense: s.sp?.[2] || 0, spAtk: s.sp?.[3] || 0, spDef: s.sp?.[4] || 0, speed: s.sp?.[5] || 0 },
        teraType: s.te as PokemonType | undefined,
        item: s.i,
        isMega: s.mg,
        megaFormIndex: s.mgi,
      }));
      setSlots(deserializeTeam(restored));
      setTeamName(data.n || "Shared Team");
      window.history.replaceState({}, "", "/team-builder");
    };

    // Short link: fetch from API
    if (shortId) {
      fetch(`/api/share/${encodeURIComponent(shortId)}`)
        .then(r => r.ok ? r.json() : null)
        .then(data => { if (data?.s) restoreTeam(data); })
        .catch(() => {});
      return;
    }

    if (teamParam) {
      try {
        let data;
        if (params.has("t")) {
          // Compressed: URL-safe base64 → deflateRaw → JSON
          const b64 = teamParam.replace(/-/g, "+").replace(/_/g, "/");
          const binary = atob(b64);
          const bytes = new Uint8Array(binary.length);
          for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
          data = JSON.parse(new TextDecoder().decode(inflateRaw(bytes)));
        } else {
          // Legacy uncompressed
          data = JSON.parse(atob(teamParam));
        }
        if (data.s && Array.isArray(data.s)) {
          restoreTeam(data);
          return;
        }
      } catch { /* invalid param, fall through to normal load */ }
    }

    const last = getLastTeam();
    if (last && last.slots.length > 0) {
      setSlots(deserializeTeam(last.slots));
      setTeamName(last.name);
    }
  }, []);

  // Auto-save last worked team
  useEffect(() => {
    const filledCount = slots.filter(s => s.pokemon).length;
    if (filledCount > 0) {
      saveLastTeam(teamName, slots);
    }
  }, [slots, teamName]);

  const handleSaveTeam = () => {
    trackEvent("save_team", "team_builder", teamName, filledSlots.length);
    const team = saveTeam(teamName, slots, currentTeamId);
    setCurrentTeamId(team.id);
    setSavedTeams(getSavedTeams());
    setSaveConfirm(true);
    setTimeout(() => setSaveConfirm(false), 2000);
  };

  const handleLoadSavedTeam = (team: SavedTeam) => {
    trackEvent("load_saved_team", "team_builder", team.name);
    const restoredSlots = deserializeTeam(team.slots);
    setSlots(restoredSlots);
    setTeamName(team.name);
    setCurrentTeamId(team.id);
    setShowSavedTeams(false);
  };

  const handleDeleteSavedTeam = (id: string) => {
    trackEvent("delete_saved_team", "team_builder");
    deleteTeam(id);
    setSavedTeams(getSavedTeams());
    if (currentTeamId === id) setCurrentTeamId(undefined);
  };

  const generateShareImage = async () => {
    trackEvent("share_team", "team_builder", teamName, filledSlots.length);
    const filled = slots.filter(s => s.pokemon);
    if (filled.length === 0) return;

    const W = 1200, cardH = 200, headerH = 140, footerH = 60;
    const H = headerH + Math.ceil(filled.length / 2) * cardH + footerH;
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d")!;

    // Background gradient
    const grad = ctx.createLinearGradient(0, 0, W, H);
    grad.addColorStop(0, "#1e1b4b");
    grad.addColorStop(0.5, "#312e81");
    grad.addColorStop(1, "#0c4a6e");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // Subtle grid pattern
    ctx.strokeStyle = "rgba(255,255,255,0.03)";
    ctx.lineWidth = 1;
    for (let x = 0; x < W; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
    for (let y = 0; y < H; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

    // Header LEFT - Team name + subtitle
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 38px Inter, system-ui, sans-serif";
    ctx.fillText(teamName, 40, 55);

    ctx.font = "15px Inter, system-ui, sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.55)";
    ctx.fillText(`${filled.length} Pokémon · The Ultimate Competitive Pokémon Companion`, 40, 85);

    // Accent line
    const accentGrad = ctx.createLinearGradient(40, 100, 500, 100);
    accentGrad.addColorStop(0, "#8b5cf6");
    accentGrad.addColorStop(1, "#06b6d4");
    ctx.fillStyle = accentGrad;
    ctx.fillRect(40, 100, 460, 3);

    // Header RIGHT - Logo + brand + URL (right-aligned)
    const logo = await new Promise<HTMLImageElement | null>((resolve) => {
      const img = new window.Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
      img.src = "/logo.png";
    });

    ctx.textAlign = "right";
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 36px Inter, system-ui, sans-serif";
    const brandText = "Champions Lab";
    const brandWidth = ctx.measureText(brandText).width;
    ctx.fillText(brandText, W - 40, 52);

    ctx.font = "bold 18px Inter, system-ui, sans-serif";
    ctx.fillStyle = "#a78bfa";
    ctx.fillText("championslab.xyz", W - 40, 80);

    if (logo) {
      const logoSize = 80;
      ctx.drawImage(logo, W - 40 - brandWidth - logoSize - 14, 10, logoSize, logoSize);
    }
    ctx.textAlign = "left";

    // Load sprites as images
    const spritePromises = filled.map(s => {
      return new Promise<HTMLImageElement | null>((resolve) => {
        const img = new window.Image();
        img.crossOrigin = "anonymous";
        img.onload = () => resolve(img);
        img.onerror = () => resolve(null);
        img.src = s.pokemon!.sprite;
      });
    });
    const sprites = await Promise.all(spritePromises);

    // Draw Pokémon cards (2 per row)
    filled.forEach((s, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = 30 + col * 580;
      const y = headerH + row * cardH;
      const p = s.pokemon!;

      // Card background
      ctx.fillStyle = "rgba(255,255,255,0.06)";
      ctx.beginPath();
      ctx.roundRect(x, y + 10, 560, cardH - 20, 16);
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.1)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Sprite
      const sprite = sprites[i];
      if (sprite) {
        ctx.drawImage(sprite, x + 15, y + 25, 80, 80);
      }

      // Name + Item
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 20px Inter, system-ui, sans-serif";
      ctx.fillText(p.name, x + 110, y + 48);
      if (s.item) {
        const nameWidth = ctx.measureText(p.name).width;
        ctx.font = "13px Inter, system-ui, sans-serif";
        ctx.fillStyle = "rgba(255,255,255,0.5)";
        ctx.fillText(`@ ${s.item}`, x + 110 + nameWidth + 10, y + 48);
      }

      // Nature + Ability
      ctx.font = "13px Inter, system-ui, sans-serif";
      ctx.fillStyle = "rgba(255,255,255,0.7)";
      const info = [s.nature && `${s.nature} Nature`, s.ability].filter(Boolean).join(" · ");
      ctx.fillText(info, x + 110, y + 70);

      // Moves
      ctx.font = "12px Inter, system-ui, sans-serif";
      s.moves.forEach((m, mi) => {
        const mx = x + 110 + (mi >= 2 ? 140 : 0);
        const my = y + 95 + (mi % 2) * 22;
        ctx.fillStyle = "rgba(255,255,255,0.15)";
        ctx.beginPath();
        ctx.roundRect(mx, my - 13, 130, 20, 6);
        ctx.fill();
        ctx.fillStyle = "rgba(255,255,255,0.85)";
        ctx.fillText(`• ${m}`, mx + 6, my);
      });

      // Stat Points summary
      const sp = s.statPoints;
      const totalSP = Object.values(sp).reduce((a, b) => a + b, 0);
      if (totalSP > 0) {
        ctx.font = "11px Inter, system-ui, sans-serif";
        ctx.fillStyle = "rgba(255,255,255,0.4)";
        const spText = STAT_KEYS.filter(k => sp[k] > 0).map(k => `${sp[k]} ${STAT_LABELS[k]}`).join(" / ");
        ctx.fillText(spText, x + 110, y + 155);
      }

      // Type badges
      p.types.forEach((t, ti) => {
        const tx = x + 400 + ti * 60;
        const colors: Record<string, string> = {
          fire: "#ef4444", water: "#3b82f6", grass: "#22c55e", electric: "#eab308",
          psychic: "#ec4899", ice: "#67e8f9", dragon: "#7c3aed", dark: "#525252",
          fairy: "#f472b6", fighting: "#dc2626", poison: "#a855f7", ground: "#a16207",
          flying: "#93c5fd", bug: "#84cc16", rock: "#78716c", ghost: "#6d28d9",
          steel: "#94a3b8", normal: "#a1a1aa",
        };
        ctx.fillStyle = colors[t] || "#888";
        ctx.beginPath();
        ctx.roundRect(tx, y + 30, 52, 22, 8);
        ctx.fill();
        ctx.fillStyle = "#fff";
        ctx.font = "bold 10px Inter, system-ui, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(t.toUpperCase(), tx + 26, y + 45);
        ctx.textAlign = "left";
      });
    });

    // Footer
    ctx.fillStyle = "rgba(255,255,255,0.05)";
    ctx.fillRect(0, H - footerH, W, footerH);
    ctx.fillStyle = "rgba(255,255,255,0.3)";
    ctx.font = "13px Inter, system-ui, sans-serif";
    ctx.fillText("Built with Champions Lab · championslab.xyz", 40, H - 22);

    ctx.fillStyle = "#8b5cf6";
    ctx.font = "bold 16px Inter, system-ui, sans-serif";
    ctx.textAlign = "right";
    ctx.fillText("⚡ Champions Lab", W - 40, H - 22);
    ctx.textAlign = "left";

    const dataUrl = canvas.toDataURL("image/png");
    setShareImageUrl(dataUrl);
    setUrlCopied(false);
    setShowShare(true);
    buildShareUrl().then(url => setShareUrl(url));
  };

  const downloadShareImage = () => {
    trackEvent("download_share_image", "team_builder", teamName);
    if (!shareImageUrl) return;
    const a = document.createElement("a");
    a.href = shareImageUrl;
    a.download = `${teamName.replace(/\s+/g, "_")}_team.png`;
    a.click();
  };

  const [shareUrl, setShareUrl] = useState("");
  const [urlCopied, setUrlCopied] = useState(false);

  const copyShareUrl = async () => {
    trackEvent("copy_share_url", "team_builder", teamName);
    if (!shareUrl) return;
    await navigator.clipboard.writeText(shareUrl);
    setUrlCopied(true);
    setTimeout(() => setUrlCopied(false), 2000);
  };

  const filledSlots = slots.filter((s) => s.pokemon !== null);
  const usedPokemonIds = filledSlots.map((s) => s.pokemon!.id);
  const teamPokemon = filledSlots.map((s) => s.pokemon!);

  // Engine-powered analysis
  const teamAnalysis = useMemo<TeamAnalysis>(() => {
    return analyzePartialTeam(teamPokemon);
  }, [teamPokemon.map(p => p.id).join(",")]);

  const teammates = useMemo<TeammateSuggestion[]>(() => {
    if (teamPokemon.length >= 6) return [];
    return suggestTeammates(teamPokemon, 8);
  }, [teamPokemon.map(p => p.id).join(",")]);

  const slotSuggestion = useMemo<SlotSuggestion | null>(() => {
    if (selectedSlotIndex === null) return null;
    const slot = slots[selectedSlotIndex];
    if (!slot?.pokemon) return null;
    const otherPokemon = teamPokemon.filter(p => p.id !== slot.pokemon!.id);
    return getSlotSuggestions(slot.pokemon, otherPokemon);
  }, [selectedSlotIndex, teamPokemon.map(p => p.id).join(",")]);

  // Validation
  const validationErrors: string[] = [];
  const duplicateCheck = new Set<number>();
  slots.forEach((s) => {
    if (s.pokemon) {
      if (duplicateCheck.has(s.pokemon.id)) {
        validationErrors.push(`Duplicate: ${s.pokemon.name}`);
      }
      duplicateCheck.add(s.pokemon.id);
    }
  });
  const megaCount = slots.filter((s) => s.isMega).length;
  if (megaCount > 1) validationErrors.push("Only 1 Mega Evolution allowed per team");

  const addPokemon = (pokemon: ChampionsPokemon) => {
    trackEvent("add_pokemon", "team_builder", pokemon.name);
    if (activeSlot !== null) {
      const sets = suggestSets(pokemon, teamPokemon);
      const bestSet = sets.length > 0 ? sets[0].set : null;
      const newSlots = [...slots];
      newSlots[activeSlot] = {
        pokemon,
        ability: bestSet?.ability ?? pokemon.abilities[0]?.name,
        nature: bestSet?.nature ?? "Adamant",
        moves: bestSet?.moves ?? pokemon.moves.slice(0, 4).map((m) => m.name),
        statPoints: bestSet?.sp ?? { ...EMPTY_STAT_POINTS },
        item: bestSet?.item,
      };
      setSlots(newSlots);
      setShowPokemonPicker(false);
      setSelectedSlotIndex(activeSlot);
      setActiveSlot(null);
    }
  };

  const removeSlot = (index: number) => {
    trackEvent("remove_pokemon", "team_builder", slots[index]?.pokemon?.name);
    const newSlots = [...slots];
    newSlots[index] = createEmptySlot();
    setSlots(newSlots);
    if (selectedSlotIndex === index) setSelectedSlotIndex(null);
  };

  const loadPrebuiltTeam = (team: PrebuiltTeam) => {
    trackEvent("load_prebuilt_team", "team_builder", team.name);
    const isMegaItem = (item: string) => item.endsWith("ite") || item.endsWith("ite X") || item.endsWith("ite Y") || item.endsWith("ite Z");
    let teamHasMega = false;
    const newSlots = team.pokemonIds.map((id, i) => {
      const pokemon = POKEMON_SEED.find(p => p.id === id);
      if (!pokemon) return createEmptySlot();
      const set = team.sets[i];
      let isMega = false;
      let megaFormIndex = 0;
      if (pokemon.hasMega && !teamHasMega && set?.item && isMegaItem(set.item)) {
        isMega = true;
        teamHasMega = true;
        const megaForms = pokemon.forms?.filter(f => f.isMega) ?? [];
        const idx = megaForms.findIndex(f => f.abilities.some(a => a.name === set.ability));
        megaFormIndex = idx >= 0 ? idx : 0;
      }
      return {
        pokemon,
        ability: set?.ability ?? pokemon.abilities[0]?.name,
        moves: set?.moves ?? pokemon.moves.slice(0, 4).map(m => m.name),
        statPoints: set?.sp ?? { ...EMPTY_STAT_POINTS },
        item: set?.item,
        isMega,
        megaFormIndex,
      } as TeamSlot;
    });
    // Pad to 6 if needed
    while (newSlots.length < 6) newSlots.push(createEmptySlot());
    setSlots(newSlots);
    setTeamName(team.name);
    setSelectedSlotIndex(0);
  };

  const loadMetaTeam = (meta: MetaTeamPrediction) => {
    trackEvent("load_meta_team", "team_builder", meta.name);
    const isMegaItem = (item: string) => item.endsWith("ite") || item.endsWith("ite X") || item.endsWith("ite Y") || item.endsWith("ite Z");
    let teamHasMega = false;
    const newSlots = meta.pokemonIds.map((id) => {
      const pokemon = POKEMON_SEED.find(p => p.id === id);
      if (!pokemon) return createEmptySlot();
      const sets = suggestSets(pokemon, []);
      const bestSet = sets.length > 0 ? sets[0].set : null;
      // Auto-assign mega if pokemon has mega, no other mega on team yet, and best set uses mega stone
      let isMega = false;
      let megaFormIndex = 0;
      if (pokemon.hasMega && !teamHasMega) {
        const usageSets = USAGE_DATA[pokemon.id] ?? [];
        const megaSet = usageSets.find(s => isMegaItem(s.item));
        if (megaSet) {
          isMega = true;
          teamHasMega = true;
          const megaForms = pokemon.forms?.filter(f => f.isMega) ?? [];
          const idx = megaForms.findIndex(f => f.abilities.some(a => a.name === megaSet.ability));
          megaFormIndex = idx >= 0 ? idx : 0;
          const megaAbility = megaForms[megaFormIndex]?.abilities?.[0]?.name;
          return {
            pokemon,
            ability: megaAbility ?? megaSet.ability,
            nature: megaSet.nature,
            moves: megaSet.moves,
            statPoints: megaSet.sp ? { ...megaSet.sp } : { ...EMPTY_STAT_POINTS },
            item: megaSet.item,
            isMega: true,
            megaFormIndex,
          } as TeamSlot;
        }
      }
      return {
        pokemon,
        ability: bestSet?.ability ?? pokemon.abilities[0]?.name,
        nature: bestSet?.nature ?? "Adamant",
        moves: bestSet?.moves ?? pokemon.moves.slice(0, 4).map(m => m.name),
        statPoints: bestSet?.sp ?? { ...EMPTY_STAT_POINTS },
        item: bestSet?.item,
        isMega,
        megaFormIndex,
      } as TeamSlot;
    });
    while (newSlots.length < 6) newSlots.push(createEmptySlot());
    setSlots(newSlots);
    setTeamName(meta.name);
    setSelectedSlotIndex(0);
  };

  const addSuggestedTeammate = (pokemon: ChampionsPokemon) => {
    trackEvent("add_suggested_teammate", "team_builder", pokemon.name);
    const emptyIndex = slots.findIndex(s => !s.pokemon);
    if (emptyIndex === -1) return;
    const sets = suggestSets(pokemon, teamPokemon);
    const bestSet = sets.length > 0 ? sets[0].set : null;
    const isMegaItem = (item: string) => item.endsWith("ite") || item.endsWith("ite X") || item.endsWith("ite Y") || item.endsWith("ite Z");
    const teamAlreadyHasMega = slots.some(s => s.isMega);
    let isMega = false;
    let megaFormIndex = 0;
    const setItem = bestSet?.item;
    if (pokemon.hasMega && !teamAlreadyHasMega && setItem && isMegaItem(setItem)) {
      isMega = true;
      const megaForms = pokemon.forms?.filter(f => f.isMega) ?? [];
      const idx = megaForms.findIndex(f => f.abilities.some(a => a.name === bestSet?.ability));
      megaFormIndex = idx >= 0 ? idx : 0;
    }
    const newSlots = [...slots];
    newSlots[emptyIndex] = {
      pokemon,
      ability: bestSet?.ability ?? pokemon.abilities[0]?.name,
      nature: bestSet?.nature ?? "Adamant",
      moves: bestSet?.moves ?? pokemon.moves.slice(0, 4).map(m => m.name),
      statPoints: bestSet?.sp ?? { ...EMPTY_STAT_POINTS },
      item: bestSet?.item,
      isMega,
      megaFormIndex,
    };
    setSlots(newSlots);
    setSelectedSlotIndex(emptyIndex);
  };

  const applySet = (slotIndex: number, set: { ability?: string; moves?: string[]; sp?: StatPoints; nature?: string; item?: string }) => {
    trackEvent("apply_set", "team_builder", slots[slotIndex]?.pokemon?.name);
    const newSlots = [...slots];
    const slot = { ...newSlots[slotIndex] };
    if (set.ability) slot.ability = set.ability;
    if (set.moves) slot.moves = set.moves;
    if (set.sp) slot.statPoints = { ...set.sp };
    if (set.item) slot.item = set.item;
    if (set.nature) slot.nature = set.nature;
    // Auto-detect mega form from item
    const isMegaItem = (item: string) => item.endsWith("ite") || item.endsWith("ite X") || item.endsWith("ite Y") || item.endsWith("ite Z");
    if (set.item && isMegaItem(set.item) && slot.pokemon?.hasMega) {
      slot.isMega = true;
      const megaForms = slot.pokemon.forms?.filter(f => f.isMega) ?? [];
      const matchedIdx = megaForms.findIndex(f => f.abilities.some(a => a.name === set.ability));
      slot.megaFormIndex = matchedIdx >= 0 ? matchedIdx : 0;
    } else if (set.item && !isMegaItem(set.item)) {
      slot.isMega = false;
      slot.megaFormIndex = 0;
    }
    newSlots[slotIndex] = slot;
    setSlots(newSlots);
  };

  const updateSlot = (index: number, updates: Partial<TeamSlot>) => {
    const newSlots = [...slots];
    newSlots[index] = { ...newSlots[index], ...updates };
    setSlots(newSlots);
  };

  const updateMove = (slotIndex: number, moveIndex: number, moveName: string) => {
    const newSlots = [...slots];
    const moves = [...newSlots[slotIndex].moves];
    moves[moveIndex] = moveName;
    newSlots[slotIndex] = { ...newSlots[slotIndex], moves };
    setSlots(newSlots);
  };

  const updateSP = (slotIndex: number, stat: keyof StatPoints, delta: number) => {
    const sp = { ...slots[slotIndex].statPoints };
    const current = sp[stat];
    const total = Object.values(sp).reduce((a, b) => a + b, 0);
    const newValue = Math.max(0, Math.min(MAX_PER_STAT, current + delta));
    const newTotal = total - current + newValue;
    if (newTotal > MAX_TOTAL_POINTS) return;
    sp[stat] = newValue;
    updateSlot(slotIndex, { statPoints: sp });
  };

  const setSPDirect = (slotIndex: number, stat: keyof StatPoints, value: number) => {
    const sp = { ...slots[slotIndex].statPoints };
    const total = Object.values(sp).reduce((a, b) => a + b, 0);
    const clamped = Math.max(0, Math.min(MAX_PER_STAT, value));
    const newTotal = total - sp[stat] + clamped;
    if (newTotal > MAX_TOTAL_POINTS) return;
    sp[stat] = clamped;
    updateSlot(slotIndex, { statPoints: sp });
  };

  const allItemNames = useMemo(() => getAllItems(), []);
  const allNatureNames = useMemo(() => getAllNatures(), []);

  const openPicker = (index: number) => {
    setActiveSlot(index);
    setPickerSearch("");
    setShowPokemonPicker(true);
  };

  // Coverage calculation
  const teamTypes = filledSlots.flatMap((s) => s.pokemon!.types);
  const offensiveCoverage: Record<string, number> = {};
  ALL_TYPES.forEach((defType) => {
    let best = 1;
    filledSlots.forEach((s) => {
      s.pokemon!.moves.forEach((move) => {
        const eff = TYPE_CHART[move.type]?.[defType] ?? 1;
        if (eff > best) best = eff;
      });
    });
    offensiveCoverage[defType] = best;
  });

  // Import from Pokepaste format
  const importPokepaste = (text: string) => {
    trackEvent("import_pokepaste", "team_builder");
    const isMegaItem = (item: string) => item.endsWith("ite") || item.endsWith("ite X") || item.endsWith("ite Y") || item.endsWith("ite Z");
    const blocks = text.trim().split(/\n\n+/).filter(Boolean);
    if (blocks.length === 0) { setImportError("No Pokémon found in the paste."); return; }
    const newSlots: TeamSlot[] = [];
    let teamHasMega = false;
    for (const block of blocks.slice(0, 6)) {
      const lines = block.split("\n").map(l => l.trim()).filter(Boolean);
      if (lines.length === 0) continue;
      // First line: "Name @ Item" or just "Name"
      const firstLine = lines[0];
      let pokeName = firstLine;
      let item: string | undefined;
      if (firstLine.includes(" @ ")) {
        const parts = firstLine.split(" @ ");
        pokeName = parts[0].trim();
        item = parts[1].trim();
      }
      // Handle nicknamed Pokémon: "Nickname (Species)"
      const parenMatch = pokeName.match(/\((.+?)\)/);
      if (parenMatch) pokeName = parenMatch[1].trim();
      // Strip gender suffix
      pokeName = pokeName.replace(/\s*\((?:M|F)\)\s*$/, "").trim();
      // Handle Showdown mega suffixes: "Charizard-Mega-X" → "Charizard", "Lucario-Mega" → "Lucario"
      let showdownMegaSuffix: string | null = null;
      const megaXY = pokeName.match(/^(.+)-Mega-([XY])$/i);
      const megaPlain = pokeName.match(/^(.+)-Mega$/i);
      if (megaXY) {
        pokeName = megaXY[1].trim();
        showdownMegaSuffix = megaXY[2].toUpperCase();
      } else if (megaPlain) {
        pokeName = megaPlain[1].trim();
        showdownMegaSuffix = "";
      }
      const pokemon = POKEMON_SEED.find(p => p.name.toLowerCase() === pokeName.toLowerCase());
      if (!pokemon) continue;
      let ability: string | undefined;
      let nature: string | undefined;
      const moves: string[] = [];
      const sp: StatPoints = { hp: 0, attack: 0, defense: 0, spAtk: 0, spDef: 0, speed: 0 };
      let isNativeSP = false;
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        if (line.startsWith("Ability:")) {
          ability = line.replace("Ability:", "").trim();
        } else if (line.endsWith("Nature")) {
          nature = line.replace("Nature", "").trim();
        } else if (line.startsWith("- ")) {
          moves.push(line.slice(2).trim());
        } else if (line.startsWith("EVs:") || line.startsWith("Stat Points:")) {
          const isStatPoints = line.startsWith("Stat Points:");
          const evStr = line.replace(/^(?:EVs|Stat Points):/, "").trim();
          const evParts = evStr.split("/").map(s => s.trim());
          for (const part of evParts) {
            const m = part.match(/(\d+)\s+(HP|Atk|Def|SpA|SpD|Spe)/i);
            if (m) {
              const val = parseInt(m[1]);
              const stat = m[2].toLowerCase();
              if (stat === "hp") sp.hp = val;
              else if (stat === "atk") sp.attack = val;
              else if (stat === "def") sp.defense = val;
              else if (stat === "spa") sp.spAtk = val;
              else if (stat === "spd") sp.spDef = val;
              else if (stat === "spe") sp.speed = val;
            }
          }
          // If "Stat Points:" with small values, treat as native SP (no conversion)
          const maxVal = Math.max(sp.hp, sp.attack, sp.defense, sp.spAtk, sp.spDef, sp.speed);
          if (isStatPoints && maxVal <= MAX_PER_STAT) isNativeSP = true;
        }
      }
      // Convert Showdown EVs to our stat point system (skip if already native SP)
      const converted = isNativeSP ? sp : evsToStatPoints(sp);
      // Auto-detect mega from item or Showdown suffix
      let isMega = false;
      let megaFormIndex = 0;
      if (pokemon.hasMega && !teamHasMega) {
        const megaForms = pokemon.forms?.filter(f => f.isMega) ?? [];
        if (showdownMegaSuffix !== null) {
          // Came from Showdown mega name like "Charizard-Mega-X"
          isMega = true;
          teamHasMega = true;
          if (showdownMegaSuffix === "X") megaFormIndex = 0;
          else if (showdownMegaSuffix === "Y") megaFormIndex = megaForms.length > 1 ? 1 : 0;
          else megaFormIndex = 0;
          // Auto-assign mega stone if missing
          if (!item) {
            const megaSet = (USAGE_DATA[pokemon.id] ?? []).find(s => isMegaItem(s.item) && s.ability === megaForms[megaFormIndex]?.abilities?.[0]?.name);
            item = megaSet?.item;
          }
          // Auto-assign mega ability if missing
          if (!ability && megaForms[megaFormIndex]) {
            ability = megaForms[megaFormIndex].abilities[0]?.name;
          }
        } else if (item && isMegaItem(item)) {
          // Detected mega from item (standard Showdown format)
          isMega = true;
          teamHasMega = true;
          if (ability) {
            const idx = megaForms.findIndex(f => f.abilities.some(a => a.name === ability));
            megaFormIndex = idx >= 0 ? idx : 0;
          } else {
            megaFormIndex = 0;
            ability = megaForms[0]?.abilities?.[0]?.name;
          }
        }
      }
      newSlots.push({
        pokemon,
        ability: ability ?? pokemon.abilities[0]?.name,
        nature: nature ?? "Adamant",
        moves: moves.length > 0 ? moves.slice(0, 4) : pokemon.moves.slice(0, 4).map(m => m.name),
        statPoints: converted,
        item,
        isMega,
        megaFormIndex,
      });
    }
    if (newSlots.length === 0) { setImportError("Could not match any Pokémon names. Make sure it's in Pokepaste/Showdown format."); return; }
    while (newSlots.length < 6) newSlots.push(createEmptySlot());
    setSlots(newSlots);
    setSelectedSlotIndex(0);
    setShowImport(false);
    setImportText("");
    setImportError("");
  };

  // Export to Pokepaste format
  const exportPokepaste = () => {
    const isMegaItem = (item: string) => item.endsWith("ite") || item.endsWith("ite X") || item.endsWith("ite Y") || item.endsWith("ite Z");
    return filledSlots
      .map((s) => {
        const p = s.pokemon!;
        // Use Showdown mega naming for mega Pokemon (e.g., Charizard-Mega-Y)
        let exportName = p.name;
        if (s.isMega && p.hasMega) {
          const megaForms = p.forms?.filter(f => f.isMega) ?? [];
          if (megaForms.length > 1) {
            // Multi-form mega: Charizard-Mega-X or Charizard-Mega-Y
            exportName = `${p.name}-Mega-${s.megaFormIndex === 1 ? "Y" : "X"}`;
          } else if (megaForms.length === 1) {
            exportName = `${p.name}-Mega`;
          }
        }
        const nameLine = s.item ? `${exportName} @ ${s.item}` : exportName;
        const lines = [nameLine];
        if (s.ability) lines.push(`Ability: ${s.ability}`);
        if (s.nature) lines.push(`${s.nature} Nature`);

        lines.push(`Level: 50`);
        lines.push(`IVs: 31 HP / 31 Atk / 31 Def / 31 SpA / 31 SpD / 31 Spe`);
        // Convert our stat points to Showdown EVs for compatibility
        const evs = statPointsToEVs(s.statPoints);
        const evParts = STAT_KEYS
          .map(k => ({ val: evs[k], label: STAT_LABELS[k] }))
          .filter(e => e.val > 0)
          .map(e => `${e.val} ${e.label}`);
        if (evParts.length > 0) lines.push(`EVs: ${evParts.join(" / ")}`);
        s.moves.forEach((m) => lines.push(`- ${m}`));
        return lines.join("\n");
      })
      .join("\n\n");
  };

  const copyToClipboard = () => {
    trackEvent("export_pokepaste", "team_builder");
    navigator.clipboard.writeText(exportPokepaste());
  };

  const filteredPicker = POKEMON_SEED.filter(
    (p) =>
      !usedPokemonIds.includes(p.id) &&
      (pickerSearch === "" ||
        p.name.toLowerCase().includes(pickerSearch.toLowerCase()) ||
        p.types.some((t) => t.includes(pickerSearch.toLowerCase())))
  );

  return (
    <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8 overflow-x-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 min-w-0">
            <div className="shrink-0">
              <h1 className="text-3xl font-bold">
                <span className="bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-transparent">
                  Team Builder
                </span>
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Build your team. Click a slot to customize moves, nature, items &amp; EVs.
              </p>
              <div className="flex items-center gap-2 mt-1.5">
                <a href="/battle-bot" className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider bg-gradient-to-r from-amber-400/15 to-yellow-500/15 border border-amber-400/30 text-amber-700 hover:border-amber-400/50 transition-all">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                  Powered by 2M+ Battle Engine
                </a>
                <LastUpdated page="team-builder" />
              </div>
            </div>
            <input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="px-4 py-2 rounded-xl glass border border-gray-200 focus:border-violet-500/50 focus:outline-none text-lg font-semibold bg-transparent w-full sm:w-64"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:overflow-visible sm:flex-wrap">
            <button
              onClick={generateShareImage}
              disabled={filledSlots.length === 0}
              className="px-5 py-2 text-sm rounded-xl font-semibold flex items-center gap-2 bg-gradient-to-r from-violet-600 to-cyan-600 text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-105 transition-all disabled:opacity-40 disabled:hover:scale-100 shrink-0"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
            <button
              onClick={handleSaveTeam}
              disabled={filledSlots.length === 0}
              className={cn(
                "px-4 py-2 text-sm rounded-xl flex items-center gap-2 transition-colors shrink-0",
                saveConfirm
                  ? "bg-green-100 text-green-700 border border-green-300"
                  : "glass glass-hover text-muted-foreground hover:text-foreground"
              )}
            >
              {saveConfirm ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              {saveConfirm ? "Saved!" : "Save"}
            </button>
            <button
              onClick={() => setShowSavedTeams(!showSavedTeams)}
              className="px-4 py-2 text-sm rounded-xl glass glass-hover flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors shrink-0"
            >
              <FolderOpen className="w-4 h-4" />
              Load
            </button>
            <button
              onClick={() => { setShowImport(true); setImportText(""); setImportError(""); }}
              className="px-4 py-2 text-sm rounded-xl glass glass-hover flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors shrink-0"
            >
              <Upload className="w-4 h-4" />
              Import
            </button>
            <button
              onClick={() => setShowExport(true)}
              className="px-4 py-2 text-sm rounded-xl glass glass-hover flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors shrink-0"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
            <button
              onClick={() => { trackEvent("new_team", "team_builder"); setSlots(Array.from({ length: 6 }, createEmptySlot)); setCurrentTeamId(undefined); setSelectedSlotIndex(null); setTeamName("My Team"); }}
              className="px-4 py-2 text-sm rounded-xl glass glass-hover flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors shrink-0"
            >
              <Plus className="w-4 h-4" />
              New Team
            </button>
          </div>
        </div>
      </motion.div>

      {/* Saved Teams Panel */}
      <AnimatePresence>
        {showSavedTeams && savedTeams.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-6"
          >
            <div className="glass rounded-2xl p-4 border border-gray-200/60">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                <FolderOpen className="w-4 h-4" />
                Saved Teams
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2">
                {[...savedTeams].sort((a, b) => b.updatedAt - a.updatedAt).map(t => (
                  <div key={t.id} className="flex items-center gap-2 p-3 rounded-xl glass glass-hover">
                    <button
                      onClick={() => handleLoadSavedTeam(t)}
                      className="flex-1 text-left min-w-0"
                    >
                      <p className="text-xs font-medium truncate">{t.name}</p>
                      <p className="text-[10px] text-muted-foreground">{t.slots.length} Pokémon · {new Date(t.updatedAt).toLocaleDateString()} {new Date(t.updatedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
                    </button>
                    <button
                      onClick={() => handleDeleteSavedTeam(t.id)}
                      className="p-1 rounded hover:bg-red-100 text-muted-foreground hover:text-red-600 transition-colors flex-shrink-0"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {showSavedTeams && savedTeams.length === 0 && (
        <div className="mb-6 p-4 rounded-xl bg-gray-50 text-center">
          <p className="text-sm text-muted-foreground">No saved teams yet. Build a team and click Save!</p>
        </div>
      )}

      {/* Validation errors */}
      {validationErrors.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20"
        >
          {validationErrors.map((err, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-red-400">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              {err}
            </div>
          ))}
        </motion.div>
      )}

      {/* ═══ MAIN THREE-COLUMN LAYOUT ═══ */}
      <div className="grid grid-cols-1 xl:grid-cols-[320px_1fr_320px] 2xl:grid-cols-[360px_1fr_360px] gap-6">

        {/* ══ LEFT COLUMN: Team Analysis + Suggested Teammates ══ */}
        <div className="space-y-6 min-w-0 order-2 xl:order-1">
          {/* ── Team Analysis ── */}
          {filledSlots.length >= 1 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-5 border border-gray-200/60">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                <Brain className="w-4 h-4 text-violet-500" /> Team Analysis
              </h3>
              <div className="flex items-center gap-3 mb-3">
                <div className="relative w-14 h-14 flex-shrink-0">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <path d="M18 2 a 16 16 0 0 1 0 32 a 16 16 0 0 1 0 -32" fill="none" stroke="#e5e7eb" strokeWidth="3" />
                    <path d="M18 2 a 16 16 0 0 1 0 32 a 16 16 0 0 1 0 -32" fill="none" stroke={teamAnalysis.synergy.overallScore >= 70 ? "#22c55e" : teamAnalysis.synergy.overallScore >= 50 ? "#eab308" : "#ef4444"} strokeWidth="3" strokeDasharray={`${teamAnalysis.synergy.overallScore} 100`} strokeLinecap="round" />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-sm font-bold">{teamAnalysis.synergy.overallScore}</span>
                </div>
                <div>
                  <p className="text-base font-semibold">{teamAnalysis.overallRating}</p>
                  <p className="text-xs text-muted-foreground">{filledSlots.length}/6 Pokémon</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-3">
                {[
                  { label: "Types", value: teamAnalysis.synergy.typeScore, icon: Shield },
                  { label: "Speed", value: teamAnalysis.synergy.speedScore, icon: Zap },
                  { label: "Roles", value: teamAnalysis.synergy.roleScore, icon: Users },
                  { label: "Archetype", value: teamAnalysis.synergy.archetypeScore, icon: Target },
                ].map(({ label, value, icon: Icon }) => (
                  <div key={label} className="text-center p-1.5 rounded-lg bg-gray-50">
                    <Icon className="w-3 h-3 mx-auto text-muted-foreground mb-0.5" />
                    <p className="text-xs font-bold">{value}</p>
                    <p className="text-[9px] text-muted-foreground">{label}</p>
                  </div>
                ))}
              </div>
              {teamAnalysis.synergy.detectedArchetypes.length > 0 && (
                <div className="mb-2">
                  <div className="flex flex-wrap gap-1">
                    {teamAnalysis.synergy.detectedArchetypes.map(a => <span key={a.archetype} className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-violet-100 text-violet-700 capitalize">{a.archetype.replace(/-/g, " ")} ({Math.round(a.confidence * 100)}%)</span>)}
                  </div>
                </div>
              )}
              <div className="space-y-2 mb-2">
                {teamAnalysis.synergy.strengths.length > 0 && (
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase mb-1">Strengths</p>
                    {teamAnalysis.synergy.strengths.map((s, i) => <p key={i} className="text-[11px] text-green-700 flex items-start gap-1"><Check className="w-3 h-3 flex-shrink-0 mt-0.5" /> {s}</p>)}
                  </div>
                )}
                {teamAnalysis.threatAnalysis.length > 0 && (
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase mb-1">Issues</p>
                    {teamAnalysis.threatAnalysis.map((t, i) => <p key={i} className="text-[11px] text-amber-700 flex items-start gap-1"><AlertTriangle className="w-3 h-3 flex-shrink-0 mt-0.5" /> {t}</p>)}
                  </div>
                )}
              </div>
              {teamAnalysis.criticalWeaknesses.length > 0 && (
                <div className="p-2 rounded-lg bg-red-50 border border-red-100">
                  <p className="text-[10px] text-red-600 font-medium uppercase mb-1">Critical Weaknesses</p>
                  <div className="flex flex-wrap gap-1">
                    {teamAnalysis.criticalWeaknesses.map(type => <span key={type} className="px-2 py-0.5 text-[10px] font-bold uppercase rounded text-white/90" style={{ backgroundColor: `${TYPE_COLORS[type]}CC` }}>{type}</span>)}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* ── Type Coverage ── */}
          {filledSlots.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-5 border border-gray-200/60">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4" /> Type Coverage
              </h3>
              <div className="grid grid-cols-6 gap-1.5">
                {ALL_TYPES.map((type) => {
                  const coverage = offensiveCoverage[type] ?? 1;
                  return (
                    <div key={type} className="text-center space-y-0.5">
                      <span className="block w-full py-0.5 text-[7px] font-bold uppercase rounded text-white/90" style={{ backgroundColor: `${TYPE_COLORS[type]}AA` }}>{type.slice(0, 3)}</span>
                      <span className={cn("block text-[10px] font-bold", coverage >= 2 && "text-green-600", coverage === 1 && "text-muted-foreground", coverage < 1 && coverage > 0 && "text-amber-600", coverage === 0 && "text-red-600")}>{coverage === 0 ? "✕" : `${coverage}×`}</span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-3 pt-2 border-t border-gray-200">
                <div className="flex flex-wrap gap-1">
                  {[...new Set(teamTypes)].map((type) => <span key={type} className="px-1.5 py-0.5 text-[9px] font-bold uppercase rounded text-white/90" style={{ backgroundColor: `${TYPE_COLORS[type]}AA` }}>{type}</span>)}
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Suggested Teammates ── */}
          {filledSlots.length >= 1 && filledSlots.length < 6 && teammates.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-5 border border-gray-200/60">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                <Users className="w-4 h-4 text-cyan-500" /> Suggested Teammates
              </h3>
              <div className="space-y-1.5">
                {teammates.map((s) => (
                  <button key={s.pokemon.id} onClick={() => addSuggestedTeammate(s.pokemon)} className="w-full text-left p-2 rounded-xl glass glass-hover border border-transparent hover:border-cyan-300 transition-all">
                    <div className="flex items-center gap-2">
                      <Image src={s.pokemon.sprite} alt={s.pokemon.name} width={28} height={28} className="rounded-lg" unoptimized />
                      <div className="min-w-0 flex-1">
                        <p className="text-[11px] font-semibold truncate">{s.pokemon.name}</p>
                        <div className="flex gap-0.5">{s.pokemon.types.map(t => <span key={t} className="w-2 h-2 rounded-full" style={{ backgroundColor: TYPE_COLORS[t] }} />)}</div>
                      </div>
                      <span className={cn("text-[11px] font-bold", s.score >= 70 ? "text-green-600" : s.score >= 50 ? "text-amber-600" : "text-gray-400")}>{s.score}</span>
                    </div>
                    {s.reasons.length > 0 && <p className="text-[9px] text-muted-foreground truncate mt-0.5 ml-8">{s.reasons[0]}</p>}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* ══ CENTER COLUMN: Team Slots + Edit Panel ══ */}
        <div className="space-y-6 min-w-0 order-1 xl:order-2">
          {/* Team Slots */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {slots.map((slot, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className={cn(
                  "relative rounded-2xl overflow-hidden border transition-all duration-300 min-h-[200px]",
                  slot.pokemon
                    ? selectedSlotIndex === i
                      ? "glass border-violet-400 ring-2 ring-violet-200"
                      : "glass border-gray-200 hover:border-gray-300 cursor-pointer"
                    : "border-dashed border-gray-300 hover:border-violet-400 cursor-pointer"
                )}
                onClick={() => {
                  if (!slot.pokemon) {
                    openPicker(i);
                  } else {
                    setSelectedSlotIndex(selectedSlotIndex === i ? null : i);
                  }
                }}
              >
                {slot.pokemon ? (
                  <>
                    <button
                      onClick={(e) => { e.stopPropagation(); removeSlot(i); }}
                      className="absolute top-2 right-2 z-20 p-1 rounded-lg bg-white/80 dark:bg-[#1a2540]/80 hover:bg-red-100 dark:hover:bg-red-500/20 text-gray-600 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                    <div className="absolute top-2 left-2 z-20 w-6 h-6 rounded-lg bg-gray-100 dark:bg-[#1a2540] flex items-center justify-center">
                      <span className="text-[10px] font-bold text-muted-foreground">{i + 1}</span>
                    </div>
                    {slot.isMega && (() => {
                      const megaForms = slot.pokemon.forms?.filter(f => f.isMega) ?? [];
                      const activeMega = megaForms[slot.megaFormIndex ?? 0];
                      const label = megaForms.length > 1 && activeMega ? activeMega.name.replace(slot.pokemon.name, "").replace("Mega ", "").trim() : "MEGA";
                      return (
                        <div className="absolute top-2 left-10 z-20 px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-500/20 border border-amber-300 dark:border-amber-500/40 leading-none">
                          <span className="text-[7px] font-bold text-amber-700 dark:text-amber-400 leading-none">{label || "MEGA"}</span>
                        </div>
                      );
                    })()}
                    {(() => {
                      const megaForms = slot.pokemon.forms?.filter(f => f.isMega) ?? [];
                      const activeMega = slot.isMega ? megaForms[slot.megaFormIndex ?? 0] : null;
                      const displaySprite = activeMega?.sprite ?? slot.pokemon.officialArt;
                      const displayName = activeMega?.name ?? slot.pokemon.name;
                      const displayTypes = activeMega?.types ?? slot.pokemon.types;
                      return (
                        <>
                          <div
                            className="h-24 flex items-center justify-center"
                            style={{ background: `radial-gradient(ellipse, ${TYPE_COLORS[displayTypes[0]]}15 0%, transparent 70%)` }}
                          >
                            <Image src={displaySprite} alt={displayName} width={80} height={80} className="drop-shadow-lg object-contain" unoptimized />
                          </div>
                          <div className="p-2 space-y-1">
                            <h4 className="text-xs font-semibold truncate">{displayName}</h4>
                            <div className="flex gap-1">
                              {displayTypes.map((type) => (
                                <span key={type} className="px-1 py-0.5 text-[8px] font-bold uppercase rounded text-white/80" style={{ backgroundColor: `${TYPE_COLORS[type]}AA` }}>{type.slice(0, 3)}</span>
                              ))}
                            </div>
                            {slot.item && <div className="text-[8px] text-amber-700 bg-amber-50 rounded px-1 py-0.5 truncate font-medium">{slot.item}</div>}
                            {slot.nature && <div className="text-[8px] text-violet-600 truncate">{slot.nature}</div>}
                            <div className="space-y-0">
                              {slot.moves.slice(0, 4).map((m) => (
                                <div key={m} className="text-[9px] text-muted-foreground truncate">• {m}</div>
                              ))}
                            </div>
                          </div>
                        </>
                      );
                    })()}
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full gap-2 py-8">
                    <div className="w-10 h-10 rounded-2xl bg-gray-100 flex items-center justify-center">
                      <Plus className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <span className="text-[10px] text-muted-foreground">Slot {i + 1}</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* ── EDIT PANEL (directly below team slots) ── */}
          <AnimatePresence mode="wait">
            {selectedSlotIndex !== null && slots[selectedSlotIndex]?.pokemon && (() => {
              const editSlotData = slots[selectedSlotIndex];
              const editPkm = editSlotData.pokemon!;
              return (
                <motion.div
                  key={selectedSlotIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="glass rounded-2xl p-5 border border-violet-200/60"
                >
                  <div className="flex items-center justify-between mb-4">
                    {(() => {
                      const megaForms = editPkm.forms?.filter(f => f.isMega) ?? [];
                      const activeMega = editSlotData.isMega ? megaForms[editSlotData.megaFormIndex ?? 0] : null;
                      const displaySprite = activeMega?.sprite ?? editPkm.officialArt;
                      const displayName = activeMega?.name ?? editPkm.name;
                      const displayTypes = activeMega?.types ?? editPkm.types;
                      return (
                        <div className="flex items-center gap-3">
                          <Image src={displaySprite} alt={displayName} width={48} height={48} className="drop-shadow-md" unoptimized />
                          <div>
                            <h3 className="text-base font-bold flex items-center gap-2">
                              <Settings2 className="w-4 h-4 text-violet-500" />
                              {displayName}
                            </h3>
                            <div className="flex gap-1 mt-0.5">
                              {displayTypes.map(t => (
                                <span key={t} className="px-1.5 py-0.5 text-[8px] font-bold uppercase rounded text-white/80" style={{ backgroundColor: `${TYPE_COLORS[t]}AA` }}>{t}</span>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                    <button onClick={() => setSelectedSlotIndex(null)} className="p-1.5 rounded-lg hover:bg-gray-100"><X className="w-4 h-4" /></button>
                  </div>

                  {/* Auto-Fill + Quick Apply Sets */}
                  <div className="mb-4">
                    <p className="text-[10px] text-muted-foreground uppercase font-medium mb-2">Quick Apply - Competitive Sets</p>
                    <div className="flex flex-wrap gap-2">
                      {(() => {
                        const sets = USAGE_DATA[editPkm.id] ?? [];
                        const isMega = editSlotData.isMega || false;
                        const isMegaItem = (item: string) => item.endsWith("ite") || item.endsWith("ite X") || item.endsWith("ite Y") || item.endsWith("ite Z");
                        const filteredSets = editPkm.hasMega
                          ? isMega ? sets.filter(s => isMegaItem(s.item)) : sets.filter(s => !isMegaItem(s.item))
                          : sets;
                        const bestSet = filteredSets[0];
                        return (
                          <>
                            {bestSet && (
                              <button
                                onClick={() => applySet(selectedSlotIndex, { ability: bestSet.ability, moves: bestSet.moves, sp: bestSet.sp, nature: bestSet.nature, item: bestSet.item })}
                                className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 hover:border-emerald-400 transition-all text-[11px] font-bold text-emerald-700 flex items-center gap-1.5"
                              >
                                <Zap className="w-3 h-3" /> Auto-Fill Best Set
                              </button>
                            )}
                            {filteredSets.slice(bestSet ? 1 : 0, 5).map((s, i) => (
                              <button key={i} onClick={() => applySet(selectedSlotIndex, { ability: s.ability, moves: s.moves, sp: s.sp, nature: s.nature, item: s.item })} className="px-3 py-1.5 rounded-lg bg-violet-50 hover:bg-violet-100 border border-violet-200 hover:border-violet-300 transition-all text-[11px] font-medium text-violet-700">
                                {s.name}
                              </button>
                            ))}
                          </>
                        );
                      })()}
                      {slotSuggestion && slotSuggestion.altSets.length > 0 && slotSuggestion.altSets.slice(0, 3).map((s, i) => (
                        <button key={`sug-${i}`} onClick={() => applySet(selectedSlotIndex, s.set)} className="px-3 py-1.5 rounded-lg bg-violet-50 hover:bg-violet-100 border border-violet-200 hover:border-violet-300 transition-all text-[11px] font-medium text-violet-700">
                            {s.set.name}
                            <span className={cn("ml-1.5 text-[9px] font-bold", s.matchScore >= 70 ? "text-green-600" : s.matchScore >= 50 ? "text-amber-600" : "text-gray-400")}>{s.matchScore}%</span>
                          </button>
                        ))}
                      </div>
                    </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                    {/* Col 1: Moves */}
                    <div>
                      <p className="text-[10px] text-muted-foreground uppercase font-medium mb-2">Moves</p>
                      <div className="space-y-2">
                        {[0, 1, 2, 3].map((moveIdx) => {
                          const currentMove = editSlotData.moves[moveIdx] || "";
                          const sortedMoves = [...editPkm.moves].sort((a, b) => a.name.localeCompare(b.name));
                          const moveData = editPkm.moves.find(m => m.name === currentMove);
                          const suggestedNames = slotSuggestion?.suggestedMoves.map(m => m.name) ?? [];
                          const moveOptions: SearchSelectOption[] = [
                            { value: "", label: "- Empty Slot -" },
                            ...sortedMoves.map((m) => ({
                              value: m.name,
                              label: m.name,
                              sub: `${m.type} · ${m.category}${m.power ? ` · ${m.power}bp` : ""}`,
                              badge: m.type.slice(0, 3),
                              badgeColor: `${TYPE_COLORS[m.type]}AA`,
                              suggested: suggestedNames.includes(m.name),
                            })),
                          ];
                          return (
                            <SearchSelect
                              key={moveIdx}
                              value={currentMove}
                              options={moveOptions}
                              onChange={(v) => updateMove(selectedSlotIndex, moveIdx, v)}
                              placeholder="- Empty Slot -"
                              triggerBadge={moveData ? { text: moveData.type.slice(0, 3), color: `${TYPE_COLORS[moveData.type]}AA` } : null}
                            />
                          );
                        })}
                      </div>
                      {slotSuggestion && slotSuggestion.suggestedMoves.length > 0 && <p className="text-[9px] text-muted-foreground mt-2">★ = engine recommended</p>}
                    </div>

                    {/* Col 2: Ability + Nature + Item */}
                    <div className="space-y-3">
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase font-medium mb-2">Ability</p>
                        <div className="space-y-1.5">
                          {(() => {
                            const megaForms = editPkm.forms?.filter(f => f.isMega) ?? [];
                            const allMegaAbilities: { ab: typeof editPkm.abilities[0]; formIndex: number; formName: string }[] = [];
                            megaForms.forEach((form, fi) => {
                              form.abilities.forEach(ab => {
                                if (!editPkm.abilities.some(a => a.name === ab.name) && !allMegaAbilities.some(m => m.ab.name === ab.name)) {
                                  allMegaAbilities.push({ ab, formIndex: fi, formName: form.name });
                                }
                              });
                            });
                            const isMegaItem = (item: string) => item.endsWith("ite") || item.endsWith("ite X") || item.endsWith("ite Y") || item.endsWith("ite Z");
                            const getMegaStoneForForm = (fi: number) => {
                              const form = megaForms[fi];
                              if (!form) return undefined;
                              const sets = USAGE_DATA[editPkm.id] ?? [];
                              return sets.find(s => isMegaItem(s.item) && s.ability === form.abilities[0]?.name)?.item ?? sets.find(s => isMegaItem(s.item))?.item;
                            };
                            return (
                              <>
                                {editPkm.abilities.map((ab) => {
                                  const isActive = editSlotData.ability === ab.name;
                                  const isSugg = slotSuggestion?.suggestedAbilities.some(a => a.name === ab.name);
                                  return (
                                    <button key={ab.name} onClick={() => { updateSlot(selectedSlotIndex, { ability: ab.name, isMega: false, megaFormIndex: 0 }); }} className={cn("w-full text-left px-3 py-1.5 rounded-lg text-[11px] border transition-all", isActive ? "bg-violet-100 border-violet-300 font-semibold text-violet-800" : "bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-gray-300")}>
                                      <div className="flex items-center justify-between">
                                        <span>{ab.name}{ab.isHidden ? " (H)" : ""}{ab.isChampions ? " ✦" : ""}</span>
                                        {isSugg && <span className="text-[8px] text-violet-500 font-bold">REC</span>}
                                      </div>
                                      <p className="text-[8px] text-muted-foreground mt-0.5 line-clamp-1">{ab.description}</p>
                                    </button>
                                  );
                                })}
                                {allMegaAbilities.map(({ ab, formIndex, formName }) => {
                                  const isActive = editSlotData.ability === ab.name;
                                  const isSugg = slotSuggestion?.suggestedAbilities.some(a => a.name === ab.name);
                                  const shortForm = megaForms.length > 1 ? formName.replace(editPkm.name, "").replace("Mega ", "").trim() : "";
                                  return (
                                    <button key={ab.name} onClick={() => { updateSlot(selectedSlotIndex, { ability: ab.name, isMega: true, megaFormIndex: formIndex, item: getMegaStoneForForm(formIndex) }); }} className={cn("w-full text-left px-3 py-1.5 rounded-lg text-[11px] border transition-all", isActive ? "bg-amber-100 border-amber-300 font-semibold text-amber-800" : "bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-gray-300")}>
                                      <div className="flex items-center justify-between">
                                        <span>{ab.name}{shortForm ? ` (${shortForm})` : ""}<span className="ml-1 text-[9px] text-amber-600 font-bold">MEGA</span></span>
                                        {isSugg && <span className="text-[8px] text-violet-500 font-bold">REC</span>}
                                      </div>
                                      <p className="text-[8px] text-muted-foreground mt-0.5 line-clamp-1">{ab.description}</p>
                                    </button>
                                  );
                                })}
                              </>
                            );
                          })()}
                        </div>
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase font-medium mb-1">Nature</p>
                        <SearchSelect
                          value={editSlotData.nature || "Hardy"}
                          options={allNatureNames.map((n) => {
                            const nat = NATURES[n];
                            return {
                              value: n,
                              label: n,
                              sub: nat.plus && nat.minus ? `+${STAT_LABELS[nat.plus]} / -${STAT_LABELS[nat.minus]}` : "Neutral",
                              suggested: slotSuggestion?.suggestedNature.nature === n,
                            };
                          })}
                          onChange={(v) => updateSlot(selectedSlotIndex, { nature: v })}
                          placeholder="Select nature…"
                        />
                        {slotSuggestion && <button onClick={() => updateSlot(selectedSlotIndex, { nature: slotSuggestion.suggestedNature.nature })} className="mt-1 text-[9px] text-violet-600 hover:text-violet-800 transition-colors">★ Suggested: {slotSuggestion.suggestedNature.nature} - {slotSuggestion.suggestedNature.reason}</button>}
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase font-medium mb-1">Held Item</p>
                        <SearchSelect
                          value={editSlotData.item || ""}
                          options={[
                            { value: "", label: "- No Item -" },
                            ...allItemNames.map((name) => ({
                              value: name,
                              label: name,
                              sub: ITEMS[name]?.description,
                            })),
                          ]}
                          onChange={(v) => updateSlot(selectedSlotIndex, { item: v || undefined })}
                          placeholder="- No Item -"
                          disabled={editSlotData.isMega}
                        />
                        {editSlotData.isMega && <p className="text-[9px] text-amber-600 mt-1">Mega stone is required - item locked</p>}
                        {!editSlotData.isMega && editSlotData.item && ITEMS[editSlotData.item!] && <p className="text-[9px] text-muted-foreground mt-1">{ITEMS[editSlotData.item!].description}</p>}
                      </div>
                    </div>

                    {/* Col 3: SP Distribution */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-[10px] text-muted-foreground uppercase font-medium">Stat Points</p>
                        <span className={cn("text-[11px] font-bold", Object.values(editSlotData.statPoints).reduce((a, b) => a + b, 0) >= MAX_TOTAL_POINTS ? "text-red-500" : "text-muted-foreground")}>{Object.values(editSlotData.statPoints).reduce((a, b) => a + b, 0)}/{MAX_TOTAL_POINTS}</span>
                      </div>
                      <div className="space-y-1.5">
                        {STAT_KEYS.map((stat) => {
                          const value = editSlotData.statPoints[stat];
                          return (
                            <div key={stat} className="flex items-center gap-2">
                              <span className="text-[10px] font-medium text-muted-foreground w-7">{STAT_LABELS[stat]}</span>
                              <button onClick={() => updateSP(selectedSlotIndex, stat, -2)} className="w-5 h-5 rounded bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"><Minus className="w-2.5 h-2.5" /></button>
                              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden"><div className="h-full rounded-full bg-violet-400 transition-all duration-150" style={{ width: `${(value / MAX_PER_STAT) * 100}%` }} /></div>
                              <button onClick={() => updateSP(selectedSlotIndex, stat, 2)} className="w-5 h-5 rounded bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"><Plus className="w-2.5 h-2.5" /></button>
                              <input type="number" min={0} max={MAX_PER_STAT} value={value} onChange={(e) => setSPDirect(selectedSlotIndex, stat, parseInt(e.target.value) || 0)} className="w-10 text-center text-[11px] font-medium rounded bg-gray-50 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-violet-300 py-0.5" />
                            </div>
                          );
                        })}
                      </div>
                      <div className="mt-2">
                        <p className="text-[9px] text-muted-foreground uppercase mb-1">Presets</p>
                        <div className="flex flex-wrap gap-1">
                          {Object.entries(STAT_PRESETS).map(([name, sp]) => (
                            <button key={name} onClick={() => updateSlot(selectedSlotIndex, { statPoints: { ...sp } })} className="px-2 py-0.5 text-[9px] rounded bg-gray-50 border border-gray-200 hover:bg-violet-50 hover:border-violet-200 transition-colors">{name}</button>
                          ))}
                          {slotSuggestion && <button onClick={() => updateSlot(selectedSlotIndex, { statPoints: { ...slotSuggestion.suggestedSP.sp } })} className="px-2 py-0.5 text-[9px] rounded bg-violet-50 border border-violet-200 text-violet-700 hover:bg-violet-100 transition-colors font-medium">★ Suggested</button>}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mega Toggle */}
                  {editPkm.hasMega && (() => {
                    const megaForms = editPkm.forms?.filter(f => f.isMega) ?? [];
                    const isMega = editSlotData.isMega || false;
                    const activeIdx = editSlotData.megaFormIndex ?? 0;
                    const activeMega = megaForms[activeIdx];
                    const isMegaItem = (item: string) => item.endsWith("ite") || item.endsWith("ite X") || item.endsWith("ite Y") || item.endsWith("ite Z");
                    // Find mega stone for a specific form from usage data
                    const getMegaStone = (formIndex: number) => {
                      const form = megaForms[formIndex];
                      if (!form) return undefined;
                      const sets = USAGE_DATA[editPkm.id] ?? [];
                      const megaSet = sets.find(s => isMegaItem(s.item) && s.ability === form.abilities[0]?.name);
                      if (megaSet) return megaSet.item;
                      // Fallback: just find any mega stone set
                      return sets.find(s => isMegaItem(s.item))?.item;
                    };
                    return (
                      <div className="mt-4 pt-3 border-t border-gray-100">
                        <p className="text-[10px] text-muted-foreground uppercase font-medium mb-2">Mega Evolution</p>
                        {megaForms.length <= 1 ? (
                          <button onClick={() => {
                            if (isMega) {
                              updateSlot(selectedSlotIndex, { isMega: false, megaFormIndex: 0, ability: editPkm.abilities[0]?.name, item: undefined });
                            } else {
                              const ab = megaForms[0]?.abilities?.[0];
                              if (ab) updateSlot(selectedSlotIndex, { isMega: true, megaFormIndex: 0, ability: ab.name, item: getMegaStone(0) });
                            }
                          }} className={cn("px-4 py-2 rounded-lg text-[12px] font-medium border transition-all flex items-center gap-2", isMega ? "bg-amber-100 border-amber-300 text-amber-800" : "bg-gray-50 border-gray-200 hover:bg-amber-50 hover:border-amber-200")}>
                            <Sparkles className="w-4 h-4" />{isMega ? "Mega Active" : "Enable Mega"}
                          </button>
                        ) : (
                          <div className="flex flex-wrap gap-2">
                            {megaForms.map((form, fi) => {
                              const isActive = isMega && activeIdx === fi;
                              return (
                                <button key={fi} onClick={() => {
                                  if (isActive) {
                                    updateSlot(selectedSlotIndex, { isMega: false, megaFormIndex: 0, ability: editPkm.abilities[0]?.name, item: undefined });
                                  } else {
                                    const ab = form.abilities?.[0];
                                    if (ab) updateSlot(selectedSlotIndex, { isMega: true, megaFormIndex: fi, ability: ab.name, item: getMegaStone(fi) });
                                  }
                                }} className={cn("px-4 py-2 rounded-lg text-[12px] font-medium border transition-all flex items-center gap-2", isActive ? "bg-amber-100 border-amber-300 text-amber-800" : "bg-gray-50 border-gray-200 hover:bg-amber-50 hover:border-amber-200")}>
                                  <Sparkles className="w-4 h-4" />{form.name.replace(editPkm.name, "").replace("Mega ", "").trim() || "Mega"}
                                </button>
                              );
                            })}
                            {isMega && (
                              <button onClick={() => updateSlot(selectedSlotIndex, { isMega: false, megaFormIndex: 0, ability: editPkm.abilities[0]?.name, item: undefined })} className="px-3 py-2 rounded-lg text-[11px] font-medium border border-gray-200 bg-gray-50 hover:bg-red-50 hover:border-red-200 transition-all text-gray-600">
                                Disable
                              </button>
                            )}
                          </div>
                        )}
                        {activeMega && isMega && (
                          <div className="mt-1.5 p-2 rounded-lg bg-amber-50/50 border border-amber-100 text-[10px]">
                            <p className="font-medium text-amber-800">{activeMega.name}</p>
                            {activeMega.abilities?.[0] && <p className="text-amber-700 mt-0.5">{activeMega.abilities[0].name}: {activeMega.abilities[0].description}</p>}
                            {getMegaStone(activeIdx) && <p className="text-amber-600 mt-0.5">Held Item: {getMegaStone(activeIdx)}</p>}
                            <p className="text-muted-foreground mt-0.5">Types: {activeMega.types.map(t => t.charAt(0).toUpperCase() + t.slice(1)).join("/")}</p>
                          </div>
                        )}
                        <p className="text-[9px] text-muted-foreground mt-1">Only 1 Mega allowed per team · Mega stone is auto-equipped</p>
                      </div>
                    );
                  })()}

                  {slotSuggestion && (
                    <div className="mt-3 pt-2 border-t border-gray-100">
                      <div className="flex flex-wrap gap-1">
                        <span className="text-[9px] text-muted-foreground mr-1">Roles:</span>
                        {slotSuggestion.role.roles.map(r => <span key={r} className="px-1.5 py-0.5 text-[9px] rounded bg-gray-100 text-gray-600 capitalize">{r.replace(/-/g, " ")}</span>)}
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })()}
          </AnimatePresence>

        </div>

        {/* ══ RIGHT COLUMN: Meta Teams + Curated Teams ══ */}
        <div className="space-y-6 order-3">
          {/* ── Engine Predicted Meta ── */}
          <div className="glass rounded-2xl p-5 border border-gray-200/60">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-1 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-amber-500" />
              <span className="bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">Engine Predicted Meta</span>
              <span className="px-1.5 py-0.5 text-[8px] font-bold rounded bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-700 border border-amber-200">⚡ LIVE</span>
            </h3>
            <p className="text-[10px] text-muted-foreground mb-3">{TOURNAMENT_TEAMS.length} tournaments · {TOURNAMENT_USAGE.length} usage entries · {CORE_PAIRS.length} core pairs · 2M+ battle engine</p>
            <div className="space-y-3">
              {metaTeams.map((meta) => (
                <button key={meta.id} onClick={() => loadMetaTeam(meta)} className="w-full text-left p-3 rounded-xl glass border border-gray-200/40 hover:border-emerald-300 hover:bg-emerald-50/30 transition-all">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className={cn("px-1.5 py-0.5 text-[9px] font-bold uppercase rounded", meta.confidence >= 80 ? "bg-emerald-100 text-emerald-700" : meta.confidence >= 60 ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600")}>{meta.confidence}%</span>
                      <h4 className="text-xs font-semibold">{meta.name}</h4>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className={cn("text-[9px] font-medium", meta.recentTrend === "rising" ? "text-emerald-600" : meta.recentTrend === "falling" ? "text-red-500" : "text-gray-500")}>{meta.recentTrend === "rising" ? "↑" : meta.recentTrend === "falling" ? "↓" : "→"}</span>
                      <span className="text-[9px] text-muted-foreground">{meta.metaShare}%</span>
                    </div>
                  </div>
                  <div className="flex gap-1 mb-2">
                    {meta.pokemonIds.map((id, pidx) => { const p = POKEMON_SEED.find(pk => pk.id === id); if (!p) return null; const megaForms = p.forms?.filter(f => f.isMega) ?? []; const useSets = USAGE_DATA[p.id] ?? []; const hasMegaSet = p.hasMega && useSets.some(s => s.item.endsWith("ite") || s.item.endsWith("ite X") || s.item.endsWith("ite Y") || s.item.endsWith("ite Z")); const isFirstMega = hasMegaSet && !meta.pokemonIds.slice(0, pidx).some(prevId => { const pp = POKEMON_SEED.find(pk => pk.id === prevId); return pp?.hasMega && (USAGE_DATA[prevId] ?? []).some(s => s.item.endsWith("ite") || s.item.endsWith("ite X") || s.item.endsWith("ite Y") || s.item.endsWith("ite Z")); }); const megaSprite = isFirstMega && megaForms[0] ? megaForms[0].sprite : p.sprite; const megaName = isFirstMega && megaForms[0] ? megaForms[0].name : p.name; return <div key={id} className="flex flex-col items-center relative"><Image src={megaSprite} alt={megaName} width={32} height={32} className="rounded" unoptimized />{isFirstMega && <span className="absolute -top-1 -right-1 px-0.5 text-[6px] font-bold bg-amber-500 text-white rounded">M</span>}<span className="text-[7px] text-muted-foreground mt-0.5 truncate w-9 text-center">{megaName.length > 10 ? p.name : megaName}</span></div>; })}
                  </div>
                  {meta.corePairs.length > 0 && <div className="flex flex-wrap gap-1 mb-1.5">{meta.corePairs.map(cp => <span key={cp} className="px-1.5 py-0.5 text-[8px] rounded bg-violet-50 text-violet-600 font-medium">{cp}</span>)}</div>}
                  <div className="space-y-0">
                    {meta.reasoning.slice(0, 3).map((reason, ri) => <p key={ri} className="text-[9px] text-muted-foreground flex items-start gap-1"><span className="text-emerald-400 mt-px shrink-0">•</span>{reason}</p>)}
                  </div>
                  {meta.historicalWins > 0 && <div className="mt-1.5 flex items-center gap-1"><Award className="w-3 h-3 text-amber-500" /><span className="text-[9px] text-amber-600 font-medium">{meta.historicalWins} win{meta.historicalWins > 1 ? "s" : ""}</span></div>}
                  <div className="mt-2 text-[9px] text-emerald-600 font-medium">Click to load with auto sets →</div>
                </button>
              ))}
            </div>
          </div>

          {/* ── Curated Teams ── */}
          <div className="glass rounded-2xl p-5 border border-gray-200/60">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-500" /> Curated Teams
            </h3>
            <div className="space-y-2">
              {shuffledTeams.map((team) => (
                <button key={team.id} onClick={() => loadPrebuiltTeam(team)} className="w-full text-left p-3 rounded-xl glass border border-transparent hover:border-violet-300 transition-all">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className={cn("px-1.5 py-0.5 text-[9px] font-bold uppercase rounded", team.tier === "S" ? "bg-amber-100 text-amber-700" : team.tier === "A" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600")}>{team.tier}</span>
                    <h4 className="text-xs font-semibold truncate">{team.name}</h4>
                    <div className="ml-auto flex gap-0.5">{team.tags.slice(0, 2).map(tag => <span key={tag} className="px-1 py-0.5 text-[8px] rounded bg-gray-100 text-gray-500 capitalize">{tag}</span>)}</div>
                  </div>
                  <p className="text-[10px] text-muted-foreground mb-1.5 line-clamp-1">{team.description}</p>
                  <div className="flex gap-1">
                    {team.pokemonIds.map(id => { const p = POKEMON_SEED.find(pk => pk.id === id); return p ? <Image key={id} src={p.sprite} alt={p.name} width={26} height={26} className="rounded" unoptimized /> : null; })}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Import Modal */}
      <AnimatePresence>
        {showImport && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
              onClick={() => setShowImport(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-4 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-50 sm:w-full sm:max-w-lg glass rounded-2xl border border-gray-200/60 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Import Team</h3>
                <button onClick={() => setShowImport(false)} className="p-1 rounded-lg hover:bg-gray-100">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-muted-foreground mb-3">Paste a team in Pokepaste / Pokémon Showdown format below.</p>
              <textarea
                value={importText}
                onChange={(e) => { setImportText(e.target.value); setImportError(""); }}
                placeholder={`Incineroar @ Figy Berry\nAbility: Intimidate\nCareful Nature\nEVs: 252 HP / 4 Def / 252 SpD\n- Flare Blitz\n- Fake Out\n- Darkest Lariat\n- Protect\n\nGarchomp @ Life Orb\n...`}
                className="w-full h-64 rounded-xl p-4 bg-gray-50 border border-gray-200 text-xs font-mono resize-none focus:outline-none focus:ring-2 focus:ring-violet-400"
              />
              {importError && <p className="text-xs text-red-500 mt-2">{importError}</p>}
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => importPokepaste(importText)}
                  disabled={!importText.trim()}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white text-sm font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-40"
                >
                  <Upload className="w-4 h-4" />
                  Import Team
                </button>
                <button
                  onClick={() => setShowImport(false)}
                  className="flex-1 py-2.5 rounded-xl glass glass-hover text-sm font-medium flex items-center justify-center gap-2"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Export Modal */}
      <AnimatePresence>
        {showExport && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
              onClick={() => setShowExport(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-4 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-50 sm:w-full sm:max-w-lg glass rounded-2xl border border-gray-200/60 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Export Team</h3>
                <button onClick={() => setShowExport(false)} className="p-1 rounded-lg hover:bg-gray-100">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <textarea
                readOnly
                value={exportPokepaste()}
                className="w-full h-64 rounded-xl p-4 bg-gray-50 border border-gray-200 text-xs font-mono resize-none focus:outline-none"
              />
              <div className="flex gap-2 mt-4">
                <button
                  onClick={copyToClipboard}
                  className="flex-1 py-2.5 rounded-xl bg-violet-100 text-violet-700 border border-violet-300 text-sm font-medium flex items-center justify-center gap-2 hover:bg-violet-200 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  Copy Pokepaste
                </button>
                <button
                  onClick={() => {
                    const blob = new Blob([JSON.stringify({ name: teamName, slots: slots.filter(s => s.pokemon) }, null, 2)], { type: "application/json" });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = `${teamName.replace(/\s+/g, "_")}.json`;
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="flex-1 py-2.5 rounded-xl glass glass-hover text-sm font-medium flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download JSON
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Share Modal */}
      <AnimatePresence>
        {showShare && shareImageUrl && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
              onClick={() => setShowShare(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-4 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-50 sm:w-full sm:max-w-2xl glass rounded-2xl border border-gray-200/60 p-6 overflow-auto max-h-[90vh]"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Share Team</h3>
                <button onClick={() => setShowShare(false)} className="p-1 rounded-lg hover:bg-gray-100">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="rounded-xl overflow-hidden border border-gray-200/60 mb-4">
                <img src={shareImageUrl} alt="Team card" className="w-full" />
              </div>
              {shareUrl && (
                <div className="mb-4 flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={shareUrl}
                    className="flex-1 px-3 py-2 text-xs rounded-lg bg-gray-100 border border-gray-200 text-gray-600 truncate"
                    onClick={(e) => (e.target as HTMLInputElement).select()}
                  />
                  <button
                    onClick={copyShareUrl}
                    className={cn("px-3 py-2 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5", urlCopied ? "bg-green-100 text-green-700" : "bg-violet-100 text-violet-700 hover:bg-violet-200")}
                  >
                    {urlCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {urlCopied ? "Copied!" : "Copy Link"}
                  </button>
                </div>
              )}
              <div className="flex gap-2">
                <button
                  onClick={downloadShareImage}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white text-sm font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                >
                  <Download className="w-4 h-4" />
                  Download Image
                </button>
                <button
                  onClick={copyShareUrl}
                  className={cn("flex-1 py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-all", urlCopied ? "bg-green-100 text-green-700" : "glass glass-hover")}
                >
                  {urlCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {urlCopied ? "Link Copied!" : "Copy Link"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Pokémon Picker Modal */}
      <AnimatePresence>
        {showPokemonPicker && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
              onClick={() => setShowPokemonPicker(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed inset-4 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-50 sm:w-full sm:max-w-2xl sm:max-h-[80vh] glass rounded-2xl border border-gray-200/60 flex flex-col overflow-hidden"
            >
              {/* Picker Header */}
              <div className="p-4 border-b border-gray-200/60">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold">Choose Pokémon</h3>
                  <button onClick={() => setShowPokemonPicker(false)} className="p-1 rounded-lg hover:bg-gray-100">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  value={pickerSearch}
                  onChange={(e) => setPickerSearch(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl glass border border-gray-200 focus:border-violet-500/50 focus:outline-none text-sm"
                  autoFocus
                />
              </div>

              {/* Picker Grid */}
              <div className="flex-1 overflow-y-auto p-4">
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {filteredPicker.map((pokemon) => (
                    <button
                      key={pokemon.id}
                      onClick={() => addPokemon(pokemon)}
                      className="glass glass-hover rounded-xl p-3 text-left transition-all hover:border-violet-300 border border-transparent"
                    >
                      <div className="flex items-center gap-2">
                        <Image
                          src={pokemon.sprite}
                          alt={pokemon.name}
                          width={40}
                          height={40}
                          className="rounded-lg"
                          unoptimized
                        />
                        <div className="min-w-0">
                          <p className="text-xs font-medium truncate">{pokemon.name}</p>
                          <div className="flex gap-1 mt-0.5">
                            {pokemon.types.map((t) => (
                              <span
                                key={t}
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: TYPE_COLORS[t] }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Pokémon Detail */}
      <PokemonDetailModal
        pokemon={selectedPokemonDetail}
        onClose={() => setSelectedPokemonDetail(null)}
      />
    </div>
  );
}
