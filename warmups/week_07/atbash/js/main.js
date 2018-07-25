console.log("connected");

// # Atbash Cipher - JavaScript
//
// The Atbash cipher is a simple substitution cipher that relies on transposing all the letters in the alphabet such that the resulting alphabet is backwards. The first letter is replaced with the last letter, the second with the
// second-last, and so on.
//
// An Atbash cipher for the Latin alphabet would be as follows:
//
// ```plain
// Plain:  abcdefghijklmnopqrstuvwxyz
// Cipher: zyxwvutsrqponmlkjihgfedcba
// ```
//
// It is a very weak cipher because it only has one possible key, and it is a
// simple monoalphabetic substitution cipher. However, this may not have been an issue in the cipher's time.
//
// ## Examples
// - Encoding "test" gives "gvhg"
// - Decoding "gvhg" gives "test"


const atbash = {
  alphabet: "abcdefghijklmnopqrstuvwxyz".split(''),

  encode: function (input) {
    output = ""

    input = input.split("");

    for (var i = 0; i < input.length; i++) {
      const index = this.alphabet.indexOf( input[i] );
      output += this.alphabet.reverse()[index]
    }

    return output;
  }


}


console.log( atbash.encode("test") )
console.log( atbash.encode("gvhg") )
