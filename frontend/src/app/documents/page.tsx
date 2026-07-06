"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [docType, setDocType] = useState("aadhaar");
  
  useEffect(() => {
    fetchDocuments();
  }, []);
  
  const fetchDocuments = async () => {
    try {
      // Mock fetch
      const { data } = await api.get("/documents/");
      // Populate with mock if empty to show UI
      if (data.length === 0) {
        setDocuments([
          { id: "1", doc_type: "aadhaar", verification_status: "verified", uploaded_at: "2026-07-05", extracted_data: { last_4: "1234", name: "Anuj Singh" } }
        ]);
      } else {
        setDocuments(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;
    
    setUploading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("doc_type", docType);

    try {
      const { data } = await api.post("/documents/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setDocuments([...documents, { id: Date.now().toString(), doc_type: data.doc_type, verification_status: data.verification_status, extracted_data: data.extracted_fields, uploaded_at: new Date().toISOString().split("T")[0] }]);
      setSelectedFile(null);
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-orange-600">YojanaSetu - Document Vault</h1>
        <Link href="/dashboard">
          <Button variant="outline">Back to Dashboard</Button>
        </Link>
      </header>

      <main className="flex-1 p-6 max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Upload Section */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Upload Document</CardTitle>
            <CardDescription>Upload securely. We extract details automatically using OCR.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpload} className="space-y-4">
              <div className="space-y-2">
                <Label>Document Type</Label>
                <Select value={docType} onValueChange={(val) => val && setDocType(val)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aadhaar">Aadhaar Card</SelectItem>
                    <SelectItem value="pan">PAN Card</SelectItem>
                    <SelectItem value="ration_card">Ration Card</SelectItem>
                    <SelectItem value="income_certificate">Income Certificate</SelectItem>
                    <SelectItem value="bank_passbook">Bank Passbook</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>File (Image/PDF)</Label>
                <Input 
                  type="file" 
                  accept=".jpg,.jpeg,.png,.pdf" 
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                  required 
                />
              </div>

              <Button type="submit" className="w-full" disabled={uploading || !selectedFile}>
                {uploading ? "Scanning & Uploading..." : "Upload & Extract"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* List Section */}
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-2xl font-bold">Your Documents</h2>
          {documents.length === 0 ? (
            <div className="p-8 text-center bg-white border rounded-lg text-gray-500">
              No documents uploaded yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {documents.map((doc, idx) => (
                <Card key={idx}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg capitalize flex justify-between items-center">
                      {doc.doc_type.replace("_", " ")}
                      <span className={`text-xs px-2 py-1 rounded-full ${doc.verification_status === 'verified' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {doc.verification_status}
                      </span>
                    </CardTitle>
                    <CardDescription>Uploaded: {doc.uploaded_at}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-100 p-3 rounded text-sm space-y-1">
                      <p className="font-semibold text-gray-600 mb-1">OCR Extracted Data:</p>
                      {doc.extracted_data ? (
                        Object.entries(doc.extracted_data).map(([k, v]) => (
                          <div key={k} className="flex justify-between">
                            <span className="capitalize">{k.replace("_", " ")}:</span>
                            <span className="font-mono">{String(v)}</span>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-400">No data extracted</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
