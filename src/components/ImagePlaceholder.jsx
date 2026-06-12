export default function ImagePlaceholder({ src, alt, className, style, placeholder }) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt || ''}
        className={className}
        style={{ ...style, objectFit: 'cover', width: '100%', height: '100%' }}
        loading="lazy"
      />
    );
  }
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '16px',
      }}
    >
      {placeholder && <span className="slot-cap">{placeholder}</span>}
    </div>
  );
}
