import DashboardHeader from "@/components/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Upload, 
  Search, 
  Filter, 
  FileText,
  FolderOpen,
  Image,
  File,
  MoreHorizontal,
  Download,
  Grid3X3,
  List
} from "lucide-react";
import { useState } from "react";

const Documents = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const documents = [
    { id: 1, name: "W-2 Form 2023", type: "pdf", size: "245 KB", client: "Sarah Johnson", date: "Jan 15, 2024" },
    { id: 2, name: "1099-INT Statement", type: "pdf", size: "128 KB", client: "Michael Chen", date: "Jan 14, 2024" },
    { id: 3, name: "Business Expenses", type: "xlsx", size: "1.2 MB", client: "ABC Corporation", date: "Jan 12, 2024" },
    { id: 4, name: "Property Tax Receipt", type: "pdf", size: "89 KB", client: "Emily Davis", date: "Jan 10, 2024" },
    { id: 5, name: "Investment Portfolio", type: "pdf", size: "567 KB", client: "Tech Startup Inc", date: "Jan 8, 2024" },
    { id: 6, name: "Charitable Donations", type: "pdf", size: "156 KB", client: "Robert Wilson", date: "Jan 5, 2024" },
    { id: 7, name: "Medical Expenses", type: "xlsx", size: "234 KB", client: "Sarah Johnson", date: "Jan 3, 2024" },
    { id: 8, name: "Rental Income Statement", type: "pdf", size: "312 KB", client: "Global Enterprises", date: "Jan 1, 2024" },
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="w-8 h-8 text-destructive" />;
      case "xlsx":
        return <File className="w-8 h-8 text-success" />;
      case "jpg":
      case "png":
        return <Image className="w-8 h-8 text-primary" />;
      default:
        return <File className="w-8 h-8 text-muted-foreground" />;
    }
  };

  return (
    <>
      <DashboardHeader 
        title="Documents" 
        subtitle="Store and manage tax documents"
      />
      
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Stats & Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Card className="border-border">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <FolderOpen className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xl font-bold">1,248</p>
                  <p className="text-xs text-muted-foreground">Total Files</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2 bg-success/10 rounded-lg">
                  <FileText className="w-5 h-5 text-success" />
                </div>
                <div>
                  <p className="text-xl font-bold">4.2 GB</p>
                  <p className="text-xs text-muted-foreground">Storage Used</p>
                </div>
              </CardContent>
            </Card>
          </div>
          <Button className="gradient-primary text-primary-foreground hover:opacity-90">
            <Upload className="w-4 h-4 mr-2" />
            Upload Documents
          </Button>
        </div>

        {/* Upload Zone */}
        <Card className="border-dashed border-2 border-border hover:border-primary/50 transition-colors">
          <CardContent className="p-12 text-center">
            <div className="mx-auto w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mb-4">
              <Upload className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="font-display text-lg font-semibold mb-2">Drag & Drop Files</h3>
            <p className="text-muted-foreground mb-4">or click to browse from your computer</p>
            <Button variant="outline">Browse Files</Button>
          </CardContent>
        </Card>

        {/* Documents List */}
        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Documents</CardTitle>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search documents..." className="pl-9 w-64" />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="w-4 h-4" />
              </Button>
              <div className="flex items-center border border-border rounded-lg">
                <Button 
                  variant={viewMode === "grid" ? "secondary" : "ghost"} 
                  size="icon"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button 
                  variant={viewMode === "list" ? "secondary" : "ghost"} 
                  size="icon"
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {viewMode === "grid" ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {documents.map((doc) => (
                  <div 
                    key={doc.id} 
                    className="group p-4 bg-muted/30 rounded-xl hover:bg-muted/50 hover:shadow-soft transition-all cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-4">
                      {getFileIcon(doc.type)}
                      <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="font-medium truncate mb-1">{doc.name}</p>
                    <p className="text-sm text-muted-foreground">{doc.size}</p>
                    <p className="text-xs text-muted-foreground mt-2">{doc.client}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {documents.map((doc) => (
                  <div 
                    key={doc.id} 
                    className="flex items-center justify-between p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      {getFileIcon(doc.type)}
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-sm text-muted-foreground">{doc.client}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="text-sm text-muted-foreground">{doc.size}</span>
                      <span className="text-sm text-muted-foreground">{doc.date}</span>
                      <Button variant="ghost" size="icon">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Documents;
