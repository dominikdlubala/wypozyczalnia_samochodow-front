import React, { useState } from 'react';
import Gallery from '../components/Gallery'; 
import Input from '../components/Input'; 

export default function HomePage() {

  const [inputValue, setInputValue] = useState<string>(''); 
  const [galleryFilter, setGalleryFilter] = useState<{category: string, value: string} | null>(null); 

  const onChange = (value: string) => {
    setInputValue(value); 
  }
  const inputSubmit = (x:string) => {
    setGalleryFilter({category: 'model', value: inputValue}); 
  }

  return (
    <div className="page page-home">
      <Input
        value={inputValue}
        onChange={onChange}
        onSubmit={inputSubmit}
        className="input-home"
      />
      <Gallery 
        filter={galleryFilter}
      />
    </div>
  );
}
