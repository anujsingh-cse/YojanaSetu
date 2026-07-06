"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function DashboardPage() {
  const [userName, setUserName] = useState("Citizen");
  
  useEffect(() => {
    // In a real app, fetch user details
  }, []);

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
          <Button variant="ghost">Logout</Button>
        </div>
      </header>
      
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full space-y-8">
        <div>
          <h2 className="text-3xl font-bold">Namaste, {userName}</h2>
          <p className="text-gray-600 mt-2">Here is a quick overview of your welfare schemes.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Eligible Schemes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-green-600">12</div>
              <p className="text-xs text-gray-500 mt-1">Based on your profile</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Active Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-blue-600">2</div>
              <p className="text-xs text-gray-500 mt-1">Currently under review</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Pending Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-orange-600">1</div>
              <p className="text-xs text-gray-500 mt-1">Aadhaar Card missing</p>
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
              {/* Mock List */}
              <div className="flex justify-between items-center border-b pb-4">
                <div>
                  <h4 className="font-semibold text-lg">PM-KISAN</h4>
                  <p className="text-sm text-gray-500">₹6,000 / year financial benefit</p>
                </div>
                <Button>Apply Now</Button>
              </div>
              <div className="flex justify-between items-center border-b pb-4">
                <div>
                  <h4 className="font-semibold text-lg">Ayushman Bharat</h4>
                  <p className="text-sm text-gray-500">₹5 Lakh health cover</p>
                </div>
                <Button>Apply Now</Button>
              </div>
              <Link href="/eligibility-check" className="w-full">
                <Button variant="link" className="w-full">View all 12 schemes →</Button>
              </Link>
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
