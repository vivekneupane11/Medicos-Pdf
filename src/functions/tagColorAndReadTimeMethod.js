export const getColorByIndex=(index)=>{

    let color = "yellow";
    if (index % 3 === 0) {
        color = 'red'
    } else if (index % 2 === 0) {
        color = 'skyblue'
    }
    return color;
}

export  const getReadTime = (text) => {
    const wordsPerMinute = 120;
    const textLength = text?.split(" ").length;
    let minutesToRead = Math.ceil(textLength / wordsPerMinute);
    return minutesToRead;

}

export const getColorById =(id)=>{
    let color='yellow'
    if(id===0){
        color = 'red'
    }
   else if (id % 2 === 0) {
       
        color='yellow'
    } else if(id%2===1) {
        color = 'skyblue'
    }
    return color;
}