import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ModalProvider } from "@/contexts/ModalContext";
import { usePageTracking } from "@/hooks/usePageTracking";
import Chatbot from "@/components/Chatbot";
import Home from "@/pages/Home";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import AboutUs from "@/pages/AboutUs";
import Services from "@/pages/Services";
import Training from "@/pages/Training";
import Consultation from "@/pages/Consultation";
import DCMICompliance from "@/pages/DCMICompliance";
import Incorporation from "@/pages/Incorporation";
import Insights from "@/pages/Insights";
import NotFound from "@/pages/not-found";

function Router() {
    // Track page views for Google Analytics
    usePageTracking();

    return (
        <Switch>
            <Route path="/" component={Home} />
            <Route path="/about" component={AboutUs} />
            <Route path="/services" component={Services} />
            <Route path="/training" component={Training} />
            <Route path="/consultation" component={Consultation} />
            <Route path="/dcmi-compliance" component={DCMICompliance} />
            <Route path="/incorporation" component={Incorporation} />
            <Route path="/our-insights" component={Insights} />
            <Route path="/blog" component={Blog} />
            <Route path="/blog/:id" component={BlogPost} />
            <Route component={NotFound} />
        </Switch>
    );
}

function App() {
    return (
        <ErrorBoundary>
            <QueryClientProvider client={queryClient}>
                <TooltipProvider>
                    <ModalProvider>
                        <Toaster />
                        <Router />
                        <Chatbot />
                    </ModalProvider>
                </TooltipProvider>
            </QueryClientProvider>
        </ErrorBoundary>
    );
}

export default App;
