import React, {useState, useContext, useEffect} from 'react';
import { UserContext } from './UserContext';
import Constants from 'expo-constants';

{/*Kontekst dla danych i aktualizacji ulubionych (klik na serduszku)*/}
export const AnimalDataContext = React.createContext();

const apiUrl = Constants.manifest.extra.apiUrl;

{/*Zarządzanie stanem i dostępem do niego*/}
export const AnimalDataProvider = ({ children }) => {

    const [animals, setAnimals] = useState([]);
    const userCtx = useContext(UserContext);

    useEffect(() => {
      console.log('new animals set on AnimalCtx: \n' + JSON.stringify(animals));
    }, [animals]);

    {/*GET /animal/read*/}
    async function getAnimals(tokenStr, params) {
      var animals = [], status = null, newJwt = null;
      var res = await fetch(`${apiUrl}/animal/read?` + params,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + tokenStr
          },
          method: 'GET'
        })
        .then(response => { 
          status = response.status;
          return response.json();
        })
        .then(async (data) => {
          switch(status) {
            case 200:
              // OK
              var jsonStr = JSON.stringify(data);
              animals = JSON.parse(jsonStr);
              break;
            case 401: 
              // jwt expired
              if(userCtx.userData.email) {
                var {newToken, userId} = await userCtx.relogin();
                animals = [];
                newJwt = newToken;
                console.log('Refreshed jwt token for user ' + userId + ':\n' + newToken);
              }
              break;
            default: 
              console.log('Unhandled getAnimals response status: ' + status);
              break;
          }
        });
        
      return {newJwt, animals};
    }

    async function updateAnimals(tokenStr, params) {
      var {newJwt, animals} = await getAnimals(tokenStr, params);
      // Powtórne wywołanie z nowym jwt w przypadku utraty ważności
      if(newJwt) 
        var {newJwt, animals} = await getAnimals(newJwt, params);
      //Serwer nie znalazł wyników
      if(animals == null) 
        animals = [];
      console.log('Animals object update:\n' + JSON.stringify(animals));
      //TODO: obrazki z bazy, temp solution
      animals.forEach( (animal) => {
        //wycięcie daty
        animal.admission_date = animal.admission_date.substring(0, 10);
      });
      setAnimals(animals);
    }

    //Aktualizacja animal.favourite
    //TODO: fav on-click PUT na serwer
    function updateFavourite(id) {
      
      animals.map(animal => {
        if(animal.id==id){
          console.log(`updateFavourite called for ${animal.name}, id = ${id}`);
          var index = animals.findIndex(a => a.id == id);
          let animalsCopy = animals;
          let animalCopy = animalsCopy[index];
          animalCopy.favourite = !animalCopy.favourite;
          animalsCopy[index] = animalCopy;
          setAnimals(animalsCopy);
        }
      });
    }

    return(
        <AnimalDataContext.Provider value={{ animals, setAnimals, updateAnimals, updateFavourite }}>
            {children}
        </AnimalDataContext.Provider>
      );
}