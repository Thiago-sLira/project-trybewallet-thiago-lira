const AWESOME_BASE_API = 'https://economia.awesomeapi.com.br/json/all';

export default getQuotationsAPI = async () => {
  const response = await fetch(AWESOME_BASE_API);
  const json = await response.json();
  return json;
};
