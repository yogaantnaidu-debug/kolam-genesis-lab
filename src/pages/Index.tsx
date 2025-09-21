import AuthButtons from "@/components/auth/AuthButtons";
import { GenerateKolamCard, AnalyzeKolamCard } from "@/components/KolamFeature";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 kolam-bg"></div>
      <div className="absolute inset-0 kolam-pattern"></div>
      
      {/* Header */}
      <header className="relative z-10 w-full p-6">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-primary">Kolam Designer</h1>
          </div>
          <AuthButtons />
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-6">
        <div className="text-center mb-12 max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Discover the Beauty of
            <span className="text-primary block mt-2">Kolam Designs</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Explore the mathematical principles behind traditional kolam patterns. 
            Generate new designs or analyze existing ones with cutting-edge computer vision.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="flex flex-col md:flex-row gap-8 items-center justify-center w-full max-w-5xl">
          <GenerateKolamCard />
          <AnalyzeKolamCard />
        </div>

        {/* Problem Statement */}
        <div className="mt-16 max-w-4xl text-center">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Research Focus</h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            This project develops computer programs to identify design principles behind traditional Kolam patterns 
            and recreate them programmatically, bridging ancient art with modern computational methods.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Index;
