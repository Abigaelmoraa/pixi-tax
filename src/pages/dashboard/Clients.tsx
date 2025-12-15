import DashboardHeader from "@/components/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Mail, 
  Phone,
  Building,
  User,
  ArrowUpDown
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Clients = () => {
  const clients = [
    { id: 1, name: "Sarah Johnson", email: "sarah@email.com", phone: "(555) 123-4567", type: "Individual", status: "Active", returns: 3 },
    { id: 2, name: "ABC Corporation", email: "contact@abc.com", phone: "(555) 234-5678", type: "Business", status: "Active", returns: 5 },
    { id: 3, name: "Michael Chen", email: "michael@email.com", phone: "(555) 345-6789", type: "Individual", status: "Pending", returns: 1 },
    { id: 4, name: "Tech Startup Inc", email: "info@techstartup.com", phone: "(555) 456-7890", type: "Business", status: "Active", returns: 2 },
    { id: 5, name: "Emily Davis", email: "emily@email.com", phone: "(555) 567-8901", type: "Individual", status: "Review", returns: 4 },
    { id: 6, name: "Global Enterprises", email: "contact@global.com", phone: "(555) 678-9012", type: "Business", status: "Active", returns: 8 },
    { id: 7, name: "Robert Wilson", email: "robert@email.com", phone: "(555) 789-0123", type: "Individual", status: "Active", returns: 2 },
    { id: 8, name: "Smith & Associates", email: "info@smith.com", phone: "(555) 890-1234", type: "Business", status: "Pending", returns: 1 },
  ];

  return (
    <>
      <DashboardHeader 
        title="Clients" 
        subtitle="Manage your client portfolio"
      />
      
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-border">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <User className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">248</p>
                <p className="text-sm text-muted-foreground">Total Clients</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-3 bg-success/10 rounded-xl">
                <User className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">186</p>
                <p className="text-sm text-muted-foreground">Active</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-3 bg-warning/10 rounded-xl">
                <Building className="w-6 h-6 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">62</p>
                <p className="text-sm text-muted-foreground">Businesses</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-3 bg-info/10 rounded-xl">
                <User className="w-6 h-6 text-info" />
              </div>
              <div>
                <p className="text-2xl font-bold">186</p>
                <p className="text-sm text-muted-foreground">Individuals</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Client Table */}
        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>All Clients</CardTitle>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search " className="pl-9 w-64" />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="w-4 h-4" />
              </Button>
              <Button className="gradient-primary text-primary-foreground hover:opacity-90">
                <Plus className="w-4 h-4 mr-2" />
                Add Client
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">
                    <Button variant="ghost" className="p-0 h-auto font-medium">
                      Client Name
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Returns</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-semibold text-sm">
                          {client.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <span className="font-medium">{client.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                          {client.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Phone className="w-4 h-4" />
                          {client.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                        client.type === "Business" 
                          ? "bg-primary/10 text-primary" 
                          : "bg-muted text-muted-foreground"
                      }`}>
                        {client.type === "Business" ? <Building className="w-3 h-3" /> : <User className="w-3 h-3" />}
                        {client.type}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        client.status === "Active" ? "bg-success/10 text-success" :
                        client.status === "Pending" ? "bg-warning/10 text-warning" :
                        "bg-info/10 text-info"
                      }`}>
                        {client.status}
                      </span>
                    </TableCell>
                    <TableCell>{client.returns}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Client</DropdownMenuItem>
                          <DropdownMenuItem>View Returns</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Clients;
