"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, X } from "lucide-react";
import { experts, ExpertType } from "@/lib/expertFilters";

interface ExpertScenariosProps {
  onSelectExpert: (expert: ExpertType) => void;
  selectedExpert: ExpertType;
}

export default function ExpertScenarios({
  onSelectExpert,
  selectedExpert,
}: ExpertScenariosProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative mb-8">
      {/* Collapse Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full md:hidden mb-4 p-3 bg-gradient-to-r from-secondary/15 to-accent/15 border border-secondary/30 rounded-lg flex items-center justify-between hover:from-secondary/25 hover:to-accent/25 transition-all duration-200 group"
      >
        <span className="text-sm font-semibold text-foreground">
          {isExpanded ? "Hide" : "Show"} Expert Scenarios
        </span>
        <ChevronRight
          className={`h-4 w-4 transition-transform duration-300 text-secondary group-hover:text-accent ${
            isExpanded ? "rotate-90" : ""
          }`}
        />
      </button>

      {/* Expandable Container */}
      <div
        className={`transition-all duration-300 ease-out overflow-hidden ${
          isExpanded ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0 md:max-h-[600px] md:opacity-100"
        }`}
      >
        <div className="relative bg-gradient-to-br from-card via-card to-card/80 dark:from-primary/5 dark:via-primary/8 dark:to-primary/5 rounded-xl border border-border/50 p-6 md:p-8 overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-40 w-60 h-60 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            {/* Header */}
            <div className="mb-8 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                    Select Your Assistant
                  </h2>
                  <p className="text-sm md:text-base text-muted-foreground mt-2">
                    Choose an agent to automatically select the best RTOs based on your specific requirements.
                  </p>
                </div>
                {selectedExpert && (
                  <button
                    onClick={() => onSelectExpert(null)}
                    className="flex-shrink-0 p-2 hover:bg-secondary/10 rounded-lg transition-colors"
                    aria-label="Clear selection"
                  >
                    <X className="w-5 h-5 text-muted-foreground" />
                  </button>
                )}
              </div>
            </div>

            {/* Expert Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {experts.map((expert) => {
                const isSelected = selectedExpert === expert.id;

                return (
                  <button
                    key={expert.id}
                    onClick={() => onSelectExpert(expert.id as ExpertType)}
                    className="group h-full"
                  >
                    <Card
                      className={`h-full p-6 border-2 transition-all duration-300 cursor-pointer flex flex-col ${
                        isSelected
                          ? `${expert.borderColor} bg-gradient-to-br ${expert.color}/10 shadow-lg`
                          : "border-border hover:border-secondary/60 hover:shadow-md"
                      }`}
                    >
                      {/* Top Badge */}
                      {isSelected && (
                        <Badge className="w-fit mb-3 bg-secondary/20 text-secondary border-0">
                          Selected
                        </Badge>
                      )}

                      {/* Icon */}
                      <div className="text-4xl mb-3">{expert.icon}</div>

                      {/* Title & Subtitle */}
                      <h3 className="text-lg font-bold text-foreground text-left mb-1">
                        {expert.name}
                      </h3>
                      <p className={`text-xs font-semibold ${expert.accentColor} text-left mb-3`}>
                        {expert.title}
                      </p>

                      {/* Description */}
                      <p className="text-sm text-muted-foreground text-left flex-grow mb-4 leading-relaxed">
                        {expert.description}
                      </p>

                      {/* CTA */}
                      <div className="flex items-center gap-2 text-sm font-semibold text-secondary group-hover:text-accent transition-colors">
                        {isSelected ? "Active" : "Choose"}
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Card>
                  </button>
                );
              })}
            </div>

            {/* Info Text */}
            {selectedExpert && (
              <div className="mt-8 p-4 bg-secondary/10 rounded-lg border border-secondary/20">
                <p className="text-sm text-foreground">
                  <span className="font-semibold">Filtering active:</span> Showing RTOs prioritized for{" "}
                  <span className="font-semibold">
                    {experts.find((e) => e.id === selectedExpert)?.title}
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
