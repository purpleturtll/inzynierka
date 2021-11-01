import React, {useState} from 'react'

{/*Kontekst dla filtrów i aktualizacji*/}
export const FilterContext = React.createContext();

{/*Zarządzanie stanem i dostępem do niego*/}
{/*https://scotch.io/courses/10-react-challenges-beginner/use-context-to-pass-data*/}
export const FilterDataProvider = ({ children }) => {

    const [filters, setFilters] = useState(
        {
            type: null,
            sex: null,
            city: null,
            age_from: null,
            age_to: null,
            weight_from: null,
            weight_to: null,
            breed: null,
            adoptable: null,
            recently_found: null,
            //TODO: implementacja serwera
            is_sterilized: null,
            is_vaccinated: null
        }
    );

    return(
        <FilterContext.Provider value={ {filters, setFilters} }>
            {children}
        </FilterContext.Provider>
    );
}