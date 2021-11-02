import React, {useState, useContext} from 'react'
import { UserContext } from './UserContext';

{/*Kontekst dla filtrów i aktualizacji*/}
export const FilterContext = React.createContext();

{/*Zarządzanie stanem i dostępem do niego*/}
{/*https://scotch.io/courses/10-react-challenges-beginner/use-context-to-pass-data*/}
export const FilterDataProvider = ({ children }) => {

    const userCtx = useContext(UserContext);
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

    function toParams(filters, params) {
        
        for(const prop in filters) {
            var value = filters[prop];
            if(value != null) {
                switch(prop) {
                    case 'type':
                        params.append('animal-type', value);
                    break;
                    case 'sex':
                        params.append(prop, value);
                    break;
                    case 'city':
                        params.append(prop, value);
                    break;
                    case 'age_from':
                        params.append('age-from', value);
                    break;
                    case 'age_to':
                        params.append('age-to', value);
                    break;
                    case 'weight_from':
                        params.append('weight-from', value);
                    break;
                    case 'weight_to':
                        params.append('weight-to', value);
                    break;
                    case 'breed':
                        params.append(prop, value);
                    break;
                    // TODO: filtry adoptable, recently_found, is_sterilized, is_vaccinated (serwer)
                    default:
                    break;
                }
            } 
        }
        return params;
    }

    return(
        <FilterContext.Provider value={ {filters, setFilters, toParams} }>
            {children}
        </FilterContext.Provider>
    );
}