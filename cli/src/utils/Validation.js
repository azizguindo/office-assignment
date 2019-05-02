export default class Validation {


   static validatename(nom)
    {
        const REGEXP_NAME="[a-z]{2,}";

        return nom.match(REGEXP_NAME)==null?true:false;
    }
    static valideNumeroBureau(value){
       return value.toLowerCase().match("[a-z]");
    }
}
