import DashboardHeader from "@/components/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  HelpCircle,
  MessageSquare,
  Book,
  Video,
  Mail,
  Phone,
  Search,
  ChevronRight
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Support = () => {
  const faqs = [
    {
      question: "How do I add a new client?",
      answer: "Navigate to the Clients page and click the 'Add Client' button. Fill in the required information and click 'Save'."
    },
    {
      question: "How can I upload tax documents?",
      answer: "Go to the Documents section, click 'Upload Documents' or drag and drop files directly into the upload area."
    },
    {
      question: "How do I generate tax reports?",
      answer: "Visit the Reports page, select the report type you need, and click 'Download'. Reports are generated in PDF format."
    },
    {
      question: "Can I change my subscription plan?",
      answer: "Yes, go to Settings > Billing and click 'Change Plan' to view available options and upgrade or downgrade."
    },
    {
      question: "How do I reset my password?",
      answer: "Click 'Forgot Password' on the login page or go to Settings > Security to change your password."
    }
  ];

  const resources = [
    { icon: Book, title: "Documentation", description: "Browse our comprehensive guides", link: "#" },
    { icon: Video, title: "Video Tutorials", description: "Learn with step-by-step videos", link: "#" },
    { icon: MessageSquare, title: "Community Forum", description: "Connect with other users", link: "#" },
  ];

  return (
    <>
      <DashboardHeader 
        title="Help & Support" 
        subtitle="Get help and find answers"
      />
      
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Search */}
        <Card className="border-border gradient-dark text-primary-foreground">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-2">How can we help you?</h2>
            <p className="opacity-80 mb-6">Search our knowledge base or contact our support team</p>
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-60" />
              <Input 
                placeholder="Search for help..." 
                className="pl-12 h-12 bg-sidebar-foreground/10 border-sidebar-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
              />
            </div>
          </CardContent>
        </Card>

        {/* Quick Resources */}
        <div className="grid md:grid-cols-3 gap-4">
          {resources.map((resource, index) => (
            <Card key={index} className="border-border hover:shadow-soft transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <resource.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{resource.title}</p>
                    <p className="text-sm text-muted-foreground">{resource.description}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* FAQ */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-primary" />
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* Contact Form */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                Contact Support
              </CardTitle>
              <CardDescription>Send us a message and we'll get back to you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="What do you need help with?" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message" 
                  placeholder="Describe your issue in detail..." 
                  rows={5}
                />
              </div>
              <Button className="w-full gradient-primary text-primary-foreground hover:opacity-90">
                Send Message
              </Button>

              <div className="pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground mb-4">Or reach us directly:</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span>support@pixitax.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span>1-800-PIXI-TAX</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Support;
