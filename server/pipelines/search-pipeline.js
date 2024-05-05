const searchPipeline = (search) => [
  {
    $search: {
      index: "reactCrudUsers",
      compound: {
        should: [
          {
            autocomplete: {
              query: search,
              path: "firstname",
              tokenOrder: "sequential",
            },
          },
          {
            autocomplete: {
              query: search,
              path: "lastname",
              tokenOrder: "sequential",
            },
          },
          {
            autocomplete: {
              query: search,
              path: "address",
              tokenOrder: "sequential",
            },
          },
          {
            autocomplete: {
              query: search,
              path: "phoneNumber",
              tokenOrder: "sequential",
            },
          },
          {
            autocomplete: {
              query: search,
              path: "email",
              tokenOrder: "sequential",
            },
          },
        ],
      },
    },
  },
];

module.exports = searchPipeline;
