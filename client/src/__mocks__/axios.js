export default {
  get: jest.fn(() => {
    Promise.resolve({ data: {} });
    console.log("1");
  }),
};
