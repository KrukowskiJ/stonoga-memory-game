document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.start-button').addEventListener('click', function() {
        memoryGame.startGame();
    });
});

const  memoryGame = {
    tileCount : 20,
    tileOnRow : 5,
    divBoard : null,
    divScore : null,
    tiles : [],
    tilesChecked : [],
    moveCount : 0,
    tilesImg : [
        'images/title_1.png',
        'images/title_2.png',
        'images/title_3.png',
        'images/title_4.png',
        'images/title_5.png',
        'images/title_6.png',
        'images/title_7.png',
        'images/title_8.png',
        'images/title_9.png',
        'images/title_10.png'
    ],
    canGet : true, //czy można klikać na kafelki
    tilePairs : 0, //liczba dopasowanych kafelkow

    startGame : function() {
        //czyścimy planszę
        this.divBoard = document.querySelector('.game-board');
        this.divBoard.innerHTML = '';

        d = document.getElementById("start-button");
        d.innerHTML='Zagraj ponownie';

        //czyścimy planszę z ruchami
        this.divScore = document.querySelector('.game-score');
        this.divScore.innerHTML = '<p class="score">Odsłoń pierwszą kartę.</p>';

        //czyścimy zmienne (bo gra może się zacząć ponownie)
        this.tiles = [];
        this.tilesChecked = [];
        this.moveCount = 0;
        this.canGet = true;
        this.tilePairs = 0;

        //generujemy tablicę numerów kocków (parami)
        for (let i=0; i<this.tileCount; i++) {
            this.tiles.push(Math.floor(i/2));
        }

        //i ją mieszamy
        for (let i=this.tileCount-1; i>0; i--) {
            const swap = Math.floor(Math.random()*i);
            const tmp = this.tiles[i];
            this.tiles[i] = this.tiles[swap];
            this.tiles[swap] = tmp;
        }

        for (let i=0; i<this.tileCount; i++) {
            const tile = document.createElement('div');
            tile.classList.add("game-tile");
            this.divBoard.appendChild(tile);

            tile.dataset.cardType = this.tiles[i];
            tile.dataset.index = i;
            tile.style.left = 5+(tile.offsetWidth+10)*(i%this.tileOnRow) + 'px';
            tile.style.top = 5+(tile.offsetHeight+10)*(Math.floor(i/this.tileOnRow)) + 'px';

            tile.addEventListener('click', this.tileClick.bind(this));
        }
    },

    tileClick : function(x) {
        if (this.canGet) {
            //jeżeli jeszcze nie pobraliśmy 1 elementu lub nie ma indexu tego elmentu w pobranych
            if (!this.tilesChecked[0] || (this.tilesChecked[0].dataset.index !== x.target.dataset.index)) {
                this.tilesChecked.push(x.target);
                x.target.style.backgroundImage = 'url(' + this.tilesImg[x.target.dataset.cardType] + ')';
            }

            if (this.tilesChecked.length === 2) {
                this.canGet = false;

                if (this.tilesChecked[0].dataset.cardType === this.tilesChecked[1].dataset.cardType) {
                    setTimeout(this.deleteTiles.bind(this), 1000);
                } else {
                    setTimeout(this.resetTiles.bind(this), 1000);
                }

                this.moveCount++;
                if(this.moveCount%10==0)
                this.divScore.innerHTML = '<p class="score">Score:<br></p><p class="score-number-10">' + this.moveCount + '</p>';
                else
                this.divScore.innerHTML = '<p class="score">Score:<br></p><p class="score-number">' + this.moveCount + '</p>';
            }
        }
    },

    deleteTiles : function() {
        //dodanie do popupa odpowiedniego zdjęcia z komentarzem
        const indexOfImage = this.tilesChecked[0].dataset.cardType;


        this.tilesChecked[0].remove();
        this.tilesChecked[1].remove();
        this.canGet = true;
        this.tilesChecked = [];
        this.tilePairs++;

        if (this.tilePairs >= this.tileCount / 2) {
          this.divScore.innerHTML = '<p class="score">Final Score:<br></p><p class="score-number"><u>' + this.moveCount + '</u></p>';
            this.divBoard = document.querySelector('.game-board');
             this.divBoard.innerHTML = '<iframe width="800" height="640" src="https://www.youtube.com/embed/NsdbChB7UGw?autoplay=1;controls=0&amp;start=3" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
        }
    },

    resetTiles : function() {
        this.tilesChecked[0].style.backgroundImage = 'url(images/title.png)';
        this.tilesChecked[1].style.backgroundImage = 'url(images/title.png)';

        this.tilesChecked = [];
        this.canGet = true;
    }


};
