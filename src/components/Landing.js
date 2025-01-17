import React, { useState, useEffect } from "react";
import axios from "axios";
import url from "./URL";
import Plant from "./Plant";
import PlantDetails from "./PlantDetails";
import PlantForm from "./PlantForm";
import { Switch, Route } from "react-router-dom";

const initialFormValues = {
  nickname: "",
  species: "",
  h2oFrequency: "",
  imageURL: "",
};

const initialPlants = [];

function PlantPage() {
  const [plants, setPlants] = useState(initialPlants);
  const [formValues, setFormValues] = useState(initialFormValues);

  const getPlants = () => {
    axios
      .get(`${url}/api/plants`)
      .then((res) => {
        setPlants(res.data);
      })
      .catch((err) => console.error(err));
  };

  const postNewPlant = (newPlant) => {
    axios
      .post(`${url}/api/plants`, newPlant)
      .then((res) => {
        setPlants([res.data, ...plants]);
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setFormValues(initialFormValues);
      });
  };

  const inputChange = (name, value) => {
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const formSubmit = () => {
    const newPlant = {
      nickname: formValues.nickname.trim(),
      species: formValues.species.trim(),
      h2oFrequency: formValues.h2oFrequency.trim(),
      imageURL: formValues.imageURL,
    };
    postNewPlant(newPlant);
  };

  useEffect(() => {
    getPlants();
  }, []);

  return (
    <Switch>
      <Route exact path="/plants">
        <div className="container">
          <header>
            <h1>Plant Database</h1>
          </header>

          <PlantForm
            values={formValues}
            change={inputChange}
            submit={formSubmit}
          />

          {plants.map((plant) => {
            return <Plant key={plant.id} details={plant} />;
          })}
        </div>
      </Route>
      <Route path="/plants/:id">
        <PlantDetails plants = {plants} />
      </Route>
    </Switch>
  );
}

export default PlantPage;
