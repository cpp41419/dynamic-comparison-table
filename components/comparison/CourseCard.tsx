"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";
import "@/app/course-page.css";

type Props = {
    id?: string;
    code?: string;
    title: string;
    provider?: string;
    description: string;
    imageUrl: string;
    href: string;
    rating?: number;
    reviews?: number;
    price?: number;
    duration?: string;
    score?: number;
    rank?: number;
    expertBadge?: string;
    expertIcon?: string;
};

export default function CourseCard({ 
    title, 
    description, 
    imageUrl, 
    href,
    code,
    provider,
    rating,
    reviews,
    price,
    duration,
    score,
    rank,
    expertBadge,
    expertIcon,
}: Props) {
    return (
        <article className="course-card group relative overflow-hidden rounded-lg border border-border hover:border-secondary/60 transition-all duration-300 hover:shadow-lg hover:shadow-secondary/10">
            {/* Rank Badge */}
            {rank && (
                <div className="absolute top-3 left-3 z-20 flex items-center gap-2 px-2.5 py-1 bg-secondary/20 text-secondary rounded-full text-xs font-bold">
                    #{rank}
                </div>
            )}

            {/* Expert Icon Badge */}
            {expertIcon && (
                <div className="absolute top-3 right-3 z-20 text-2xl">
                    {expertIcon}
                </div>
            )}

            <div className="relative overflow-hidden h-40">
                <img 
                    src={imageUrl} 
                    alt={title} 
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
            </div>

            <div className="content p-5">
                {/* Course Code & Provider */}
                {code && provider && (
                    <div className="mb-3 space-y-1">
                        <span className="text-xs font-mono font-semibold text-muted-foreground/70">{code}</span>
                        <p className="text-xs text-muted-foreground">{provider}</p>
                    </div>
                )}

                <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2">{title}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{description}</p>

                {/* Metadata */}
                {(score || rating || duration || price) && (
                    <div className="flex flex-wrap gap-2 mb-4 text-xs">
                        {score && (
                            <Badge variant="outline" className="gap-1">
                                <TrendingUp className="w-3 h-3" />
                                {score}/10
                            </Badge>
                        )}
                        {duration && (
                            <Badge variant="outline">{duration}</Badge>
                        )}
                        {price && (
                            <Badge variant="outline" className="font-semibold">${price.toLocaleString()}</Badge>
                        )}
                    </div>
                )}

                {/* Expert Badge */}
                {expertBadge && (
                    <div className="mb-4 p-2 bg-secondary/10 border border-secondary/20 rounded-lg">
                        <p className="text-xs font-semibold text-secondary">{expertBadge}</p>
                    </div>
                )}

                {/* Rating */}
                {rating && reviews && (
                    <div className="mb-4 flex items-center gap-2 text-xs">
                        <span className="font-semibold text-foreground">⭐ {rating.toFixed(1)}</span>
                        <span className="text-muted-foreground">({reviews} reviews)</span>
                    </div>
                )}

                <Link href={href} className="inline-flex items-center gap-2 text-sm font-semibold text-secondary hover:text-accent transition-colors">
                    Compare →
                </Link>
            </div>
        </article>
    );
}
