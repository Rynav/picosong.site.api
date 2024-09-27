const apiSongArtworkGet = {
  detail: {
    tags: ["Artwork"],
    parameters: [
      {
        name: "id",
        in: "path",
        description: "The song ID found in the picosong.com URL.",
        required: true,
        example: "wKSYu",
      },
    ],
    description: "Get the artwork corresponding to the given song ID.",
    responses: {
      "200": {
        description:
          "Returns 200, the song ID and the artwork UUID string if the corresponding artworks exists.",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                id: { type: "String", example: "wKSYu" },
                artwork: {
                  type: "String",
                  example: "2e8d1c7a-032e-45f2-ae4e-a2e81fc6d763.png",
                },
              },
            },
          },
        },
      },
      "400": {
        description:
          "Returns 400 when user submitted an invalid ID string.",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                erro: {type: "String", example: "Invalid ID structure!"}
              },
            },
          },
        },
      },
      "404": {
        description:
          "Returns 404 if given song doesn't exist or the song ID has no corresponding artwork.",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                error: {
                  type: "String",
                  example: "Song not found! / No artwork found!",
                },
              },
            },
          },
        },
      },
    },
  },
};

const apiSongArtworkVerify = {
  detail: {
    tags: ["Artwork"],
    parameters: [
      {
        name: "id",
        in: "path",
        description:
          "The uuid of the artwork. Can ommit the `.png` suffix in the UUID.",
        required: true,
        examples: [
          "2e8d1c7a-032e-45f2-ae4e-a2e81fc6d763.png",
          "2e8d1c7a-032e-45f2-ae4e-a2e81fc6d763",
        ],
      },
    ],
    description: "Get the song ID corresponding to the given artwork UUID.",
    responses: {
      "200": {
        description:
          "Returns 200, the song ID and the artwork UUID string if the corresponding artworks exists.",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                id: { type: "String", example: "wKSYu" },
                artwork: {
                  type: "String",
                  example: "2e8d1c7a-032e-45f2-ae4e-a2e81fc6d763.png",
                },
              },
            },
          },
        },
      },
      "400": {
        description:
          "Returns 400 when user submitted an invalid UUId string.",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                erro: {type: "String", example: "Invalid UUID structure!"}
              },
            },
          },
        },
      },
      "404": {
        description: "Returns 404 if given artwork ID doesn't exist.",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                error: {
                  type: "String",
                  example: "Artwork not found!",
                },
              },
            },
          },
        },
      },
    },
  },
};

const apiSongMediaGet = {
  detail: {
    tags: ["Media"],
    parameters: [
      {
        name: "id",
        in: "path",
        description: "The song ID found in the picosong.com URL",
        required: true,
        example: "wKSYu",
      },
    ],
    description: "Get the .mp3 file for the given song ID.",
    responses: {
      "200": {
        description:
          "Returns 200 and the .mp3 file for the given ID.",
        content: {
          "audio/mpeg": {},
        },
      },
      "400": {
        description:
          "Returns 400 when user submitted an invalid ID string.",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                erro: {type: "String", example: "Invalid ID structure!"}
              },
            },
          },
        },
      },
      "404": {
        description:
          "Returns 404 when the song doesn't exist.",
        content: {
          "application/json":{
            schema: {
                type: "object",
                properties: {
                  error: { type: "String", example: "Song not found!" },
                },
              },
          }
        },
      },
    },
  },
};

const apiSongMetadataGet = {
  detail: {
    tags: ["Media"],
  },
};

export {
  apiSongArtworkGet,
  apiSongArtworkVerify,
  apiSongMediaGet,
  apiSongMetadataGet,
};
