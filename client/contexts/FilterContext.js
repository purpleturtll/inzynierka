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
            location: null,
            age: null,
            weight: null,
            race: null,
            adoptable: null,
            urgent: null
        }
    );

    return(
        <FilterContext.Provider value={ {filters, setFilters} }>
            {children}
        </FilterContext.Provider>
    );
}