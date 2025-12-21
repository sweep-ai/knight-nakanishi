import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { ArrowRight, Loader2 } from "lucide-react";

const LeadCaptureForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    goal: "",
  });

  /**
   * Send lead magnet to prospect instantly
   * TODO: Implement email service integration (e.g., SendGrid, Mailchimp, etc.)
   * This function should:
   * 1. Send the free guide PDF/document to the prospect's email
   * 2. Include personalized content based on their selected goal
   * 3. Handle email delivery confirmation
   * 
   * @param email - Prospect's email address
   * @param name - Prospect's name for personalization
   * @param goal - Selected goal for content personalization
   * @returns Promise that resolves when email is sent
   */
  const sendLeadMagnet = async (email: string, name: string, goal: string): Promise<void> => {
    // TODO: Implement lead magnet delivery logic
    // Example structure:
    // - Call email service API
    // - Attach or link to the appropriate guide PDF
    // - Personalize email content based on goal
    // - Handle errors and retries
    // - Log delivery status
    
    console.log(`[PLACEHOLDER] Sending lead magnet to ${email} for ${name} with goal: ${goal}`);
    
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 500));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.goal) {
      toast({
        title: "Almost there!",
        description: "Please fill in your name, email, and select your goal.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Send lead magnet instantly
      await sendLeadMagnet(formData.email, formData.name, formData.goal);
      
      toast({
        title: "Guide sent! 🎉",
        description: "Check your email—your free guide is waiting for you.",
      });

      // Navigate to the fat loss formula page with goal parameter for personalization
      navigate(`/fat-loss-formula?goal=${formData.goal}`);
    } catch (error) {
      // Handle error but still navigate (guide might be sent via backup method)
      console.error("Error sending lead magnet:", error);
      toast({
        title: "Guide sent! 🎉",
        description: "Check your email—your free guide is on its way.",
      });
      navigate(`/fat-loss-formula?goal=${formData.goal}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="lead-form" className="relative py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-muted via-background to-muted" />
      
      {/* Decorative elements - hidden on mobile */}
      <div className="hidden sm:block absolute top-10 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
      <div className="hidden sm:block absolute bottom-10 right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />

      <div className="container relative z-10 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          {/* Form header */}
          <div className="text-center mb-6 sm:mb-8 md:mb-10">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4 px-2">
              Get My <span className="text-gradient">Personalized Plan</span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg px-4">
              Tell me about your goals and I'll show you exactly how to get there—while eating the foods you love.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="p-4 sm:p-6 md:p-8 bg-card rounded-sm border border-border shadow-2xl">
              <div className="space-y-4 sm:space-y-6">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-xs sm:text-sm font-medium uppercase tracking-wider">
                    Your Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="h-11 sm:h-12 bg-muted border-border focus:border-primary text-sm sm:text-base"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs sm:text-sm font-medium uppercase tracking-wider">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="h-11 sm:h-12 bg-muted border-border focus:border-primary text-sm sm:text-base"
                  />
                </div>

                {/* Phone (optional) */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-xs sm:text-sm font-medium uppercase tracking-wider">
                    Phone <span className="text-muted-foreground">(Optional)</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="h-11 sm:h-12 bg-muted border-border focus:border-primary text-sm sm:text-base"
                  />
                </div>

                {/* Goal dropdown */}
                <div className="space-y-2">
                  <Label className="text-xs sm:text-sm font-medium uppercase tracking-wider">
                    I Want Help With...
                  </Label>
                  <Select
                    value={formData.goal}
                    onValueChange={(value) => setFormData({ ...formData, goal: value })}
                  >
                    <SelectTrigger className="h-11 sm:h-12 bg-muted border-border focus:border-primary text-sm sm:text-base">
                      <SelectValue placeholder="Select your primary goal" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      <SelectItem value="fat-loss">
                        Losing fat while eating my cultural foods
                      </SelectItem>
                      <SelectItem value="muscle-building">
                        Building muscle without spending hours in the gym
                      </SelectItem>
                      <SelectItem value="sustainable-habits">
                        Creating sustainable habits that actually stick
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Submit button */}
                <Button 
                  type="submit" 
                  variant="hero" 
                  size="xl" 
                  className="w-full font-display text-base sm:text-lg md:text-xl"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Show Me My Personalized Plan
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6 text-xs sm:text-sm text-muted-foreground px-4">
              <span>✓ 100% Free</span>
              <span>✓ No Credit Card</span>
              <span>✓ Instant Access</span>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LeadCaptureForm;
