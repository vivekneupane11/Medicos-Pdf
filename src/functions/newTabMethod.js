import { logEventWithParams } from "./commonMethod";


export const newTab=(url,title,analyticsDesc)=>{
    window.open(
       url, "_blank");
       logEventWithParams(analyticsDesc, { Title: title })
}