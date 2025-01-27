// Fix an issue that might happend with the BigInt type
// @ts-ignore
if (typeof BigInt.prototype.toJSON === 'undefined') {
    // @ts-ignore
    BigInt.prototype.toJSON = function () {
      return this.toString();
    };
  }

  /**
   * Return the Version of Up
   * 
   * @returns string
   */
  export function UpVersion(){
    return process.env.UP_VERSION; 
  }