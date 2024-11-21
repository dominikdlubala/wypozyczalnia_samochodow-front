import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import type { Car } from '../../types';

export interface GalleryProps {
    filter?: string | null;
    galleryItems: Car[] | null;
}

export default function Gallery({ filter, galleryItems }: GalleryProps) {
    const navigate = useNavigate();
    const [uploadingCarId, setUploadingCarId] = useState<number | null>(null);
    const [updatedGalleryItems, setUpdatedGalleryItems] = useState<Car[]>(galleryItems || []);

    // useEffect to update local state when galleryItems prop changes
    useEffect(() => {
        if (galleryItems) {
            setUpdatedGalleryItems(galleryItems);
        }
    }, [galleryItems]);

    // Function to handle file upload
    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>, carId: number) => {
        if (event.target.files && event.target.files.length > 0) {
            const selectedFile = event.target.files[0];
            setUploadingCarId(carId); // Set uploading state

            const formData = new FormData();
            formData.append("imageFile", selectedFile);

            try {
                const response = await fetch(`http://localhost:5009/api/Car/${carId}/uploadImage`, {
                    method: "POST",
                    body: formData,
                });

                if (response.ok) {
                    const data = await response.json();
                    alert("Obraz przesłany pomyślnie!");

                    // Update image URL in the local state
                    const updatedItems = updatedGalleryItems.map(car =>
                        car.id === carId ? { ...car, imageUrl: data.ImageUrl } : car
                    );
                    setUpdatedGalleryItems(updatedItems);
                } else {
                    const error = await response.text();
                    alert(`Błąd przesyłania obrazu: ${error}`);
                }
            } catch (error) {
                console.error("Błąd przesyłania obrazu:", error);
                alert("Nie udało się przesłać obrazu.");
            } finally {
                setUploadingCarId(null); // Reset uploading state
                event.target.value = ''; // Clear the file input
            }
        }
    };

    // Render the gallery items
    const galleryList = updatedGalleryItems
        .filter(car => car.model.toLowerCase().startsWith(filter ? filter.toLowerCase() : ''))
        .map(car => (
            <li 
                className="gallery-item" 
                key={car.id}
                onClick={() => navigate(`/car?id=${car.id}`)}
            >
                <img className="car-image" src={car.imageUrl || "/placeholder.png"} alt="car-img"/>
                <div className="car-model">{car.model}</div>
                <div 
                    className="file-upload-container" 
                    onClick={(e) => e.stopPropagation()} // Prevent navigating to car details
                >
                    <input 
                        type="file" 
                        onChange={(event) => handleFileChange(event, car.id)} 
                        disabled={uploadingCarId === car.id} // Disable button while uploading
                    />
                    {uploadingCarId === car.id && <p>Przesyłanie...</p>}
                </div>
            </li>
        ));

    return (
        <div className="gallery">
            {updatedGalleryItems.length > 0 ? galleryList : <p>Nie znaleziono samochodu o Twoich wymaganiach</p>}
        </div>
    );
}
