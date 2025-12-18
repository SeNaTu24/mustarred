import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download } from "lucide-react";
import { complianceTools } from "@/data/resources";
import { useState } from "react";
import EbookDownloadModal from "@/components/EbookDownloadModal";

export default function ResourceHubSection() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section className="py-8 md:py-12 bg-white">
            <div className="max-w-7xl mx-auto px-6 md:px-8">
                <div className="text-center mb-6">
                    <h2
                        className="mb-4"
                        style={{
                            color: "black",
                            fontSize: "48px",
                            fontWeight: "bold",
                        }}
                    >
                        Resource Hub
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                        Access the latest regulatory news, compliance tools, and
                        resources to keep your business informed and compliant.
                    </p>
                </div>

                {/* Featured Ebook Card */}
                <div className="mb-8">
                    <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex flex-col md:flex-row">
                            {/* Left: PDF Preview - Hidden on mobile */}
                            <div className="hidden md:flex md:w-1/4 p-4 lg:p-6 bg-gray-50 items-center justify-center">
                                <div className="w-16 h-20 lg:w-20 lg:h-28 bg-white border-2 border-gray-300 rounded-lg shadow-sm flex flex-col items-center justify-center">
                                    <div className="text-red-600 mb-1">
                                        <svg className="w-6 h-6 lg:w-8 lg:h-8" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="text-xs font-semibold text-gray-600">PDF</div>
                                </div>
                            </div>
                            
                            {/* Right: Content */}
                            <div className="flex-1 p-4 md:p-6">
                                <div className="flex flex-wrap items-center gap-2 mb-3">
                                    <Badge className="bg-blue-600 text-white text-xs">Featured Resource</Badge>
                                    <Badge variant="outline" className="text-xs">Free Download</Badge>
                                </div>
                                
                                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                                    Are You GAID-Ready?
                                </h3>
                                <p className="text-base md:text-lg text-gray-700 mb-4">
                                    Essential GAID 2025 Guidelines for DPOS and SMES
                                </p>
                                
                                <div className="mb-4">
                                    <h4 className="text-sm font-semibold text-gray-900 mb-2">What's Inside:</h4>
                                    <div className="space-y-1 text-sm text-gray-600">
                                        <div className="flex items-start">
                                            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                                            <span>Definition of Acronyms</span>
                                        </div>
                                        <div className="flex items-start">
                                            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                                            <span>Introduction & Governance Registration</span>
                                        </div>
                                        <div className="flex items-start">
                                            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                                            <span>Core Processing Principles & Lawful Bases</span>
                                        </div>
                                        <div className="flex items-start">
                                            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                                            <span>Technical & Operational Measures</span>
                                        </div>
                                        <div className="flex items-start">
                                            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                                            <span>Transparency & Data Subject Rights</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <Button 
                                    className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
                                    onClick={() => setIsModalOpen(true)}
                                >
                                    <Download className="h-4 w-4 mr-2" />
                                    Download Guide
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Horizontal Scrolling Cards */}
                <div className="overflow-x-auto pb-4">
                    <div className="flex gap-6 w-max">
                        {complianceTools.map((tool, i) => (
                            <Card
                                key={i}
                                className="hover-elevate w-80 flex-shrink-0"
                                data-testid={`card-compliance-tool-${i}`}
                            >
                                <CardHeader className="gap-1 space-y-0">
                                    <div className="flex items-center justify-between mb-3">
                                        <Badge
                                            className="w-fit"
                                            variant="secondary"
                                        >
                                            {tool.category}
                                        </Badge>
                                        <Badge className="w-fit" variant="outline">
                                            {tool.type}
                                        </Badge>
                                    </div>
                                    <CardTitle className="text-lg">
                                        {tool.name}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="text-sm text-muted-foreground">
                                        {tool.description}
                                    </p>
                                </CardContent>
                                <CardFooter>
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                        data-testid={`button-download-${i}`}
                                        onClick={() =>
                                            window.open(
                                                "https://mail.google.com/mail/?view=cm&to=info@mustarred.com&su=Request: " +
                                                    tool.name,
                                                "_blank"
                                            )
                                        }
                                    >
                                        <FileText className="h-4 w-4 mr-2" />
                                        Request Resource
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
            
            <EbookDownloadModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
            />
        </section>
    );
}
