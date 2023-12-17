import { SetMetadata } from "@nestjs/common";
import { MetadataKey } from "../medata";

export const RequireAuth = (): MethodDecorator => {
  return (target, key, descriptor) => {
    SetMetadata(MetadataKey.RequireAuth, true)(target, key, descriptor);
  };
};
