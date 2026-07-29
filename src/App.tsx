
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Register from "./pages/Register";
import RegisterConfirmation from "./pages/RegisterConfirmation";
import Dashboard from "./pages/dashboard/Dashboard"; 
import Scanner from "./pages/Scanner";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import MediaLibrary from "./pages/MediaLibrary";
import VisitorTypeSelection from "./pages/VisitorTypeSelection";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./components/ThemeProvider";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/register" element={<Register />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/register-confirmation" element={<RegisterConfirmation />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/scanner" element={<Scanner />} />
              <Route path="/media" element={<MediaLibrary />} />
              <Route path="/visitor-type" element={<VisitorTypeSelection />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
