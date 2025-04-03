import Link from 'next/link';

interface BlogCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
}

export default function BlogCard({ id, title, description, image }: BlogCardProps) {
  return (
    <Link href={`/blog/${id}`}>
      <div className="relative group overflow-hidden rounded-xl cursor-pointer">
        <div className="relative h-64">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 text-white">
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-sm opacity-90">{description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
} 