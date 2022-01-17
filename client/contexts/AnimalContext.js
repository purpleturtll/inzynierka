import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from './UserContext';
import Constants from 'expo-constants';

{/*Kontekst dla danych i aktualizacji ulubionych (klik na serduszku)*/ }
export const AnimalDataContext = React.createContext();

const apiUrl = Constants.manifest.extra.apiUrl;

{/*Zarządzanie stanem i dostępem do niego*/ }
export const AnimalDataProvider = ({ children }) => {

  const [animals, setAnimals] = useState([]);
  const userCtx = useContext(UserContext);

  useEffect(() => {
    console.log('new animals set on AnimalCtx: \n' + JSON.stringify(animals));
  }, [animals]);

  {/*GET /animal/read*/ }
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
        switch (status) {
          case 200:
            // OK
            var jsonStr = JSON.stringify(data);
            animals = JSON.parse(jsonStr);
            console.log("XDDDDDDDDDDDDDDD\n", animals, "\nXDDDDDDDDDDDDDDD");
            break;
          case 401:
            // jwt expired
            if (userCtx.userData.email) {
              var { newToken, userId } = await userCtx.relogin();
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

    return { newJwt, animals };
  }

  async function updateAnimals(tokenStr, params) {
    var { newJwt, animals } = await getAnimals(tokenStr, params);
    // Powtórne wywołanie z nowym jwt w przypadku utraty ważności
    if (newJwt)
      var { newJwt, animals } = await getAnimals(newJwt, params);
    //Serwer nie znalazł wyników
    if (animals == null)
      animals = [];
    console.log('Animals object update:\n' + JSON.stringify(animals));
    animals.forEach((animal) => {
      //wycięcie daty
      animal.admission_date = animal.admission_date.substring(0, 10);
    });
    setAnimals(animals);
  }

  //Aktualizacja animal.favourite
  async function updateFavourite(id) {

    var animal = getAnimal(id);
    var newJwt = null, token = userCtx.userData.token;
    const isDeleting = animal.favourite;
    console.log(`${isDeleting ? 'delete' : 'create'}Favourite called for ${animal.name}, id = ${id}`);
    newJwt = isDeleting ? await deleteFavourite(token, id) : await createFavourite(token, id);
    if (newJwt) {
      newJwt = isDeleting ? await deleteFavourite(newJwt, id) : await createFavourite(newJwt, id);
    }
    // Odświeża całą listę zwierząt
    // TODO: GET animal/read/id, podmienienie obiektu w liście i setAnimals
    var params = new URLSearchParams({ "user-id": userCtx.userData.userId });
    token = newJwt ? newJwt : userCtx.userData.token;
    updateAnimals(token, params);
  }

  async function deleteFavourite(token, id) {
    var status = null, newJwt = null;

    var res = await fetch(`${apiUrl}/fav_animal/delete`,
      {
        body: JSON.stringify({
          animal_id: id.toString(),
          user_id: userCtx.userData.userId.toString()
        }),
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        },
        method: 'DELETE'
      })
      .then(async response => {
        status = response.status;
        switch (status) {
          case 204:
            // No Content
            break;
          case 401:
            // jwt expired
            if (userCtx.userData.email) {
              var { newToken, userId } = await userCtx.relogin();
              newJwt = newToken;
              console.log('Refreshed jwt token for user ' + userId + ':\n' + newToken);
            }
            break;
          default:
            console.log('Unhandled deleteFavourite response status: ' + status);
            break;
        }
      });
    return newJwt;
  }

  async function createFavourite(token, id) {
    var status = null, newJwt = null;

    // toString() potrzebne
    var res = await fetch(`${apiUrl}/fav_animal/create`,
      {
        body: JSON.stringify({
          animal_id: id.toString(),
          user_id: userCtx.userData.userId.toString()
        }),
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        },
        method: 'POST'
      })
      .then(async response => {
        status = response.status;
        switch (status) {
          case 201:
            // Created
            break;
          case 401:
            // jwt expired
            if (userCtx.userData.email) {
              var { newToken, userId } = await userCtx.relogin();
              newJwt = newToken;
              console.log('Refreshed jwt token for user ' + userId + ':\n' + newToken);
            }
            break;
          default:
            console.log('Unhandled createFavourite response status: ' + status);
            break;
        }
      });
    return newJwt;
  }

  function getAnimal(id) {
    return animals.find(a => a.id == id);
  }

  // Delete animal from database by REST API
  async function deleteAnimal(id) {
    var status = null, newJwt = null;
    var res = await fetch(`${apiUrl}/animal/delete`,
      {
        body: JSON.stringify({
          id: id
        }),
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + userCtx.userData.token
        },
        method: 'DELETE'
      })
      .then(async response => {
        status = response.status;
      });
  }

  return (
    <AnimalDataContext.Provider value={{ animals, setAnimals, updateAnimals, updateFavourite, getAnimal, deleteAnimal }}>
      {children}
    </AnimalDataContext.Provider>
  );
}