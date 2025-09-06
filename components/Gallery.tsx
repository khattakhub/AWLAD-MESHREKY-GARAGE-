import React, { useState, useEffect } from 'react';

const images = [
  'https://storage.googleapis.com/prompt-gallery/prod/images/564344e2-04e4-4f25-83f5-62b8a7b871c8/2/image.png', // User's garage image
  'https://images.unsplash.com/photo-1542844397-e387339a49c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80', // Mechanic under car
  'https://images.unsplash.com/photo-1616852382901-70614183ba79?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80', // Engine closeup
  'https://images.unsplash.com/photo-1620027734899-738953f52478?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80', // Tire change
  'https://images.unsplash.com/photo-1553859943-a02c544d7155?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
  'https://images.unsplash.com/photo-1571271513813-91185f269399?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80', // Welding
  'https://images.unsplash.com/photo-1623955026422-95e2a401c4a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
];

const Gallery: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const openModal = (src: string) => {
        setSelectedImage(src);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setSelectedImage(null);
        document.body.style.overflow = 'auto';
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'auto'; // Ensure scroll is restored on component unmount
        };
    }, []);

    return (
        <section id="gallery" className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-brand-dark">Our Work</h2>
                    <p className="text-gray-600 mt-2 max-w-2xl mx-auto">A glimpse into the quality and precision we bring to every vehicle.</p>
                </div>
                <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
                    {images.map((src, index) => (
                        <div key={index} className="break-inside-avoid rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer" onClick={() => openModal(src)}>
                            <img src={src} alt={`Garage work example ${index + 1}`} className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-300" loading="lazy" />
                        </div>
                    ))}
                </div>
            </div>

            {selectedImage && (
                <div 
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 transition-opacity duration-300 animate-fade-in"
                    onClick={closeModal}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="image-modal-title"
                >
                    <button 
                        onClick={closeModal} 
                        className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 transition-colors z-50"
                        aria-label="Close image view"
                    >
                        &times;
                    </button>
                    <div 
                        className="relative max-w-4xl max-h-[90vh] p-4 animate-zoom-in"
                        onClick={(e) => e.stopPropagation()} // Prevents closing modal when clicking on the image
                    >
                        <h2 id="image-modal-title" className="sr-only">Enlarged Image</h2>
                        <img 
                            src={selectedImage} 
                            alt="Enlarged view of garage work" 
                            className="w-full h-full object-contain rounded-lg shadow-2xl"
                        />
                    </div>
                </div>
            )}
            {/* Fix: The 'jsx' and 'global' props are for styled-jsx (used in Next.js) and are not valid in a standard React app. Replaced with a standard <style> tag. */}
            <style>{`
              @keyframes fade-in {
                from { opacity: 0; }
                to { opacity: 1; }
              }
              @keyframes zoom-in {
                from { transform: scale(0.9); opacity: 0; }
                to { transform: scale(1); opacity: 1; }
              }
              .animate-fade-in {
                animation: fade-in 0.3s ease-out forwards;
              }
              .animate-zoom-in {
                animation: zoom-in 0.3s ease-out forwards;
              }
            `}</style>
        </section>
    );
};

export default Gallery;
