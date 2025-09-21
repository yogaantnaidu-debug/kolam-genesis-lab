import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Search } from "lucide-react";

interface KolamFeatureProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  action: string;
  onClick: () => void;
}

export function KolamFeature({ title, description, icon, action, onClick }: KolamFeatureProps) {
  return (
    <Card className="w-full max-w-md hover:shadow-lg transition-shadow duration-300 group border-2 hover:border-primary/20">
      <CardHeader className="text-center pb-4">
        <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
          {icon}
        </div>
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        <CardDescription className="text-muted-foreground">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <Button onClick={onClick} size="lg" className="w-full">
          {action}
        </Button>
      </CardContent>
    </Card>
  );
}

export function GenerateKolamCard() {
  return (
    <KolamFeature
      title="Generate Kolam Design"
      description="Create beautiful and traditional kolam patterns using AI-powered algorithms based on authentic design principles."
      icon={<Sparkles className="w-8 h-8 text-primary" />}
      action="Start Generating"
      onClick={() => console.log("Navigate to generator")}
    />
  );
}

export function AnalyzeKolamCard() {
  return (
    <KolamFeature
      title="Analyze Kolam Design"
      description="Upload your kolam images to discover the underlying mathematical patterns and design principles."
      icon={<Search className="w-8 h-8 text-primary" />}
      action="Upload & Analyze"
      onClick={() => console.log("Navigate to analyzer")}
    />
  );
}