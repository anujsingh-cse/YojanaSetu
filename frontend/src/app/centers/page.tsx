"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CentersPage() {
  const [pincode, setPincode] = useState("");
  const [searching, setSearching] = useState(false);
  const [centers, setCenters] = useState<any[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length !== 6) return;
    
    setSearching(true);
    // Mock API delay
    setTimeout(() => {
      setCenters([
        { id: 1, name: "CSC Jan Seva Kendra", address: "Main Market, Near Post Office", distance: "0.8 km", phone: "9876543210" },
        { id: 2, name: "Digital India Center", address: "Panchayat Bhawan", distance: "2.1 km", phone: "8765432109" }
      ]);
      setSearching(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-orange-600">YojanaSetu - CSC Locator</h1>
        <Link href="/dashboard">
          <Button variant="outline">Back to Dashboard</Button>
        </Link>
      </header>

      <main className="flex-1 p-6 max-w-4xl mx-auto w-full space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Find a Common Service Center</CardTitle>
            <CardDescription>Locate a nearby center for offline assistance with your applications.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="flex gap-4 items-end">
              <div className="flex-1 space-y-2">
                <Label htmlFor="pincode">Enter Pincode</Label>
                <Input 
                  id="pincode" 
                  placeholder="e.g. 110001" 
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                />
              </div>
              <Button type="submit" disabled={searching || pincode.length !== 6}>
                {searching ? "Searching..." : "Search"}
              </Button>
              <Button type="button" variant="outline" onClick={() => alert("Geolocation mocked!")}>
                Use My Location
              </Button>
            </form>
          </CardContent>
        </Card>

        {centers.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Nearest Centers</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {centers.map(center => (
                <Card key={center.id}>
                  <CardContent className="p-4 flex flex-col justify-between h-full">
                    <div>
                      <h4 className="font-bold text-lg">{center.name}</h4>
                      <p className="text-gray-600 text-sm mt-1">{center.address}</p>
                      <p className="text-gray-500 text-sm mt-2">Distance: <span className="font-semibold text-gray-800">{center.distance}</span></p>
                    </div>
                    <div className="mt-4 pt-4 border-t flex justify-between items-center">
                      <span className="text-sm font-medium text-blue-600">{center.phone}</span>
                      <Button size="sm">Get Directions</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
