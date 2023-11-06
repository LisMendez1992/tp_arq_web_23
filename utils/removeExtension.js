class removeExtension {

    static removeExtension(filename) {
      return filename.split('.').shift();
    }
  }
  
  module.exports = removeExtension;