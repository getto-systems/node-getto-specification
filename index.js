exports.init = () => init();

/**
 * returns : {
 *   all : (conditions) => return condition that check all condition satisfied
 *   not : (condition) => return condition that is not satisfied base-condition
 *   init : (() => boolean) => return condition
 * }
 */
const init = () => {
  const init = (checker) => {
    let result = null;
    const matches = async () => {
      if (!result) {
        result = {
          matches: await checker(),
        };
      }
      return result.matches;
    };

    return {
      matches,
    };
  };

  const not = (condition) => {
    const matches = async () => {
      return !(await condition.matches());
    };

    return {
      matches,
    };
  };

  const all = (conditions) => {
    const matches = async () => {
      for(let i in conditions) {
        const condition = conditions[i];
        if (!(await condition.matches())) {
          return false;
        }
      }

      return true;
    };

    return {
      matches,
    };
  };

  return {
    init,
    not,
    all,
  };
};
