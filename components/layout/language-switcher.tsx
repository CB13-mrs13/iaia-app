
"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/hooks/use-language";
import { type SupportedLanguage } from "@/contexts/language-context";
import { Globe } from "lucide-react";

interface LanguageOption {
  code: SupportedLanguage;
  name: string;
}

const languageOptions: LanguageOption[] = [
  { code: "en", name: "English" },
  { code: "fr", name: "Français" },
  { code: "es", name: "Español" },
];

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-10 w-auto px-3 text-black hover:text-black hover:bg-transparent gap-2">
          <Globe className="h-6 w-6 !text-black stroke-[2]" />
          <span className="text-sm font-semibold uppercase !text-black">{language}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white border border-gray-200 shadow-lg min-w-[140px] rounded-lg z-50">
        {languageOptions.map((option) => (
          <DropdownMenuItem
            key={option.code}
            onClick={() => setLanguage(option.code)}
            className={`cursor-pointer hover:bg-yellow-50 rounded ${
              language === option.code 
                ? "font-bold text-black" 
                : "text-gray-700"
            }`}
            style={language === option.code ? { backgroundColor: '#FACC15' } : undefined}
          >
            {option.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
