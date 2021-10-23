import React, {useState, useContext, useEffect} from 'react'
import { AppContext } from './AppContext'

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

{/*Kontekst dla danych i aktualizacji ulubionych (klik na serduszku)*/}
export const AnimalDataContext = React.createContext();

{/*Zarządzanie stanem i dostępem do niego*/}
export const AnimalDataProvider = ({ children }) => {

    const [animals, setAnimals] = useState(initState);
    var appCtx = useContext(AppContext);

    useEffect(() => {
      console.log('new userToken set on AnimalCtx: ' + appCtx.userToken);
    }, [appCtx.userToken]);

    useEffect(() => {
      console.log('new loggedIn set on AnimalCtx: ' + (appCtx.loggedIn ? 'true' : 'false'));
    }, [appCtx.loggedIn]);

    {/*GET /animal/read*/}
    function getAnimals(tokenStr) {
      var respBody = null;
      console.log('getAnimals() request token: ' + tokenStr);
      var res = fetch('http://192.168.1.70:8080/animal/read', {
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
        
      return respBody != null ? respBody : initState;
    }

    function updateAnimals(tokenStr) {
      setAnimals(getAnimals(tokenStr));
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