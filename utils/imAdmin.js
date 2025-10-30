const secretPhrase = "imadminletmein";

exports.isKeyValid = (key) => {
  try {
    const decodedKeyStr = Buffer.from(key, "base64").toString("utf-8");
    if (decodedKeyStr === secretPhrase) {
      console.log("Key validation successful.");
      return true;
    } else {
      console.log(
        "Key validation failed: Decoded key does not match the secret phrase."
      );
      return false;
    }
  } catch (e) {
    console.log(`Key validation failed: Error during decoding - ${e}`);
    return false;
  }
};
