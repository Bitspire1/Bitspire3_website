import { tinaField } from 'tinacms/dist/react';
import MetaBadge from '@/components/ui/MetaBadge';

interface BlogPostHeaderProps {
    title: string;
    description: string;
    category?: string | null;
    readTime?: number | null;
    author: string;
    date: string;
    locale: string;
    data?: any;
    translations: {
        by: string;
        readTime: (minutes: number) => string;
    };
}

export default function BlogPostHeader({ 
    title, 
    description, 
    category, 
    readTime, 
    author, 
    date,
    locale,
    data,
    translations: t 
}: BlogPostHeaderProps) {
    const formatDate = (dateString: string) => {
        const dateObj = new Date(dateString);
        return dateObj.toLocaleDateString(locale === 'pl' ? 'pl-PL' : 'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <>
            {/* Category & Read Time */}
            <div className="flex items-center gap-4 mb-2">
                {category && (
                    <MetaBadge 
                        label={category} 
                        variant="blue"
                        tinaField={data ? tinaField(data, 'category') : undefined}
                    />
                )}
                {readTime && (
                    <span 
                        className="text-sm text-slate-400"
                        data-tina-field={data ? tinaField(data, 'readTime') : undefined}
                    >
                        {t.readTime(readTime)}
                    </span>
                )}
            </div>

            {/* Title */}
            <h1 
                className="text-4xl md:text-5xl font-bold text-white mb-3 leading-tight"
                data-tina-field={data ? tinaField(data, 'title') : undefined}
            >
                {title}
            </h1>

            {/* Description */}
            <p 
                className="text-xl text-slate-300 mb-6"
                data-tina-field={data ? tinaField(data, 'description') : undefined}
            >
                {description}
            </p>

            {/* Meta info */}
            <div className="flex items-center gap-4 text-sm text-slate-400 mb-8 pb-8 border-b border-slate-700/50">
                <span>{t.by} {author}</span>
                <span>•</span>
                <span data-tina-field={data ? tinaField(data, 'date') : undefined}>
                    {formatDate(date)}
                </span>
            </div>
        </>
    );
}
