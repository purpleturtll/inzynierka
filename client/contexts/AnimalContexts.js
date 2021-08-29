import { Random } from 'expo';
import React, {useState, useContext} from 'react'

const initState = [
  {
    id: 1,
    name: 'Angus',
    type: 'pies',
    race: 'mieszaniec',
    sex: 'samiec',
    postDate: '6/3/21',
    favourite: true,
    adoptable: true,
    urgent: true,
    weight: 9,
    ageMonths: 156,
    city: 'Warszawa',
    location: 'Schronisko dla Bezdomnych Zwierząt w Warszawie',
    takeInDate: '20-11-2020',
    description: 'Opis Angusa',
    imageUrl: '',
    image: 'dog1'
  },
  {
    id: 2,
    name: 'Mruczek',
    type: 'kot',
    race: 'europejska',
    sex: 'samiec',
    postDate: '2/3/21',
    favourite: false,
    adoptable: true,
    urgent: false,
    weight: 7,
    ageMonths: 60,
    city: 'Otwock',
    location: 'Schronisko dla Bezdomnych Zwierząt w Otwocku',
    takeInDate: '24-12-2020',
    description: 'Opis Mruczka',
    imageUrl: '',
    image: 'cat1'
  },
  {
    id: 3,
    name: 'Mia',
    type: 'pies',
    race: 'buldog',
    sex: 'samica',
    postDate: '1/3/21',
    favourite: false,
    adoptable: false,
    urgent: true,
    weight: 5,
    ageMonths: 10,
    city: 'Lublin',
    location: 'Schronisko dla Bezdomnych Zwierząt w Lublinie',
    takeInDate: '7-02-2021',
    description: 'Opis Mii',
    imageUrl: '',
    image: 'dog2'
  },
];

{/*konteksty dla danych i aktualizacji ulubionych (klik na serduszku)*/}
const AnimalDataContext = React.createContext();
const AnimalUpdateContext = React.createContext();

export function useAnimalData() {
  return useContext(AnimalDataContext);
}

export function useAnimalFavUpdate() {
    return useContext(AnimalUpdateContext);
}

{/*zarządzanie stanem i dostępem do niego*/}
export const AnimalDataProvider = ({ children }) => {

    const [animals, setAnimals] = useState(initState);

    {/*aktualizacja stanu - animal.favourite*/}
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
          console.log("setAnimals called for id: " + id);
          animals.forEach(a => {
            console.log("name: " + a.name + ", fav: " + a.favourite);
          });
        }
      });
    }

    return(
        <AnimalDataContext.Provider value={animals}>
            <AnimalUpdateContext.Provider value={updateFavourite}>
                {children}
            </AnimalUpdateContext.Provider>
        </AnimalDataContext.Provider>
      );
}