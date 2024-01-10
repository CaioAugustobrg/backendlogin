// userResolvers.ts

import { request, response } from "express";
import { adaptResolver } from "../../adapters";
import { createUserController } from "../../../user/index";

export default {
  Mutation: {
    CreateUser: async ({ input }: any) => await createUserController.handle(input)
  },
};
