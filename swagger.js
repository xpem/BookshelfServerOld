const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./src/routes.ts"];

const doc = {
  info: {
    version: "3.0.0",
    title: "Bookshelf",
    description:
      "",
  },
  host: "localhost:3001",
  basePath: "/",
  schemes: ["http", "https"],
  consumes: ["application/json"],
  produces: ["application/json"],
  tags: [
    {
      name: "Books",
      // "description": "Endpoints"
    },
  ],
  securityDefinitions: {
      api_key: {
          type: "apiKey",
          name: "authorization",
          in: "header"
      }
  },
  definitions: {
    Rating: {
      Rate: 3,
      Comment: "",
    },
    Book: {
      Title: "O restaurante no fim do universo",
      SubTitle: "O guia do mochileiro das galáxias",
      Authors: "Douglas Adams",
      Volume: "2",
      Pages: 240,
      Year: 2010,
      Inactive: false,
      Rating: {
        $ref: "#/definitions/Rating",
      },
      Cover:
        "http://books.google.com/books/content?id=aU_ipET2qQEC&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE70kquPQv9cz2YFN-y5OVh-q3LQKidiSXs6LDM8LvGV9pbnKzhqCx38w5mz9z2RQXb2gM-uIYyd3YO_AKFXQcPv5x9_MyTjed3QWrdNxw8o34qY1Lq5jEs0xL3_RwDlzSE7vvosU&source=gbs_api",
      Genre: "ficção científica",
      GoogleId: "aU_ipET2qQEC",
      Isbn: "",
      Situation: 3,
    },
  },
};

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require("./src/routes.ts");
});
