import React, {useState, useContext, useEffect} from 'react'
import { AppContext } from './AppContext'

const emergencyState = [
  {
    id: 1,
    name: 'Angus',
    type: 'pies',
    breed: 'mieszaniec',
    sex: 'samiec',
    favourite: true,
    adoptable: true,
    recently_found: true,
    weight: 9,
    age: 156,
    city: 'Warszawa',
    admission_date: '20-11-2020',
    description: 'Opis Angusa',
    imageUrl: '',
    chip_number: 'A1234',
    is_sterilized: false,
    is_vaccinated: true
  },
  {
    id: 2,
    name: 'Mruczek',
    type: 'kot',
    breed: 'europejska',
    sex: 'samiec',
    favourite: false,
    adoptable: true,
    recently_found: false,
    weight: 7,
    age: 60,
    city: 'Otwock',
    admission_date: '24-12-2020',
    description: 'Opis Mruczka',
    imageUrl: '',
    chip_number: 'B2345',
    is_sterilized: false,
    is_vaccinated: true
  },
  {
    id: 3,
    name: 'Mia',
    type: 'pies',
    breed: 'buldog',
    sex: 'samica',
    favourite: false,
    adoptable: false,
    recently_found: true,
    weight: 5,
    age: 10,
    city: 'Lublin',
    admission_date: '7-02-2021',
    description: 'Opis Mii',
    imageUrl: '',
    chip_number: 'C3456',
    is_sterilized: false,
    is_vaccinated: true
  },
];

{/*Kontekst dla danych i aktualizacji ulubionych (klik na serduszku)*/}
export const AnimalDataContext = React.createContext();

{/*Zarządzanie stanem i dostępem do niego*/}
export const AnimalDataProvider = ({ children }) => {

    const [animals, setAnimals] = useState([]);
    var appCtx = useContext(AppContext);

    useEffect(() => {
      console.log('new userToken set on AnimalCtx: ' + appCtx.userToken);
    }, [appCtx.userToken]);

    useEffect(() => {
      console.log('new loggedIn set on AnimalCtx: ' + (appCtx.loggedIn ? 'true' : 'false'));
    }, [appCtx.loggedIn]);

    useEffect(() => {
      console.log('new animals set on AnimalCtx: \n' + JSON.stringify(animals));
    }, [animals]);

    {/*GET /animal/read*/}
    async function getAnimals(tokenStr) {
      var respBody = null;
      console.log('getAnimals() request token: ' + tokenStr);
      var res = await fetch('http://192.168.1.70:8080/animal/read', {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + tokenStr
        },
        method: 'GET'})
        .then(response => { return response.json() })
        .then(data => {
          var jsonStr = JSON.stringify(data);
          respBody = JSON.parse(jsonStr);
          console.log('getAnimals() received: \n' + jsonStr);
        });
        
      return respBody != null ? respBody : emergencyState;
    }

    async function updateAnimals(tokenStr) {
      var animals = await getAnimals(tokenStr);
      console.log('animals object:\n' + JSON.stringify(animals));
      //TODO: animal.favourite & obrazki z bazy, temp solution
      animals.forEach( (animal) => {
        if(animal.id < 3) animal.favourite = true;
        else animal.favourite = false;
        //wycięcie daty
        animal.admission_date = animal.admission_date.substring(0, 10);
      });
      setAnimals([]);
      setAnimals(animals);
    }

    {/*Aktualizacja animal.favourite*/}
    function updateFavourite(id) {
      
      animals.map(animal => {
        if(animal.id==id){
          console.log("animal.id: " + id + ", animal.name: " + animal.name);
          var index = animals.findIndex(a => a.id == id);
          let animalsCopy = animals;
          let animalCopy = animalsCopy[index];
          animalCopy.favourite = !animalCopy.favourite;
          animalsCopy[index] = animalCopy;
          setAnimals(animalsCopy);
          console.log("updateFavourite called for id: " + id);
          animals.forEach(a => {
            console.log("name: " + a.name + ", fav: " + a.favourite);
          });
        }
      });
    }

    return(
        <AnimalDataContext.Provider value={{ animals, setAnimals, updateAnimals, updateFavourite }}>
            {children}
        </AnimalDataContext.Provider>
      );
}