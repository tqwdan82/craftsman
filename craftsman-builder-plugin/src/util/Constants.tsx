export const protocol = process.env.REACT_APP_SECURE_API === 'true' ? 'https' : 'http';

const prod = {
      API_URL: `${protocol}://${window.location.host}`,
};

const dev = {
      API_URL: `${process.env.REACT_APP_DEV_API}`
};

export const config = process.env.NODE_ENV === 'development' ? dev : prod;