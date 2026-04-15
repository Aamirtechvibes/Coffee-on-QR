interface BrandMarkProps {
  alt?: string;
  className?: string;
}

export default function BrandMark({
  alt = 'Coffee on QR',
  className = 'h-8 w-8 object-contain',
}: BrandMarkProps) {
  return <img src="/coffee-on-qr-icon.png" alt={alt} className={className} loading="eager" />;
}
