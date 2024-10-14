import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'; 

import Gallery from '../components/Gallery'; 
import Input from '../components/Input'; 
import { galleryItems } from '../components/Gallery'; 

export default function CarsPage() {

  const [inputValue, setInputValue] = useState<string>(''); 
  const [galleryFilter, setGalleryFilter] = useState<{category: string, value: string} | null>(null); 

  const [searchParams] = useSearchParams(); 


  useEffect(() => {
    const engineType = searchParams.get('engineType'); 
    const displacement = searchParams.get('displacement'); 
    const bodyType = searchParams.get('bodyType'); 
    const colour = searchParams.get('colour'); 
    const priceMin = searchParams.get('priceMin'); 
    const priceMax = searchParams.get('priceMax'); 
    const yearMin = searchParams.get('yearMin'); 
    const yearMax = searchParams.get('yearMax'); 


  }, [])


  const onChange = (value: string) => {
    setInputValue(value); 
  }
  const inputSubmit = (x:string) => {
    setGalleryFilter({category: 'model', value: inputValue}); 
  }

  return (
    <div className="page page-cars">
      <Input
        value={inputValue}
        onChange={onChange}
        onSubmit={inputSubmit}
        className="input-home"
      />
      <Gallery 
        filter={galleryFilter}
        galleryItems={galleryItems}
      />
    </div>
  );
}
