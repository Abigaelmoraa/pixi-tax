import DashboardHeader from "@/components/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Bell,
  Check,
  CheckCheck,
  User,
  FileText,
  AlertCircle,
  Calendar
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      type: "client",
      title: "New client added",
      description: "Sarah Johnson was added to your client list",
      time: "2 hours ago",
      read: false
    },
    {
      id: 2,
      type: "return",
      title: "Tax return completed",
      description: "2023 return for ABC Corp is ready for review",
      time: "5 hours ago",
      read: false
    },
    {
      id: 3,
      type: "document",
      title: "Document uploaded",
      description: "W-2 form uploaded by John Smith",
      time: "1 day ago",
      read: true
    },
    {
      id: 4,
      type: "deadline",
      title: "Upcoming deadline",
      description: "Q4 estimated taxes due in 5 days for 23 clients",
      time: "2 days ago",
      read: true
    },
    {
      id: 5,
      type: "alert",
      title: "Action required",
      description: "Missing information for Michael Chen's return",
      time: "3 days ago",
      read: true
    },
    {
      id: 6,
      type: "client",
      title: "Client profile updated",
      description: "Tech Startup Inc updated their business information",
      time: "4 days ago",
      read: true
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "client":
        return <User className="w-5 h-5 text-primary" />;
      case "return":
        return <FileText className="w-5 h-5 text-success" />;
      case "document":
        return <FileText className="w-5 h-5 text-info" />;
      case "deadline":
        return <Calendar className="w-5 h-5 text-warning" />;
      case "alert":
        return <AlertCircle className="w-5 h-5 text-destructive" />;
      default:
        return <Bell className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
      <DashboardHeader 
        title="Notifications" 
        subtitle={`${unreadCount} unread notifications`}
      />
      
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="gap-1">
              <Bell className="w-3 h-3" />
              {unreadCount} New
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Check className="w-4 h-4 mr-2" />
              Mark All Read
            </Button>
            <Button variant="outline" size="sm">
              Settings
            </Button>
          </div>
        </div>

        {/* Notifications List */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle>All Notifications</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {notifications.map((notification) => (
                <div 
                  key={notification.id}
                  className={`flex items-start gap-4 p-6 hover:bg-muted/30 transition-colors cursor-pointer ${
                    !notification.read ? "bg-primary/5" : ""
                  }`}
                >
                  <div className={`p-3 rounded-xl ${
                    notification.type === "client" ? "bg-primary/10" :
                    notification.type === "return" ? "bg-success/10" :
                    notification.type === "document" ? "bg-info/10" :
                    notification.type === "deadline" ? "bg-warning/10" :
                    "bg-destructive/10"
                  }`}>
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium">{notification.title}</p>
                      {!notification.read && (
                        <span className="w-2 h-2 bg-primary rounded-full"></span>
                      )}
                    </div>
                    <p className="text-muted-foreground">{notification.description}</p>
                    <p className="text-sm text-muted-foreground mt-2">{notification.time}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="flex-shrink-0">
                    {notification.read ? (
                      <CheckCheck className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <Check className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Notifications;
