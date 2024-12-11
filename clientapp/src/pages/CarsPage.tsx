import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom'; 

import Gallery from '../components/car/Gallery'; 
import Input from '../components/primitives/Input'; 

import type { Car, CarApiReturn } from '../types';
import { getFilteredCars } from '../services/CarService'; 
import CarFilterForm, { FormValues } from '../components/car/CarFilterForm';

export default function CarsPage() {

  const [inputValue, setInputValue] = useState<string>(''); 
  const [galleryFilter, setGalleryFilter] = useState<string | null>(null);
  const [filteredCars, setFilteredCars] = useState<CarApiReturn>({ data: null });  

  const [searchParams] = useSearchParams(); 

  const query = window.location.search; 

  const initialValues = useMemo(() => {
    const filter: FormValues = {};
    searchParams.forEach((value, key) => {
      filter[key] = value;
    });
  
    return Object.freeze(filter);  
  }, [searchParams]);

  useEffect(() => {
    const paramsMap = new Map(searchParams); 

    let filter = {}; 
    paramsMap.forEach((value, key) => {
      filter = { ...filter, [key]: value }
    })

    const fetchFilteredCars = async () => {
      const data = await getFilteredCars(query); 
      setFilteredCars(data); 
    }

    fetchFilteredCars(); 
  }, [searchParams]); 


  const onChange = (value: string) => {
    setInputValue(value); 
    setGalleryFilter(value); 
  }
  const inputSubmit = (x:string) => {
    setGalleryFilter(inputValue); 
  }

  return (
    <div className="page page-cars">
      <div className="content-wrapper">
        <div className="form-group w-100">
          <label className="form-label">Model</label>
          <Input
            value={inputValue}
            onChange={onChange}
            onSubmit={inputSubmit}
            className="input-home"
          />
        </div>

        <CarFilterForm initialValues={initialValues} />

        <Gallery 
          filter={galleryFilter}
          galleryItems={filteredCars.data as Car[]}
        />
      </div>
    </div>
  );
}
