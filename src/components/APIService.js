import config from './config';

const getPets = async () => {
  try {
    const res = await fetch(`${config.API_URL}/pets`);
    if (res.status !== 200) {
      throw new Error({ message: 'cannot get pets!' });
    }
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error({
      message:
        'something went wrong! please refresh or contact an administrator.',
    });
  }
};

const adoptPet = async (petType) => {
  try {
    const pet = {
      type: petType,
    };
    const req = {
      method: 'DELETE',
      body: JSON.stringify(pet),
      headers: {
        'content-type': 'application/json',
      },
    };
    const res = await fetch(`${config.API_URL}/pets`, req);
    if (res.status !== 200) {
      throw new Error({ message: 'cannot find pet to adopt!' });
    }
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error({
      message:
        'something went wrong! please refresh or contact an administrator.',
    });
  }
};

const getPeople = async () => {
  try {
    const res = await fetch(`${config.API_URL}/people`);
    if (res.status !== 200) {
      throw new Error({ message: 'cannot get people that wish to adopt!' });
    }
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error({
      message:
        'something went wrong! please refresh or contact an administrator.',
    });
  }
};

const addPerson = async (newPerson) => {
  try {
    const person = {
      name: newPerson,
    };
    const req = {
      method: 'POST',
      body: JSON.stringify(person),
      headers: {
        'content-type': 'application/json',
      },
    };
    const res = await fetch(`${config.API_URL}/people`, req);
    if (res.status !== 200) {
      throw new Error({ message: 'cannot add a new person!' });
    }
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error({
      message:
        'something went wrong! please refresh or contact an administrator.',
    });
  }
};

export { getPeople, addPerson, getPets, adoptPet };
