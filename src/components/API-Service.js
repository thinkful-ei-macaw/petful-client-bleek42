import config from './config';

const getPets = async () => {
  try {
    const res = await fetch(`${config.API_URL}/pets`);
    await res.json();
  } catch (error) {
    throw new Error('there are no more pets!');
  }
};

const adoptPets = async (pet) => {
  try {
    const req = {
      method: 'DELETE',
      body: JSON.stringify({ type: pet }),
      headers: {
        'content-type': 'application/json',
      },
    };
    const res = await fetch(`${config.API_URL}/pets`, req);
    await res.json();
  } catch (error) {
    throw new Error('cannot find next pet to be adopted');
  }
};
