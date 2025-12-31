import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";
import { complianceTools } from "@/data/resources";

export default function ResourceHubSection() {
    return (
        <section className="py-6 md:py-8 bg-white">
            <div className="max-w-7xl mx-auto px-6 md:px-8">
                <div className="text-center mb-6">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-black">
                        Resource Hub
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                        Access the latest regulatory news, compliance tools, and
                        resources to keep your business informed and compliant.
                    </p>
                </div>

                {/* Horizontal Scrolling Cards */}
                <div className="relative">
                    {/* Scroll Hint */}
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-sm text-gray-600">Scroll to see more resources →</p>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span>Swipe</span>
                            <div className="flex gap-1">
                                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="overflow-x-auto pb-4 scrollbar-hide">
                        <div className="flex gap-6 w-max">
                            {complianceTools.map((tool, i) => (
                            <Card
                                key={i}
                                className="w-80 flex-shrink-0 bg-white border border-gray-200 hover:border-gray-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                                data-testid={`card-compliance-tool-${i}`}
                            >
                                <CardHeader className="gap-1 space-y-0 pb-4">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                                            <FileText className="h-5 w-5 text-blue-600" />
                                        </div>
                                        <div className="flex gap-2">
                                            <Badge
                                                className="text-xs px-2 py-1 bg-gray-100 text-gray-700 hover:bg-gray-200"
                                                variant="secondary"
                                            >
                                                {tool.category}
                                            </Badge>
                                            <Badge
                                                className="text-xs px-2 py-1 border-gray-300 text-gray-600"
                                                variant="outline"
                                            >
                                                {tool.type}
                                            </Badge>
                                        </div>
                                    </div>
                                    <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                        {tool.name}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4 pb-4">
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        {tool.description}
                                    </p>
                                </CardContent>
                                <CardFooter className="pt-0">
                                    <Button
                                        variant="outline"
                                        className="w-full border-gray-300 text-gray-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-all duration-200"
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
            </div>
        </section>
    );
}
