import { slideCategories } from "../constants/Book/BookCategories";

export default function randomSlideSubcategory(category) {
    function capitalize(s) {
        return s[0].toUpperCase() + s.slice(1);
    }

    let filtered = slideCategories.filter(
        slideCategory => slideCategory.category === category,
    );
    let subCategories = filtered[0].subCategories;
    let subCategory = subCategories[Math.floor(Math.random() * (subCategories?.length - 1))].category.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]\s|[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]|\s/g, '')
    return capitalize(subCategory);
}