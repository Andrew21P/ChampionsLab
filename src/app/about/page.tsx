"use client";

import { useState, useRef } from "react";
import { motion } from "@/lib/motion";
import Image from "next/image";
import {
  Heart, Code, Users, Mail, Send, ImagePlus, X, CheckCircle2,
  AlertCircle, Loader2, Code2, Globe, Sparkles, Coffee, ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";
import { LastUpdated } from "@/components/last-updated";

export default function AboutPage() {
  const [form, setForm] = useState({ name: "", email: "", type: "feedback", message: "" });
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; msg: string } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    trackEvent("image_upload", "about");
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setResult({ ok: false, msg: "Image too large (max 5MB)." });
      return;
    }
    setImage(file);
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    trackEvent("contact_submit", "about", form.type);
    setSending(true);
    setResult(null);
    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("email", form.email);
      fd.append("type", form.type);
      fd.append("message", form.message);
      if (image) fd.append("image", image);

      const res = await fetch("/api/contact", { method: "POST", body: fd });
      const data = await res.json();
      if (res.ok) {
        setResult({ ok: true, msg: data.message });
        setForm({ name: "", email: "", type: "feedback", message: "" });
        removeImage();
      } else {
        setResult({ ok: false, msg: data.error });
      }
    } catch {
      setResult({ ok: false, msg: "Network error. Please try again." });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Alpha Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-500/10 dark:to-orange-500/5 border border-amber-200/80 dark:border-amber-400/20"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-500/20">
            <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <p className="text-sm font-bold text-amber-800 dark:text-amber-300">Alpha Release - Free & Open Source</p>
            <p className="text-xs text-amber-700/80 dark:text-amber-400/80 mt-0.5">
              This project is in active development. Things may break or change. It&apos;s 100% free, open source (MIT), and community-driven.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Discord Community */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="mb-6"
      >
        <a
          href="https://discord.gg/jFbxQde8"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("discord_click", "about")}
          className="flex items-center gap-4 p-4 rounded-2xl bg-[#5865F2]/10 border border-[#5865F2]/20 hover:bg-[#5865F2]/15 hover:border-[#5865F2]/30 transition-all group"
        >
          <div className="p-2.5 rounded-xl bg-[#5865F2] shadow-lg shadow-[#5865F2]/25 group-hover:shadow-[#5865F2]/40 transition-shadow">
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-[#5865F2] dark:text-[#7289DA]">Join our Discord Community</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Report bugs, suggest features, discuss the meta, and connect with other trainers
            </p>
          </div>
          <ChevronRight className="w-5 h-5 text-[#5865F2]/50 group-hover:text-[#5865F2] transition-colors shrink-0" />
        </a>
      </motion.div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-500 shadow-lg shadow-rose-500/25">
            <Heart className="w-8 h-8 text-white fill-white" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold">
                <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                  About Us
                </span>
              </h1>
              <LastUpdated page="meta" />
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              The people behind Champions Lab
            </p>
          </div>
        </div>
      </motion.div>

      {/* About Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-8"
      >
        {/* Mission */}
        <div className="glass rounded-2xl p-6 border border-rose-200/60 dark:border-rose-400/20 bg-gradient-to-br from-rose-50/40 to-pink-50/40 dark:from-rose-500/10 dark:to-pink-500/5">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-5 h-5 text-rose-500" />
            <h2 className="text-lg font-bold">Why We Built This</h2>
          </div>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              Champions Lab was born from a simple idea: <span className="font-semibold text-foreground">competitive Pokémon tools should be free and accessible to everyone</span>.
              We&apos;re a small team of passionate Pokémon fans who have been playing VGC for years, and we wanted to create the ultimate companion for Pokémon Champions 2026.
            </p>
            <p>
              Every feature you see - the Pokédex, the Team Builder, the 2,000,000+ battle simulation engine, the Meta analysis, PokéSchool - was built with love during our free time.
              <span className="font-semibold text-foreground"> We don&apos;t charge anything. No ads, no paywalls, no premium tiers.</span> This project is and will always be 100% free.
            </p>
            <p>
              We believe the competitive Pokémon community deserves high-quality tools without having to pay for them.
              If you find Champions Lab useful, the best way to support us is to share it with your friends and fellow trainers!
            </p>
          </div>
        </div>

        {/* Key Facts */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="glass rounded-2xl p-5 border border-amber-200/60 dark:border-amber-400/20 text-center">
            <AlertCircle className="w-6 h-6 text-amber-500 mx-auto mb-2" />
            <p className="text-2xl font-extrabold text-amber-700 dark:text-amber-400">Alpha</p>
            <p className="text-xs text-muted-foreground mt-1">In active development</p>
          </div>
          <div className="glass rounded-2xl p-5 border border-gray-200/60 dark:border-gray-200/10 text-center">
            <Code className="w-6 h-6 text-violet-500 mx-auto mb-2" />
            <p className="text-2xl font-extrabold text-violet-700 dark:text-violet-400">Open Source</p>
            <p className="text-xs text-muted-foreground mt-1">MIT License, fully public</p>
          </div>
          <div className="glass rounded-2xl p-5 border border-gray-200/60 dark:border-gray-200/10 text-center">
            <Heart className="w-6 h-6 text-rose-500 mx-auto mb-2 fill-rose-500" />
            <p className="text-2xl font-extrabold text-rose-700 dark:text-rose-400">100% Free</p>
            <p className="text-xs text-muted-foreground mt-1">No ads, no paywalls, forever</p>
          </div>
          <div className="glass rounded-2xl p-5 border border-gray-200/60 dark:border-gray-200/10 text-center">
            <Users className="w-6 h-6 text-cyan-500 mx-auto mb-2" />
            <p className="text-2xl font-extrabold text-cyan-700 dark:text-cyan-400">Community</p>
            <p className="text-xs text-muted-foreground mt-1">Built by fans, for fans</p>
          </div>
        </div>

        {/* Credits */}
        <div className="glass rounded-2xl p-6 border border-violet-200/60 dark:border-violet-400/20 bg-gradient-to-br from-violet-50/40 to-indigo-50/40 dark:from-violet-500/10 dark:to-indigo-500/5">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-5 h-5 text-violet-500" />
            <h2 className="text-lg font-bold">Credits & Thanks</h2>
          </div>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              <span className="font-semibold text-foreground">Champions Lab Team</span> - Design, development, battle engine, data curation, and everything in between.
              We&apos;re a small but dedicated team that pours hours into making this the best competitive Pokémon tool out there.
            </p>
            <p>
              Huge thanks to the <span className="font-semibold text-foreground">competitive Pokémon community</span> for the constant inspiration,
              the tournament organizers who make VGC possible, and every player who has shared a team, written a guide, or helped a newcomer.
            </p>
            <p>
              Special thanks to everyone who has reported bugs, suggested features, or just said something nice.
              This project exists because of you.
            </p>
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
            <Globe className="w-3.5 h-3.5" />
            <span>championslab.xyz</span>
          </div>
        </div>

        {/* Contribute */}
        <div className="glass rounded-2xl p-6 border border-emerald-200/60 dark:border-emerald-400/20 bg-gradient-to-br from-emerald-50/40 to-cyan-50/40 dark:from-emerald-500/10 dark:to-cyan-500/5">
          <div className="flex items-center gap-3 mb-4">
            <Code2 className="w-5 h-5 text-emerald-600" />
            <h2 className="text-lg font-bold">Want to Help?</h2>
          </div>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              Champions Lab is open source and we welcome contributions! Whether you&apos;re a developer, a designer,
              a competitive player with data to share, or just someone who spotted a bug - <span className="font-semibold text-foreground">we&apos;d love your help</span>.
            </p>
            <p>
              You can report bugs, suggest features, or contribute code. Use the contact form below to get in touch,
              or open an issue on our <a href="https://github.com/Andrew21P/ChampionsLab" target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("github_click", "about")} className="font-semibold text-emerald-600 hover:text-emerald-700 underline underline-offset-2">GitHub repository</a>.
            </p>
            <p>
              If you&apos;d like to support us financially, every little bit helps keep the project alive:
            </p>
            <a
              href="https://buymeacoffee.com/championslab"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("support_click", "about", "buymeacoffee")}
              className="inline-flex items-center gap-2 mt-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-amber-400 to-yellow-500 text-gray-900 hover:from-amber-500 hover:to-yellow-600 transition-all shadow-md hover:shadow-lg"
            >
              <Coffee className="w-4 h-4" />
              Support Us on Buy Me a Coffee
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="glass rounded-2xl p-6 border border-amber-200/60 dark:border-amber-500/20 bg-gradient-to-br from-amber-50/40 to-orange-50/40 dark:from-amber-500/5 dark:to-orange-500/5">
          <div className="flex items-center gap-3 mb-5">
            <Mail className="w-5 h-5 text-amber-600" />
            <h2 className="text-lg font-bold">Contact Us</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-5">
            Found a bug? Have a suggestion? Just want to say hi? We&apos;d love to hear from you!
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Name *</label>
                <input
                  type="text"
                  required
                  maxLength={100}
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-400/25 bg-white/80 dark:bg-gray-200/5 text-sm text-gray-900 focus:outline-none focus:border-amber-400 dark:focus:border-amber-500/50 transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Email *</label>
                <input
                  type="email"
                  required
                  maxLength={200}
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-400/25 bg-white/80 dark:bg-gray-200/5 text-sm text-gray-900 focus:outline-none focus:border-amber-400 dark:focus:border-amber-500/50 transition-colors"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">Type</label>
              <select
                value={form.type}
                onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-400/25 bg-white/80 dark:bg-gray-200/5 text-sm text-gray-900 focus:outline-none focus:border-amber-400 dark:focus:border-amber-500/50 transition-colors"
              >
                <option value="feedback" className="dark:bg-[#111a2e]">Feedback / Suggestion</option>
                <option value="bug" className="dark:bg-[#111a2e]">Bug Report</option>
                <option value="feature" className="dark:bg-[#111a2e]">Feature Request</option>
                <option value="other" className="dark:bg-[#111a2e]">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">Message *</label>
              <textarea
                required
                maxLength={5000}
                rows={5}
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-400/25 bg-white/80 dark:bg-gray-200/5 text-sm text-gray-900 focus:outline-none focus:border-amber-400 dark:focus:border-amber-500/50 transition-colors resize-none"
                placeholder="Tell us what's on your mind..."
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">Screenshot (optional)</label>
              {imagePreview ? (
                <div className="relative inline-block">
                  <Image src={imagePreview} alt="Preview" width={200} height={150} className="rounded-xl border border-gray-200 dark:border-gray-400/25 object-cover" unoptimized />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-400/25 bg-white/50 dark:bg-gray-200/5 text-sm text-muted-foreground hover:border-amber-400 dark:hover:border-amber-500/40 hover:text-amber-700 dark:hover:text-amber-400 transition-colors"
                >
                  <ImagePlus className="w-4 h-4" />
                  Add a screenshot (max 5MB)
                </button>
              )}
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImage}
              />
            </div>

            {/* Result Message */}
            {result && (
              <div className={cn("flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium", result.ok ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20" : "bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-500/20")}>
                {result.ok ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                {result.msg}
              </div>
            )}

            <button
              type="submit"
              disabled={sending}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold text-sm shadow-md shadow-amber-500/20 hover:from-amber-600 hover:to-orange-600 transition-all disabled:opacity-50"
            >
              {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              {sending ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
