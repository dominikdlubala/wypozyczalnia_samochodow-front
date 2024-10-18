import { useNavigate } from 'react-router-dom'; 

import type { Car } from '../../types'; 

export interface GalleryProps {
    filter?: {category: string, value: string} | null; 
    galleryItems: Car[] | null; 
}

export default function Gallery({ filter, galleryItems }: GalleryProps) {

    const navigate = useNavigate(); 

    const galleryList = galleryItems ? galleryItems
        .filter(car => car.model.toLowerCase().startsWith(filter ? filter.value : ''))
        .map(car => {
            return (
                <li 
                    className="gallery-item" 
                    key={Math.random()}
                    onClick={() => navigate(`/car?id=${car.id}`)}
                >
                    <img className="car-image" src={car.imageUrl} alt="car-img"/>
                    <div className="car-model">{car.model}</div>
                </li>
            );
    })
    :
    <div>
        Nie znaleziono samochodu o Twoich wymaganiach
    </div>

    return (
        <div className="gallery">
            {galleryList}
        </div>
    )
}