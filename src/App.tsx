import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Layout } from "@/components/Layout";
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

// Wrapper that applies the public Layout
const PublicLayout = () => (
  <Layout>
    <Outlet />
  </Layout>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public routes with Layout */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/register" element={<Register />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/register-confirmation" element={<RegisterConfirmation />} />
                <Route path="/login" element={<Login />} />
                <Route path="/scanner" element={<Scanner />} />
                <Route path="/media" element={<MediaLibrary />} />
                <Route path="/visitor-type" element={<VisitorTypeSelection />} />
              </Route>
              
              {/* Dashboard - has its own sidebar layout */}
              <Route path="/dashboard" element={<Dashboard />} />
              
              {/* Catch-all */}
              <Route path="*" element={<PublicLayout />}>
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
