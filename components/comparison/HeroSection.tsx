"use client";

import React from "react";
import Link from "next/link";
import "@/app/course-page.css";

export default function HeroSection() {
    return (
        <section className="hero">
            <h1>Explore Our Courses</h1>
            <p>Find the perfect program, compare features, and start learning today.</p>
            <Link href="#courses" className="cta">
                Browse Courses
            </Link>
        </section>
    );
}
