class Release {
    constructor(artist,album,year) {
        this.artist = artist;
        this.album = album;
        this.year = year;
    }

    describe () {
        return `${this.artist} released ${this.album} in ${this.year}.`;
    }
}

class Genre {
    constructor(name) {
        this.name = name;
        this.releases = [];
    }


addRelease(release) {
    if (release instanceof Release) {
        this.releases.push(release);
    } else {
        throw new Error(`You can only add an instance of Release. Argument is not a release: ${release}`);
    }
}

describe () {
    return `There are ${this.releases.length} ${this.name} albums in this collection`;
}
}

class Menu {
    constructor () {
        this.genres = [];
        this.selectedGenre = null;
    }

    start () {
        let selection = this.showMainMenuOptions();
        while (selection != 0) {
            switch (selection) {
                case '1':
                    this.createGenre();
                    break;
                case '2':
                    this.viewGenre();
                    break;
                case '3':
                    this.deleteGenre();
                    break;
                case '4':
                    this.displayGenres();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }
        alert('Bye!');
    }

    showMainMenuOptions() {
        return prompt(`
            0) exit
            1) create new genre
            2) view genre
            3) delete genre
            4) display all genres
        `);
    }

    showGenreMenuOptions(genreInfo) {
        return prompt (`
        0) back
        1) create release
        2) delete release
        ---------------------
        ${genreInfo}
        `);
    }

    displayGenres() {
        let genreString = '';
        for (let i = 0; i < this.genres.length; i++) {
            genreString += i + ') ' + this.genres[i].name + '\n';
        }
        alert (genreString);
    }

    createGenre () {
        let name = prompt('Enter name for new genre');
        this.genres.push(new Genre(name));
    }

    viewGenre () {
        let index = prompt('Enter the index of the genre you wish to view');
        if (index > -1 && index < this.genres.length) {
            this.selectedGenre = this.genres[index];
            let description = 'Genre Name: ' + this.selectedGenre.name + '\n';

            for (let i = 0; i < this.selectedGenre.releases.length; i++) {
                description += i + ') ' + this.selectedGenre.releases[i].artist 
                + ' - '  + this.selectedGenre.releases[i].album
                + ' - ' + this.selectedGenre.releases[i].year + '\n';
            }

            let selection = this.showGenreMenuOptions(description);
            switch (selection) {
                case '1':
                    this.createRelease();
                    break;
                case '2':
                    this.deleteRelease();
                
            }
        }

    }

    deleteGenre() {
        let index = prompt('Enter the index of the genre you wish to delete ');
        if (index > -1 && index < this.genres.length) {
            this.genres.splice(index,1);
        }
    }

    createRelease() {
        let artist = prompt('Enter name of new artist: ');
        let album = prompt(`Enter name of artist's album: `);
        let year = prompt('Enter year of album release: ');
        this.selectedGenre.releases.push(new Release(artist,album,year));
    }

    deleteRelease() {
        let index = prompt('Enter the index of the release you wish to delete: ');
        if ( index > -1 && index < this.selectedGenre.releases.length) {
            this.selectedGenre.releases.splice(index,1);
        }

    }
}

let menu = new Menu();
menu.start();
