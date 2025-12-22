interface TagsListProps {
    tags: (string | null)[];
    variant?: 'blue' | 'cyan';
    maxTags?: number;
    size?: 'sm' | 'md';
}

export default function TagsList({ tags, variant = 'blue', maxTags = 3, size = 'sm' }: TagsListProps) {
    const filteredTags = tags.filter((tag): tag is string => !!tag).slice(0, maxTags);
    
    if (filteredTags.length === 0) return null;
    
    const variantClasses = {
        blue: 'bg-blue-500/10 text-blue-300 border-blue-500/20',
        cyan: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20'
    };
    
    const sizeClasses = {
        sm: 'text-xs px-2 py-1',
        md: 'text-sm px-3 py-1'
    };
    
    return (
        <div className="flex flex-wrap gap-2">
            {filteredTags.map((tag) => (
                <span
                    key={tag}
                    className={`rounded-md border ${variantClasses[variant]} ${sizeClasses[size]}`}
                >
                    {tag}
                </span>
            ))}
        </div>
    );
}
