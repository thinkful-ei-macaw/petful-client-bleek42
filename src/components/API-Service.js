import config from './config';

const getPets = async () => {
  try {
    const res = await fetch(`${config.API_URL}/pets`);
    const data = await res.json();
  } catch (error) {
    throw new Error('there are no more pets!');
  }
};

const adoptPet = async (pet) => {
  try {
    const req = {
      method: 'DELETE',
      body: JSON.stringify({ type: pet }),
      headers: {
        'content-type': 'application/json',
      },
    };
    const res = await fetch(`${config.API_URL}/pets`, req);
    const data = await res.json();
  } catch (error) {
    throw new Error('cannot find next pet to be adopted');
  }
};

const getPeople = async () => {
  try {
    const res = await fetch(`{config.API_URL}/people`);
    const data = await res.json();
  } catch (error) {
    throw new Error('cannot find people');
  }
};

export default {
  getPeople,
  getPets,
  adoptPet,
};
