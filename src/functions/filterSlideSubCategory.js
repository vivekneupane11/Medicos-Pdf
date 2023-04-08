
export default function filterSlideSubcategory(subCategory) {
    function capitalize(mySentence) {
        const words = mySentence.split(" ");

        for (let i = 0; i < words.length; i++) {
            words[i] = words[i][0]?.toUpperCase() + words[i]?.substr(1);
        }

        return words.join(" ");
    }
    if (subCategory) {
        let capitalizedWords = capitalize(subCategory)
        // console.log('capitalize', capitalizedWords, subCategory)
        let capatalizefinal =   capitalizedWords.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]\s|[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]|\s/g, '');
        capatalizefinal = capatalizefinal == 'Gynoobs'? 'GynoObs' : capatalizefinal;
        return capatalizefinal;

    } else {
        return null
    }
}