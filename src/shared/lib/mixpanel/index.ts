import mixpanel from 'mixpanel-browser';

export const init = (token: string, options: any) => {
  mixpanel.init(token, options);
};

export const identify = (address: string) => {
  mixpanel.identify(address);
};

export const pageLoad = (values: Record<string, string>) => {
  mixpanel.track('page_load', values);
};

export const reset = () => {
  mixpanel.reset();
};

export const setUser = (value: Record<string, string>) => {
  mixpanel.people.set(value);
};
