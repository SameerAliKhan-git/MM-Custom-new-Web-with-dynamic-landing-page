import { useEffect, useMemo, useRef, useState } from "react";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
// Card not used; using glass-card containers like Contact page
import { Input } from "./ui/input";
import { Minus, Plus, IndianRupee, Heart } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { ImageWithFallback } from "./figma/ImageWithFallback";

type DonorType = "indian" | "foreign";
type Frequency = "ONE_TIME" | "MONTHLY";

type ProgramKey =
  | "SPONSOR_CHILD"
  | "SPONSOR_EDUCATION"
  | "SUPPORT_FAMILY"
  | "SKILL_YOUTH"
  | "DISABLED_CARE"
  | "OLD_AGE_CARE"
  | "SUSTAINABILITY"
  | "FOOD"
  | "GENERAL";

type ProgramOption = {
  key: ProgramKey;
  title: string;
  description: string;
  defaultAmount: number; // INR per unit (yearly guidance for one-time)
};

const PROGRAMS: ProgramOption[] = [
  { key: "SPONSOR_CHILD", title: "Sponsor a child", description: "Sponsor a Child to facilitate their all-round development by fulfilling their educational and health needs.", defaultAmount: 11880 },
  { key: "SPONSOR_EDUCATION", title: "Sponsor a child's education", description: "Support a child's education for a year.", defaultAmount: 28200 },
  { key: "SUPPORT_FAMILY", title: "Support an under privileged family in a community", description: "Help families become self-reliant.", defaultAmount: 20160 },
  { key: "SKILL_YOUTH", title: "Support Education and Skilling of a Youth", description: "Provide skill-based education for employability.", defaultAmount: 9000 },
  // Newly added menu items (shown above General Donation)
  { key: "DISABLED_CARE", title: "Donate for Disabled Care", description: "Support assistive care, therapies, and inclusive education for persons with disabilities.", defaultAmount: 12000 },
  { key: "OLD_AGE_CARE", title: "Donate for Old age Welfare and Medical care", description: "Ensure dignity for elders with food, medicines, and regular health checkups.", defaultAmount: 8000 },
  { key: "SUSTAINABILITY", title: "Donate for Sustainability", description: "Contribute to trees, clean energy, and greener communities.", defaultAmount: 5000 },
  { key: "FOOD", title: "Donate for Food", description: "Provide nutritious meals to those in need.", defaultAmount: 1500 },
  { key: "GENERAL", title: "General Donation", description: "Let us allocate your donation where it's needed most.", defaultAmount: 0 },
];

// Dynamic image + content for each program
const PROGRAM_CONTENT: Record<ProgramKey, { image: string; title: string; body: string }> = {
  SPONSOR_CHILD: {
    image:
      "https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=1600&auto=format&fit=crop",
    title: "Sponsor a Child",
    body:
      "Your sponsorship ensures school supplies, healthcare and a caring environment for holistic growth.",
  },
  SPONSOR_EDUCATION: {
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1600&auto=format&fit=crop",
    title: "Sponsor Education",
    body:
      "Help a child stay in school with tuition, uniforms, and learning support for an entire year.",
  },
  SUPPORT_FAMILY: {
    image:
      "https://images.unsplash.com/photo-1533223876824-3ad0062b3b9b?q=80&w=1600&auto=format&fit=crop",
    title: "Support a Family",
    body:
      "Livelihood support prevents family separation and helps parents provide for their children.",
  },
  SKILL_YOUTH: {
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1600&auto=format&fit=crop",
    title: "Skill a Youth",
    body:
      "Vocational training and placements open dignified employment pathways for young adults.",
  },
  DISABLED_CARE: {
    image:
      "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=1600&auto=format&fit=crop",
    title: "Disabled Care",
    body:
      "Fund therapies, assistive devices and inclusive programs that foster independence and dignity.",
  },
  OLD_AGE_CARE: {
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1600&auto=format&fit=crop",
    title: "Elderly Welfare & Medical Care",
    body:
      "Provide ration kits, medicines and regular checkups to ensure elders are cared for and respected.",
  },
  SUSTAINABILITY: {
    image:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=1600&auto=format&fit=crop",
    title: "Sustainability",
    body:
      "Plant trees, conserve water and support clean energy for healthier communities and a greener planet.",
  },
  FOOD: {
    image:
      "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=1600&auto=format&fit=crop",
    title: "Donate for Food",
    body:
      "Sponsor nutritious cooked meals for children and families. Choose a date and add your message.",
  },
  GENERAL: {
    image: "/footer-bg.jpg",
    title: "General Donation",
    body:
      "We will channel your gift to the most urgent needs across our programmes.",
  },
};

function Money({ value }: { value: number }) {
  const formatted = useMemo(() => new Intl.NumberFormat("en-IN").format(value), [value]);
  return (
    <span className="inline-flex items-center gap-1 tabular-nums">
      <IndianRupee className="h-4 w-4" /> {formatted}
    </span>
  );
}
export function DonationPage() {
  return (
    <div className="min-h-screen bg-accent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Donation Page
          </h1>
          <p className="text-lg text-foreground/80">
            Content will be added soon
          </p>
        </div>
      </div>
    </div>
  );
}

export default DonationPage;
