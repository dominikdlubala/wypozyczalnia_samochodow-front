import { useNavigate } from 'react-router-dom'; 

export interface GalleryProps {
    filter?: {category: string, value: string} | null; 
}

export default function Gallery({ filter }: GalleryProps) {

    const navigate = useNavigate(); 

    const galleryItems = [
        { model: 'Toyota Corolla', imageUrl: './images/corolla.png', id: 4  }, 
        { model: 'Toyota RAV4', imageUrl: './images/corolla.png', id: 4 },
        { model: 'Toyota Supra', imageUrl: './images/corolla.png', id: 4 }, 
        { model: 'Toyota Yaris GR', imageUrl: './images/corolla.png', id: 4},
        { model: 'Toyota Corolla', imageUrl: './images/corolla.png', id: 4 }, 
        { model: 'Toyota RAV4', imageUrl: './images/corolla.png', id: 4 },
        { model: 'Toyota Supra', imageUrl: './images/corolla.png', id: 4 }, 
        { model: 'Toyota Yaris GR', imageUrl: './images/corolla.png', id: 4},
        { model: 'Toyota Corolla', imageUrl: './images/corolla.png', id: 4 }, 
        { model: 'Toyota RAV4', imageUrl: './images/corolla.png', id: 4 },
        { model: 'Toyota Supra', imageUrl: './images/corolla.png', id: 4 }, 
        { model: 'Toyota Yaris GR', imageUrl: './images/corolla.png', id: 4},
    ]

    const galleryList = galleryItems
        .filter(car => car.model.toLowerCase().startsWith(filter ? filter.value : ''))
        .map(car => {
            return (
                <li 
                    className="gallery-item" 
                    key={Math.random()}
                    onClick={() => navigate(`/car/${car.id}`)}
                >
                    <img className="car-image" src={car.imageUrl} alt="car-img"/>
                    <div className="car-model">{car.model}</div>
                </li>
            );
    })

    return (
        <div className="gallery">
            {galleryList}
        </div>
    )
}