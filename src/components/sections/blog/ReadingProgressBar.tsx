'use client';

import React, { useEffect, useState } from 'react';

export default function ReadingProgressBar() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const updateProgress = () => {
            const article = document.querySelector('article');
            if (!article) return;

            const articleTop = article.offsetTop;
            const articleHeight = article.offsetHeight;
            const windowHeight = window.innerHeight;
            const scrollTop = window.scrollY;

            const articleStart = articleTop - windowHeight / 2;
            const articleEnd = articleTop + articleHeight - windowHeight / 2;
            const scrollRange = articleEnd - articleStart;

            const currentProgress = ((scrollTop - articleStart) / scrollRange) * 100;
            const clampedProgress = Math.min(Math.max(currentProgress, 0), 100);

            setProgress(clampedProgress);
        };

        window.addEventListener('scroll', updateProgress);
        updateProgress(); // Initial calculation

        return () => window.removeEventListener('scroll', updateProgress);
    }, []);

    return (
        <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-slate-800/50">
            <div
                    className="h-full bg-linear-to-r from-blue-500 to-cyan-500 transition-all duration-150 ease-out"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
}
