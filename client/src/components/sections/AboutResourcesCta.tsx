import { ChevronDown } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface AboutResourcesCtaProps {
    onContact: () => void;
}

export default function AboutResourcesCta({ onContact }: AboutResourcesCtaProps) {
    return (
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                            padding: "15px 24px",
                            background: "#4b4ba3",
                            color: "white",
                            border: "1px solid rgba(164,159,231,0.5)",
                            borderRadius: "3px",
                            fontWeight: 700,
                            fontSize: "13px",
                            cursor: "pointer",
                            fontFamily: "Satoshi, sans-serif",
                        }}
                    >
                        Free Resources
                        <ChevronDown aria-hidden="true" className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    align="start"
                    sideOffset={4}
                    className="min-w-[240px] border border-gray-200 bg-white p-1 shadow-lg"
                >
                    <DropdownMenuItem
                        asChild
                        className="cursor-pointer rounded-sm px-3 py-2.5 text-sm font-medium text-gray-800 outline-none focus:bg-[#f0eefb] focus:text-[#4b4ba3]"
                        onClick={() => {
                            const a = document.createElement("a");
                            a.href = "/assets/resources/Are You GAID-Ready 3.pdf";
                            a.download = "Are You GAID-Ready.pdf";
                            a.click();
                        }}
                    >
                        <span>Are You GAID-Ready?</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        asChild
                        className="cursor-pointer rounded-sm px-3 py-2.5 text-sm font-medium text-gray-800 outline-none focus:bg-[#f0eefb] focus:text-[#4b4ba3]"
                        onClick={() => {
                            const a = document.createElement("a");
                            a.href = "/assets/resources/SME GUIDEE.pdf";
                            a.download = "SME Compliance Guide.pdf";
                            a.click();
                        }}
                    >
                        <span>SME Compliance Guide</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <button
                onClick={onContact}
                style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "15px 24px",
                    background: "#4b4ba3",
                    color: "white",
                    border: 0,
                    borderRadius: "3px",
                    fontWeight: 700,
                    fontSize: "13px",
                    cursor: "pointer",
                    fontFamily: "Satoshi, sans-serif",
                }}
            >
                Talk to Our Team
            </button>
        </div>
    );
}