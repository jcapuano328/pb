const shuffle = (a) => {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
	return a;
}


module.exports = {
    reset() {
        return [];
    },
    add(image, cup) {        
        var items = cup.filter((i) => i.image == image) || [];
        cup = [
            {image: image},
            ...cup
        ];
               
        return shuffle(cup);        
    },
    remove(item, cup) {
        var idx = cup.findIndex((i) => i == item);
        if (idx > -1) {
            cup.splice(idx,1);            
        } 
        return shuffle(cup)        
    },
    draw(cup) {
        var item = shuffle(cup).shift();
        return {
            mu: item,
            cup: cup
        };
    }
}