import * as version from "../src/version";

export const createVersion = (semver: string): version.Version => {
  return {
    semver: semver,
  };
};
