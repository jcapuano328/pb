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
    add(chit, cup) {        
        var items = cup.filter((i) => i.code == chit.code) || [];
        cup = [            
            ...cup,
            {...chit}
        ];
               
        return shuffle(cup);        
    },
    remove(chit, cup) {
        var idx = cup.findIndex((i) => i == chit);
        if (idx > -1) {
            cup.splice(idx,1);            
        } 
        return shuffle(cup)        
    },
    draw(cup) {
        var chit = shuffle(cup).shift();
        return {
            mu: chit,
            cup: cup
        };
    }
}