expect.extend({
  toBeNumber(received) {
    if (!Number.isNaN(parseFloat(received)) && Number.isFinite(received)) {
      return {
        message: () => `expected ${received} is not number`,
        pass: true,
      };
    }
    return {
      message: () => `expected ${received} is number`,
      pass: false,
    };
  },
});
