"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function DashboardPage() {
  const router = useRouter();
  const [userName, setUserName] = useState("Citizen");
  const [eligibleCount, setEligibleCount] = useState<number | null>(null);
  const [activeApps, setActiveApps] = useState<number | null>(null);
  const [pendingDocs, setPendingDocs] = useState<number | null>(null);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [needsOnboarding, setNeedsOnboarding] = useState(false);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const { data: me } = await api.get("/auth/me");
      setUserName(me.name || "Citizen");
      const hasProfile = me.age || me.annual_income || me.land_holding_acres || me.category;
      if (!hasProfile) {
        setNeedsOnboarding(true);
        return;
      }
      // Eligible schemes
      try {
        const { data: matches } = await api.post("/schemes/match", me);
        setEligibleCount(matches.length);
        setRecommendations(matches.slice(0, 4));
      } catch {
        setEligibleCount(0);
      }
      // Applications
      try {
        const { data: apps } = await api.get("/applications/");
        setActiveApps(apps.length);
      } catch {
        setActiveApps(0);
      }
      // Documents (pending / not verified)
      try {
        const { data: docs } = await api.get("/documents/");
        setPendingDocs(docs.filter((d: any) => d.verification_status !== "verified").length);
      } catch {
        setPendingDocs(0);
      }
    } catch {
      // Not logged in -> back to login
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-orange-600">YojanaSetu</h1>
        <div className="flex gap-4">
          <Link href="/documents">
            <Button variant="outline">My Documents</Button>
          </Link>
          <Link href="/applications">
            <Button variant="outline">Track Applications</Button>
          </Link>
          <Button variant="ghost" onClick={() => { localStorage.removeItem("access_token"); router.push("/login"); }}>Logout</Button>
        </div>
      </header>
      
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full space-y-8">
        <div>
          <h2 className="text-3xl font-bold">Namaste, {userName}</h2>
          <p className="text-gray-600 mt-2">Here is a quick overview of your welfare schemes.</p>
        </div>

        {needsOnboarding && (
          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="font-semibold text-lg text-orange-700">Complete your profile to find schemes</h3>
                <p className="text-sm text-gray-600 mt-1">Tell us about yourself so we can match you to eligible government schemes.</p>
              </div>
              <Link href="/onboarding"><Button>Complete Profile</Button></Link>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Eligible Schemes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-green-600">{eligibleCount ?? "…"}</div>
              <p className="text-xs text-gray-500 mt-1">Based on your profile</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Active Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-blue-600">{activeApps ?? "…"}</div>
              <p className="text-xs text-gray-500 mt-1">Currently tracked</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Pending Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-orange-600">{pendingDocs ?? "…"}</div>
              <p className="text-xs text-gray-500 mt-1">Awaiting verification</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Recommended for You</CardTitle>
              <CardDescription>Top matched schemes based on your profile</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recommendations.length === 0 && !needsOnboarding && (
                <p className="text-sm text-gray-500 pb-2">No matches yet. Try updating your profile.</p>
              )}
              {recommendations.map((m: any) => {
                const s = m.scheme;
                const benefits = s.benefits;
                const benefitText = benefits ? Object.entries(benefits).map(([k, v]) => `${v}`.replace(/_/g, " ")).join(", ") : "";
                return (
                  <div key={s.id} className="flex justify-between items-center border-b pb-4">
                    <div>
                      <h4 className="font-semibold text-lg">{s.scheme_name_en}</h4>
                      <p className="text-sm text-gray-500">{benefitText}</p>
                    </div>
                    <Link href="/eligibility-check"><Button>Apply Now</Button></Link>
                  </div>
                );
              })}
              {eligibleCount !== null && eligibleCount > 0 && (
                <Link href="/eligibility-check" className="w-full">
                  <Button variant="link" className="w-full">View all {eligibleCount} schemes →</Button>
                </Link>
              )}
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Assistant</CardTitle>
                <CardDescription>Have questions about a scheme?</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Chat with our vernacular AI assistant to understand legal clauses and eligibility rules in your language.
                </p>
                <Link href="/chat" className="w-full">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Open AI Chat</Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Nearest CSC Center</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Need offline help? Find a Common Service Center (Jan Seva Kendra) near you.
                </p>
                <Link href="/centers" className="w-full">
                  <Button variant="outline" className="w-full">Locate Center</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
