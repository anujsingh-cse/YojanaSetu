"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function OnboardingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    state_code: "",
    category: "",
    occupation: "",
    annual_income: "",
    land_holding_acres: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSelectChange = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/auth/profile", {
        ...formData,
        age: parseInt(formData.age),
        annual_income: parseFloat(formData.annual_income),
        land_holding_acres: formData.land_holding_acres ? parseFloat(formData.land_holding_acres) : undefined,
        occupation: formData.occupation || undefined,
        // phone derives from the JWT on the backend; the client never sends it
      });
      router.push("/dashboard");
    } catch (error) {
      console.error("Failed to update profile", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 py-12">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Complete Your Profile</CardTitle>
          <CardDescription className="text-center">
            Help us find the best government schemes for you
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" required value={formData.name} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input id="age" type="number" required value={formData.age} onChange={handleChange} />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Gender</Label>
              <Select onValueChange={(val: string | null) => handleSelectChange("gender", val || "")}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Category</Label>
              <Select onValueChange={(val: string | null) => handleSelectChange("category", val || "")}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GENERAL">General</SelectItem>
                  <SelectItem value="OBC">OBC</SelectItem>
                  <SelectItem value="SC">SC</SelectItem>
                  <SelectItem value="ST">ST</SelectItem>
                  <SelectItem value="BPL">BPL</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Occupation</Label>
              <Select onValueChange={(val: string | null) => handleSelectChange("occupation", val || "")}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Occupation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Farmer">Farmer</SelectItem>
                  <SelectItem value="unorganized">Unorganized Worker</SelectItem>
                  <SelectItem value="Student">Student</SelectItem>
                  <SelectItem value="Business">Business</SelectItem>
                  <SelectItem value="Govt Employee">Govt Employee</SelectItem>
                  <SelectItem value="Homemaker">Homemaker</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="state_code">State Code (e.g., UP, MH, KA)</Label>
              <Input id="state_code" required maxLength={2} value={formData.state_code} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="annual_income">Annual Family Income (₹)</Label>
              <Input id="annual_income" type="number" required value={formData.annual_income} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="land_holding_acres">Land Holding (acres, 0 if none)</Label>
              <Input id="land_holding_acres" type="number" step="0.1" value={formData.land_holding_acres} onChange={handleChange} placeholder="e.g., 2.5" />
            </div>

            <Button type="submit" className="w-full mt-6" disabled={loading}>
              {loading ? "Saving..." : "Discover Schemes"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
