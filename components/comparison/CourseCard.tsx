"use client";

import Link from "next/link";
import "@/app/course-page.css";

type Props = {
    title: string;
    description: string;
    imageUrl: string;
    href: string;
};

export default function CourseCard({ title, description, imageUrl, href }: Props) {
    return (
        <article className="course-card">
            <img src={imageUrl} alt={title} loading="lazy" />
            <div className="content">
                <h3>{title}</h3>
                <p>{description}</p>
                <Link href={href} className="link">
                    Compare →
                </Link>
            </div>
        </article>
    );
}
